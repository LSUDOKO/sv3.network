import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DocumentRWA
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const documentRwaAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'initialOwner', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256' },
      { name: 'signer', internalType: 'address', type: 'address' },
    ],
    name: 'addSigner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'organizationId', internalType: 'uint256', type: 'uint256' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'contentHash', internalType: 'string', type: 'string' },
      { name: 'metadataHash', internalType: 'string', type: 'string' },
    ],
    name: 'createDocument',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'docId', internalType: 'uint256', type: 'uint256' }],
    name: 'deleteDocument',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'docApprovers',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'documentCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'documents',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'organizationId', internalType: 'uint256', type: 'uint256' },
      { name: 'title', internalType: 'string', type: 'string' },
      { name: 'contentHash', internalType: 'string', type: 'string' },
      { name: 'metadataHash', internalType: 'string', type: 'string' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'lastModified', internalType: 'uint256', type: 'uint256' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getActiveDocumentCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'docId', internalType: 'uint256', type: 'uint256' }],
    name: 'getDocument',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'uri', internalType: 'string', type: 'string' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'docId', internalType: 'uint256', type: 'uint256' }],
    name: 'getDocumentSigners',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'docId', internalType: 'uint256', type: 'uint256' }],
    name: 'getSignatureCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalSignatureCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserDocuments',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256' },
      { name: 'signer', internalType: 'address', type: 'address' },
    ],
    name: 'isAuthorizedSigner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256' },
      { name: 'signer', internalType: 'address', type: 'address' },
    ],
    name: 'isSigned',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256' },
      { name: 'signer', internalType: 'address', type: 'address' },
    ],
    name: 'removeSigner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256' },
      { name: 'signatureData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'signDocument',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'signatureCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'transferDocumentOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256' },
      { name: 'newTitle', internalType: 'string', type: 'string' },
    ],
    name: 'updateDocument',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userDocuments',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '_fromTokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: '_toTokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'orgId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'title', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'DocumentCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'docId', internalType: 'uint256', type: 'uint256', indexed: true }],
    name: 'DocumentDeleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'signer', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'DocumentSigned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'newTitle', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'DocumentUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'docId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'signer', internalType: 'address', type: 'address', indexed: true },
      { name: 'isValid', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'SignatureVerified',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'AlreadySigned' },
  { type: 'error', inputs: [], name: 'DocumentNotFound' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'ERC721InvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  { type: 'error', inputs: [], name: 'InvalidDocumentTitle' },
  { type: 'error', inputs: [], name: 'InvalidIPFSHash' },
  { type: 'error', inputs: [], name: 'NotAuthorizedSigner' },
  { type: 'error', inputs: [], name: 'OrganizationNotFound' },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const documentRwaAddress = {
  56: '0x1150cF86b0611e392729a76c215D2ED1d5c98363',
  11155111: '0xcc5A0D6268d70811eDad77799f2168aFe6382E89',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const documentRwaConfig = { address: documentRwaAddress, abi: documentRwaAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const messageAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'message',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_message', internalType: 'string', type: 'string' }],
    name: 'setMessage',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'purpose', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'SetMessage',
  },
] as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const messageAddress = {
  56: '0x0DCC9cf9F1292F7A09b5b37047acDe2e3d873B0d',
  11155111: '0xcc5A0D6268d70811eDad77799f2168aFe6382E89',
} as const

/**
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const messageConfig = { address: messageAddress, abi: messageAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Organization
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const organizationAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'ROLE_ADMIN',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ROLE_MEMBER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ROLE_OWNER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256' },
      { name: 'member', internalType: 'address', type: 'address' },
      { name: 'role', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addMember',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256' },
      { name: 'member', internalType: 'address', type: 'address' },
      { name: 'newRole', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'changeMemberRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
    ],
    name: 'createOrganization',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'orgId', internalType: 'uint256', type: 'uint256' }],
    name: 'deleteOrganization',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getActiveOrganizationCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256' },
      { name: 'member', internalType: 'address', type: 'address' },
    ],
    name: 'getMemberRole',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'orgId', internalType: 'uint256', type: 'uint256' }],
    name: 'getOrganization',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'members', internalType: 'address[]', type: 'address[]' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'orgId', internalType: 'uint256', type: 'uint256' }],
    name: 'getOrganizationMembers',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getUserOrganizations',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256' },
      { name: 'member', internalType: 'address', type: 'address' },
    ],
    name: 'isMember',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'orgMemberRoles',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'organizationCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'organizations',
    outputs: [
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'description', internalType: 'string', type: 'string' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
      { name: 'isActive', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256' },
      { name: 'member', internalType: 'address', type: 'address' },
    ],
    name: 'removeMember',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256' },
      { name: 'field', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'string', type: 'string' },
    ],
    name: 'updateOrganization',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'userOrganizations',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'member', internalType: 'address', type: 'address', indexed: true },
      { name: 'role', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'MemberAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'member', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'MemberRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'member', internalType: 'address', type: 'address', indexed: true },
      { name: 'newRole', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'MemberRoleChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'OrganizationCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'orgId', internalType: 'uint256', type: 'uint256', indexed: true }],
    name: 'OrganizationDeleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'orgId', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'field', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'OrganizationUpdated',
  },
  { type: 'error', inputs: [], name: 'AlreadyMember' },
  { type: 'error', inputs: [], name: 'InvalidOrganizationName' },
  { type: 'error', inputs: [], name: 'InvalidRole' },
  { type: 'error', inputs: [], name: 'NotMember' },
  { type: 'error', inputs: [], name: 'OnlyOwner' },
  { type: 'error', inputs: [], name: 'OrganizationNotFound' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
] as const

/**
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const organizationAddress = {
  56: '0x5DFb2ee27B1F0d638425A6665818ff86c7021Be1',
} as const

/**
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const organizationConfig = { address: organizationAddress, abi: organizationAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SV3NetworkNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sv3NetworkNftAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'safeMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'ERC721InvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UserProfile
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const userProfileAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'username', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
    ],
    name: 'createProfile',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'wallet', internalType: 'address', type: 'address' },
      { name: 'field', internalType: 'string', type: 'string' },
    ],
    name: 'getCustomData',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'wallet', internalType: 'address', type: 'address' }],
    name: 'getProfile',
    outputs: [
      { name: 'walletAddress', internalType: 'address', type: 'address' },
      { name: 'username', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'linkedinProfile', internalType: 'string', type: 'string' },
      { name: 'verified', internalType: 'bool', type: 'bool' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'username', internalType: 'string', type: 'string' }],
    name: 'getProfileByUsername',
    outputs: [
      { name: 'walletAddress', internalType: 'address', type: 'address' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'linkedinProfile', internalType: 'string', type: 'string' },
      { name: 'verified', internalType: 'bool', type: 'bool' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'username', internalType: 'string', type: 'string' }],
    name: 'isUsernameAvailable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'profileCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'profiles',
    outputs: [
      { name: 'wallet', internalType: 'address', type: 'address' },
      { name: 'username', internalType: 'string', type: 'string' },
      { name: 'email', internalType: 'string', type: 'string' },
      { name: 'linkedinProfile', internalType: 'string', type: 'string' },
      { name: 'verified', internalType: 'bool', type: 'bool' },
      { name: 'createdAt', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'field', internalType: 'string', type: 'string' },
      { name: 'value', internalType: 'string', type: 'string' },
    ],
    name: 'updateProfile',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'string', type: 'string' }],
    name: 'usernameToAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'verifyProfile', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'wallet', internalType: 'address', type: 'address', indexed: true },
      { name: 'username', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ProfileCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'wallet', internalType: 'address', type: 'address', indexed: true },
      { name: 'field', internalType: 'string', type: 'string', indexed: false },
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ProfileUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'wallet', internalType: 'address', type: 'address', indexed: true }],
    name: 'ProfileVerified',
  },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidUsername' },
  { type: 'error', inputs: [], name: 'ProfileNotFound' },
  { type: 'error', inputs: [], name: 'Unauthorized' },
  { type: 'error', inputs: [], name: 'UsernameTaken' },
] as const

/**
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const userProfileAddress = {
  56: '0x5D6E20e003c431bD36E293c6898e6B0356737f26',
} as const

/**
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const userProfileConfig = { address: userProfileAddress, abi: userProfileAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwa = /*#__PURE__*/ createReadContract({ abi: documentRwaAbi, address: documentRwaAddress })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaBalanceOf = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"docApprovers"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaDocApprovers = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'docApprovers',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"documentCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaDocumentCount = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'documentCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"documents"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaDocuments = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'documents',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"getActiveDocumentCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaGetActiveDocumentCount = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'getActiveDocumentCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaGetApproved = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"getDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaGetDocument = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'getDocument',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"getDocumentSigners"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaGetDocumentSigners = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'getDocumentSigners',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"getSignatureCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaGetSignatureCount = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'getSignatureCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"getTotalSignatureCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaGetTotalSignatureCount = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'getTotalSignatureCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"getUserDocuments"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaGetUserDocuments = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'getUserDocuments',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"isAuthorizedSigner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaIsAuthorizedSigner = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'isAuthorizedSigner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"isSigned"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaIsSigned = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'isSigned',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaName = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaOwner = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaOwnerOf = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"signatureCount"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaSignatureCount = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'signatureCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaSymbol = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaTokenUri = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"userDocuments"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readDocumentRwaUserDocuments = /*#__PURE__*/ createReadContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'userDocuments',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwa = /*#__PURE__*/ createWriteContract({ abi: documentRwaAbi, address: documentRwaAddress })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"addSigner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaAddSigner = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'addSigner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaApprove = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"createDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaCreateDocument = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'createDocument',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"deleteDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaDeleteDocument = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'deleteDocument',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"removeSigner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaRemoveSigner = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'removeSigner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"signDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaSignDocument = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'signDocument',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"transferDocumentOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaTransferDocumentOwnership = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'transferDocumentOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"updateDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeDocumentRwaUpdateDocument = /*#__PURE__*/ createWriteContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'updateDocument',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwa = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"addSigner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaAddSigner = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'addSigner',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaApprove = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"createDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaCreateDocument = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'createDocument',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"deleteDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaDeleteDocument = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'deleteDocument',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"removeSigner"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaRemoveSigner = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'removeSigner',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"signDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaSignDocument = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'signDocument',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"transferDocumentOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaTransferDocumentOwnership = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'transferDocumentOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link documentRwaAbi}__ and `functionName` set to `"updateDocument"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateDocumentRwaUpdateDocument = /*#__PURE__*/ createSimulateContract({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  functionName: 'updateDocument',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaBatchMetadataUpdateEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'BatchMetadataUpdate',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"DocumentCreated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaDocumentCreatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'DocumentCreated',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"DocumentDeleted"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaDocumentDeletedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'DocumentDeleted',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"DocumentSigned"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaDocumentSignedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'DocumentSigned',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"DocumentUpdated"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaDocumentUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'DocumentUpdated',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"MetadataUpdate"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaMetadataUpdateEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'MetadataUpdate',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"SignatureVerified"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaSignatureVerifiedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'SignatureVerified',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link documentRwaAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x1150cf86b0611e392729a76c215d2ed1d5c98363)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchDocumentRwaTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: documentRwaAbi,
  address: documentRwaAddress,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readMessage = /*#__PURE__*/ createReadContract({ abi: messageAbi, address: messageAddress })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageAbi}__ and `functionName` set to `"message"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const readMessageMessage = /*#__PURE__*/ createReadContract({
  abi: messageAbi,
  address: messageAddress,
  functionName: 'message',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeMessage = /*#__PURE__*/ createWriteContract({ abi: messageAbi, address: messageAddress })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageAbi}__ and `functionName` set to `"setMessage"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const writeMessageSetMessage = /*#__PURE__*/ createWriteContract({
  abi: messageAbi,
  address: messageAddress,
  functionName: 'setMessage',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateMessage = /*#__PURE__*/ createSimulateContract({ abi: messageAbi, address: messageAddress })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageAbi}__ and `functionName` set to `"setMessage"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const simulateMessageSetMessage = /*#__PURE__*/ createSimulateContract({
  abi: messageAbi,
  address: messageAddress,
  functionName: 'setMessage',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageAbi}__
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchMessageEvent = /*#__PURE__*/ createWatchContractEvent({ abi: messageAbi, address: messageAddress })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageAbi}__ and `eventName` set to `"SetMessage"`
 *
 * - [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d)
 * - [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xcc5a0d6268d70811edad77799f2168afe6382e89)
 */
export const watchMessageSetMessageEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: messageAbi,
  address: messageAddress,
  eventName: 'SetMessage',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganization = /*#__PURE__*/ createReadContract({ abi: organizationAbi, address: organizationAddress })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"ROLE_ADMIN"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'ROLE_ADMIN',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"ROLE_MEMBER"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationRoleMember = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'ROLE_MEMBER',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"ROLE_OWNER"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationRoleOwner = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'ROLE_OWNER',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"getActiveOrganizationCount"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationGetActiveOrganizationCount = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'getActiveOrganizationCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"getMemberRole"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationGetMemberRole = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'getMemberRole',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"getOrganization"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationGetOrganization = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'getOrganization',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"getOrganizationMembers"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationGetOrganizationMembers = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'getOrganizationMembers',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"getUserOrganizations"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationGetUserOrganizations = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'getUserOrganizations',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"isMember"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationIsMember = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'isMember',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"orgMemberRoles"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationOrgMemberRoles = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'orgMemberRoles',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"organizationCount"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationOrganizationCount = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'organizationCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"organizations"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationOrganizations = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'organizations',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"userOrganizations"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const readOrganizationUserOrganizations = /*#__PURE__*/ createReadContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'userOrganizations',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link organizationAbi}__
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const writeOrganization = /*#__PURE__*/ createWriteContract({
  abi: organizationAbi,
  address: organizationAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"addMember"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const writeOrganizationAddMember = /*#__PURE__*/ createWriteContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'addMember',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"changeMemberRole"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const writeOrganizationChangeMemberRole = /*#__PURE__*/ createWriteContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'changeMemberRole',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"createOrganization"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const writeOrganizationCreateOrganization = /*#__PURE__*/ createWriteContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'createOrganization',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"deleteOrganization"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const writeOrganizationDeleteOrganization = /*#__PURE__*/ createWriteContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'deleteOrganization',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"removeMember"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const writeOrganizationRemoveMember = /*#__PURE__*/ createWriteContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'removeMember',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const writeOrganizationTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"updateOrganization"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const writeOrganizationUpdateOrganization = /*#__PURE__*/ createWriteContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'updateOrganization',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link organizationAbi}__
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const simulateOrganization = /*#__PURE__*/ createSimulateContract({
  abi: organizationAbi,
  address: organizationAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"addMember"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const simulateOrganizationAddMember = /*#__PURE__*/ createSimulateContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'addMember',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"changeMemberRole"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const simulateOrganizationChangeMemberRole = /*#__PURE__*/ createSimulateContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'changeMemberRole',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"createOrganization"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const simulateOrganizationCreateOrganization = /*#__PURE__*/ createSimulateContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'createOrganization',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"deleteOrganization"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const simulateOrganizationDeleteOrganization = /*#__PURE__*/ createSimulateContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'deleteOrganization',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"removeMember"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const simulateOrganizationRemoveMember = /*#__PURE__*/ createSimulateContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'removeMember',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const simulateOrganizationTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link organizationAbi}__ and `functionName` set to `"updateOrganization"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const simulateOrganizationUpdateOrganization = /*#__PURE__*/ createSimulateContract({
  abi: organizationAbi,
  address: organizationAddress,
  functionName: 'updateOrganization',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link organizationAbi}__
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const watchOrganizationEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: organizationAbi,
  address: organizationAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link organizationAbi}__ and `eventName` set to `"MemberAdded"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const watchOrganizationMemberAddedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: organizationAbi,
  address: organizationAddress,
  eventName: 'MemberAdded',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link organizationAbi}__ and `eventName` set to `"MemberRemoved"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const watchOrganizationMemberRemovedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: organizationAbi,
  address: organizationAddress,
  eventName: 'MemberRemoved',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link organizationAbi}__ and `eventName` set to `"MemberRoleChanged"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const watchOrganizationMemberRoleChangedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: organizationAbi,
  address: organizationAddress,
  eventName: 'MemberRoleChanged',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link organizationAbi}__ and `eventName` set to `"OrganizationCreated"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const watchOrganizationOrganizationCreatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: organizationAbi,
  address: organizationAddress,
  eventName: 'OrganizationCreated',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link organizationAbi}__ and `eventName` set to `"OrganizationDeleted"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const watchOrganizationOrganizationDeletedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: organizationAbi,
  address: organizationAddress,
  eventName: 'OrganizationDeleted',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link organizationAbi}__ and `eventName` set to `"OrganizationUpdated"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5dfb2ee27b1f0d638425a6665818ff86c7021be1)
 */
export const watchOrganizationOrganizationUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: organizationAbi,
  address: organizationAddress,
  eventName: 'OrganizationUpdated',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__
 */
export const readSv3NetworkNft = /*#__PURE__*/ createReadContract({ abi: sv3NetworkNftAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readSv3NetworkNftBalanceOf = /*#__PURE__*/ createReadContract({
  abi: sv3NetworkNftAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"getApproved"`
 */
export const readSv3NetworkNftGetApproved = /*#__PURE__*/ createReadContract({
  abi: sv3NetworkNftAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readSv3NetworkNftIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: sv3NetworkNftAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"name"`
 */
export const readSv3NetworkNftName = /*#__PURE__*/ createReadContract({ abi: sv3NetworkNftAbi, functionName: 'name' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"owner"`
 */
export const readSv3NetworkNftOwner = /*#__PURE__*/ createReadContract({ abi: sv3NetworkNftAbi, functionName: 'owner' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readSv3NetworkNftOwnerOf = /*#__PURE__*/ createReadContract({
  abi: sv3NetworkNftAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readSv3NetworkNftSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: sv3NetworkNftAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"symbol"`
 */
export const readSv3NetworkNftSymbol = /*#__PURE__*/ createReadContract({
  abi: sv3NetworkNftAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readSv3NetworkNftTokenUri = /*#__PURE__*/ createReadContract({
  abi: sv3NetworkNftAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__
 */
export const writeSv3NetworkNft = /*#__PURE__*/ createWriteContract({ abi: sv3NetworkNftAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"approve"`
 */
export const writeSv3NetworkNftApprove = /*#__PURE__*/ createWriteContract({
  abi: sv3NetworkNftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeSv3NetworkNftRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: sv3NetworkNftAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"safeMint"`
 */
export const writeSv3NetworkNftSafeMint = /*#__PURE__*/ createWriteContract({
  abi: sv3NetworkNftAbi,
  functionName: 'safeMint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeSv3NetworkNftSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: sv3NetworkNftAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeSv3NetworkNftSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: sv3NetworkNftAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeSv3NetworkNftTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: sv3NetworkNftAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeSv3NetworkNftTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: sv3NetworkNftAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__
 */
export const simulateSv3NetworkNft = /*#__PURE__*/ createSimulateContract({ abi: sv3NetworkNftAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"approve"`
 */
export const simulateSv3NetworkNftApprove = /*#__PURE__*/ createSimulateContract({
  abi: sv3NetworkNftAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateSv3NetworkNftRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: sv3NetworkNftAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"safeMint"`
 */
export const simulateSv3NetworkNftSafeMint = /*#__PURE__*/ createSimulateContract({
  abi: sv3NetworkNftAbi,
  functionName: 'safeMint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateSv3NetworkNftSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: sv3NetworkNftAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateSv3NetworkNftSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: sv3NetworkNftAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateSv3NetworkNftTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: sv3NetworkNftAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateSv3NetworkNftTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: sv3NetworkNftAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link sv3NetworkNftAbi}__
 */
export const watchSv3NetworkNftEvent = /*#__PURE__*/ createWatchContractEvent({ abi: sv3NetworkNftAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `eventName` set to `"Approval"`
 */
export const watchSv3NetworkNftApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: sv3NetworkNftAbi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchSv3NetworkNftApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: sv3NetworkNftAbi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchSv3NetworkNftOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: sv3NetworkNftAbi,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link sv3NetworkNftAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchSv3NetworkNftTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: sv3NetworkNftAbi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link userProfileAbi}__
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const readUserProfile = /*#__PURE__*/ createReadContract({ abi: userProfileAbi, address: userProfileAddress })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"getCustomData"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const readUserProfileGetCustomData = /*#__PURE__*/ createReadContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'getCustomData',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"getProfile"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const readUserProfileGetProfile = /*#__PURE__*/ createReadContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'getProfile',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"getProfileByUsername"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const readUserProfileGetProfileByUsername = /*#__PURE__*/ createReadContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'getProfileByUsername',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"isUsernameAvailable"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const readUserProfileIsUsernameAvailable = /*#__PURE__*/ createReadContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'isUsernameAvailable',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"profileCount"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const readUserProfileProfileCount = /*#__PURE__*/ createReadContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'profileCount',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"profiles"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const readUserProfileProfiles = /*#__PURE__*/ createReadContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'profiles',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"usernameToAddress"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const readUserProfileUsernameToAddress = /*#__PURE__*/ createReadContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'usernameToAddress',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link userProfileAbi}__
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const writeUserProfile = /*#__PURE__*/ createWriteContract({ abi: userProfileAbi, address: userProfileAddress })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"createProfile"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const writeUserProfileCreateProfile = /*#__PURE__*/ createWriteContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'createProfile',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"updateProfile"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const writeUserProfileUpdateProfile = /*#__PURE__*/ createWriteContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'updateProfile',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"verifyProfile"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const writeUserProfileVerifyProfile = /*#__PURE__*/ createWriteContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'verifyProfile',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link userProfileAbi}__
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const simulateUserProfile = /*#__PURE__*/ createSimulateContract({
  abi: userProfileAbi,
  address: userProfileAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"createProfile"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const simulateUserProfileCreateProfile = /*#__PURE__*/ createSimulateContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'createProfile',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"updateProfile"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const simulateUserProfileUpdateProfile = /*#__PURE__*/ createSimulateContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'updateProfile',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link userProfileAbi}__ and `functionName` set to `"verifyProfile"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const simulateUserProfileVerifyProfile = /*#__PURE__*/ createSimulateContract({
  abi: userProfileAbi,
  address: userProfileAddress,
  functionName: 'verifyProfile',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link userProfileAbi}__
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const watchUserProfileEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: userProfileAbi,
  address: userProfileAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link userProfileAbi}__ and `eventName` set to `"ProfileCreated"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const watchUserProfileProfileCreatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: userProfileAbi,
  address: userProfileAddress,
  eventName: 'ProfileCreated',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link userProfileAbi}__ and `eventName` set to `"ProfileUpdated"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const watchUserProfileProfileUpdatedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: userProfileAbi,
  address: userProfileAddress,
  eventName: 'ProfileUpdated',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link userProfileAbi}__ and `eventName` set to `"ProfileVerified"`
 *
 * [__View Contract on Bnb Smart Chain Bsc Scan__](https://bscscan.com/address/0x5d6e20e003c431bd36e293c6898e6b0356737f26)
 */
export const watchUserProfileProfileVerifiedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: userProfileAbi,
  address: userProfileAddress,
  eventName: 'ProfileVerified',
})
