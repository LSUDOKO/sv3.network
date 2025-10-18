# Document Version History API Reference

## Quick Reference Guide for DocumentRWA Version History Functions

### Data Structure

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

## Read Functions (View - No Gas Cost)

### 1. Get Version History with Pagination

```solidity
function getVersionHistory(
    uint256 docId,
    uint256 offset,
    uint256 limit
) external view returns (
    DocumentVersion[] memory versions,
    uint256 totalCount
)
```

**Description**: Retrieve version history with pagination (oldest first)

**Parameters**:
- `docId`: Document ID
- `offset`: Starting index (0-based)
- `limit`: Max versions to return

**Returns**:
- `versions`: Array of versions
- `totalCount`: Total versions available

**Example**:
```javascript
// Get first 10 versions
const { versions, totalCount } = await contract.getVersionHistory(1, 0, 10);
```

---

### 2. Get Version History in Reverse

```solidity
function getVersionHistoryReverse(
    uint256 docId,
    uint256 offset,
    uint256 limit
) external view returns (
    DocumentVersion[] memory versions,
    uint256 totalCount
)
```

**Description**: Retrieve version history in reverse order (latest first)

**Parameters**:
- `docId`: Document ID
- `offset`: Starting index from end (0 = latest)
- `limit`: Max versions to return

**Returns**:
- `versions`: Array of versions in reverse order
- `totalCount`: Total versions available

**Example**:
```javascript
// Get 10 most recent versions
const { versions, totalCount } = await contract.getVersionHistoryReverse(1, 0, 10);
```

---

### 3. Get All Version History

```solidity
function getAllVersionHistory(uint256 docId)
    external view returns (DocumentVersion[] memory versions)
```

**Description**: Get complete version history without pagination

**Parameters**:
- `docId`: Document ID

**Returns**:
- `versions`: All versions

**Example**:
```javascript
const allVersions = await contract.getAllVersionHistory(1);
```

**⚠️ Warning**: Use with caution for documents with many versions (gas intensive)

---

### 4. Get Version Count

```solidity
function getVersionCount(uint256 docId)
    external view returns (uint256 count)
```

**Description**: Get total number of versions

**Parameters**:
- `docId`: Document ID

**Returns**:
- `count`: Total version count

**Example**:
```javascript
const count = await contract.getVersionCount(1);
console.log(`Document has ${count} versions`);
```

---

### 5. Get Specific Version

```solidity
function getSpecificVersion(uint256 docId, uint256 versionNumber)
    external view returns (DocumentVersion memory version)
```

**Description**: Retrieve a specific version by number

**Parameters**:
- `docId`: Document ID
- `versionNumber`: Version number (1-based)

**Returns**:
- `version`: The requested version

**Example**:
```javascript
// Get version 5
const version = await contract.getSpecificVersion(1, 5);
```

**Note**: Version numbers start at 1 (not 0)

---

### 6. Get Latest Version

```solidity
function getLatestVersion(uint256 docId)
    external view returns (DocumentVersion memory version)
```

**Description**: Get the most recent version

**Parameters**:
- `docId`: Document ID

**Returns**:
- `version`: Latest version

**Example**:
```javascript
const latest = await contract.getLatestVersion(1);
console.log(`Latest version: ${latest.versionNumber}`);
```

---

## Write Functions (Requires Gas)

### Create New Version

```solidity
function createNewVersion(
    uint256 docId,
    string memory newTitle,
    string memory newContentHash,
    string memory newMetadataHash,
    string memory changeDescription
) external
```

**Description**: Create a new version of the document

**Access**: Document owner only

**Parameters**:
- `docId`: Document ID
- `newTitle`: New title (3-100 chars)
- `newContentHash`: New IPFS content hash
- `newMetadataHash`: New IPFS metadata hash
- `changeDescription`: Description of changes

**Events Emitted**:
- `VersionCreated(docId, versionNumber, modifiedBy, changeDescription)`
- `DocumentUpdated(docId, newTitle)`

**Example**:
```javascript
await contract.createNewVersion(
    1,
    "Updated Contract v2",
    "QmNewContentHash123...",
    "QmNewMetadataHash456...",
    "Updated payment terms in section 3.2"
);
```

---

## Events

### VersionCreated

```solidity
event VersionCreated(
    uint256 indexed docId,
    uint256 indexed versionNumber,
    address indexed modifiedBy,
    string changeDescription
);
```

**Emitted when**: A new version is created

**Use case**: Track version creation in real-time

**Example (ethers.js)**:
```javascript
contract.on("VersionCreated", (docId, versionNumber, modifiedBy, changeDescription) => {
    console.log(`Document ${docId} updated to v${versionNumber} by ${modifiedBy}`);
    console.log(`Changes: ${changeDescription}`);
});
```

---

## Error Handling

### Custom Errors

