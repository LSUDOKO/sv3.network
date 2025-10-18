# Version History Retrieval Implementation

## Overview
This document describes the implementation of version history retrieval functionality for the DocumentRWA smart contract as part of the Smart Contract Enhancements section.

## Task Reference
- **Task**: Add Version History Retrieval
- **Section**: Smart Contract Enhancements
- **Priority**: MEDIUM
- **Difficulty**: Low-Medium
- **Files Modified**:
  - `packages/foundry/src/DocumentRWA.sol`
  - `packages/hardhat/contracts/DocumentRWA.sol`

## Implementation Details

### 1. Data Structures Added

#### DocumentVersion Struct
```solidity
struct DocumentVersion {
    uint256 versionNumber;        // Version number (1, 2, 3, ...)
    string title;                 // Document title at this version
    string contentHash;           // IPFS content hash at this version
    string metadataHash;          // IPFS metadata hash at this version
    address modifiedBy;           // Address that created this version
    uint256 timestamp;            // Version creation timestamp
    string changeDescription;     // Description of changes made
}
```

#### Storage Mappings
- `mapping(uint256 => DocumentVersion[]) public documentVersions` - Maps document ID to array of versions
- Added `currentVersion` field to the `Document` struct to track the current version number

### 2. Events Added

#### VersionCreated Event
```solidity
event VersionCreated(
    uint256 indexed docId,
    uint256 indexed versionNumber,
    address indexed modifiedBy,
    string changeDescription
);
```

### 3. Error Definitions Added

```solidity
error VersionNotFound();
error InvalidPagination();
```

### 4. Functions Implemented

#### Core Retrieval Functions

##### `getVersionHistory(uint256 docId, uint256 offset, uint256 limit)`
- **Purpose**: Retrieve version history with pagination support
- **Parameters**:
  - `docId`: Document ID to query
  - `offset`: Starting index for pagination (0-based)
  - `limit`: Maximum number of versions to return
- **Returns**: 
  - `versions`: Array of DocumentVersion structs
  - `totalCount`: Total number of versions available
- **Features**:
  - Pagination support for efficient data retrieval
  - Validates pagination parameters
  - Returns versions in chronological order (oldest first)

##### `getAllVersionHistory(uint256 docId)`
- **Purpose**: Retrieve all versions without pagination
- **Parameters**: `docId` - Document ID
- **Returns**: Complete array of all document versions
- **Use Case**: For documents with few versions or when full history is needed

##### `getVersionCount(uint256 docId)`
- **Purpose**: Get total number of versions for a document
- **Parameters**: `docId` - Document ID
- **Returns**: Total version count
- **Use Case**: Useful for implementing pagination in frontend

##### `getSpecificVersion(uint256 docId, uint256 versionNumber)`
- **Purpose**: Retrieve a specific version by version number
- **Parameters**:
  - `docId`: Document ID
  - `versionNumber`: Version number to retrieve (1-based indexing)
- **Returns**: The requested DocumentVersion struct
- **Validation**: 
  - Version number must be > 0
  - Version number must exist

##### `getLatestVersion(uint256 docId)`
- **Purpose**: Retrieve the most recent version of a document
- **Parameters**: `docId` - Document ID
- **Returns**: Latest DocumentVersion struct
- **Use Case**: Quick access to current state without querying full history

##### `getVersionHistoryReverse(uint256 docId, uint256 offset, uint256 limit)`
- **Purpose**: Retrieve version history in reverse chronological order (latest first)
- **Parameters**:
  - `docId`: Document ID
  - `offset`: Starting index from the end (0 = latest)
  - `limit`: Maximum number of versions to return
- **Returns**:
  - `versions`: Array of DocumentVersion structs in reverse order
  - `totalCount`: Total number of versions available
- **Use Case**: Most common use case where users want to see recent changes first

#### Version Creation Function

##### `createNewVersion(uint256 docId, string newTitle, string newContentHash, string newMetadataHash, string changeDescription)`
- **Purpose**: Create a new version when document is updated
- **Access Control**: Only document owner
- **Parameters**:
  - `docId`: Document ID
  - `newTitle`: New document title
  - `newContentHash`: New IPFS content hash
  - `newMetadataHash`: New IPFS metadata hash
  - `changeDescription`: Description of changes made
