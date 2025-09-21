import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
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
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  { type: 'error', inputs: [{ name: 'sender', internalType: 'address', type: 'address' }], name: 'ERC20InvalidSender' },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721Abi = [
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
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
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
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
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
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataAbi = [
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
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
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
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
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
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Math
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mathAbi = [{ type: 'error', inputs: [], name: 'MathOverflowedMulDiv' }] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Message
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const messageAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: false },
      { name: 'purpose', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'SetMessage',
  },
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
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const messageAddress = {
  11155111: '0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const messageConfig = { address: messageAddress, abi: messageAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SV3Network
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SV3NetworkAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  { type: 'error', inputs: [{ name: 'owner', internalType: 'address', type: 'address' }], name: 'OwnableInvalidOwner' },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
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
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'StringsInsufficientHexLength',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc165Abi}__
 */
export const readErc165 = /*#__PURE__*/ createReadContract({ abi: erc165Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc165SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc165Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const readErc721 = /*#__PURE__*/ createReadContract({ abi: erc721Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc721BalanceOf = /*#__PURE__*/ createReadContract({ abi: erc721Abi, functionName: 'balanceOf' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const readErc721GetApproved = /*#__PURE__*/ createReadContract({ abi: erc721Abi, functionName: 'getApproved' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readErc721IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"name"`
 */
export const readErc721Name = /*#__PURE__*/ createReadContract({ abi: erc721Abi, functionName: 'name' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const readErc721OwnerOf = /*#__PURE__*/ createReadContract({ abi: erc721Abi, functionName: 'ownerOf' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc721SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"symbol"`
 */
export const readErc721Symbol = /*#__PURE__*/ createReadContract({ abi: erc721Abi, functionName: 'symbol' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const readErc721TokenUri = /*#__PURE__*/ createReadContract({ abi: erc721Abi, functionName: 'tokenURI' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const writeErc721 = /*#__PURE__*/ createWriteContract({ abi: erc721Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const writeErc721Approve = /*#__PURE__*/ createWriteContract({ abi: erc721Abi, functionName: 'approve' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeErc721SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc721Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeErc721SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: erc721Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc721TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const simulateErc721 = /*#__PURE__*/ createSimulateContract({ abi: erc721Abi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const simulateErc721Approve = /*#__PURE__*/ createSimulateContract({ abi: erc721Abi, functionName: 'approve' })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateErc721SafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc721Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateErc721SetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: erc721Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc721TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721Abi}__
 */
export const watchErc721Event = /*#__PURE__*/ createWatchContractEvent({ abi: erc721Abi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Approval"`
 */
export const watchErc721ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc721Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchErc721ApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc721Abi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc721TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc721Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc165Abi}__
 */
export const readIerc165 = /*#__PURE__*/ createReadContract({ abi: ierc165Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc165SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ierc165Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const readIerc721 = /*#__PURE__*/ createReadContract({ abi: ierc721Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc721BalanceOf = /*#__PURE__*/ createReadContract({ abi: ierc721Abi, functionName: 'balanceOf' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const readIerc721GetApproved = /*#__PURE__*/ createReadContract({ abi: ierc721Abi, functionName: 'getApproved' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readIerc721IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: ierc721Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const readIerc721OwnerOf = /*#__PURE__*/ createReadContract({ abi: ierc721Abi, functionName: 'ownerOf' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc721SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ierc721Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const writeIerc721 = /*#__PURE__*/ createWriteContract({ abi: ierc721Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"approve"`
 */
export const writeIerc721Approve = /*#__PURE__*/ createWriteContract({ abi: ierc721Abi, functionName: 'approve' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeIerc721SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc721Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeIerc721SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: ierc721Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeIerc721TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721Abi}__
 */
export const simulateIerc721 = /*#__PURE__*/ createSimulateContract({ abi: ierc721Abi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"approve"`
 */
export const simulateIerc721Approve = /*#__PURE__*/ createSimulateContract({ abi: ierc721Abi, functionName: 'approve' })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateIerc721SafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc721Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateIerc721SetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: ierc721Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateIerc721TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721Abi}__
 */
export const watchIerc721Event = /*#__PURE__*/ createWatchContractEvent({ abi: ierc721Abi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"Approval"`
 */
export const watchIerc721ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc721Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchIerc721ApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc721Abi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchIerc721TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc721Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const readIerc721Metadata = /*#__PURE__*/ createReadContract({ abi: ierc721MetadataAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc721MetadataBalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"getApproved"`
 */
export const readIerc721MetadataGetApproved = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readIerc721MetadataIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"name"`
 */
export const readIerc721MetadataName = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readIerc721MetadataOwnerOf = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc721MetadataSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const readIerc721MetadataSymbol = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readIerc721MetadataTokenUri = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const writeIerc721Metadata = /*#__PURE__*/ createWriteContract({ abi: ierc721MetadataAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const writeIerc721MetadataApprove = /*#__PURE__*/ createWriteContract({
  abi: ierc721MetadataAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeIerc721MetadataSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc721MetadataAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeIerc721MetadataSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: ierc721MetadataAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeIerc721MetadataTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc721MetadataAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const simulateIerc721Metadata = /*#__PURE__*/ createSimulateContract({ abi: ierc721MetadataAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const simulateIerc721MetadataApprove = /*#__PURE__*/ createSimulateContract({
  abi: ierc721MetadataAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateIerc721MetadataSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc721MetadataAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateIerc721MetadataSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: ierc721MetadataAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateIerc721MetadataTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: ierc721MetadataAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const watchIerc721MetadataEvent = /*#__PURE__*/ createWatchContractEvent({ abi: ierc721MetadataAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const watchIerc721MetadataApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc721MetadataAbi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchIerc721MetadataApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc721MetadataAbi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchIerc721MetadataTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc721MetadataAbi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__
 */
export const writeIerc721Receiver = /*#__PURE__*/ createWriteContract({ abi: ierc721ReceiverAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const writeIerc721ReceiverOnErc721Received = /*#__PURE__*/ createWriteContract({
  abi: ierc721ReceiverAbi,
  functionName: 'onERC721Received',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__
 */
export const simulateIerc721Receiver = /*#__PURE__*/ createSimulateContract({ abi: ierc721ReceiverAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const simulateIerc721ReceiverOnErc721Received = /*#__PURE__*/ createSimulateContract({
  abi: ierc721ReceiverAbi,
  functionName: 'onERC721Received',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const readMessage = /*#__PURE__*/ createReadContract({ abi: messageAbi, address: messageAddress })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link messageAbi}__ and `functionName` set to `"message"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const readMessageMessage = /*#__PURE__*/ createReadContract({
  abi: messageAbi,
  address: messageAddress,
  functionName: 'message',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const writeMessage = /*#__PURE__*/ createWriteContract({ abi: messageAbi, address: messageAddress })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link messageAbi}__ and `functionName` set to `"setMessage"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const writeMessageSetMessage = /*#__PURE__*/ createWriteContract({
  abi: messageAbi,
  address: messageAddress,
  functionName: 'setMessage',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const simulateMessage = /*#__PURE__*/ createSimulateContract({ abi: messageAbi, address: messageAddress })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link messageAbi}__ and `functionName` set to `"setMessage"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const simulateMessageSetMessage = /*#__PURE__*/ createSimulateContract({
  abi: messageAbi,
  address: messageAddress,
  functionName: 'setMessage',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const watchMessageEvent = /*#__PURE__*/ createWatchContractEvent({ abi: messageAbi, address: messageAddress })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link messageAbi}__ and `eventName` set to `"SetMessage"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34)
 */
export const watchMessageSetMessageEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: messageAbi,
  address: messageAddress,
  eventName: 'SetMessage',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__
 */
export const readSV3Network = /*#__PURE__*/ createReadContract({ abi: SV3NetworkAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readSV3NetworkBalanceOf = /*#__PURE__*/ createReadContract({
  abi: SV3NetworkAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"getApproved"`
 */
export const readSV3NetworkGetApproved = /*#__PURE__*/ createReadContract({
  abi: SV3NetworkAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readSV3NetworkIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: SV3NetworkAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"name"`
 */
export const readSV3NetworkName = /*#__PURE__*/ createReadContract({ abi: SV3NetworkAbi, functionName: 'name' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"owner"`
 */
export const readSV3NetworkOwner = /*#__PURE__*/ createReadContract({ abi: SV3NetworkAbi, functionName: 'owner' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readSV3NetworkOwnerOf = /*#__PURE__*/ createReadContract({ abi: SV3NetworkAbi, functionName: 'ownerOf' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readSV3NetworkSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: SV3NetworkAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"symbol"`
 */
export const readSV3NetworkSymbol = /*#__PURE__*/ createReadContract({ abi: SV3NetworkAbi, functionName: 'symbol' })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readSV3NetworkTokenUri = /*#__PURE__*/ createReadContract({ abi: SV3NetworkAbi, functionName: 'tokenURI' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link SV3NetworkAbi}__
 */
export const writeSV3Network = /*#__PURE__*/ createWriteContract({ abi: SV3NetworkAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"approve"`
 */
export const writeSV3NetworkApprove = /*#__PURE__*/ createWriteContract({ abi: SV3NetworkAbi, functionName: 'approve' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeSV3NetworkRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: SV3NetworkAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"safeMint"`
 */
export const writeSV3NetworkSafeMint = /*#__PURE__*/ createWriteContract({
  abi: SV3NetworkAbi,
  functionName: 'safeMint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeSV3NetworkSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: SV3NetworkAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeSV3NetworkSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: SV3NetworkAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeSV3NetworkTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: SV3NetworkAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeSV3NetworkTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: SV3NetworkAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link SV3NetworkAbi}__
 */
export const simulateSV3Network = /*#__PURE__*/ createSimulateContract({ abi: SV3NetworkAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"approve"`
 */
export const simulateSV3NetworkApprove = /*#__PURE__*/ createSimulateContract({
  abi: SV3NetworkAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateSV3NetworkRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: SV3NetworkAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"safeMint"`
 */
export const simulateSV3NetworkSafeMint = /*#__PURE__*/ createSimulateContract({
  abi: SV3NetworkAbi,
  functionName: 'safeMint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateSV3NetworkSafeTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: SV3NetworkAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateSV3NetworkSetApprovalForAll = /*#__PURE__*/ createSimulateContract({
  abi: SV3NetworkAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateSV3NetworkTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: SV3NetworkAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link SV3NetworkAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateSV3NetworkTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: SV3NetworkAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link SV3NetworkAbi}__
 */
export const watchSV3NetworkEvent = /*#__PURE__*/ createWatchContractEvent({ abi: SV3NetworkAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link SV3NetworkAbi}__ and `eventName` set to `"Approval"`
 */
export const watchSV3NetworkApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: SV3NetworkAbi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link SV3NetworkAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchSV3NetworkApprovalForAllEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: SV3NetworkAbi,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link SV3NetworkAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchSV3NetworkOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: SV3NetworkAbi,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link SV3NetworkAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchSV3NetworkTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: SV3NetworkAbi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const readOwnable = /*#__PURE__*/ createReadContract({ abi: ownableAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const readOwnableOwner = /*#__PURE__*/ createReadContract({ abi: ownableAbi, functionName: 'owner' })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const writeOwnable = /*#__PURE__*/ createWriteContract({ abi: ownableAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeOwnableRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: ownableAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeOwnableTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: ownableAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const simulateOwnable = /*#__PURE__*/ createSimulateContract({ abi: ownableAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateOwnableRenounceOwnership = /*#__PURE__*/ createSimulateContract({
  abi: ownableAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateOwnableTransferOwnership = /*#__PURE__*/ createSimulateContract({
  abi: ownableAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const watchOwnableEvent = /*#__PURE__*/ createWatchContractEvent({ abi: ownableAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchOwnableOwnershipTransferredEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ownableAbi,
  eventName: 'OwnershipTransferred',
})

export const DocumentRWAContractABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'initialOwner',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AlreadySigned',
    type: 'error',
  },
  {
    inputs: [],
    name: 'DocumentNotFound',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'ERC721IncorrectOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721InsufficientApproval',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'approver',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidApprover',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidOperator',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidReceiver',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
    ],
    name: 'ERC721InvalidSender',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721NonexistentToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidDocumentTitle',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidIPFSHash',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotAuthorizedSigner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OrganizationNotFound',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_fromTokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_toTokenId',
        type: 'uint256',
      },
    ],
    name: 'BatchMetadataUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
    ],
    name: 'DocumentCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
    ],
    name: 'DocumentDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'DocumentSigned',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'newTitle',
        type: 'string',
      },
    ],
    name: 'DocumentUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'MetadataUpdate',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isValid',
        type: 'bool',
      },
    ],
    name: 'SignatureVerified',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'addSigner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'organizationId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'contentHash',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'metadataHash',
        type: 'string',
      },
    ],
    name: 'createDocument',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
    ],
    name: 'deleteDocument',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'docApprovers',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'documentCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'documents',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'organizationId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'contentHash',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'metadataHash',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastModified',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getActiveDocumentCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
    ],
    name: 'getDocument',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
    ],
    name: 'getDocumentSigners',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
    ],
    name: 'getSignatureCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalSignatureCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserDocuments',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'isAuthorizedSigner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'isSigned',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'signer',
        type: 'address',
      },
    ],
    name: 'removeSigner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'signatureData',
        type: 'bytes',
      },
    ],
    name: 'signDocument',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'signatureCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferDocumentOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'docId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'newTitle',
        type: 'string',
      },
    ],
    name: 'updateDocument',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userDocuments',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const DocumentRWAContractByteCode =
  '608060405234801561000f575f5ffd5b50604051615d0e380380615d0e83398181016040528101906100319190610266565b806040518060400160405280600b81526020017f446f63756d656e745257410000000000000000000000000000000000000000008152506040518060400160405280600481526020017f4452574100000000000000000000000000000000000000000000000000000000815250815f90816100ac91906104ce565b5080600190816100bc91906104ce565b5050505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361012f575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161012691906105ac565b60405180910390fd5b61013e8161014560201b60201c565b50506105c5565b5f60075f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160075f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6102358261020c565b9050919050565b6102458161022b565b811461024f575f5ffd5b50565b5f815190506102608161023c565b92915050565b5f6020828403121561027b5761027a610208565b5b5f61028884828501610252565b91505092915050565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061030c57607f821691505b60208210810361031f5761031e6102c8565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026103817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610346565b61038b8683610346565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f6103cf6103ca6103c5846103a3565b6103ac565b6103a3565b9050919050565b5f819050919050565b6103e8836103b5565b6103fc6103f4826103d6565b848454610352565b825550505050565b5f5f905090565b610413610404565b61041e8184846103df565b505050565b5b81811015610441576104365f8261040b565b600181019050610424565b5050565b601f8211156104865761045781610325565b61046084610337565b8101602085101561046f578190505b61048361047b85610337565b830182610423565b50505b505050565b5f82821c905092915050565b5f6104a65f198460080261048b565b1980831691505092915050565b5f6104be8383610497565b9150826002028217905092915050565b6104d782610291565b67ffffffffffffffff8111156104f0576104ef61029b565b5b6104fa82546102f5565b610505828285610445565b5f60209050601f831160018114610536575f8415610524578287015190505b61052e85826104b3565b865550610595565b601f19841661054486610325565b5f5b8281101561056b57848901518255600182019150602085019450602081019050610546565b868310156105885784890151610584601f891682610497565b8355505b6001600288020188555050505b505050505050565b6105a68161022b565b82525050565b5f6020820190506105bf5f83018461059d565b92915050565b61573c806105d25f395ff3fe608060405234801561000f575f5ffd5b506004361061021a575f3560e01c806385f0daf411610123578063a5b16b2e116100ab578063c87b56dd1161007a578063c87b56dd1461068a578063d2b7a7e8146106ba578063e7f55ed6146106d6578063e985e9c5146106f4578063f2fde38b146107245761021a565b8063a5b16b2e146105fc578063b88d4fde1461061a578063c184c76614610636578063c2ed2b05146106525761021a565b80638fa6e32f116100f25780638fa6e32f1461054657806390a4b1621461057657806395d89b41146105a6578063a0fb1497146105c4578063a22cb465146105e05761021a565b806385f0daf4146104be57806388a2408e146104ee5780638b7ed38d1461050a5780638da5cb5b146105285761021a565b80633f9b250a116101a6578063628967011161017557806362896701146104065780636352211e1461042457806370a0823114610454578063715018a6146104845780637743007d1461048e5761021a565b80633f9b250a1461035857806342842e0e1461038a578063577a1b92146103a65780635df7e172146103d65761021a565b806315a09825116101ed57806315a09825146102b857806323b872dd146102d45780632acb4f62146102f05780633156d37c1461030c5780633e6d21fa146103285761021a565b806301ffc9a71461021e57806306fdde031461024e578063081812fc1461026c578063095ea7b31461029c575b5f5ffd5b61023860048036038101906102339190613fb3565b610740565b6040516102459190613ff8565b60405180910390f35b610256610751565b6040516102639190614081565b60405180910390f35b610286600480360381019061028191906140d4565b6107e0565b604051610293919061413e565b60405180910390f35b6102b660048036038101906102b19190614181565b6107fb565b005b6102d260048036038101906102cd91906141bf565b610811565b005b6102ee60048036038101906102e991906141fd565b610aed565b005b61030a600480360381019061030591906141bf565b610bec565b005b610326600480360381019061032191906141bf565b610f74565b005b610342600480360381019061033d91906141bf565b61146d565b60405161034f9190613ff8565b60405180910390f35b610372600480360381019061036d91906140d4565b611529565b6040516103819392919061425c565b60405180910390f35b6103a4600480360381019061039f91906141fd565b61165c565b005b6103c060048036038101906103bb9190614181565b61167b565b6040516103cd9190614298565b60405180910390f35b6103f060048036038101906103eb91906140d4565b6116a6565b6040516103fd9190614368565b60405180910390f35b61040e61179c565b60405161041b9190614298565b60405180910390f35b61043e600480360381019061043991906140d4565b6117a5565b60405161044b919061413e565b60405180910390f35b61046e60048036038101906104699190614388565b6117b6565b60405161047b9190614298565b60405180910390f35b61048c61186c565b005b6104a860048036038101906104a391906140d4565b61187f565b6040516104b59190614298565b60405180910390f35b6104d860048036038101906104d391906141bf565b6119b8565b6040516104e59190613ff8565b60405180910390f35b610508600480360381019061050391906144df565b611a22565b005b610512611c3c565b60405161051f9190614298565b60405180910390f35b610530611c45565b60405161053d919061413e565b60405180910390f35b610560600480360381019061055b91906141bf565b611c6d565b60405161056d9190613ff8565b60405180910390f35b610590600480360381019061058b9190614388565b611c97565b60405161059d919061464e565b60405180910390f35b6105ae611d2a565b6040516105bb9190614081565b60405180910390f35b6105de60048036038101906105d991906140d4565b611dba565b005b6105fa60048036038101906105f59190614698565b611f30565b005b610604611f46565b6040516106119190614298565b60405180910390f35b610634600480360381019061062f9190614774565b611f4c565b005b610650600480360381019061064b91906147f4565b611f71565b005b61066c600480360381019061066791906140d4565b6122e9565b6040516106819998979695949392919061484e565b60405180910390f35b6106a4600480360381019061069f91906140d4565b6124f0565b6040516106b19190614081565b60405180910390f35b6106d460048036038101906106cf91906148ee565b612502565b005b6106de612728565b6040516106eb9190614298565b60405180910390f35b61070e60048036038101906107099190614948565b61272e565b60405161071b9190613ff8565b60405180910390f35b61073e60048036038101906107399190614388565b6127bc565b005b5f61074a82612840565b9050919050565b60605f805461075f906149b3565b80601f016020809104026020016040519081016040528092919081815260200182805461078b906149b3565b80156107d65780601f106107ad576101008083540402835291602001916107d6565b820191905f5260205f20905b8154815290600101906020018083116107b957829003601f168201915b5050505050905090565b5f6107ea826128a0565b506107f482612926565b9050919050565b61080d828261080861295f565b612966565b5050565b813373ffffffffffffffffffffffffffffffffffffffff1660095f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146108b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108aa90614a2d565b60405180910390fd5b825f60095f8381526020019081526020015f205f015403610909576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161090090614a95565b60405180910390fd5b8360095f8281526020019081526020015f20600a015f9054906101000a900460ff1661096a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096190614afd565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036109d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109cf90614b65565b60405180910390fd5b60095f8681526020019081526020015f206007015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1615610a74576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6b90614bcd565b60405180910390fd5b60095f8681526020019081526020015f2060060184908060018154018082558091505060019003905f5260205f20015f9091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b5d575f6040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401610b54919061413e565b60405180910390fd5b5f610b708383610b6b61295f565b612978565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610be6578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401610bdd93929190614beb565b60405180910390fd5b50505050565b813373ffffffffffffffffffffffffffffffffffffffff1660095f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c8e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8590614a2d565b60405180910390fd5b825f60095f8381526020019081526020015f205f015403610ce4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cdb90614a95565b60405180910390fd5b8360095f8281526020019081526020015f20600a015f9054906101000a900460ff16610d45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3c90614afd565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610db3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610daa90614b65565b60405180910390fd5b60095f8681526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610e54576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4b90614c6a565b60405180910390fd5b5f60095f8781526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508460095f8881526020019081526020015f206001015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055504260095f8881526020019081526020015f2060090181905550610f01818688612b83565b610f0b8187612ceb565b600a5f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2086908060018154018082558091505060019003905f5260205f20015f9091909190915055505050505050565b813373ffffffffffffffffffffffffffffffffffffffff1660095f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611016576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161100d90614a2d565b60405180910390fd5b825f60095f8381526020019081526020015f205f01540361106c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161106390614a95565b60405180910390fd5b8360095f8281526020019081526020015f20600a015f9054906101000a900460ff166110cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110c490614afd565b60405180910390fd5b60095f8681526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361116e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161116590614cd2565b60405180910390fd5b60095f8681526020019081526020015f206007015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff16611209576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161120090614d3a565b60405180910390fd5b5f60095f8781526020019081526020015f2090505f5f90505b81600601805490508110156113a5578573ffffffffffffffffffffffffffffffffffffffff1682600601828154811061125e5761125d614d58565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036113985781600601600183600601805490506112b99190614db2565b815481106112ca576112c9614d58565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1682600601828154811061130857611307614d58565b5b905f5260205f20015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160060180548061136157611360614de5565b5b600190038181905f5260205f20015f6101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905590556113a5565b8080600101915050611222565b50806007015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1615611465575f816007015f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff021916908315150217905550600c5f81548092919061145f90614e12565b91905055505b505050505050565b5f825f60095f8381526020019081526020015f205f0154036114c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114bb90614a95565b60405180910390fd5b60095f8581526020019081526020015f206007015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff1691505092915050565b5f60605f835f60095f8381526020019081526020015f205f015403611583576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161157a90614a95565b60405180910390fd5b5f60095f8781526020019081526020015f209050805f015481600401826001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168180546115cf906149b3565b80601f01602080910402602001604051908101604052809291908181526020018280546115fb906149b3565b80156116465780601f1061161d57610100808354040283529160200191611646565b820191905f5260205f20905b81548152906001019060200180831161162957829003601f168201915b5050505050915094509450945050509193909250565b61167683838360405180602001604052805f815250611f4c565b505050565b600a602052815f5260405f208181548110611694575f80fd5b905f5260205f20015f91509150505481565b6060815f60095f8381526020019081526020015f205f0154036116fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116f590614a95565b60405180910390fd5b60095f8481526020019081526020015f2060060180548060200260200160405190810160405280929190818152602001828054801561178f57602002820191905f5260205f20905b815f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611746575b5050505050915050919050565b5f600b54905090565b5f6117af826128a0565b9050919050565b5f5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611827575f6040517f89c62b6400000000000000000000000000000000000000000000000000000000815260040161181e919061413e565b60405180910390fd5b60035f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b611874612de5565b61187d5f612e6c565b565b5f815f60095f8381526020019081526020015f205f0154036118d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118cd90614a95565b60405180910390fd5b5f5f90505f60095f8681526020019081526020015f2090505f5f90505b81600601805490508110156119ac57816007015f83600601838154811061191d5761191c614d58565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff161561199f57828061199b90614e39565b9350505b80806001019150506118f3565b50819350505050919050565b5f825f60095f8381526020019081526020015f205f015403611a0f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a0690614a95565b60405180910390fd5b611a198484612f2f565b91505092915050565b6003835110158015611a3657506064835111155b611a75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a6c90614eca565b60405180910390fd5b611a7e8261304c565b611a878161304c565b600b5f815480929190611a9990614e39565b91905055505f600b5490505f60095f8381526020019081526020015f20905081815f018190555033816001015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555085816002018190555084816003019081611b1c9190615088565b5083816004019081611b2e9190615088565b5082816005019081611b409190615088565b50428160080181905550428160090181905550600181600a015f6101000a81548160ff021916908315150217905550611b7933836130dc565b611b8382846131cf565b600a5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2082908060018154018082558091505060019003905f5260205f20015f9091909190915055853373ffffffffffffffffffffffffffffffffffffffff16837f8fbe142b84e164e88ec312bd2ff0c7385f8acf20bda99a09a42df245af408d9288604051611c2c9190614081565b60405180910390a4505050505050565b5f600c54905090565b5f60075f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6008602052815f5260405f20602052805f5260405f205f915091509054906101000a900460ff1681565b6060600a5f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20805480602002602001604051908101604052809291908181526020018280548015611d1e57602002820191905f5260205f20905b815481526020019060010190808311611d0a575b50505050509050919050565b606060018054611d39906149b3565b80601f0160208091040260200160405190810160405280929190818152602001828054611d65906149b3565b8015611db05780601f10611d8757610100808354040283529160200191611db0565b820191905f5260205f20905b815481529060010190602001808311611d9357829003601f168201915b5050505050905090565b803373ffffffffffffffffffffffffffffffffffffffff1660095f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611e5c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e5390614a2d565b60405180910390fd5b815f60095f8381526020019081526020015f205f015403611eb2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ea990614a95565b60405180910390fd5b5f60095f8581526020019081526020015f2090505f81600a015f6101000a81548160ff021916908315150217905550428160090181905550611ef384613229565b611efd3385612ceb565b837fc08b7a56159e39efd7fccb0b328575cefb8c5a4491e699e7ab22d84202a4e37360405160405180910390a250505050565b611f42611f3b61295f565b83836132ab565b5050565b600b5481565b611f57848484610aed565b611f6b611f6261295f565b85858585613414565b50505050565b815f60095f8381526020019081526020015f205f015403611fc7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fbe90614a95565b60405180910390fd5b8260095f8281526020019081526020015f20600a015f9054906101000a900460ff16612028576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161201f90614afd565b60405180910390fd5b6120328433612f2f565b612071576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612068906151a1565b60405180910390fd5b60095f8581526020019081526020015f206007015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff161561210d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161210490615209565b60405180910390fd5b5f8433426040516020016121239392919061528c565b6040516020818303038152906040528051906020012090505f61214682866135c0565b90503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146121b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121ad90615312565b60405180910390fd5b600160095f8881526020019081526020015f206007015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055504260095f8881526020019081526020015f2060090181905550600c5f81548092919061224890614e39565b91905055503373ffffffffffffffffffffffffffffffffffffffff16867f4f45c30875f552d4b5d0a40abede6e40cb9e3b5df6c24df5026d21f5417a7c7060405160405180910390a33373ffffffffffffffffffffffffffffffffffffffff16867f12d4d3cd59ebb5da91ea6747024efdbe6ee89789a97884bb2fa26255a6dc68cf60016040516122d99190613ff8565b60405180910390a3505050505050565b6009602052805f5260405f205f91509050805f015490806001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806002015490806003018054612339906149b3565b80601f0160208091040260200160405190810160405280929190818152602001828054612365906149b3565b80156123b05780601f10612387576101008083540402835291602001916123b0565b820191905f5260205f20905b81548152906001019060200180831161239357829003601f168201915b5050505050908060040180546123c5906149b3565b80601f01602080910402602001604051908101604052809291908181526020018280546123f1906149b3565b801561243c5780601f106124135761010080835404028352916020019161243c565b820191905f5260205f20905b81548152906001019060200180831161241f57829003601f168201915b505050505090806005018054612451906149b3565b80601f016020809104026020016040519081016040528092919081815260200182805461247d906149b3565b80156124c85780601f1061249f576101008083540402835291602001916124c8565b820191905f5260205f20905b8154815290600101906020018083116124ab57829003601f168201915b50505050509080600801549080600901549080600a015f9054906101000a900460ff16905089565b60606124fb826136e6565b9050919050565b813373ffffffffffffffffffffffffffffffffffffffff1660095f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146125a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161259b90614a2d565b60405180910390fd5b825f60095f8381526020019081526020015f205f0154036125fa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016125f190614a95565b60405180910390fd5b8360095f8281526020019081526020015f20600a015f9054906101000a900460ff1661265b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161265290614afd565b60405180910390fd5b600384511015801561266f57506064845111155b6126ae576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016126a590614eca565b60405180910390fd5b8360095f8781526020019081526020015f2060030190816126cf9190615088565b504260095f8781526020019081526020015f2060090181905550847f20297096221fa45cf89de8bdcc534356afd5568db828d81dc1612863edcc115d856040516127199190614081565b60405180910390a25050505050565b600c5481565b5f60055f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f9054906101000a900460ff16905092915050565b6127c4612de5565b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612834575f6040517f1e4fbdf700000000000000000000000000000000000000000000000000000000815260040161282b919061413e565b60405180910390fd5b61283d81612e6c565b50565b5f634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806128995750612898826137f1565b5b9050919050565b5f5f6128ab836138d2565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361291d57826040517f7e2732890000000000000000000000000000000000000000000000000000000081526004016129149190614298565b60405180910390fd5b80915050919050565b5f60045f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b5f33905090565b612973838383600161390b565b505050565b5f5f612983846138d2565b90505f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146129c4576129c3818486613aca565b5b5f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612a4f57612a035f855f5f61390b565b600160035f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825403925050819055505b5f73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614612ace57600160035f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8460025f8681526020019081526020015f205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603612bf3575f6040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401612bea919061413e565b60405180910390fd5b5f612bff83835f612978565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603612c7157816040517f7e273289000000000000000000000000000000000000000000000000000000008152600401612c689190614298565b60405180910390fd5b8373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614612ce5578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401612cdc93929190614beb565b60405180910390fd5b50505050565b5f600a5f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2090505f5f90505b8180549050811015612ddf5782828281548110612d5057612d4f614d58565b5b905f5260205f20015403612dd2578160018380549050612d709190614db2565b81548110612d8157612d80614d58565b5b905f5260205f200154828281548110612d9d57612d9c614d58565b5b905f5260205f20018190555081805480612dba57612db9614de5565b5b600190038181905f5260205f20015f90559055612ddf565b8080600101915050612d30565b50505050565b612ded61295f565b73ffffffffffffffffffffffffffffffffffffffff16612e0b611c45565b73ffffffffffffffffffffffffffffffffffffffff1614612e6a57612e2e61295f565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401612e61919061413e565b60405180910390fd5b565b5f60075f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508160075f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b5f5f60095f8581526020019081526020015f209050806001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603612fa4576001915050613046565b5f5f90505b8160060180549050811015613040578373ffffffffffffffffffffffffffffffffffffffff16826006018281548110612fe557612fe4614d58565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff160361303357600192505050613046565b8080600101915050612fa9565b505f9150505b92915050565b5f8190505f815111613093576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161308a9061537a565b60405180910390fd5b6080815111156130d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016130cf906153e2565b60405180910390fd5b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361314c575f6040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401613143919061413e565b60405180910390fd5b5f61315883835f612978565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146131ca575f6040517f73c6ac6e0000000000000000000000000000000000000000000000000000000081526004016131c1919061413e565b60405180910390fd5b505050565b8060065f8481526020019081526020015f2090816131ed9190615088565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce78260405161321d9190614298565b60405180910390a15050565b5f6132355f835f612978565b90505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036132a757816040517f7e27328900000000000000000000000000000000000000000000000000000000815260040161329e9190614298565b60405180910390fd5b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361331b57816040517f5b08ba18000000000000000000000000000000000000000000000000000000008152600401613312919061413e565b60405180910390fd5b8060055f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f6101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516134079190613ff8565b60405180910390a3505050565b5f8373ffffffffffffffffffffffffffffffffffffffff163b11156135b9578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02868685856040518563ffffffff1660e01b81526004016134729493929190615452565b6020604051808303815f875af19250505080156134ad57506040513d601f19601f820116820180604052508101906134aa91906154b0565b60015b61352e573d805f81146134db576040519150601f19603f3d011682016040523d82523d5f602084013e6134e0565b606091505b505f81510361352657836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161351d919061413e565b60405180910390fd5b805160208201fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146135b757836040517f64a0ae920000000000000000000000000000000000000000000000000000000081526004016135ae919061413e565b60405180910390fd5b505b5050505050565b5f6041825114613605576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016135fc90615525565b60405180910390fd5b5f5f5f602085015192506040850151915060608501515f1a9050601b8160ff16101561363b57601b81613638919061554f565b90505b601b8160ff1614806136505750601c8160ff16145b61368f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401613686906155cd565b60405180910390fd5b6001868285856040515f81526020016040526040516136b19493929190615612565b6020604051602081039080840390855afa1580156136d1573d5f5f3e3d5ffd5b50505060206040510351935050505092915050565b60606136f1826128a0565b505f60065f8481526020019081526020015f20805461370f906149b3565b80601f016020809104026020016040519081016040528092919081815260200182805461373b906149b3565b80156137865780601f1061375d57610100808354040283529160200191613786565b820191905f5260205f20905b81548152906001019060200180831161376957829003601f168201915b505050505090505f613796613b8d565b90505f8151036137aa5781925050506137ec565b5f825111156137de5780826040516020016137c692919061568f565b604051602081830303815290604052925050506137ec565b6137e784613ba3565b925050505b919050565b5f7f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806138bb57507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806138cb57506138ca82613c09565b5b9050919050565b5f60025f8381526020019081526020015f205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b808061394357505f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b15613a75575f613952846128a0565b90505f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141580156139bc57508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b80156139cf57506139cd818461272e565b155b15613a1157826040517fa9fbf51f000000000000000000000000000000000000000000000000000000008152600401613a08919061413e565b60405180910390fd5b8115613a7357838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b8360045f8581526020019081526020015f205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b613ad5838383613c72565b613b88575f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603613b4957806040517f7e273289000000000000000000000000000000000000000000000000000000008152600401613b409190614298565b60405180910390fd5b81816040517f177e802f000000000000000000000000000000000000000000000000000000008152600401613b7f9291906156b2565b60405180910390fd5b505050565b606060405180602001604052805f815250905090565b6060613bae826128a0565b505f613bb8613b8d565b90505f815111613bd65760405180602001604052805f815250613c01565b80613be084613d32565b604051602001613bf192919061568f565b6040516020818303038152906040525b915050919050565b5f7f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b5f5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614158015613d2957508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480613cea5750613ce9848461272e565b5b80613d2857508273ffffffffffffffffffffffffffffffffffffffff16613d1083612926565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b60605f6001613d4084613dfc565b0190505f8167ffffffffffffffff811115613d5e57613d5d6143bb565b5b6040519080825280601f01601f191660200182016040528015613d905781602001600182028036833780820191505090505b5090505f82602083010190505b600115613df1578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581613de657613de56156d9565b5b0494505f8503613d9d575b819350505050919050565b5f5f5f90507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310613e58577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381613e4e57613e4d6156d9565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310613e95576d04ee2d6d415b85acef81000000008381613e8b57613e8a6156d9565b5b0492506020810190505b662386f26fc100008310613ec457662386f26fc100008381613eba57613eb96156d9565b5b0492506010810190505b6305f5e1008310613eed576305f5e1008381613ee357613ee26156d9565b5b0492506008810190505b6127108310613f12576127108381613f0857613f076156d9565b5b0492506004810190505b60648310613f355760648381613f2b57613f2a6156d9565b5b0492506002810190505b600a8310613f44576001810190505b80915050919050565b5f604051905090565b5f5ffd5b5f5ffd5b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b613f9281613f5e565b8114613f9c575f5ffd5b50565b5f81359050613fad81613f89565b92915050565b5f60208284031215613fc857613fc7613f56565b5b5f613fd584828501613f9f565b91505092915050565b5f8115159050919050565b613ff281613fde565b82525050565b5f60208201905061400b5f830184613fe9565b92915050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f61405382614011565b61405d818561401b565b935061406d81856020860161402b565b61407681614039565b840191505092915050565b5f6020820190508181035f8301526140998184614049565b905092915050565b5f819050919050565b6140b3816140a1565b81146140bd575f5ffd5b50565b5f813590506140ce816140aa565b92915050565b5f602082840312156140e9576140e8613f56565b5b5f6140f6848285016140c0565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f614128826140ff565b9050919050565b6141388161411e565b82525050565b5f6020820190506141515f83018461412f565b92915050565b6141608161411e565b811461416a575f5ffd5b50565b5f8135905061417b81614157565b92915050565b5f5f6040838503121561419757614196613f56565b5b5f6141a48582860161416d565b92505060206141b5858286016140c0565b9150509250929050565b5f5f604083850312156141d5576141d4613f56565b5b5f6141e2858286016140c0565b92505060206141f38582860161416d565b9150509250929050565b5f5f5f6060848603121561421457614213613f56565b5b5f6142218682870161416d565b93505060206142328682870161416d565b9250506040614243868287016140c0565b9150509250925092565b614256816140a1565b82525050565b5f60608201905061426f5f83018661424d565b81810360208301526142818185614049565b9050614290604083018461412f565b949350505050565b5f6020820190506142ab5f83018461424d565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b6142e38161411e565b82525050565b5f6142f483836142da565b60208301905092915050565b5f602082019050919050565b5f614316826142b1565b61432081856142bb565b935061432b836142cb565b805f5b8381101561435b57815161434288826142e9565b975061434d83614300565b92505060018101905061432e565b5085935050505092915050565b5f6020820190508181035f830152614380818461430c565b905092915050565b5f6020828403121561439d5761439c613f56565b5b5f6143aa8482850161416d565b91505092915050565b5f5ffd5b5f5ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6143f182614039565b810181811067ffffffffffffffff821117156144105761440f6143bb565b5b80604052505050565b5f614422613f4d565b905061442e82826143e8565b919050565b5f67ffffffffffffffff82111561444d5761444c6143bb565b5b61445682614039565b9050602081019050919050565b828183375f83830152505050565b5f61448361447e84614433565b614419565b90508281526020810184848401111561449f5761449e6143b7565b5b6144aa848285614463565b509392505050565b5f82601f8301126144c6576144c56143b3565b5b81356144d6848260208601614471565b91505092915050565b5f5f5f5f608085870312156144f7576144f6613f56565b5b5f614504878288016140c0565b945050602085013567ffffffffffffffff81111561452557614524613f5a565b5b614531878288016144b2565b935050604085013567ffffffffffffffff81111561455257614551613f5a565b5b61455e878288016144b2565b925050606085013567ffffffffffffffff81111561457f5761457e613f5a565b5b61458b878288016144b2565b91505092959194509250565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b6145c9816140a1565b82525050565b5f6145da83836145c0565b60208301905092915050565b5f602082019050919050565b5f6145fc82614597565b61460681856145a1565b9350614611836145b1565b805f5b8381101561464157815161462888826145cf565b9750614633836145e6565b925050600181019050614614565b5085935050505092915050565b5f6020820190508181035f83015261466681846145f2565b905092915050565b61467781613fde565b8114614681575f5ffd5b50565b5f813590506146928161466e565b92915050565b5f5f604083850312156146ae576146ad613f56565b5b5f6146bb8582860161416d565b92505060206146cc85828601614684565b9150509250929050565b5f67ffffffffffffffff8211156146f0576146ef6143bb565b5b6146f982614039565b9050602081019050919050565b5f614718614713846146d6565b614419565b905082815260208101848484011115614734576147336143b7565b5b61473f848285614463565b509392505050565b5f82601f83011261475b5761475a6143b3565b5b813561476b848260208601614706565b91505092915050565b5f5f5f5f6080858703121561478c5761478b613f56565b5b5f6147998782880161416d565b94505060206147aa8782880161416d565b93505060406147bb878288016140c0565b925050606085013567ffffffffffffffff8111156147dc576147db613f5a565b5b6147e887828801614747565b91505092959194509250565b5f5f6040838503121561480a57614809613f56565b5b5f614817858286016140c0565b925050602083013567ffffffffffffffff81111561483857614837613f5a565b5b61484485828601614747565b9150509250929050565b5f610120820190506148625f83018c61424d565b61486f602083018b61412f565b61487c604083018a61424d565b818103606083015261488e8189614049565b905081810360808301526148a28188614049565b905081810360a08301526148b68187614049565b90506148c560c083018661424d565b6148d260e083018561424d565b6148e0610100830184613fe9565b9a9950505050505050505050565b5f5f6040838503121561490457614903613f56565b5b5f614911858286016140c0565b925050602083013567ffffffffffffffff81111561493257614931613f5a565b5b61493e858286016144b2565b9150509250929050565b5f5f6040838503121561495e5761495d613f56565b5b5f61496b8582860161416d565b925050602061497c8582860161416d565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806149ca57607f821691505b6020821081036149dd576149dc614986565b5b50919050565b7f4f6e6c7920646f63756d656e74206f776e6572000000000000000000000000005f82015250565b5f614a1760138361401b565b9150614a22826149e3565b602082019050919050565b5f6020820190508181035f830152614a4481614a0b565b9050919050565b7f446f63756d656e74206e6f7420666f756e6400000000000000000000000000005f82015250565b5f614a7f60128361401b565b9150614a8a82614a4b565b602082019050919050565b5f6020820190508181035f830152614aac81614a73565b9050919050565b7f446f63756d656e74206973206e6f7420616374697665000000000000000000005f82015250565b5f614ae760168361401b565b9150614af282614ab3565b602082019050919050565b5f6020820190508181035f830152614b1481614adb565b9050919050565b7f496e76616c6964206164647265737300000000000000000000000000000000005f82015250565b5f614b4f600f8361401b565b9150614b5a82614b1b565b602082019050919050565b5f6020820190508181035f830152614b7c81614b43565b9050919050565b7f416c72656164792061207369676e6572000000000000000000000000000000005f82015250565b5f614bb760108361401b565b9150614bc282614b83565b602082019050919050565b5f6020820190508181035f830152614be481614bab565b9050919050565b5f606082019050614bfe5f83018661412f565b614c0b602083018561424d565b614c18604083018461412f565b949350505050565b7f416c7265616479206f776e6572000000000000000000000000000000000000005f82015250565b5f614c54600d8361401b565b9150614c5f82614c20565b602082019050919050565b5f6020820190508181035f830152614c8181614c48565b9050919050565b7f43616e6e6f742072656d6f7665206f776e6572206173207369676e65720000005f82015250565b5f614cbc601d8361401b565b9150614cc782614c88565b602082019050919050565b5f6020820190508181035f830152614ce981614cb0565b9050919050565b7f4e6f742061207369676e657200000000000000000000000000000000000000005f82015250565b5f614d24600c8361401b565b9150614d2f82614cf0565b602082019050919050565b5f6020820190508181035f830152614d5181614d18565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f614dbc826140a1565b9150614dc7836140a1565b9250828203905081811115614ddf57614dde614d85565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603160045260245ffd5b5f614e1c826140a1565b91505f8203614e2e57614e2d614d85565b5b600182039050919050565b5f614e43826140a1565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203614e7557614e74614d85565b5b600182019050919050565b7f5469746c65206d75737420626520332d313030206368617261637465727300005f82015250565b5f614eb4601e8361401b565b9150614ebf82614e80565b602082019050919050565b5f6020820190508181035f830152614ee181614ea8565b9050919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302614f447fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82614f09565b614f4e8683614f09565b95508019841693508086168417925050509392505050565b5f819050919050565b5f614f89614f84614f7f846140a1565b614f66565b6140a1565b9050919050565b5f819050919050565b614fa283614f6f565b614fb6614fae82614f90565b848454614f15565b825550505050565b5f5f905090565b614fcd614fbe565b614fd8818484614f99565b505050565b5b81811015614ffb57614ff05f82614fc5565b600181019050614fde565b5050565b601f8211156150405761501181614ee8565b61501a84614efa565b81016020851015615029578190505b61503d61503585614efa565b830182614fdd565b50505b505050565b5f82821c905092915050565b5f6150605f1984600802615045565b1980831691505092915050565b5f6150788383615051565b9150826002028217905092915050565b61509182614011565b67ffffffffffffffff8111156150aa576150a96143bb565b5b6150b482546149b3565b6150bf828285614fff565b5f60209050601f8311600181146150f0575f84156150de578287015190505b6150e8858261506d565b86555061514f565b601f1984166150fe86614ee8565b5f5b8281101561512557848901518255600182019150602085019450602081019050615100565b86831015615142578489015161513e601f891682615051565b8355505b6001600288020188555050505b505050505050565b7f4e6f7420617574686f72697a6564207369676e657200000000000000000000005f82015250565b5f61518b60158361401b565b915061519682615157565b602082019050919050565b5f6020820190508181035f8301526151b88161517f565b9050919050565b7f416c7265616479207369676e65640000000000000000000000000000000000005f82015250565b5f6151f3600e8361401b565b91506151fe826151bf565b602082019050919050565b5f6020820190508181035f830152615220816151e7565b9050919050565b5f819050919050565b61524161523c826140a1565b615227565b82525050565b5f8160601b9050919050565b5f61525d82615247565b9050919050565b5f61526e82615253565b9050919050565b6152866152818261411e565b615264565b82525050565b5f6152978286615230565b6020820191506152a78285615275565b6014820191506152b78284615230565b602082019150819050949350505050565b7f496e76616c6964207369676e61747572650000000000000000000000000000005f82015250565b5f6152fc60118361401b565b9150615307826152c8565b602082019050919050565b5f6020820190508181035f830152615329816152f0565b9050919050565b7f4950465320686173682063616e6e6f7420626520656d707479000000000000005f82015250565b5f61536460198361401b565b915061536f82615330565b602082019050919050565b5f6020820190508181035f83015261539181615358565b9050919050565b7f49504653206861736820746f6f206c6f6e6700000000000000000000000000005f82015250565b5f6153cc60128361401b565b91506153d782615398565b602082019050919050565b5f6020820190508181035f8301526153f9816153c0565b9050919050565b5f81519050919050565b5f82825260208201905092915050565b5f61542482615400565b61542e818561540a565b935061543e81856020860161402b565b61544781614039565b840191505092915050565b5f6080820190506154655f83018761412f565b615472602083018661412f565b61547f604083018561424d565b8181036060830152615491818461541a565b905095945050505050565b5f815190506154aa81613f89565b92915050565b5f602082840312156154c5576154c4613f56565b5b5f6154d28482850161549c565b91505092915050565b7f496e76616c6964207369676e6174757265206c656e67746800000000000000005f82015250565b5f61550f60188361401b565b915061551a826154db565b602082019050919050565b5f6020820190508181035f83015261553c81615503565b9050919050565b5f60ff82169050919050565b5f61555982615543565b915061556483615543565b9250828201905060ff81111561557d5761557c614d85565b5b92915050565b7f496e76616c6964207369676e61747572652076657273696f6e000000000000005f82015250565b5f6155b760198361401b565b91506155c282615583565b602082019050919050565b5f6020820190508181035f8301526155e4816155ab565b9050919050565b5f819050919050565b6155fd816155eb565b82525050565b61560c81615543565b82525050565b5f6080820190506156255f8301876155f4565b6156326020830186615603565b61563f60408301856155f4565b61564c60608301846155f4565b95945050505050565b5f81905092915050565b5f61566982614011565b6156738185615655565b935061568381856020860161402b565b80840191505092915050565b5f61569a828561565f565b91506156a6828461565f565b91508190509392505050565b5f6040820190506156c55f83018561412f565b6156d2602083018461424d565b9392505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601260045260245ffdfea26469706673582212202d484257595fbba942d30da0f13dd35bc67e55b08023774ac1fc2e387d38e9a464736f6c634300081e0033'

export const UserProfileContractABI = [
  {
    inputs: [],
    name: 'InvalidAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidUsername',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ProfileNotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UsernameTaken',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
    ],
    name: 'ProfileCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'field',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'ProfileUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'ProfileVerified',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
    ],
    name: 'createProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'field',
        type: 'string',
      },
    ],
    name: 'getCustomData',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
    ],
    name: 'getProfile',
    outputs: [
      {
        internalType: 'address',
        name: 'walletAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'linkedinProfile',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'verified',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
    ],
    name: 'getProfileByUsername',
    outputs: [
      {
        internalType: 'address',
        name: 'walletAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'linkedinProfile',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'verified',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
    ],
    name: 'isUsernameAvailable',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'profileCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'profiles',
    outputs: [
      {
        internalType: 'address',
        name: 'wallet',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'email',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'linkedinProfile',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'verified',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'field',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'updateProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    name: 'usernameToAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'verifyProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const UserProfileContractByteCode =
  '6080604052348015600e575f5ffd5b5061255a8061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061009c575f3560e01c8063c9d3cc6a11610064578063c9d3cc6a1461018a578063e0eb5286146101a6578063ef43acef146101b0578063f69c6dec146101ce578063f825f143146101fe5761009c565b80630f53a470146100a05780635513802c146100d5578063aac13dca14610109578063ba1feb8a14610139578063bbe1562714610155575b5f5ffd5b6100ba60048036038101906100b59190611897565b61022e565b6040516100cc96959493929190611973565b60405180910390f35b6100ef60048036038101906100ea9190611b13565b6104fe565b604051610100959493929190611b5a565b60405180910390f35b610123600480360381019061011e9190611bb9565b61075c565b6040516101309190611c13565b60405180910390f35b610153600480360381019061014e9190611c33565b610913565b005b61016f600480360381019061016a9190611897565b610c73565b60405161018196959493929190611973565b60405180910390f35b6101a4600480360381019061019f9190611c33565b610e67565b005b6101ae611330565b005b6101b8611593565b6040516101c59190611ca9565b60405180910390f35b6101e860048036038101906101e39190611b13565b611599565b6040516101f59190611cc2565b60405180910390f35b61021860048036038101906102139190611b13565b61160d565b6040516102259190611cdb565b60405180910390f35b5f60608060605f5f5f5f5f8973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2090505f73ffffffffffffffffffffffffffffffffffffffff16815f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610305576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102fc90611d3e565b60405180910390fd5b805f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16816001018260020183600301846004015f9054906101000a900460ff16856005015484805461035690611d89565b80601f016020809104026020016040519081016040528092919081815260200182805461038290611d89565b80156103cd5780601f106103a4576101008083540402835291602001916103cd565b820191905f5260205f20905b8154815290600101906020018083116103b057829003601f168201915b505050505094508380546103e090611d89565b80601f016020809104026020016040519081016040528092919081815260200182805461040c90611d89565b80156104575780601f1061042e57610100808354040283529160200191610457565b820191905f5260205f20905b81548152906001019060200180831161043a57829003601f168201915b5050505050935082805461046a90611d89565b80601f016020809104026020016040519081016040528092919081815260200182805461049690611d89565b80156104e15780601f106104b8576101008083540402835291602001916104e1565b820191905f5260205f20905b8154815290600101906020018083116104c457829003601f168201915b505050505092509650965096509650965096505091939550919395565b5f6060805f5f5f6001876040516105159190611df3565b90815260200160405180910390205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105b3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105aa90611e53565b60405180910390fd5b5f5f5f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f209050805f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160020182600301836004015f9054906101000a900460ff16846005015483805461063f90611d89565b80601f016020809104026020016040519081016040528092919081815260200182805461066b90611d89565b80156106b65780601f1061068d576101008083540402835291602001916106b6565b820191905f5260205f20905b81548152906001019060200180831161069957829003601f168201915b505050505093508280546106c990611d89565b80601f01602080910402602001604051908101604052809291908181526020018280546106f590611d89565b80156107405780601f1061071757610100808354040283529160200191610740565b820191905f5260205f20905b81548152906001019060200180831161072357829003601f168201915b5050505050925096509650965096509650505091939590929450565b60605f73ffffffffffffffffffffffffffffffffffffffff165f5f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610829576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082090611d3e565b60405180910390fd5b5f5f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20600601826040516108769190611df3565b9081526020016040518091039020805461088f90611d89565b80601f01602080910402602001604051908101604052809291908181526020018280546108bb90611d89565b80156109065780601f106108dd57610100808354040283529160200191610906565b820191905f5260205f20905b8154815290600101906020018083116108e957829003601f168201915b5050505050905092915050565b5f73ffffffffffffffffffffffffffffffffffffffff165f5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146109de576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109d590611ebb565b60405180910390fd5b60038251101580156109f25750601e825111155b610a31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a2890611f23565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff16600183604051610a589190611df3565b90815260200160405180910390205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610adc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ad390611f8b565b60405180910390fd5b610ae582611655565b5f5f5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20905033815f015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082816001019081610b769190612149565b5081816002019081610b889190612149565b505f816004015f6101000a81548160ff02191690831515021790555042816005018190555033600184604051610bbe9190611df3565b90815260200160405180910390205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060025f815480929190610c1b90612245565b91905055503373ffffffffffffffffffffffffffffffffffffffff167fbafddecbd1dec1c1afb76d693f1de16901f521bdf29a02438e3e6806c0b8d94884604051610c669190611c13565b60405180910390a2505050565b5f602052805f5260405f205f91509050805f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806001018054610cb690611d89565b80601f0160208091040260200160405190810160405280929190818152602001828054610ce290611d89565b8015610d2d5780601f10610d0457610100808354040283529160200191610d2d565b820191905f5260205f20905b815481529060010190602001808311610d1057829003601f168201915b505050505090806002018054610d4290611d89565b80601f0160208091040260200160405190810160405280929190818152602001828054610d6e90611d89565b8015610db95780601f10610d9057610100808354040283529160200191610db9565b820191905f5260205f20905b815481529060010190602001808311610d9c57829003601f168201915b505050505090806003018054610dce90611d89565b80601f0160208091040260200160405190810160405280929190818152602001828054610dfa90611d89565b8015610e455780601f10610e1c57610100808354040283529160200191610e45565b820191905f5260205f20905b815481529060010190602001808311610e2857829003601f168201915b505050505090806004015f9054906101000a900460ff16908060050154905086565b335f73ffffffffffffffffffffffffffffffffffffffff165f5f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610f33576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f2a906122d6565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610fa1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f989061233e565b60405180910390fd5b5f5f5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2090506040518060400160405280600881526020017f757365726e616d65000000000000000000000000000000000000000000000000815250805190602001208480519060200120036111e7575f73ffffffffffffffffffffffffffffffffffffffff166001846040516110519190611df3565b90815260200160405180910390205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146110d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110cc90611f8b565b60405180910390fd5b60038351101580156110e95750601e835111155b611128576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111f90611f23565b60405180910390fd5b61113183611655565b60018160010160405161114491906123dc565b90815260200160405180910390205f6101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055828160010190816111859190612149565b50336001846040516111979190611df3565b90815260200160405180910390205f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506112da565b6040518060400160405280600581526020017f656d61696c0000000000000000000000000000000000000000000000000000008152508051906020012084805190602001200361124857828160020190816112429190612149565b506112d9565b6040518060400160405280600f81526020017f6c696e6b6564696e50726f66696c650000000000000000000000000000000000815250805190602001208480519060200120036112a957828160030190816112a39190612149565b506112d8565b8281600601856040516112bc9190611df3565b908152602001604051809103902090816112d69190612149565b505b5b5b3373ffffffffffffffffffffffffffffffffffffffff167f6eb3a1c6a4675ba92d44e090515b1ceea358f26565d2854df0c99c3f5eaf985085856040516113229291906123f2565b60405180910390a250505050565b335f73ffffffffffffffffffffffffffffffffffffffff165f5f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036113fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113f3906122d6565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461146a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114619061233e565b60405180910390fd5b5f5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f206004015f9054906101000a900460ff16156114f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114ed90612471565b60405180910390fd5b60015f5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f206004015f6101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff167ff5b72f6f3bcef5d31717c3965dcb7239629b10b6ad3bd9b99ec3ca4dced745e460405160405180910390a250565b60025481565b5f5f73ffffffffffffffffffffffffffffffffffffffff166001836040516115c19190611df3565b90815260200160405180910390205f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050919050565b6001818051602081018201805184825260208301602085012081835280955050505050505f915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f8190505f5f90505b8151811015611827575f82828151811061167b5761167a61248f565b5b602001015160f81c60f81b9050603060f81b817effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916101580156116e45750603960f81b817effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191611155b806117475750604160f81b817effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916101580156117465750605a60f81b817effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191611155b5b806117aa5750606160f81b817effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916101580156117a95750607a60f81b817effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191611155b5b806117da5750605f60f81b817effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b611819576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161181090612506565b60405180910390fd5b50808060010191505061165e565b505050565b5f604051905090565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6118668261183d565b9050919050565b6118768161185c565b8114611880575f5ffd5b50565b5f813590506118918161186d565b92915050565b5f602082840312156118ac576118ab611835565b5b5f6118b984828501611883565b91505092915050565b6118cb8161185c565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f611913826118d1565b61191d81856118db565b935061192d8185602086016118eb565b611936816118f9565b840191505092915050565b5f8115159050919050565b61195581611941565b82525050565b5f819050919050565b61196d8161195b565b82525050565b5f60c0820190506119865f8301896118c2565b81810360208301526119988188611909565b905081810360408301526119ac8187611909565b905081810360608301526119c08186611909565b90506119cf608083018561194c565b6119dc60a0830184611964565b979650505050505050565b5f5ffd5b5f5ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b611a25826118f9565b810181811067ffffffffffffffff82111715611a4457611a436119ef565b5b80604052505050565b5f611a5661182c565b9050611a628282611a1c565b919050565b5f67ffffffffffffffff821115611a8157611a806119ef565b5b611a8a826118f9565b9050602081019050919050565b828183375f83830152505050565b5f611ab7611ab284611a67565b611a4d565b905082815260208101848484011115611ad357611ad26119eb565b5b611ade848285611a97565b509392505050565b5f82601f830112611afa57611af96119e7565b5b8135611b0a848260208601611aa5565b91505092915050565b5f60208284031215611b2857611b27611835565b5b5f82013567ffffffffffffffff811115611b4557611b44611839565b5b611b5184828501611ae6565b91505092915050565b5f60a082019050611b6d5f8301886118c2565b8181036020830152611b7f8187611909565b90508181036040830152611b938186611909565b9050611ba2606083018561194c565b611baf6080830184611964565b9695505050505050565b5f5f60408385031215611bcf57611bce611835565b5b5f611bdc85828601611883565b925050602083013567ffffffffffffffff811115611bfd57611bfc611839565b5b611c0985828601611ae6565b9150509250929050565b5f6020820190508181035f830152611c2b8184611909565b905092915050565b5f5f60408385031215611c4957611c48611835565b5b5f83013567ffffffffffffffff811115611c6657611c65611839565b5b611c7285828601611ae6565b925050602083013567ffffffffffffffff811115611c9357611c92611839565b5b611c9f85828601611ae6565b9150509250929050565b5f602082019050611cbc5f830184611964565b92915050565b5f602082019050611cd55f83018461194c565b92915050565b5f602082019050611cee5f8301846118c2565b92915050565b7f50726f66696c65206e6f7420666f756e640000000000000000000000000000005f82015250565b5f611d286011836118db565b9150611d3382611cf4565b602082019050919050565b5f6020820190508181035f830152611d5581611d1c565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680611da057607f821691505b602082108103611db357611db2611d5c565b5b50919050565b5f81905092915050565b5f611dcd826118d1565b611dd78185611db9565b9350611de78185602086016118eb565b80840191505092915050565b5f611dfe8284611dc3565b915081905092915050565b7f557365726e616d65206e6f7420666f756e6400000000000000000000000000005f82015250565b5f611e3d6012836118db565b9150611e4882611e09565b602082019050919050565b5f6020820190508181035f830152611e6a81611e31565b9050919050565b7f50726f66696c6520616c726561647920657869737473000000000000000000005f82015250565b5f611ea56016836118db565b9150611eb082611e71565b602082019050919050565b5f6020820190508181035f830152611ed281611e99565b9050919050565b7f557365726e616d65206d75737420626520332d333020636861726163746572735f82015250565b5f611f0d6020836118db565b9150611f1882611ed9565b602082019050919050565b5f6020820190508181035f830152611f3a81611f01565b9050919050565b7f557365726e616d6520616c72656164792074616b656e000000000000000000005f82015250565b5f611f756016836118db565b9150611f8082611f41565b602082019050919050565b5f6020820190508181035f830152611fa281611f69565b9050919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026120057fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611fca565b61200f8683611fca565b95508019841693508086168417925050509392505050565b5f819050919050565b5f61204a6120456120408461195b565b612027565b61195b565b9050919050565b5f819050919050565b61206383612030565b61207761206f82612051565b848454611fd6565b825550505050565b5f5f905090565b61208e61207f565b61209981848461205a565b505050565b5b818110156120bc576120b15f82612086565b60018101905061209f565b5050565b601f821115612101576120d281611fa9565b6120db84611fbb565b810160208510156120ea578190505b6120fe6120f685611fbb565b83018261209e565b50505b505050565b5f82821c905092915050565b5f6121215f1984600802612106565b1980831691505092915050565b5f6121398383612112565b9150826002028217905092915050565b612152826118d1565b67ffffffffffffffff81111561216b5761216a6119ef565b5b6121758254611d89565b6121808282856120c0565b5f60209050601f8311600181146121b1575f841561219f578287015190505b6121a9858261212e565b865550612210565b601f1984166121bf86611fa9565b5f5b828110156121e6578489015182556001820191506020850194506020810190506121c1565b8683101561220357848901516121ff601f891682612112565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61224f8261195b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361228157612280612218565b5b600182019050919050565b7f50726f66696c6520646f6573206e6f74206578697374000000000000000000005f82015250565b5f6122c06016836118db565b91506122cb8261228c565b602082019050919050565b5f6020820190508181035f8301526122ed816122b4565b9050919050565b7f556e617574686f72697a656400000000000000000000000000000000000000005f82015250565b5f612328600c836118db565b9150612333826122f4565b602082019050919050565b5f6020820190508181035f8301526123558161231c565b9050919050565b5f815461236881611d89565b6123728186611db9565b9450600182165f811461238c57600181146123a1576123d3565b60ff19831686528115158202860193506123d3565b6123aa85611fa9565b5f5b838110156123cb578154818901526001820191506020810190506123ac565b838801955050505b50505092915050565b5f6123e7828461235c565b915081905092915050565b5f6040820190508181035f83015261240a8185611909565b9050818103602083015261241e8184611909565b90509392505050565b7f50726f66696c6520616c726561647920766572696669656400000000000000005f82015250565b5f61245b6018836118db565b915061246682612427565b602082019050919050565b5f6020820190508181035f8301526124888161244f565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b7f496e76616c696420757365726e616d65206368617261637465720000000000005f82015250565b5f6124f0601a836118db565b91506124fb826124bc565b602082019050919050565b5f6020820190508181035f83015261251d816124e4565b905091905056fea26469706673582212209f23022c4b2da28c58bcc92a1c13698f63aa6bc947926a5acf5d76bda322428664736f6c634300081e0033'

export const OrganizationContractABI = [
  {
    inputs: [],
    name: 'AlreadyMember',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidOrganizationName',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidRole',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotMember',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OnlyOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OrganizationNotFound',
    type: 'error',
  },
  {
    inputs: [],
    name: 'Unauthorized',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'role',
        type: 'uint256',
      },
    ],
    name: 'MemberAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
    ],
    name: 'MemberRemoved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newRole',
        type: 'uint256',
      },
    ],
    name: 'MemberRoleChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    name: 'OrganizationCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
    ],
    name: 'OrganizationDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'field',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'OrganizationUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'ROLE_ADMIN',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROLE_MEMBER',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ROLE_OWNER',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'role',
        type: 'uint256',
      },
    ],
    name: 'addMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'newRole',
        type: 'uint256',
      },
    ],
    name: 'changeMemberRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
    ],
    name: 'createOrganization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
    ],
    name: 'deleteOrganization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getActiveOrganizationCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
    ],
    name: 'getMemberRole',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
    ],
    name: 'getOrganization',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'address[]',
        name: 'members',
        type: 'address[]',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
    ],
    name: 'getOrganizationMembers',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserOrganizations',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
    ],
    name: 'isMember',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'orgMemberRoles',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'organizationCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'organizations',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'isActive',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'member',
        type: 'address',
      },
    ],
    name: 'removeMember',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'orgId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'field',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'value',
        type: 'string',
      },
    ],
    name: 'updateOrganization',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'userOrganizations',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const OrganizationContractByteCode =
  '6080604052348015600e575f5ffd5b5061336a8061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061012a575f3560e01c8063be221358116100ab578063e35309ea1161006f578063e35309ea14610356578063e792dd8a14610372578063f1c62104146103a7578063fa61254a146103c5578063fd7522e2146103f55761012a565b8063be221358146102a0578063cb8668ea146102bc578063d391014b146102ec578063d4b5bf561461030a578063dc1301af1461033a5761012a565b80636be7658b116100f25780636be7658b146101ea5780637d9e10f5146102065780638ad682af14610236578063a411ef2014610254578063aa097ef0146102705761012a565b806312f1c0641461012e57806329507f731461015e5780633079fa611461017a5780634526f6901461019857806364d29a42146101ce575b5f5ffd5b61014860048036038101906101439190612307565b610413565b6040516101559190612354565b60405180910390f35b61017860048036038101906101739190612307565b610433565b005b61018261080b565b60405161018f9190612354565b60405180910390f35b6101b260048036038101906101ad919061236d565b610814565b6040516101c597969594939291906124e8565b60405180910390f35b6101e860048036038101906101e3919061256a565b610a83565b005b61020460048036038101906101ff9190612307565b610d98565b005b610220600480360381019061021b9190612307565b6111e5565b60405161022d91906125ba565b60405180910390f35b61023e611297565b60405161024b9190612354565b60405180910390f35b61026e600480360381019061026991906126ff565b61129b565b005b61028a60048036038101906102859190612775565b611553565b6040516102979190612857565b60405180910390f35b6102ba60048036038101906102b5919061256a565b6115e6565b005b6102d660048036038101906102d19190612307565b611982565b6040516102e39190612354565b60405180910390f35b6102f4611a30565b6040516103019190612354565b60405180910390f35b610324600480360381019061031f9190612877565b611a35565b6040516103319190612354565b60405180910390f35b610354600480360381019061034f919061236d565b611a60565b005b610370600480360381019061036b91906128b5565b611c20565b005b61038c6004803603810190610387919061236d565b611f02565b60405161039e9695949392919061293d565b60405180910390f35b6103af612070565b6040516103bc9190612354565b60405180910390f35b6103df60048036038101906103da919061236d565b612076565b6040516103ec91906129aa565b60405180910390f35b6103fd61216a565b60405161040a9190612354565b60405180910390f35b6003602052815f5260405f20602052805f5260405f205f91509150505481565b813373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146104d4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104cb90612a14565b60405180910390fd5b825f5f5f8381526020019081526020015f205f015403610529576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052090612a7c565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610597576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161058e90612ae4565b60405180910390fd5b5f5f8581526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610637576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062e90612b4c565b60405180910390fd5b5f5f5f8681526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050835f5f8781526020019081526020015f206001015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060015f5f8781526020019081526020015f206005015f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055505f5f5f8781526020019081526020015f206005015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508073ffffffffffffffffffffffffffffffffffffffff16857f6325c27a06b37e9a4a6e31ef14310355e6fcf0a49a54ede54e86d87154ab38f360016040516107ad9190612354565b60405180910390a38373ffffffffffffffffffffffffffffffffffffffff16857f6325c27a06b37e9a4a6e31ef14310355e6fcf0a49a54ede54e86d87154ab38f35f6040516107fc9190612354565b60405180910390a35050505050565b5f600254905090565b5f5f60608060605f5f875f5f5f8381526020019081526020015f205f015403610872576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086990612a7c565b60405180910390fd5b5f5f5f8b81526020019081526020015f209050805f0154816001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168260020183600301846004018560060154866007015f9054906101000a900460ff168480546108db90612b97565b80601f016020809104026020016040519081016040528092919081815260200182805461090790612b97565b80156109525780601f1061092957610100808354040283529160200191610952565b820191905f5260205f20905b81548152906001019060200180831161093557829003601f168201915b5050505050945083805461096590612b97565b80601f016020809104026020016040519081016040528092919081815260200182805461099190612b97565b80156109dc5780601f106109b3576101008083540402835291602001916109dc565b820191905f5260205f20905b8154815290600101906020018083116109bf57829003601f168201915b5050505050935082805480602002602001604051908101604052809291908181526020018280548015610a6157602002820191905f5260205f20905b815f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610a18575b5050505050925098509850985098509850985098505050919395979092949650565b823373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610b24576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1b90612a14565b60405180910390fd5b835f5f5f8381526020019081526020015f205f015403610b79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7090612a7c565b60405180910390fd5b6002831115610bbd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb490612c11565b60405180910390fd5b60025f5f8781526020019081526020015f206005015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20541115610c4f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4690612c79565b60405180910390fd5b5f5f8681526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610cef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ce690612ce1565b60405180910390fd5b825f5f8781526020019081526020015f206005015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508373ffffffffffffffffffffffffffffffffffffffff16857f6325c27a06b37e9a4a6e31ef14310355e6fcf0a49a54ede54e86d87154ab38f385604051610d899190612354565b60405180910390a35050505050565b8160015f5f8381526020019081526020015f206005015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20541115610e2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e2290612d49565b60405180910390fd5b825f5f5f8381526020019081526020015f205f015403610e80576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7790612a7c565b60405180910390fd5b5f5f8581526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610f20576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f1790612db1565b60405180910390fd5b60025f5f8681526020019081526020015f206005015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20541115610fb2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fa990612c79565b60405180910390fd5b5f5f5f8681526020019081526020015f2090505f5f90505b816004018054905081101561114d578473ffffffffffffffffffffffffffffffffffffffff1682600401828154811061100657611005612dcf565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16036111405781600401600183600401805490506110619190612e29565b8154811061107257611071612dcf565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168260040182815481106110b0576110af612dcf565b5b905f5260205f20015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160040180548061110957611108612e5c565b5b600190038181905f5260205f20015f6101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055905561114d565b8080600101915050610fca565b50806005015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f905561119a848661216f565b8373ffffffffffffffffffffffffffffffffffffffff16857f1c4c9d2e56d0635d11bc47c997c6909a0d7061f55cbb8f4b27386db37553191c60405160405180910390a35050505050565b5f825f5f5f8381526020019081526020015f205f01540361123b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123290612a7c565b60405180910390fd5b60025f5f8681526020019081526020015f206005015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054111591505092915050565b5f81565b60038251101580156112af57506032825111155b6112ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112e590612ed3565b60405180910390fd5b6101f481511115611334576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161132b90612f3b565b60405180910390fd5b60025f81548092919061134690612f59565b91905055505f60025490505f5f5f8381526020019081526020015f20905081815f018190555033816001015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838160020190816113bf9190613140565b50828160030190816113d19190613140565b504281600601819055506001816007015f6101000a81548160ff0219169083151502179055508060040133908060018154018082558091505060019003905f5260205f20015f9091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505f816005015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208190555060015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2082908060018154018082558091505060019003905f5260205f20015f90919091909150553373ffffffffffffffffffffffffffffffffffffffff16827f738a6c19c1f9d0875478754c8c4811baa12949f287f2385e1092efef86be9f7986604051611545919061320f565b60405180910390a350505050565b606060015f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208054806020026020016040519081016040528092919081815260200182805480156115da57602002820191905f5260205f20905b8154815260200190600101908083116115c6575b50505050509050919050565b8260015f5f8381526020019081526020015f206005015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20541115611679576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161167090612d49565b60405180910390fd5b835f5f5f8381526020019081526020015f205f0154036116ce576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116c590612a7c565b60405180910390fd5b6002831115611712576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161170990612c11565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603611780576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161177790612ae4565b60405180910390fd5b60025f5f8781526020019081526020015f206005015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205411611811576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161180890613279565b60405180910390fd5b5f5f5f8781526020019081526020015f2090508060040185908060018154018082558091505060019003905f5260205f20015f9091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083816005015f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208190555060015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2086908060018154018082558091505060019003905f5260205f20015f90919091909150558473ffffffffffffffffffffffffffffffffffffffff16867f9c3ef49be63f6a0edfff97a520c2676e3ca4deacd169af5c57a0ea1541b6c68d866040516119729190612354565b60405180910390a3505050505050565b5f825f5f5f8381526020019081526020015f205f0154036119d8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119cf90612a7c565b60405180910390fd5b5f5f8581526020019081526020015f206005015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205491505092915050565b600181565b6001602052815f5260405f208181548110611a4e575f80fd5b905f5260205f20015f91509150505481565b803373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611b01576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611af890612a14565b60405180910390fd5b815f5f5f8381526020019081526020015f205f015403611b56576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b4d90612a7c565b60405180910390fd5b5f5f5f8581526020019081526020015f2090505f5f90505b8160040180549050811015611bd157611bc4826004018281548110611b9657611b95612dcf565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff168661216f565b8080600101915050611b6e565b505f816007015f6101000a81548160ff021916908315150217905550837ff27d25b655cb03d0ed4d8ec4d8052f4e032e323945fd003c8a41818acbfabcbb60405160405180910390a250505050565b823373ffffffffffffffffffffffffffffffffffffffff165f5f8381526020019081526020015f206001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611cc1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cb890612a14565b60405180910390fd5b835f5f5f8381526020019081526020015f205f015403611d16576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d0d90612a7c565b60405180910390fd5b5f5f5f8781526020019081526020015f2090506040518060400160405280600481526020017f6e616d650000000000000000000000000000000000000000000000000000000081525080519060200120858051906020012003611ddd576003845110158015611d8757506032845111155b611dc6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dbd90612ed3565b60405180910390fd5b83816002019081611dd79190613140565b50611ec0565b6040518060400160405280600b81526020017f6465736372697074696f6e00000000000000000000000000000000000000000081525080519060200120858051906020012003611e84576101f484511115611e6d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e6490612f3b565b60405180910390fd5b83816003019081611e7e9190613140565b50611ebf565b6040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611eb6906132e1565b60405180910390fd5b5b857fda238709a4ad4d2d617aa517f02cffdd5b443bc1173fed5aa4bfcc0aa37122938686604051611ef29291906132ff565b60405180910390a2505050505050565b5f602052805f5260405f205f91509050805f015490806001015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806002018054611f4b90612b97565b80601f0160208091040260200160405190810160405280929190818152602001828054611f7790612b97565b8015611fc25780601f10611f9957610100808354040283529160200191611fc2565b820191905f5260205f20905b815481529060010190602001808311611fa557829003601f168201915b505050505090806003018054611fd790612b97565b80601f016020809104026020016040519081016040528092919081815260200182805461200390612b97565b801561204e5780601f106120255761010080835404028352916020019161204e565b820191905f5260205f20905b81548152906001019060200180831161203157829003601f168201915b505050505090806006015490806007015f9054906101000a900460ff16905086565b60025481565b6060815f5f5f8381526020019081526020015f205f0154036120cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016120c490612a7c565b60405180910390fd5b5f5f8481526020019081526020015f2060040180548060200260200160405190810160405280929190818152602001828054801561215d57602002820191905f5260205f20905b815f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311612114575b5050505050915050919050565b600281565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2090505f5f90505b818054905081101561226357828282815481106121d4576121d3612dcf565b5b905f5260205f200154036122565781600183805490506121f49190612e29565b8154811061220557612204612dcf565b5b905f5260205f20015482828154811061222157612220612dcf565b5b905f5260205f2001819055508180548061223e5761223d612e5c565b5b600190038181905f5260205f20015f90559055612263565b80806001019150506121b4565b50505050565b5f604051905090565b5f5ffd5b5f5ffd5b5f819050919050565b61228c8161227a565b8114612296575f5ffd5b50565b5f813590506122a781612283565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6122d6826122ad565b9050919050565b6122e6816122cc565b81146122f0575f5ffd5b50565b5f81359050612301816122dd565b92915050565b5f5f6040838503121561231d5761231c612272565b5b5f61232a85828601612299565b925050602061233b858286016122f3565b9150509250929050565b61234e8161227a565b82525050565b5f6020820190506123675f830184612345565b92915050565b5f6020828403121561238257612381612272565b5b5f61238f84828501612299565b91505092915050565b6123a1816122cc565b82525050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f6123e9826123a7565b6123f381856123b1565b93506124038185602086016123c1565b61240c816123cf565b840191505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b612449816122cc565b82525050565b5f61245a8383612440565b60208301905092915050565b5f602082019050919050565b5f61247c82612417565b6124868185612421565b935061249183612431565b805f5b838110156124c15781516124a8888261244f565b97506124b383612466565b925050600181019050612494565b5085935050505092915050565b5f8115159050919050565b6124e2816124ce565b82525050565b5f60e0820190506124fb5f83018a612345565b6125086020830189612398565b818103604083015261251a81886123df565b9050818103606083015261252e81876123df565b905081810360808301526125428186612472565b905061255160a0830185612345565b61255e60c08301846124d9565b98975050505050505050565b5f5f5f6060848603121561258157612580612272565b5b5f61258e86828701612299565b935050602061259f868287016122f3565b92505060406125b086828701612299565b9150509250925092565b5f6020820190506125cd5f8301846124d9565b92915050565b5f5ffd5b5f5ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b612611826123cf565b810181811067ffffffffffffffff821117156126305761262f6125db565b5b80604052505050565b5f612642612269565b905061264e8282612608565b919050565b5f67ffffffffffffffff82111561266d5761266c6125db565b5b612676826123cf565b9050602081019050919050565b828183375f83830152505050565b5f6126a361269e84612653565b612639565b9050828152602081018484840111156126bf576126be6125d7565b5b6126ca848285612683565b509392505050565b5f82601f8301126126e6576126e56125d3565b5b81356126f6848260208601612691565b91505092915050565b5f5f6040838503121561271557612714612272565b5b5f83013567ffffffffffffffff81111561273257612731612276565b5b61273e858286016126d2565b925050602083013567ffffffffffffffff81111561275f5761275e612276565b5b61276b858286016126d2565b9150509250929050565b5f6020828403121561278a57612789612272565b5b5f612797848285016122f3565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b6127d28161227a565b82525050565b5f6127e383836127c9565b60208301905092915050565b5f602082019050919050565b5f612805826127a0565b61280f81856127aa565b935061281a836127ba565b805f5b8381101561284a57815161283188826127d8565b975061283c836127ef565b92505060018101905061281d565b5085935050505092915050565b5f6020820190508181035f83015261286f81846127fb565b905092915050565b5f5f6040838503121561288d5761288c612272565b5b5f61289a858286016122f3565b92505060206128ab85828601612299565b9150509250929050565b5f5f5f606084860312156128cc576128cb612272565b5b5f6128d986828701612299565b935050602084013567ffffffffffffffff8111156128fa576128f9612276565b5b612906868287016126d2565b925050604084013567ffffffffffffffff81111561292757612926612276565b5b612933868287016126d2565b9150509250925092565b5f60c0820190506129505f830189612345565b61295d6020830188612398565b818103604083015261296f81876123df565b9050818103606083015261298381866123df565b90506129926080830185612345565b61299f60a08301846124d9565b979650505050505050565b5f6020820190508181035f8301526129c28184612472565b905092915050565b7f4f6e6c79206f776e6572000000000000000000000000000000000000000000005f82015250565b5f6129fe600a836123b1565b9150612a09826129ca565b602082019050919050565b5f6020820190508181035f830152612a2b816129f2565b9050919050565b7f4f7267616e697a6174696f6e206e6f7420666f756e64000000000000000000005f82015250565b5f612a666016836123b1565b9150612a7182612a32565b602082019050919050565b5f6020820190508181035f830152612a9381612a5a565b9050919050565b7f496e76616c6964206164647265737300000000000000000000000000000000005f82015250565b5f612ace600f836123b1565b9150612ad982612a9a565b602082019050919050565b5f6020820190508181035f830152612afb81612ac2565b9050919050565b7f416c7265616479206f776e6572000000000000000000000000000000000000005f82015250565b5f612b36600d836123b1565b9150612b4182612b02565b602082019050919050565b5f6020820190508181035f830152612b6381612b2a565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680612bae57607f821691505b602082108103612bc157612bc0612b6a565b5b50919050565b7f496e76616c696420726f6c6500000000000000000000000000000000000000005f82015250565b5f612bfb600c836123b1565b9150612c0682612bc7565b602082019050919050565b5f6020820190508181035f830152612c2881612bef565b9050919050565b7f4e6f742061206d656d62657200000000000000000000000000000000000000005f82015250565b5f612c63600c836123b1565b9150612c6e82612c2f565b602082019050919050565b5f6020820190508181035f830152612c9081612c57565b9050919050565b7f43616e6e6f74206368616e6765206f776e657220726f6c6500000000000000005f82015250565b5f612ccb6018836123b1565b9150612cd682612c97565b602082019050919050565b5f6020820190508181035f830152612cf881612cbf565b9050919050565b7f4f6e6c792061646d696e206f72206f776e6572000000000000000000000000005f82015250565b5f612d336013836123b1565b9150612d3e82612cff565b602082019050919050565b5f6020820190508181035f830152612d6081612d27565b9050919050565b7f43616e6e6f742072656d6f7665206f776e6572000000000000000000000000005f82015250565b5f612d9b6013836123b1565b9150612da682612d67565b602082019050919050565b5f6020820190508181035f830152612dc881612d8f565b9050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f612e338261227a565b9150612e3e8361227a565b9250828203905081811115612e5657612e55612dfc565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603160045260245ffd5b7f4e616d65206d75737420626520332d35302063686172616374657273000000005f82015250565b5f612ebd601c836123b1565b9150612ec882612e89565b602082019050919050565b5f6020820190508181035f830152612eea81612eb1565b9050919050565b7f4465736372697074696f6e20746f6f206c6f6e670000000000000000000000005f82015250565b5f612f256014836123b1565b9150612f3082612ef1565b602082019050919050565b5f6020820190508181035f830152612f5281612f19565b9050919050565b5f612f638261227a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612f9557612f94612dfc565b5b600182019050919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302612ffc7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612fc1565b6130068683612fc1565b95508019841693508086168417925050509392505050565b5f819050919050565b5f61304161303c6130378461227a565b61301e565b61227a565b9050919050565b5f819050919050565b61305a83613027565b61306e61306682613048565b848454612fcd565b825550505050565b5f5f905090565b613085613076565b613090818484613051565b505050565b5b818110156130b3576130a85f8261307d565b600181019050613096565b5050565b601f8211156130f8576130c981612fa0565b6130d284612fb2565b810160208510156130e1578190505b6130f56130ed85612fb2565b830182613095565b50505b505050565b5f82821c905092915050565b5f6131185f19846008026130fd565b1980831691505092915050565b5f6131308383613109565b9150826002028217905092915050565b613149826123a7565b67ffffffffffffffff811115613162576131616125db565b5b61316c8254612b97565b6131778282856130b7565b5f60209050601f8311600181146131a8575f8415613196578287015190505b6131a08582613125565b865550613207565b601f1984166131b686612fa0565b5f5b828110156131dd578489015182556001820191506020850194506020810190506131b8565b868310156131fa57848901516131f6601f891682613109565b8355505b6001600288020188555050505b505050505050565b5f6020820190508181035f83015261322781846123df565b905092915050565b7f416c72656164792061206d656d626572000000000000000000000000000000005f82015250565b5f6132636010836123b1565b915061326e8261322f565b602082019050919050565b5f6020820190508181035f83015261329081613257565b9050919050565b7f496e76616c6964206669656c64000000000000000000000000000000000000005f82015250565b5f6132cb600d836123b1565b91506132d682613297565b602082019050919050565b5f6020820190508181035f8301526132f8816132bf565b9050919050565b5f6040820190508181035f83015261331781856123df565b9050818103602083015261332b81846123df565b9050939250505056fea264697066735822122028bf3c22dc093ed3dc0b326c9c89aeb0faf0c4b25c65b4e88a1c170c132a172a64736f6c634300081e0033'
