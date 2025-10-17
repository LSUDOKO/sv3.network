# sv3.network

**The Web3-native evolution of SignVault.io** — A decentralized document, signature, and compliance platform that turns documents into **on-chain Real-World Assets (RWAs)**. 

![sv3.network Readme Image](https://sv3.network/opengraph-image)

## 🌐 Vision

sv3.network is building a **fully decentralized, blockchain-native compliance and document management network** where:

- **Documents as On-Chain RWAs**: Every document is minted as an NFT with immutable metadata
- **E-Signatures on Chain**: Signatures are recorded as on-chain events, timestamped and verifiable
- **Organizations & Teams On-Chain**: Smart contract-based team management with role-based access
- **Audit & Compliance Layer**: Immutable event logs for every document action
- **Cross-Chain Interoperability**: Works across any EVM-compatible chain

## 🏗️ Architecture

### Smart Contracts
- **DocumentRWA.sol** - Core contract for document management and NFT minting
- **Organization.sol** - Organization management and membership with role-based access
- **UserProfile.sol** - User identity and profile management
- **Message.sol** - Messaging system between users
- **NFT.sol** - Base NFT contract for document tokens

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI
- **Web3**: Viem, Wagmi, Web3Modal, Sign-In with Ethereum (SIWE)
- **Blockchain**: Solidity, Foundry, Hardhat
- **Database**: PostgreSQL with Kysely ORM
- **Storage**: IPFS for document storage

## 📦 Packages

### [App](./packages/app) - Next.js Frontend Application
- **Next.js 15** with App Router and React 19
- **Web3 Integration** with Viem, Wagmi, and Web3Modal
- **UI Components** with Radix UI and Tailwind CSS
- **Database** with PostgreSQL and Kysely ORM
- **Authentication** with Sign-In with Ethereum (SIWE)

**Key Features:**
- Document management interface
- Organization and team management
- Signature workflows
- Audit logs and compliance tracking
- Multi-chain support

### [Foundry](./packages/foundry/) - Smart Contract Development
- **Solidity contracts** for document management
- **Foundry** for testing and deployment
- **Multi-network support** (Ethereum, Polygon, Arbitrum, etc.)
- **Gas optimization** and security testing

**Contracts:**
- DocumentRWA: Document NFT management
- Organization: Team and role management  
- UserProfile: User identity system
- Message: Inter-user communication

### [Hardhat](./packages/hardhat/) - Alternative Smart Contract Framework
- **Hardhat** for contract development and testing
- **TypeScript** integration for testing
- **Deployment scripts** and verification
- **Coverage reporting** and gas analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Bun
- PostgreSQL database
- Testnet ETH for deployment
- API keys for Alchemy and Etherscan

### Development Setup

1. **Clone and install dependencies:**
```bash
git clone https://github.com/SignVault/sv3.network.git
cd sv3.network
bun install
```

2. **Set up environment variables:**
```bash
# Copy environment files
cp packages/app/.env.example packages/app/.env
cp packages/foundry/.env.example packages/foundry/.env
cp packages/hardhat/.env.example packages/hardhat/.env
```

3. **Start development servers:**
```bash
# Start the frontend app
bun run app:dev

# Or start all services
bun run dev
```

### Smart Contract Development

**Using Foundry (Recommended):**
```bash
cd packages/foundry
forge install
forge test
./deploy.sh sepolia
```

**Using Hardhat:**
```bash
cd packages/hardhat
bun install
bun test
bun deploy
```

## 🛠️ Development Scripts

```bash
# Frontend development
bun run app:dev          # Start Next.js app
bun run app:build        # Build Next.js app
bun run app:start        # Start production server

# Smart contract development
bun run foundry:dev      # Start Foundry development
bun run hardhat:dev       # Start Hardhat development

# Database management
bun run db:migrate       # Run database migrations
bun run db:migrate:up    # Apply pending migrations
bun run db:migrate:down  # Rollback migrations
bun run db:migrate:reset # Reset database
```

## 🔧 Smart Contract Features

### Document Management
- **NFT Minting**: Documents are minted as ERC-721 NFTs with unique metadata
- **IPFS Integration**: Document content stored on IPFS with content hashing
- **Signature Tracking**: On-chain signature verification and tracking
- **Role-Based Access**: Granular permissions for document operations

### Organization Management
- **Team Structures**: Hierarchical organization management
- **Role System**: Owner, Admin, and Member roles with different permissions
- **Member Management**: Add/remove members with role assignments
- **Access Control**: Document-level permissions based on organization membership

### User Profiles
- **Wallet-Based Identity**: Primary identity tied to wallet addresses
- **Profile Management**: Username, email, and custom data fields
- **Verification System**: Optional profile verification for enhanced trust
- **Cross-Platform Identity**: Consistent identity across the network

## 🌐 Supported Networks

- **Ethereum Sepolia** (testnet)
- **Ethereum Goerli** (testnet) 
- **Polygon Mumbai** (testnet)
- **Arbitrum Sepolia** (testnet)
- **Base Sepolia** (testnet)

## 📚 Documentation

- [Project Vision & Goals](./docs/END_GOAL.md) - Long-term vision and roadmap
- [Smart Contract Specs](./specs/001-got-it-since/) - Technical specifications
- [Deployment Guide](./packages/foundry/DEPLOYMENT_GUIDE.md) - Contract deployment
- [App Documentation](./packages/app/README.md) - Frontend setup

## 🤝 Contributing

We welcome contributions! Please see our [Hacktoberfest 2025 Tasks](./hacktoberfest-2025-tasks.md) for current opportunities.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


### Contributors

Contributors to this repository are rewarded based on their contributions to the project. Their contribution score is calculated based on a combination of the commits, issues, pull requests, and other contributions that determine the amount of funding they receives.

The score is calculated using [Contributor Graph](https://github.com/SignVault/contributor-graph).

## 🚀 Deployment

### Frontend Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSignVault%2Fsv3.network)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=sv3.network&filter=next.js&utm_source=sv3.network&utm_campaign=sv3.network-readme) from the creators of Next.js.

### Smart Contract Deployment

Deploy contracts to your preferred network:

```bash
# Using Foundry
cd packages/foundry
./deploy.sh sepolia

# Using Hardhat  
cd packages/hardhat
bun deploy --network sepolia
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [sv3.network](https://sv3.network)
- **Documentation**: [docs.signvault.io](https://docs.signvault.io)
- **Twitter**: [@SignVault_io](https://twitter.com/signvault_io)
- **Discord**: [Join our community](https://discord.gg/signvault)
