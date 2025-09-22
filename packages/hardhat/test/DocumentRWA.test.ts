import { expect } from "chai";
import hre from "hardhat";
import { keccak256, toBytes } from "viem";

describe("DocumentRWA On-Chain Tests", function () {
  let documentRWA: any;
  let deployer: any;
  let user1: any;
  let user2: any;
  let deployerAddress: string;
  let user1Address: string;
  let user2Address: string;

  async function deployDocumentRWAFixture() {
    // Get test accounts
    const [deployerAccount, user1Account, user2Account] = await hre.viem.getWalletClients();
    const deployer = deployerAccount;
    const user1 = user1Account;
    const user2 = user2Account;
    
    const deployerAddress = deployer.account.address;
    const user1Address = user1.account.address;
    const user2Address = user2.account.address;

    console.log("Deployer:", deployerAddress);
    console.log("User1:", user1Address);
    console.log("User2:", user2Address);

    // Deploy DocumentRWA contract
    const documentRWAContract = await hre.viem.deployContract("DocumentRWA", [deployerAddress]);

    console.log("DocumentRWA deployed to:", documentRWAContract.address);

    return {
      documentRWA: documentRWAContract,
      deployer,
      user1,
      user2,
      deployerAddress,
      user1Address,
      user2Address
    };
  }

  beforeEach(async function () {
    const fixture = await deployDocumentRWAFixture();
    documentRWA = fixture.documentRWA;
    deployer = fixture.deployer;
    user1 = fixture.user1;
    user2 = fixture.user2;
    deployerAddress = fixture.deployerAddress;
    user1Address = fixture.user1Address;
    user2Address = fixture.user2Address;
  });

  describe("Document Creation", function () {
    it("Should create a new document", async function () {
      const organizationId = 1n;
      const title = "Test Document";
      const contentHash = "QmTestContentHash123456789abcdef";
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      const hash = await documentRWA.write.createDocument([
        organizationId,
        title,
        contentHash,
        metadataHash
      ], { account: user1Address });

      // Wait for transaction to be mined
      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Verify document was created
      const documentCount = await documentRWA.read.documentCount();
      expect(documentCount).to.equal(1n);

      // Get document details
      const [docId, docContentHash, docOwner] = await documentRWA.read.getDocument([1n]);
      expect(docId).to.equal(1n);
      expect(docContentHash).to.equal(contentHash);
      expect(docOwner.toLowerCase()).to.equal(user1Address.toLowerCase());
    });

    it("Should fail to create document with invalid title", async function () {
      const organizationId = 1n;
      const shortTitle = "ab"; // Too short
      const contentHash = "QmTestContentHash123456789abcdef";
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      await expect(
        documentRWA.write.createDocument([
          organizationId,
          shortTitle,
          contentHash,
          metadataHash
        ], { account: user1Address })
      ).to.be.rejected;
    });

    it("Should fail to create document with empty content hash", async function () {
      const organizationId = 1n;
      const title = "Valid Title";
      const contentHash = ""; // Empty hash
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      await expect(
        documentRWA.write.createDocument([
          organizationId,
          title,
          contentHash,
          metadataHash
        ], { account: user1Address })
      ).to.be.rejected;
    });
  });

  describe("Document Management", function () {
    let docId: bigint;

    beforeEach(async function () {
      const organizationId = 1n;
      const title = "Test Document for Management";
      const contentHash = "QmTestContentHash123456789abcdef";
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      const hash = await documentRWA.write.createDocument([
        organizationId,
        title,
        contentHash,
        metadataHash
      ], { account: user1Address });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      const documentCount = await documentRWA.read.documentCount();
      docId = documentCount;
    });

    it("Should update document title", async function () {
      const newTitle = "Updated Document Title";

      const hash = await documentRWA.write.updateDocument([docId, newTitle], {
        account: user1Address
      });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Note: We can't easily verify the title change without a getter for the full document
      // In a real test, you'd add a getter function to the contract
    });

    it("Should fail to update document by non-owner", async function () {
      const newTitle = "Unauthorized Update";

      await expect(
        documentRWA.write.updateDocument([docId, newTitle], {
          account: user2Address
        })
      ).to.be.rejected;
    });

    it("Should add signer to document", async function () {
      const hash = await documentRWA.write.addSigner([docId, user2Address], {
        account: user1Address
      });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Verify signer was added
      const isAuthorized = await documentRWA.read.isAuthorizedSigner([docId, user2Address]);
      expect(isAuthorized).to.be.true;
    });

    it("Should remove signer from document", async function () {
      // First add a signer
      let hash = await documentRWA.write.addSigner([docId, user2Address], {
        account: user1Address
      });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Then remove the signer
      hash = await documentRWA.write.removeSigner([docId, user2Address], {
        account: user1Address
      });

      await publicClient.waitForTransactionReceipt({ hash });

      // Verify signer was removed
      const isAuthorized = await documentRWA.read.isAuthorizedSigner([docId, user2Address]);
      expect(isAuthorized).to.be.false;
    });
  });

  describe("Document Signing", function () {
    let docId: bigint;

    beforeEach(async function () {
      const organizationId = 1n;
      const title = "Test Document for Signing";
      const contentHash = "QmTestContentHash123456789abcdef";
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      const hash = await documentRWA.write.createDocument([
        organizationId,
        title,
        contentHash,
        metadataHash
      ], { account: user1Address });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      const documentCount = await documentRWA.read.documentCount();
      docId = documentCount;
    });

    it("Should allow owner to sign document", async function () {
      // Create a simple signature (in real implementation, this would be a proper ECDSA signature)
      const messageHash = keccak256(toBytes(`${docId}${user1Address}${Date.now()}`));
      const signature = await user1.signMessage({ message: { raw: messageHash } });

      const hash = await documentRWA.write.signDocument([docId, signature], {
        account: user1Address
      });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Verify document is signed
      const isSigned = await documentRWA.read.isSigned([docId, user1Address]);
      expect(isSigned).to.be.true;
    });

    it("Should fail to sign document twice", async function () {
      // First signature
      const messageHash = keccak256(toBytes(`${docId}${user1Address}${Date.now()}`));
      const signature = await user1.signMessage({ message: { raw: messageHash } });

      let hash = await documentRWA.write.signDocument([docId, signature], {
        account: user1Address
      });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Try to sign again
      await expect(
        documentRWA.write.signDocument([docId, signature], {
          account: user1Address
        })
      ).to.be.rejected;
    });
  });

  describe("Document Deletion", function () {
    let docId: bigint;

    beforeEach(async function () {
      const organizationId = 1n;
      const title = "Test Document for Deletion";
      const contentHash = "QmTestContentHash123456789abcdef";
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      const hash = await documentRWA.write.createDocument([
        organizationId,
        title,
        contentHash,
        metadataHash
      ], { account: user1Address });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      const documentCount = await documentRWA.read.documentCount();
      docId = documentCount;
    });

    it("Should delete document", async function () {
      const hash = await documentRWA.write.deleteDocument([docId], {
        account: user1Address
      });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Note: In the actual contract, deleted documents might still exist but be marked as inactive
      // The test would need to be adjusted based on the actual implementation
    });

    it("Should fail to delete document by non-owner", async function () {
      await expect(
        documentRWA.write.deleteDocument([docId], {
          account: user2Address
        })
      ).to.be.rejected;
    });
  });

  describe("Ownership Transfer", function () {
    let docId: bigint;

    beforeEach(async function () {
      const organizationId = 1n;
      const title = "Test Document for Transfer";
      const contentHash = "QmTestContentHash123456789abcdef";
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      const hash = await documentRWA.write.createDocument([
        organizationId,
        title,
        contentHash,
        metadataHash
      ], { account: user1Address });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      const documentCount = await documentRWA.read.documentCount();
      docId = documentCount;
    });

    it("Should transfer document ownership", async function () {
      const hash = await documentRWA.write.transferDocumentOwnership([docId, user2Address], {
        account: user1Address
      });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      // Verify ownership transfer
      const [, , newOwner] = await documentRWA.read.getDocument([docId]);
      expect(newOwner.toLowerCase()).to.equal(user2Address.toLowerCase());
    });

    it("Should fail to transfer ownership by non-owner", async function () {
      await expect(
        documentRWA.write.transferDocumentOwnership([docId, user2Address], {
          account: user2Address
        })
      ).to.be.rejected;
    });
  });

  describe("Contract Statistics", function () {
    it("Should return correct document count", async function () {
      const initialCount = await documentRWA.read.getActiveDocumentCount();
      
      // Create a document
      const organizationId = 1n;
      const title = "Stats Test Document";
      const contentHash = "QmTestContentHash123456789abcdef";
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      const hash = await documentRWA.write.createDocument([
        organizationId,
        title,
        contentHash,
        metadataHash
      ], { account: user1Address });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      const newCount = await documentRWA.read.getActiveDocumentCount();
      expect(newCount).to.equal(initialCount + 1n);
    });

    it("Should return correct signature count", async function () {
      const initialSigCount = await documentRWA.read.getTotalSignatureCount();
      
      // Create and sign a document
      const organizationId = 1n;
      const title = "Signature Stats Test";
      const contentHash = "QmTestContentHash123456789abcdef";
      const metadataHash = "QmTestMetadataHash123456789abcdef";

      let hash = await documentRWA.write.createDocument([
        organizationId,
        title,
        contentHash,
        metadataHash
      ], { account: user1Address });

      const publicClient = await hre.viem.getPublicClient();
      await publicClient.waitForTransactionReceipt({ hash });

      const docId = await documentRWA.read.documentCount();

      // Sign the document
      const messageHash = keccak256(toBytes(`${docId}${user1Address}${Date.now()}`));
      const signature = await user1.signMessage({ message: { raw: messageHash } });

      hash = await documentRWA.write.signDocument([docId, signature], {
        account: user1Address
      });

      await publicClient.waitForTransactionReceipt({ hash });

      const newSigCount = await documentRWA.read.getTotalSignatureCount();
      expect(newSigCount).to.equal(initialSigCount + 1n);
    });
  });
});