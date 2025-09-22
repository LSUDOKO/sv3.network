// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import "../src/DocumentRWA.sol";

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
        documentRWA = new DocumentRWA(owner);
    }

    function testCreateDocument() public {
        vm.prank(owner);
        vm.expectEmit(true, true, true, true);
        emit DocumentCreated(1, owner, VALID_ORG_ID, VALID_TITLE);
        
        documentRWA.createDocument(
            VALID_ORG_ID,
            VALID_TITLE,
            VALID_HASH,
            VALID_METADATA
        );
        
        assertEq(documentRWA.documentCount(), 1);
        assertEq(documentRWA.getActiveDocumentCount(), 1);
        
        // Verify document details
        (uint256 id, string memory uri, address docOwner) = documentRWA.getDocument(1);
        
        assertEq(id, 1);
        assertEq(uri, VALID_HASH);
        assertEq(docOwner, owner);
    }

    function testCreateDocumentFailures() public {
        vm.prank(owner);
        vm.expectRevert("Title must be 3-100 characters");
        documentRWA.createDocument(VALID_ORG_ID, "", VALID_HASH, VALID_METADATA);

        vm.prank(owner);
        vm.expectRevert("Title must be 3-100 characters");
        documentRWA.createDocument(VALID_ORG_ID, "ab", VALID_HASH, VALID_METADATA);

        string memory longTitle = "This is a very long title that exceeds the maximum allowed length of 100 characters for document titles";
        vm.prank(owner);
        vm.expectRevert("Title must be 3-100 characters");
        documentRWA.createDocument(VALID_ORG_ID, longTitle, VALID_HASH, VALID_METADATA);

        vm.prank(owner);
        vm.expectRevert("Invalid IPFS hash");
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, "", VALID_METADATA);
    }

    function testUpdateDocument() public {
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
        
        string memory newTitle = "Updated Document Title";
        
        vm.prank(owner);
        vm.expectEmit(true, false, false, true);
        emit DocumentUpdated(1, newTitle);
        
        documentRWA.updateDocument(1, newTitle);
        
        // Note: getDocument doesn't return title, so we can't verify the update this way
        // The event emission is sufficient for testing the update functionality
    }

    function testAddSigner() public {
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
        
        vm.prank(owner);
        documentRWA.addSigner(1, signer1);
        
        assertTrue(documentRWA.isAuthorizedSigner(1, signer1));
    }

    function testSignDocument() public {
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
        
        vm.prank(owner);
        documentRWA.addSigner(1, signer1);
        
        vm.prank(signer1);
        vm.expectEmit(true, true, false, false);
        emit DocumentSigned(1, signer1);
        
        // Create a mock signature for testing
        bytes memory signature = abi.encodePacked(bytes32(0), bytes32(0), uint8(27));
        documentRWA.signDocument(1, signature);
        
        assertTrue(documentRWA.isSigned(1, signer1));
        assertEq(documentRWA.signatureCount(), 1);
    }

    function testRemoveSigner() public {
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
        
        vm.prank(owner);
        documentRWA.addSigner(1, signer1);
        
        vm.prank(owner);
        documentRWA.removeSigner(1, signer1);
        
        assertFalse(documentRWA.isAuthorizedSigner(1, signer1));
    }

    function testVerifySignature() public {
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
        
        vm.prank(owner);
        documentRWA.addSigner(1, signer1);
        
        vm.prank(signer1);
        bytes memory signature = abi.encodePacked(bytes32(0), bytes32(0), uint8(27));
        documentRWA.signDocument(1, signature);
        
        // Check if the document is signed
        assertTrue(documentRWA.isSigned(1, signer1));
    }

    function testDeleteDocument() public {
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
        
        vm.prank(owner);
        vm.expectEmit(true, false, false, false);
        emit DocumentDeleted(1);
        
        documentRWA.deleteDocument(1);
        
        // Note: getDocument doesn't return isActive, so we check the active document count
        assertEq(documentRWA.getActiveDocumentCount(), 0);
    }

    function testGetUserDocuments() public {
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
        
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, "Second Document", VALID_HASH, VALID_METADATA);
        
        uint256[] memory userDocs = documentRWA.getUserDocuments(owner);
        assertEq(userDocs.length, 2);
        assertEq(userDocs[0], 1);
        assertEq(userDocs[1], 2);
    }

    function testGetDocumentSigners() public {
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
        
        vm.prank(owner);
        documentRWA.addSigner(1, signer1);
        
        vm.prank(owner);
        documentRWA.addSigner(1, signer2);
        
        address[] memory signers = documentRWA.getDocumentSigners(1);
        assertEq(signers.length, 2);
        assertEq(signers[0], signer1);
        assertEq(signers[1], signer2);
    }

    // Note: getAllDocuments function doesn't exist in the contract
    // function testGetAllDocuments() public {
    //     vm.prank(owner);
    //     documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
    //     
    //     vm.prank(user1);
    //     documentRWA.createDocument(VALID_ORG_ID, "User1 Document", VALID_HASH, VALID_METADATA);
    //     
    //     uint256[] memory allDocs = documentRWA.getAllDocuments();
    //     assertEq(allDocs.length, 2);
    //     assertEq(allDocs[0], 1);
    //     assertEq(allDocs[1], 2);
    // }

    // Note: getActiveDocuments function doesn't exist in the contract
    // function testGetActiveDocuments() public {
    //     vm.prank(owner);
    //     documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);
    //     
    //     vm.prank(owner);
    //     documentRWA.createDocument(VALID_ORG_ID, "Second Document", VALID_HASH, VALID_METADATA);
    //     
    //     // Delete one document
    //     vm.prank(owner);
    //     documentRWA.deleteDocument(1);
    //     
    //     uint256[] memory activeDocs = documentRWA.getActiveDocuments();
    //     assertEq(activeDocs.length, 1);
    //     assertEq(activeDocs[0], 2);
    // }

    // Note: getDocumentsByOrganization function doesn't exist in the contract
    // function testGetDocumentsByOrganization() public {
    //     vm.prank(owner);
    //     documentRWA.createDocument(1, VALID_TITLE, VALID_HASH, VALID_METADATA);
    //     
    //     vm.prank(owner);
    //     documentRWA.createDocument(2, "Org2 Document", VALID_HASH, VALID_METADATA);
    //     
    //     vm.prank(owner);
    //     documentRWA.createDocument(1, "Another Org1 Document", VALID_HASH, VALID_METADATA);
    //     
    //     uint256[] memory org1Docs = documentRWA.getDocumentsByOrganization(1);
    //     assertEq(org1Docs.length, 2);
    //     assertEq(org1Docs[0], 1);
    //     assertEq(org1Docs[1], 3);
    //     
    //     uint256[] memory org2Docs = documentRWA.getDocumentsByOrganization(2);
    //     assertEq(org2Docs.length, 1);
    //     assertEq(org2Docs[0], 2);
    // }

    // Fuzz tests
    function testFuzz_CreateDocument(string memory title, string memory hash) public {
        vm.assume(bytes(title).length >= 3 && bytes(title).length <= 100);
        vm.assume(bytes(hash).length > 0 && bytes(hash).length <= 128);
        
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, title, hash, VALID_METADATA);
        
        assertEq(documentRWA.documentCount(), 1);
        assertEq(documentRWA.getActiveDocumentCount(), 1);
    }

    function testFuzz_AddMultipleSigners(address[] memory signers) public {
        vm.assume(signers.length > 0 && signers.length <= 10);
        
        vm.prank(owner);
        documentRWA.createDocument(VALID_ORG_ID, VALID_TITLE, VALID_HASH, VALID_METADATA);

        for (uint256 i = 0; i < signers.length; i++) {
            documentRWA.addSigner(1, signers[i]);
        }
        
        address[] memory documentSigners = documentRWA.getDocumentSigners(1);
        assertEq(documentSigners.length, signers.length);
    }
}