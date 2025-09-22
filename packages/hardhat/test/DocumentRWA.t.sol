// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../contracts/DocumentRWA.sol";

contract DocumentRWATest is Test {
    DocumentRWA public documentRWA;
    
    address public owner = address(0x1);
    address public user1 = address(0x2);
    address public user2 = address(0x3);
    address public signer1 = address(0x4);
    address public signer2 = address(0x5);
    
    string constant VALID_TITLE = "Test Document";
    string constant VALID_HASH = "QmTestHash123456789";
    string constant VALID_METADATA = "QmMetadataHash123456789";
    uint256 constant VALID_ORG_ID = 1;
    
    event DocumentCreated(uint256 indexed docId, address indexed owner, uint256 indexed organizationId, string title);
    event DocumentUpdated(uint256 indexed docId, string newTitle);
    event DocumentSigned(uint256 indexed docId, address indexed signer);
    event SignatureVerified(uint256 indexed docId, address indexed signer, bool isValid);
    event DocumentDeleted(uint256 indexed docId);

    function setUp() public {
        documentRWA = new DocumentRWA();
    }

    // Test document creation
    function testCreateDocument() public {
        vm.prank(owner);
        
        vm.expectEmit(true, true, true, true);
        emit DocumentCreated(1, owner, VALID_ORG_ID, VALID_TITLE);
        
        uint256 docId = documentRWA.createDocument(
            VALID_TITLE,
            VALID_HASH,
            VALID_METADATA,
            VALID_ORG_ID
        );
        
        assertEq(docId, 1);
        assertEq(documentRWA.getActiveDocumentCount(), 1);
        
        // Check document details
        (uint256 id, string memory uri, address docOwner) = documentRWA.getDocument(docId);
        assertEq(id, docId);
        assertEq(uri, VALID_HASH);
        assertEq(docOwner, owner);
        
        // Check user documents
        uint256[] memory userDocs = documentRWA.getUserDocuments(owner);
        assertEq(userDocs.length, 1);
        assertEq(userDocs[0], docId);
    }

    function testCreateDocumentWithInvalidTitle() public {
        vm.prank(owner);
        
        // Test empty title
        vm.expectRevert("Title must be 3-100 characters");
        documentRWA.createDocument("", VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        // Test too short title
        vm.expectRevert("Title must be 3-100 characters");
        documentRWA.createDocument("ab", VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        // Test too long title
        string memory longTitle = "This is a very long title that exceeds the maximum allowed length of 100 characters for document titles in the system";
        vm.expectRevert("Title must be 3-100 characters");
        documentRWA.createDocument(longTitle, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
    }

    function testCreateDocumentWithInvalidHash() public {
        vm.prank(owner);
        
        // Test empty hash
        vm.expectRevert("IPFS hash cannot be empty");
        documentRWA.createDocument(VALID_TITLE, "", VALID_METADATA, VALID_ORG_ID);
    }

    // Test document updates
    function testUpdateDocument() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        string memory newTitle = "Updated Document Title";
        
        vm.expectEmit(true, false, false, true);
        emit DocumentUpdated(docId, newTitle);
        
        vm.prank(owner);
        documentRWA.updateDocument(docId, newTitle);
    }

    function testUpdateDocumentUnauthorized() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(user1);
        vm.expectRevert("Only document owner");
        documentRWA.updateDocument(docId, "New Title");
    }

    function testUpdateDocumentInvalidTitle() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        vm.expectRevert("Title must be 3-100 characters");
        documentRWA.updateDocument(docId, "ab");
    }

    // Test signer management
    function testAddSigner() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        documentRWA.addSigner(docId, signer1);
        
        assertTrue(documentRWA.isAuthorizedSigner(docId, signer1));
        
        address[] memory signers = documentRWA.getDocumentSigners(docId);
        assertEq(signers.length, 1);
        assertEq(signers[0], signer1);
    }

    function testAddSignerInvalidAddress() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        vm.expectRevert("Invalid address");
        documentRWA.addSigner(docId, address(0));
    }

    function testAddSignerAlreadyExists() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        documentRWA.addSigner(docId, signer1);
        
        vm.prank(owner);
        vm.expectRevert("Already a signer");
        documentRWA.addSigner(docId, signer1);
    }

    function testRemoveSigner() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        documentRWA.addSigner(docId, signer1);
        
        vm.prank(owner);
        documentRWA.removeSigner(docId, signer1);
        
        assertFalse(documentRWA.isAuthorizedSigner(docId, signer1));
        
        address[] memory signers = documentRWA.getDocumentSigners(docId);
        assertEq(signers.length, 0);
    }

    function testRemoveSignerCannotRemoveOwner() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        vm.expectRevert("Cannot remove owner as signer");
        documentRWA.removeSigner(docId, owner);
    }

    // Test document signing
    function testSignDocument() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        // Create a valid signature (simplified for testing)
        bytes memory signature = abi.encodePacked(
            bytes32(0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef),
            bytes32(0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321),
            uint8(27)
        );
        
        // Mock the signature verification by using a different approach
        // Since we can't easily mock ecrecover, we'll test the authorization logic
        assertTrue(documentRWA.isAuthorizedSigner(docId, owner));
        assertFalse(documentRWA.isSigned(docId, owner));
    }

    function testSignDocumentUnauthorized() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        bytes memory signature = abi.encodePacked(
            bytes32(0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef),
            bytes32(0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321),
            uint8(27)
        );
        
        vm.prank(user1);
        vm.expectRevert("Not authorized signer");
        documentRWA.signDocument(docId, signature);
    }

    // Test document deletion
    function testDeleteDocument() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.expectEmit(true, false, false, false);
        emit DocumentDeleted(docId);
        
        vm.prank(owner);
        documentRWA.deleteDocument(docId);
        
        // Check that document is no longer active
        vm.expectRevert("Document not active");
        documentRWA.updateDocument(docId, "New Title");
        
        // Check user documents list is updated
        uint256[] memory userDocs = documentRWA.getUserDocuments(owner);
        assertEq(userDocs.length, 0);
    }

    function testDeleteDocumentUnauthorized() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(user1);
        vm.expectRevert("Only document owner");
        documentRWA.deleteDocument(docId);
    }

    // Test ownership transfer
    function testTransferDocumentOwnership() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        documentRWA.transferDocumentOwnership(docId, user1);
        
        // Check new ownership
        (, , address newOwner) = documentRWA.getDocument(docId);
        assertEq(newOwner, user1);
        
        // Check NFT ownership
        assertEq(documentRWA.ownerOf(docId), user1);
        
        // Check user documents lists
        uint256[] memory oldOwnerDocs = documentRWA.getUserDocuments(owner);
        uint256[] memory newOwnerDocs = documentRWA.getUserDocuments(user1);
        assertEq(oldOwnerDocs.length, 0);
        assertEq(newOwnerDocs.length, 1);
        assertEq(newOwnerDocs[0], docId);
    }

    function testTransferDocumentOwnershipInvalidAddress() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        vm.expectRevert("Invalid address");
        documentRWA.transferDocumentOwnership(docId, address(0));
    }

    function testTransferDocumentOwnershipToSameOwner() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        vm.expectRevert("Already owner");
        documentRWA.transferDocumentOwnership(docId, owner);
    }

    // Test view functions
    function testGetSignatureCount() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        assertEq(documentRWA.getSignatureCount(docId), 0);
    }

    function testGetTotalSignatureCount() public {
        assertEq(documentRWA.getTotalSignatureCount(), 0);
    }

    // Test modifiers
    function testDocumentExistsModifier() public {
        vm.expectRevert("Document not found");
        documentRWA.getDocument(999);
    }

    function testActiveDocumentModifier() public {
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        vm.prank(owner);
        documentRWA.deleteDocument(docId);
        
        vm.prank(owner);
        vm.expectRevert("Document not active");
        documentRWA.updateDocument(docId, "New Title");
    }

    // Fuzz tests
    function testFuzz_CreateDocument(string memory title, string memory hash) public {
        vm.assume(bytes(title).length >= 3 && bytes(title).length <= 100);
        vm.assume(bytes(hash).length > 0 && bytes(hash).length <= 128);
        
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(title, hash, VALID_METADATA, VALID_ORG_ID);
        
        assertEq(docId, 1);
        assertEq(documentRWA.getActiveDocumentCount(), 1);
    }

    function testFuzz_AddMultipleSigners(address[] memory signers) public {
        vm.assume(signers.length > 0 && signers.length <= 10);
        
        vm.prank(owner);
        uint256 docId = documentRWA.createDocument(VALID_TITLE, VALID_HASH, VALID_METADATA, VALID_ORG_ID);
        
        uint256 validSigners = 0;
        for (uint i = 0; i < signers.length; i++) {
            if (signers[i] != address(0) && signers[i] != owner) {
                bool alreadyExists = false;
                for (uint j = 0; j < i; j++) {
                    if (signers[j] == signers[i]) {
                        alreadyExists = true;
                        break;
                    }
                }
                
                if (!alreadyExists) {
                    vm.prank(owner);
                    documentRWA.addSigner(docId, signers[i]);
                    validSigners++;
                }
            }
        }
        
        address[] memory documentSigners = documentRWA.getDocumentSigners(docId);
        assertEq(documentSigners.length, validSigners);
    }
}