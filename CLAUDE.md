# Claude Code Context for sv3.network

## Recent Changes (Last 3)

### Feature: sv3.network - Web3-Native SignVault Implementation (Branch: 001-got-it-since)
- **Goal**: Transform SignVault into web3-native platform with blockchain document management
- **Timeline**: 24-hour hackathon deliverable
- **Key Components**: Smart contracts, wallet authentication, IPFS storage, on-chain signatures

### Technology Stack Added
- **Smart Contracts**: Solidity 0.8.19 with OpenZeppelin, Hardhat framework
- **Frontend**: Next.js 15 + wagmi + viem + RainbowKit
- **Storage**: IPFS (Pinata) for documents, blockchain for metadata/signatures
- **Authentication**: Sign-In with Ethereum (SIWE)
- **Networks**: BNB Smart Chain (primary), Avalanche Fuji (secondary)

### Smart Contract Architecture
- **UserProfile.sol**: User identity, profile management, verification
- **Organization.sol**: Team structures, role-based access control (Owner/Admin/Member)
- **DocumentRWA.sol**: Document NFTs (ERC-721), signature management, RWA tokenization

### Key Integration Patterns
- Wallet connection via RainbowKit with multi-wallet support
- Document upload → IPFS → content hash → mint NFT workflow
- On-chain signature verification with ECDSA
- Real-time updates via blockchain events

## Project Context

### Current State
- Feature specification complete (specs/001-got-it-since/spec.md)
- Implementation plan generated (specs/001-got-it-since/plan.md)
- Research phase complete (specs/001-got-it-since/research.md)
- Data model designed (specs/001-got-it-since/data-model.md)
- Smart contracts drafted (specs/001-got-it-since/contracts/)
- Quickstart guide created (specs/001-got-it-since/quickstart.md)

### Development Approach
- **Library-First**: Each smart contract is standalone with clear purpose
- **Test-First**: Contract tests before implementation, TDD enforced
- **Integration Focus**: Cross-contract testing and wallet connection flows
- **Hackathon Timeline**: 24-hour constraint, focus on core features only

### Architecture Decisions
- **Structure**: Web application with blockchain backend (Option 2)
- **Authentication**: Wallet-based (SIWE) instead of traditional auth
- **Storage**: Hybrid (IPFS + blockchain) for web3-native approach
- **NFT Standard**: ERC-721 for unique document representation
- **Performance**: Gas optimization and efficient frontend patterns

## Implementation Guidelines

### Smart Contract Development
1. **Testing**: Write failing tests first, then implement (TDD)
2. **Security**: Access control patterns, input validation, reentrancy protection
3. **Gas Optimization**: Events over storage, efficient data types, batch operations
4. **Documentation**: Clear NatSpec comments, event definitions

### Frontend Development
1. **State Management**: Use wagmi hooks for blockchain state
2. **Error Handling**: Graceful wallet connection and transaction failures
3. **Real-time Updates**: Event listeners for live signature updates
4. **Performance**: Client-side hashing, optimistic UI updates

### Data Flow
```
User Action → Frontend Validation → Contract Call → Event Emission → UI Update
```

### Key Endpoints (Smart Contracts)
- `UserProfile.createProfile(username, email)`
- `Organization.createOrganization(name, description)`
- `DocumentRWA.createDocument(orgId, title, contentHash, metadataHash)`
- `DocumentRWA.signDocument(docId, signatureData)`

### File Structure
```
contracts/
├── UserProfile.sol          # User identity management
├── Organization.sol         # Team structures & access control
└── DocumentRWA.sol          # Document NFTs & signatures

frontend/src/
├── components/             # React components with wagmi hooks
├── services/              # IPFS and blockchain services
├── contexts/              # Web3 context providers
└── hooks/                  # Custom React hooks

specs/001-got-it-since/
├── plan.md                 # Implementation plan
├── research.md            # Technology decisions
├── data-model.md          # Entity relationships
├── quickstart.md          # Setup guide
└── contracts/             # Contract specifications
```

## Testing Strategy

### Contract Tests
- **Unit Tests**: Individual contract functions
- **Integration Tests**: Cross-contract interactions
- **Gas Analysis**: Optimize expensive operations

### Frontend Tests
- **Component Tests**: Wallet connection, document upload
- **Integration Tests**: End-to-end user flows
- **E2E Tests**: Complete demo scenarios

### Performance Targets
- Document upload: <5 seconds
- Signature verification: <2 seconds
- Wallet connection: 100% success rate

## Common Commands

### Development
```bash
bun run dev              # Start development server
bun run compile          # Compile contracts
bun run test             # Run all tests
bun run deploy:bsc-testnet  # Deploy to BNB Smart Chain testnet
```

### Testing
```bash
bun run test:contract    # Contract tests
bun run test:component   # Component tests
bun run test:integration # Integration tests
```

### Demo
```bash
bun run demo             # Automated demo
```

## Important Notes

- **Hackathon Focus**: Prioritize core features over polish
- **Blockchain First**: All data should be on-chain where possible
- **User Experience**: Clear transaction status and error handling
- **Demo Ready**: Complete user flow should work end-to-end
- **Documentation**: Keep code self-documenting with clear patterns

---
*Last updated: 2025-09-20 | Branch: 001-got-it-since | Next: /tasks command*