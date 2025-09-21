# Phase 1 Data Model: sv3.network - Web3-Native SignVault Implementation

## Entity Relationships

### Core Entities Overview
```
User (1) ←→ (N) Organization (1) ←→ (N) Document (1) ←→ (N) Signature
   ↓                     ↓                    ↓                    ↓
Profile            OrganizationMembers     DocumentOwner       SignerInfo
```

## 1. User Profile Entity

### Smart Contract Structure
```solidity
contract UserProfile {
    struct Profile {
        address wallet;              // Primary key - user's wallet address
        string username;             // Unique username for display
        string email;                // Optional email for notifications
        string linkedinProfile;       // Optional LinkedIn profile
        bool verified;               // Verification status
        uint256 createdAt;          // Timestamp when profile was created
        mapping(string => string) customData; // Additional profile data
    }

    mapping(address => Profile) public profiles;
    mapping(string => address) public usernameToAddress;
}
```

### Frontend Interface
```typescript
interface UserProfile {
    wallet: string;           // Ethereum address
    username: string;        // Display name
    email?: string;          // Optional contact email
    linkedinProfile?: string; // Optional professional profile
    verified: boolean;       // Account verification status
    createdAt: Date;         // Profile creation date
    customData: Record<string, string>; // Additional metadata
}
```

### Validation Rules
- **wallet**: Must be valid Ethereum address, required
- **username**: 3-30 characters, alphanumeric + underscores, unique
- **email**: Valid email format if provided
- **linkedinProfile**: Valid LinkedIn URL if provided
- **verified**: Default false, set by verification process

### State Transitions
```
Unverified → Verified (via verification process)
```

## 2. Organization Entity

### Smart Contract Structure
```solidity
contract Organization {
    struct Org {
        uint256 id;                    // Unique organization ID
        address owner;                // Creator/owner wallet address
        string name;                  // Organization display name
        string description;           // Organization description
        address[] members;             // List of member addresses
        mapping(address => uint256) memberRoles; // Role mapping (0=owner, 1=admin, 2=member)
        uint256 createdAt;            // Creation timestamp
    }

    mapping(uint256 => Org) public organizations;
    mapping(address => uint256[]) public userOrganizations;
}
```

### Frontend Interface
```typescript
interface Organization {
    id: string;              // Unique organization identifier
    owner: string;           // Owner's wallet address
    name: string;            // Display name
    description: string;     // Organization description
    members: string[];       // Member wallet addresses
    memberRoles: Record<string, number>; // Role assignments
    createdAt: Date;        // Creation date
}
```

### Role Definitions
- **0 (Owner)**: Full control, can add/remove members, delete organization
- **1 (Admin)**: Can manage members and documents
- **2 (Member)**: Can view and sign documents

### Validation Rules
- **name**: 3-50 characters, required
- **description**: Max 500 characters
- **owner**: Must be valid wallet address, required
- **members**: Array of valid wallet addresses
- **memberRoles**: Valid role numbers (0-2)

### State Transitions
```
Created → Active → Deleted
         ↓
    Members Added/Removed
```

## 3. Document Entity (RWA NFT)

### Smart Contract Structure
```solidity
contract DocumentRWA is ERC721 {
    struct Document {
        uint256 id;                    // Unique document ID (NFT token ID)
        address owner;                // Document owner wallet address
        uint256 organizationId;       // Parent organization ID
        string title;                 // Document title
        string contentHash;           // IPFS content hash (SHA256)
        string metadataHash;          // IPFS metadata hash
        address[] signers;            // List of signer addresses
        mapping(address => bool) signatures; // Signature tracking
        uint256 createdAt;            // Creation timestamp
        uint256 lastModified;         // Last modification timestamp
    }

    mapping(uint256 => Document) public documents;
    mapping(address => uint256[]) public userDocuments;
}
```

### Frontend Interface
```typescript
interface Document {
    id: string;              // NFT token ID
    owner: string;           // Owner's wallet address
    organizationId: string;   // Parent organization
    title: string;           // Document title
    contentHash: string;     // IPFS content hash
    metadataHash: string;    // IPFS metadata hash
    signers: string[];       // Authorized signers
    signatures: Record<string, boolean>; // Signature status
    createdAt: Date;         // Creation date
    lastModified: Date;     // Last modification date
}
```

### IPFS Metadata Structure
```json
{
  "name": "Document Title",
  "description": "Document description",
  "image": "ipfs://Qm...", // Optional preview image
  "attributes": [
    {
      "trait_type": "Organization",
      "value": "Organization Name"
    },
    {
      "trait_type": "Created",
      "value": "2025-09-20"
    },
    {
      "trait_type": "Signatures Required",
      "value": 3
    }
  ]
}
```