- **Actions**:
  - Increments version number
  - Updates document fields
  - Creates new version entry in history
  - Emits `VersionCreated` and `DocumentUpdated` events
- **Validation**:
  - Title length (3-100 characters)
  - IPFS hash validation
  - Document must exist and be active

### 5. Integration with Existing Functions

#### Document Creation
Modified `createDocument()` to:
- Initialize `currentVersion` to 1
- Create initial version entry with "Initial version" description
- Store version in `documentVersions` mapping

### 6. Key Features

#### Immutable Version History
- All versions are stored permanently on-chain
- Each version captures complete document state at that point in time
- Includes metadata about who made changes and when

#### Efficient Pagination
- Both forward and reverse pagination supported
- Prevents excessive gas costs for documents with many versions
- Returns total count for implementing UI pagination controls

#### Comprehensive Tracking
- Tracks who modified each version
- Timestamps for each version
- Change descriptions for audit trail
- Version numbers for easy reference

## Usage Examples

### Frontend Integration Example

```javascript
// Get latest 10 versions (most recent first)
const { versions, totalCount } = await contract.getVersionHistoryReverse(docId, 0, 10);

// Get version count for pagination
const versionCount = await contract.getVersionCount(docId);

// Get specific version
const version5 = await contract.getSpecificVersion(docId, 5);

// Get latest version
const latest = await contract.getLatestVersion(docId);

// Create new version
await contract.createNewVersion(
  docId,
  "Updated Contract Terms",
  "QmNewContentHash...",
  "QmNewMetadataHash...",
  "Updated payment terms in section 3"
);
```

### Pagination Example

```javascript
// Display versions in pages of 10
const pageSize = 10;
const totalVersions = await contract.getVersionCount(docId);
const totalPages = Math.ceil(totalVersions / pageSize);

// Get page 2 (latest first)
const page = 2;
const offset = (page - 1) * pageSize;
const { versions } = await contract.getVersionHistoryReverse(docId, offset, pageSize);
```

## Gas Optimization Considerations

1. **Pagination**: Prevents loading entire version history in single call
2. **View Functions**: All retrieval functions are `view` - no gas cost for queries
3. **Storage Efficiency**: Uses array storage for sequential access
4. **Indexed Events**: Version events are indexed for efficient filtering

## Security Considerations

1. **Access Control**: Version creation restricted to document owner
2. **Validation**: All inputs validated before creating versions
3. **Immutability**: Version history cannot be modified once created
4. **Existence Checks**: All functions validate document exists

## Testing Recommendations

### Unit Tests to Implement
1. Test version creation on document creation
2. Test `createNewVersion()` functionality
3. Test pagination with various offset/limit combinations
4. Test reverse pagination
5. Test edge cases (empty versions, invalid pagination)
6. Test version number validation
7. Test access control on version creation
8. Test event emission

### Integration Tests
1. Test full document lifecycle with multiple versions
2. Test version retrieval after multiple updates
3. Test pagination across large version histories

## Acceptance Criteria

✅ **Version History Retrieval**: Implemented
- ✅ Functions to retrieve document version history
- ✅ Pagination support for efficient data retrieval
- ✅ Multiple retrieval methods (all, paginated, specific, latest, reverse)

✅ **Data Structures**: Implemented
- ✅ DocumentVersion struct with comprehensive fields
- ✅ Storage mapping for version history
- ✅ Version tracking in Document struct

✅ **Events**: Implemented
- ✅ VersionCreated event for tracking version creation

✅ **Both Contracts Updated**: Implemented
- ✅ Foundry contract updated
- ✅ Hardhat contract updated

## Future Enhancements

Potential improvements that could be added later:
1. Version comparison functionality (see task: "Implement Version Comparison")
2. Version rollback capability
3. Version tags/labels for important milestones
4. Version approval workflow
5. Compressed version storage for gas optimization
6. Off-chain version storage with on-chain verification

## Related Tasks

This implementation completes the "Add Version History Retrieval" task and provides foundation for:
- **Implement Version Comparison** (next task in Document Versioning System)
- Version-based access control
- Audit trail functionality
- Document compliance tracking

## Notes

- Version numbers are 1-based (starting from 1, not 0) for better user experience
- Array indices are 0-based internally but converted for external API
- Initial document creation automatically creates version 1
- Change descriptions are required for audit trail
- All version data is stored on-chain for immutability and transparency
