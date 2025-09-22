# SignVault Smart Contracts

This package contains the core smart contracts for the SignVault document signing platform.

## Contracts

- **DocumentRWA.sol** - Main contract for document management and NFT minting
- **Organization.sol** - Organization management and membership
- **UserProfile.sol** - User profile management
- **Message.sol** - Messaging system between users
- **NFT.sol** - Base NFT contract for document tokens

## Quick Start

### Prerequisites

- [Foundry](https://getfoundry.sh/) installed
- Node.js and bun/npm/yarn
- Testnet ETH for deployment
- API keys for Alchemy and Etherscan

### Setup

1. **Install dependencies:**
   ```bash
   forge install
   ```

2. **Copy environment file:**
   ```bash
   cp .env.example .env
   ```

3. **Configure your .env file:**
   ```bash
   # Add your private key (without 0x prefix)
   PRIVATE_KEY=your_private_key_here
   
   # Add your Alchemy API key
   ALCHEMY_API_KEY=your_alchemy_api_key_here
   
   # Add Etherscan API keys for verification
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```

### Testing

Run local tests:
```bash
forge test
```

Run tests with gas reporting:
```bash
forge test --gas-report
```

### Deployment

Deploy to Sepolia testnet:
```bash
./deploy.sh sepolia
```

Deploy to other networks:
```bash
./deploy.sh goerli
./deploy.sh polygon_mumbai
./deploy.sh arbitrum_sepolia
```

### On-Chain Testing

After deployment, run on-chain tests:
```bash
./test-onchain.sh sepolia
```

**Note:** You'll need to update the contract addresses in the test script after deployment.

## Contract Addresses

After deployment, contract addresses will be saved in the `broadcast/` directory. Update your frontend configuration with these addresses.

## Verification

Contracts are automatically verified during deployment if you have the correct API keys configured.

## Development

### Adding New Contracts

1. Create your contract in `src/`
2. Add tests in `test/`
3. Update the deployment script in `script/Deploy.s.sol`
4. Update the on-chain test script if needed

### Gas Optimization

Run gas snapshots to track gas usage:
```bash
forge snapshot
```

### Security

Run static analysis with Slither:
```bash
slither .
```

## Supported Networks

- Ethereum Sepolia (testnet)
- Ethereum Goerli (testnet)
- Polygon Mumbai (testnet)
- Arbitrum Sepolia (testnet)

## Troubleshooting

### Common Issues

1. **Deployment fails with "insufficient funds"**
   - Ensure your wallet has enough testnet ETH
   - Get testnet ETH from faucets

2. **Verification fails**
   - Check your Etherscan API key
   - Ensure the contract was deployed successfully

3. **RPC errors**
   - Check your Alchemy API key
   - Try a different RPC endpoint

### Getting Help

- Check the [Foundry documentation](https://book.getfoundry.sh/)
- Review contract tests for usage examples
- Check deployment logs in the `broadcast/` directory
