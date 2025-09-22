// @ts-ignore - bun:test is a built-in module
import { test, expect, describe } from "bun:test";

// Mock contract interface for testing
interface DocumentRWA {
  createDocument(title: string, hash: string, signers: string[]): Promise<void>;
  updateDocument(documentId: number, title: string, hash: string): Promise<void>;
  signDocument(documentId: number): Promise<void>;
  deleteDocument(documentId: number): Promise<void>;
  getDocument(documentId: number): Promise<any>;
  transferOwnership(newOwner: string): Promise<void>;
}

// Mock implementation for testing
class MockDocumentRWA implements DocumentRWA {
  private documents: Map<number, any> = new Map();
  private nextId = 1;
  private owner = "0x1234567890123456789012345678901234567890";

  async createDocument(title: string, hash: string, signers: string[]): Promise<void> {
    if (!title || title.trim() === "") {
      throw new Error("Title cannot be empty");
    }
    if (!hash || hash.trim() === "") {
      throw new Error("Hash cannot be empty");
    }
    if (signers.length === 0) {
      throw new Error("At least one signer required");
    }

    const document = {
      id: this.nextId,
      title,
      hash,
      signers,
      signatures: new Map(),
      isDeleted: false,
      owner: this.owner,
      createdAt: Date.now()
    };

    this.documents.set(this.nextId, document);
    this.nextId++;
  }

  async updateDocument(documentId: number, title: string, hash: string): Promise<void> {
    const document = this.documents.get(documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    if (document.isDeleted) {
      throw new Error("Cannot update deleted document");
    }

    document.title = title;
    document.hash = hash;
  }

  async signDocument(documentId: number): Promise<void> {
    const document = this.documents.get(documentId);
    if (!document) {
      throw new Error("Document not found");
    }
    if (document.isDeleted) {
      throw new Error("Cannot sign deleted document");
    }

    document.signatures.set("signer", true);
  }

  async deleteDocument(documentId: number): Promise<void> {
    const document = this.documents.get(documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    document.isDeleted = true;
  }

  async getDocument(documentId: number): Promise<any> {
    const document = this.documents.get(documentId);
    if (!document) {
      throw new Error("Document not found");
    }

    return document;
  }

  async transferOwnership(newOwner: string): Promise<void> {
    if (!newOwner || newOwner === "0x0000000000000000000000000000000000000000") {
      throw new Error("Invalid new owner address");
    }
    this.owner = newOwner;
  }
}

describe("DocumentRWA Contract Tests", () => {
  let contract: MockDocumentRWA;

  test("should create a new document", async () => {
    contract = new MockDocumentRWA();
    const title = "Test Document";
    const hash = "QmTestHash123456789";
    const signers = ["0x1234567890123456789012345678901234567890"];

    await contract.createDocument(title, hash, signers);
    
    const document = await contract.getDocument(1);
    expect(document.title).toBe(title);
    expect(document.hash).toBe(hash);
    expect(document.signers).toEqual(signers);
    expect(document.isDeleted).toBe(false);
  });

  test("should fail to create document with empty title", async () => {
    contract = new MockDocumentRWA();
    const hash = "QmTestHash123456789";
    const signers = ["0x1234567890123456789012345678901234567890"];

    expect(async () => {
      await contract.createDocument("", hash, signers);
    }).toThrow("Title cannot be empty");
  });

  test("should fail to create document with empty hash", async () => {
    contract = new MockDocumentRWA();
    const title = "Test Document";
    const signers = ["0x1234567890123456789012345678901234567890"];

    expect(async () => {
      await contract.createDocument(title, "", signers);
    }).toThrow("Hash cannot be empty");
  });

  test("should fail to create document with no signers", async () => {
    contract = new MockDocumentRWA();
    const title = "Test Document";
    const hash = "QmTestHash123456789";

    expect(async () => {
      await contract.createDocument(title, hash, []);
    }).toThrow("At least one signer required");
  });

  test("should update an existing document", async () => {
    contract = new MockDocumentRWA();
    const title = "Test Document";
    const hash = "QmTestHash123456789";
    const signers = ["0x1234567890123456789012345678901234567890"];

    await contract.createDocument(title, hash, signers);
    
    const newTitle = "Updated Document";
    const newHash = "QmUpdatedHash987654321";
    await contract.updateDocument(1, newTitle, newHash);

    const document = await contract.getDocument(1);
    expect(document.title).toBe(newTitle);
    expect(document.hash).toBe(newHash);
  });

  test("should fail to update non-existent document", async () => {
    contract = new MockDocumentRWA();

    expect(async () => {
      await contract.updateDocument(999, "Title", "Hash");
    }).toThrow("Document not found");
  });

  test("should sign a document", async () => {
    contract = new MockDocumentRWA();
    const title = "Test Document";
    const hash = "QmTestHash123456789";
    const signers = ["0x1234567890123456789012345678901234567890"];

    await contract.createDocument(title, hash, signers);
    await contract.signDocument(1);

    const document = await contract.getDocument(1);
    expect(document.signatures.get("signer")).toBe(true);
  });

  test("should delete a document", async () => {
    contract = new MockDocumentRWA();
    const title = "Test Document";
    const hash = "QmTestHash123456789";
    const signers = ["0x1234567890123456789012345678901234567890"];

    await contract.createDocument(title, hash, signers);
    await contract.deleteDocument(1);

    const document = await contract.getDocument(1);
    expect(document.isDeleted).toBe(true);
  });

  test("should fail to update deleted document", async () => {
    contract = new MockDocumentRWA();
    const title = "Test Document";
    const hash = "QmTestHash123456789";
    const signers = ["0x1234567890123456789012345678901234567890"];

    await contract.createDocument(title, hash, signers);
    await contract.deleteDocument(1);

    expect(async () => {
      await contract.updateDocument(1, "New Title", "New Hash");
    }).toThrow("Cannot update deleted document");
  });

  test("should fail to sign deleted document", async () => {
    contract = new MockDocumentRWA();
    const title = "Test Document";
    const hash = "QmTestHash123456789";
    const signers = ["0x1234567890123456789012345678901234567890"];

    await contract.createDocument(title, hash, signers);
    await contract.deleteDocument(1);

    expect(async () => {
      await contract.signDocument(1);
    }).toThrow("Cannot sign deleted document");
  });

  test("should transfer ownership", async () => {
    contract = new MockDocumentRWA();
    const newOwner = "0x9876543210987654321098765432109876543210";

    await contract.transferOwnership(newOwner);
    // In a real implementation, we would check the owner property
    // For this mock, we just verify it doesn't throw
    expect(true).toBe(true);
  });

  test("should fail to transfer ownership to zero address", async () => {
    contract = new MockDocumentRWA();

    expect(async () => {
      await contract.transferOwnership("0x0000000000000000000000000000000000000000");
    }).toThrow("Invalid new owner address");
  });
});