### Validation Rules
- **title**: 3-100 characters, required
- **contentHash**: Valid IPFS hash (CID), required
- **metadataHash**: Valid IPFS hash (CID), required
- **owner**: Valid wallet address, required
- **organizationId**: Valid organization ID, required
- **signers**: Array of valid wallet addresses

### State Transitions
```
Draft → Created → Pending Signatures → Fully Signed → Archived
        ↓
    Modified
```

## 4. Signature Entity

### Smart Contract Structure
```solidity
contract DocumentRWA {
    struct Signature {
        address signer;          // Signer's wallet address
        uint256 documentId;      // Document ID being signed
        uint256 timestamp;       // Signature timestamp
        bytes signatureData;     // ECDSA signature data
        bool isValid;           // Signature validity status
    }

    mapping(uint256 => Signature[]) public documentSignatures;
    mapping(address => uint256[]) public userSignatures;
}
```

### Frontend Interface
```typescript
interface Signature {
    signer: string;           // Signer's wallet address
    documentId: string;      // Document ID
    timestamp: Date;         // Signature timestamp
    signatureData: string;   // Signature data (hex)
    isValid: boolean;        // Validity status
}
```

### Validation Rules
- **signer**: Valid wallet address, must be in document signers list
- **documentId**: Valid document ID
- **signatureData**: Valid ECDSA signature
- **timestamp**: Must be after document creation

### State Transitions
```
Pending → Signed → Verified → Invalid (if revoked)
```

## 5. Event Definitions

### UserProfile Events
```solidity
event ProfileCreated(address indexed wallet, string username);
event ProfileUpdated(address indexed wallet, string field, string value);
event ProfileVerified(address indexed wallet);
```

### Organization Events
```solidity
event OrganizationCreated(uint256 indexed orgId, address indexed owner, string name);
event MemberAdded(uint256 indexed orgId, address indexed member, uint256 role);
event MemberRemoved(uint256 indexed orgId, address indexed member);
event OrganizationDeleted(uint256 indexed orgId);
```

### Document Events
```solidity
event DocumentCreated(uint256 indexed docId, address indexed owner, uint256 indexed orgId, string title);
event DocumentUpdated(uint256 indexed docId, string newTitle);
event DocumentSigned(uint256 indexed docId, address indexed signer);
event SignatureVerified(uint256 indexed docId, address indexed signer, bool isValid);
```

## 6. Access Control Matrix

| Entity | Create | Read | Update | Delete | Sign |
|--------|--------|------|--------|--------|------|
| Owner | ✅ | ✅ | ✅ | ✅ | ✅ |
| Admin | ✅ | ✅ | ✅ | ❌ | ✅ |
| Member | ❌ | ✅ | ❌ | ❌ | ✅ |
| Public | ❌ | ✅* | ❌ | ❌ | ❌ |

*Public read access to NFT metadata only

## 7. Data Flow Patterns

### Document Creation Flow
```
1. User creates organization (if not exists)
2. User uploads document to IPFS → contentHash
3. User creates metadata → metadataHash
4. User calls createDocument() with hashes
5. Contract mints NFT, stores metadata
6. Contract emits DocumentCreated event
```

### Document Signing Flow
```
1. User requests to sign document
2. Frontend checks if user is authorized signer
3. User signs message with wallet
4. Frontend calls signDocument() with signature
5. Contract verifies signature, records it
6. Contract emits DocumentSigned event
7. UI updates in real-time
```

### Organization Management Flow
```
1. Owner creates organization
2. Owner adds members with roles
3. Members can view organization documents
4. Admins can manage organization settings
```

## 8. Error Handling Patterns

### Smart Contract Errors
```solidity
error Unauthorized();               // User not authorized
error InvalidAddress();             // Invalid Ethereum address
error OrganizationNotFound();       // Organization doesn't exist
error DocumentNotFound();          // Document doesn't exist
error AlreadySigned();             // Document already signed
error InvalidSignature();          // Signature verification failed
error IPFSHashInvalid();           // Invalid IPFS hash format
```

### Frontend Error Handling
```typescript
interface AppError {
    code: string;           // Error code
    message: string;        // User-friendly message
    details?: any;          // Technical details
    recoverable: boolean;    // Can user recover from this?
}
```

## 9. Performance Considerations

### Gas Optimization
- Use events instead of storage for historical data
- Minimize state changes in loops
- Use efficient data types
- Batch operations where possible

### Storage Optimization
- Store only essential data on-chain
- Use IPFS for large content
- Use content-addressed storage
- Implement pagination for large datasets

### Query Optimization
- Use indexed events for filtering
- Implement client-side caching
- Use efficient data structures
- Minimize contract calls for UI updates

This data model provides a comprehensive foundation for implementing sv3.network as a web3-native document management system with proper separation of concerns, validation rules, and clear state management.