```solidity
error VersionNotFound();
error InvalidPagination();
```

**VersionNotFound**: Thrown when requesting a non-existent version

**InvalidPagination**: Thrown when offset >= totalCount

---

## Common Use Cases

### 1. Display Recent Changes (UI)

```javascript
async function displayRecentVersions(docId, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const { versions, totalCount } = await contract.getVersionHistoryReverse(
        docId,
        offset,
        pageSize
    );
    
    const totalPages = Math.ceil(totalCount / pageSize);
    
    return {
        versions,
        currentPage: page,
        totalPages,
        totalVersions: totalCount
    };
}
```

### 2. Compare Two Versions

```javascript
async function compareVersions(docId, version1Num, version2Num) {
    const v1 = await contract.getSpecificVersion(docId, version1Num);
    const v2 = await contract.getSpecificVersion(docId, version2Num);
    
    return {
        titleChanged: v1.title !== v2.title,
        contentChanged: v1.contentHash !== v2.contentHash,
        timeDiff: v2.timestamp - v1.timestamp,
        modifiedBy: v2.modifiedBy
    };
}
```

### 3. Get Version Timeline

```javascript
async function getVersionTimeline(docId) {
    const versions = await contract.getAllVersionHistory(docId);
    
    return versions.map(v => ({
        version: v.versionNumber,
        date: new Date(v.timestamp * 1000),
        author: v.modifiedBy,
        description: v.changeDescription
    }));
}
```

### 4. Check if Document Updated Since Last View

```javascript
async function hasNewVersions(docId, lastSeenVersion) {
    const currentVersion = await contract.getLatestVersion(docId);
    return currentVersion.versionNumber > lastSeenVersion;
}
```

### 5. Audit Trail Export

```javascript
async function exportAuditTrail(docId) {
    const versions = await contract.getAllVersionHistory(docId);
    
    return versions.map(v => ({
        version: v.versionNumber,
        timestamp: new Date(v.timestamp * 1000).toISOString(),
        modifiedBy: v.modifiedBy,
        title: v.title,
        contentHash: v.contentHash,
        changes: v.changeDescription
    }));
}
```

---

## Best Practices

### ✅ DO

1. **Use pagination** for documents with many versions
2. **Use reverse pagination** for displaying recent changes
3. **Cache version count** to avoid repeated calls
4. **Provide meaningful change descriptions** when creating versions
5. **Listen to VersionCreated events** for real-time updates
6. **Validate inputs** before calling createNewVersion

### ❌ DON'T

1. **Don't use getAllVersionHistory** for documents with 50+ versions
2. **Don't forget to handle pagination edge cases** (last page)
3. **Don't create versions without change descriptions**
4. **Don't assume version numbers are 0-based** (they start at 1)

---

## Gas Optimization Tips

1. **Batch queries**: If fetching multiple documents, batch the calls
2. **Use events**: For historical data, query events instead of storage
3. **Pagination**: Always use pagination for large version histories
4. **Cache on frontend**: Cache version data to reduce RPC calls

---

## Integration Examples

### React Hook Example

```javascript
import { useContract } from 'wagmi';

function useDocumentVersions(docId, page = 1, pageSize = 10) {
    const contract = useContract(/* ... */);
    const [versions, setVersions] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    
    useEffect(() => {
        async function fetchVersions() {
            const offset = (page - 1) * pageSize;
            const result = await contract.getVersionHistoryReverse(
                docId,
                offset,
                pageSize
            );
            setVersions(result.versions);
            setTotalCount(result.totalCount);
        }
        fetchVersions();
    }, [docId, page, pageSize]);
    
    return { versions, totalCount, totalPages: Math.ceil(totalCount / pageSize) };
}
```

### Web3.py Example

```python
def get_version_history(contract, doc_id, offset=0, limit=10):
    """Get version history with pagination"""
    versions, total_count = contract.functions.getVersionHistoryReverse(
        doc_id,
        offset,
        limit
    ).call()
    
    return {
        'versions': versions,
        'total_count': total_count,
        'has_more': offset + limit < total_count
    }
```

---

## Testing Checklist

- [ ] Test version creation on document creation
- [ ] Test createNewVersion with valid inputs
- [ ] Test pagination with various offsets/limits
- [ ] Test reverse pagination
- [ ] Test getSpecificVersion with valid/invalid version numbers
- [ ] Test getLatestVersion
- [ ] Test getVersionCount
- [ ] Test edge cases (empty versions, out of bounds)
- [ ] Test access control (non-owner cannot create version)
- [ ] Test event emission
- [ ] Test with documents having 1, 10, 100+ versions

---

## Support

For issues or questions:
- Check the main implementation doc: `VERSION_HISTORY_IMPLEMENTATION.md`
- Review test files in `packages/foundry/test/`
- See HacktoberFest tasks: `hacktoberfest-2025-tasks.md`
