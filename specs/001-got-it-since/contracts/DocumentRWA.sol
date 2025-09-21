// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DocumentRWA
 * @dev Manages documents as RWA (Real World Asset) NFTs for sv3.network
 * Handles document creation, signature management, and NFT functionality
 */
contract DocumentRWA is ERC721, ERC721URIStorage, Ownable {
    struct Document {
        uint256 id;                    // Unique document ID (NFT token ID)
        address owner;                // Document owner wallet address
        uint256 organizationId;       // Parent organization ID
        string title;                 // Document title
        string contentHash;           // IPFS content hash (SHA256)
        string metadataHash;          // IPFS metadata hash
        address[] signers;            // List of authorized signers
        mapping(address => bool) signatures; // <-- Critical: Stores signers per document
        // mapping(address => bool) signatures; // Signature tracking
        uint256 createdAt;            // Creation timestamp
        uint256 lastModified;         // Last modification timestamp
        bool isActive;                // Document status
    }
    mapping(uint256 => mapping(address => bool)) public docApprovers;
    mapping(uint256 => Document) public documents;
    mapping(address => uint256[]) public userDocuments;

    uint256 public documentCount;
    uint256 public signatureCount;

    event DocumentCreated(uint256 indexed docId, address indexed owner, uint256 indexed orgId, string title);
    event DocumentUpdated(uint256 indexed docId, string newTitle);
    event DocumentSigned(uint256 indexed docId, address indexed signer);
    event SignatureVerified(uint256 indexed docId, address indexed signer, bool isValid);
    event DocumentDeleted(uint256 indexed docId);

    error DocumentNotFound();
    error Unauthorized();
    error InvalidIPFSHash();
    error AlreadySigned();
    error NotAuthorizedSigner();
    error OrganizationNotFound();
    error InvalidDocumentTitle();

    modifier onlyDocumentOwner(uint256 docId) {
        require(documents[docId].owner == msg.sender, "Only document owner");
        _;
    }

    modifier documentExists(uint256 docId) {
        require(documents[docId].id != 0, "Document not found");
        _;
    }

    modifier activeDocument(uint256 docId) {
        require(documents[docId].isActive, "Document is not active");
        _;
    }

    constructor(address initialOwner)
        ERC721("DocumentRWA", "DRWA") // Example: Name and Symbol for ERC721
        Ownable(initialOwner)        // Pass initialOwner to Ownable
    {}

    /**
     * @dev Create a new document as NFT
     * @param organizationId Parent organization ID
     * @param title Document title
     * @param contentHash IPFS content hash
     * @param metadataHash IPFS metadata hash
     */
    function createDocument(
        uint256 organizationId,
        string memory title,
        string memory contentHash,
        string memory metadataHash
    ) external {
        require(bytes(title).length >= 3 && bytes(title).length <= 100, "Title must be 3-100 characters");
        _validateIPFSHash(contentHash);
        _validateIPFSHash(metadataHash);

        documentCount++;
        uint256 docId = documentCount;

        Document storage doc = documents[docId];
        doc.id = docId;
        doc.owner = msg.sender;
        doc.organizationId = organizationId;
        doc.title = title;
        doc.contentHash = contentHash;
        doc.metadataHash = metadataHash;
        doc.createdAt = block.timestamp;
        doc.lastModified = block.timestamp;
        doc.isActive = true;

        // Mint NFT to document owner
        _mint(msg.sender, docId);
        _setTokenURI(docId, metadataHash);

        // Add to user's documents
        userDocuments[msg.sender].push(docId);

        emit DocumentCreated(docId, msg.sender, organizationId, title);
    }

    /**
     * @dev Update document details
     * @param docId Document ID
     * @param newTitle New document title
     */
    function updateDocument(uint256 docId, string memory newTitle) external
        onlyDocumentOwner(docId)
        documentExists(docId)
        activeDocument(docId)
    {
        require(bytes(newTitle).length >= 3 && bytes(newTitle).length <= 100, "Title must be 3-100 characters");

        documents[docId].title = newTitle;
        documents[docId].lastModified = block.timestamp;

        emit DocumentUpdated(docId, newTitle);
    }

    /**
     * @dev Add authorized signer to document
     * @param docId Document ID
     * @param signer Signer wallet address
     */
    function addSigner(uint256 docId, address signer) external
        onlyDocumentOwner(docId)
        documentExists(docId)
        activeDocument(docId)
    {
        require(signer != address(0), "Invalid address");
        require(!documents[docId].signatures[signer], "Already a signer");

        documents[docId].signers.push(signer);
    }

    /**
     * @dev Remove signer from document
     * @param docId Document ID
     * @param signer Signer wallet address
     */
    function removeSigner(uint256 docId, address signer) external
        onlyDocumentOwner(docId)
        documentExists(docId)
        activeDocument(docId)
    {
        require(signer != documents[docId].owner, "Cannot remove owner as signer");
        require(documents[docId].signatures[signer], "Not a signer");

        // Remove from signers array
        Document storage doc = documents[docId];
        for (uint i = 0; i < doc.signers.length; i++) {
            if (doc.signers[i] == signer) {
                doc.signers[i] = doc.signers[doc.signers.length - 1];
                doc.signers.pop();
                break;
            }
        }

        // Remove signature if exists
        if (doc.signatures[signer]) {
            doc.signatures[signer] = false;
            signatureCount--;
        }
    }

    /**
     * @dev Sign a document
     * @param docId Document ID
     * @param signatureData ECDSA signature data
     */
    function signDocument(uint256 docId, bytes memory signatureData) external
        documentExists(docId)
        activeDocument(docId)
    {
        require(_isAuthorizedSigner(docId, msg.sender), "Not authorized signer");
        require(!documents[docId].signatures[msg.sender], "Already signed");

        // Verify signature
        bytes32 messageHash = keccak256(abi.encodePacked(docId, msg.sender, block.timestamp));
        address recoveredSigner = _recoverSigner(messageHash, signatureData);

        require(recoveredSigner == msg.sender, "Invalid signature");

        documents[docId].signatures[msg.sender] = true;
        documents[docId].lastModified = block.timestamp;
        signatureCount++;

        emit DocumentSigned(docId, msg.sender);
        emit SignatureVerified(docId, msg.sender, true);
    }

    /**
     * @dev Delete document (owner only)
     * @param docId Document ID
     */
    function deleteDocument(uint256 docId) external onlyDocumentOwner(docId) documentExists(docId) {
        Document storage doc = documents[docId];
        doc.isActive = false;
        doc.lastModified = block.timestamp;

        // Burn NFT
        _burn(docId);

        // Remove from user's documents
        _removeFromUserDocuments(msg.sender, docId);

        emit DocumentDeleted(docId);
    }

    /**
     * @dev Get document details
     */
    function getDocument(uint256 docId)
    external
    view
    documentExists(docId)
    returns (
        uint256 id,
        string memory uri,
        address owner
    )
        {
            Document storage doc = documents[docId];
            return (doc.id, doc.contentHash, doc.owner);
        }

    /**
     * @dev Check if document is signed by address
     */
    function isSigned(uint256 docId, address signer) external view documentExists(docId) returns (bool) {
        return documents[docId].signatures[signer];
    }

    /**
     * @dev Get document signers
     */
    function getDocumentSigners(uint256 docId) external view documentExists(docId) returns (address[] memory) {
        return documents[docId].signers;
    }

    /**
     * @dev Get signature count for document
     */
    function getSignatureCount(uint256 docId) external view documentExists(docId) returns (uint256) {
        uint256 count = 0;
        Document storage doc = documents[docId];
        for (uint i = 0; i < doc.signers.length; i++) {
            if (doc.signatures[doc.signers[i]]) {
                count++;
            }
        }
        return count;
    }

    /**
     * @dev Get user's documents
     */
    function getUserDocuments(address user) external view returns (uint256[] memory) {
        return userDocuments[user];
    }

    /**
     * @dev Check if user is authorized signer
     */
    function isAuthorizedSigner(uint256 docId, address signer) external view documentExists(docId) returns (bool) {
        return _isAuthorizedSigner(docId, signer);
    }

    /**
     * @dev Internal function to validate IPFS hash
     */
    function _validateIPFSHash(string memory hash) internal pure {
        bytes memory hashBytes = bytes(hash);
        require(hashBytes.length > 0, "IPFS hash cannot be empty");
        require(hashBytes.length <= 128, "IPFS hash too long");
        // Additional validation can be added for CID format
    }

    /**
     * @dev Internal function to check if user is authorized signer
     */
    function _isAuthorizedSigner(uint256 docId, address signer) internal view returns (bool) {
        Document storage doc = documents[docId];

        // Owner can always sign
        if (signer == doc.owner) return true;

        // Check if in authorized signers list
        for (uint i = 0; i < doc.signers.length; i++) {
            if (doc.signers[i] == signer) return true;
        }

        return false;
    }

    /**
     * @dev Internal function to recover signer from signature
     */
    function _recoverSigner(bytes32 messageHash, bytes memory signatureData) internal pure returns (address) {
        require(signatureData.length == 65, "Invalid signature length");

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            r := mload(add(signatureData, 32))
            s := mload(add(signatureData, 64))
            v := byte(0, mload(add(signatureData, 96)))
        }

        if (v < 27) {
            v += 27;
        }

        require(v == 27 || v == 28, "Invalid signature version");

        return ecrecover(messageHash, v, r, s);
    }

    /**
     * @dev Internal function to remove document from user's list
     */
    function _removeFromUserDocuments(address user, uint256 docId) internal {
        uint256[] storage userDocs = userDocuments[user];
        for (uint i = 0; i < userDocs.length; i++) {
            if (userDocs[i] == docId) {
                userDocs[i] = userDocs[userDocs.length - 1];
                userDocs.pop();
                break;
            }
        }
    }

    /**
     * @dev Transfer document ownership
     */
    function transferDocumentOwnership(uint256 docId, address newOwner) external
        onlyDocumentOwner(docId)
        documentExists(docId)
        activeDocument(docId)
    {
        require(newOwner != address(0), "Invalid address");
        require(newOwner != documents[docId].owner, "Already owner");

        address oldOwner = documents[docId].owner;
        documents[docId].owner = newOwner;
        documents[docId].lastModified = block.timestamp;

        // Transfer NFT
        _transfer(oldOwner, newOwner, docId);

        // Update user document lists
        _removeFromUserDocuments(oldOwner, docId);
        userDocuments[newOwner].push(docId);
    }

    /**
     * @dev Get active documents count
     */
    function getActiveDocumentCount() external view returns (uint256) {
        return documentCount;
    }

    /**
     * @dev Get total signatures count
     */
    function getTotalSignatureCount() external view returns (uint256) {
        return signatureCount;
    }

    // Override required by Solidity
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}