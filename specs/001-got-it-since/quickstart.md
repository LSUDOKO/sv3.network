# Phase 1 Quickstart Guide: sv3.network - Web3-Native SignVault Implementation

## Prerequisites

- Node.js 18+
- MetaMask or compatible wallet
- Base Sepolia ETH (for testing)
- IPFS pinning service account (Pinata recommended)

## Quick Start Setup

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/your-repo/sv3-network.git
cd sv3-network
bun install
```

### 2. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your configuration
```

Required environment variables:
```env
# Blockchain Configuration
NEXT_PUBLIC_BASE_SEPOLIA_RPC=https://sepolia.base.org
NEXT_PUBLIC_BASE_EXPLORER=https://sepolia.basescan.org

# IPFS Configuration
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key

# Contract Addresses (will be populated after deployment)
NEXT_PUBLIC_USER_PROFILE_CONTRACT=0x...
NEXT_PUBLIC_ORGANIZATION_CONTRACT=0x...
NEXT_PUBLIC_DOCUMENT_RWA_CONTRACT=0x...
```

### 3. Deploy Smart Contracts
```bash
# Compile contracts
bun run compile

# Deploy to Base Sepolia
bun run deploy:base-sepolia

# Verify contracts on Etherscan
bun run verify:base-sepolia
```

### 4. Start Development Environment
```bash
# Start frontend
bun run dev

# Start IPFS node (optional, for local testing)
docker run -d --name ipfs-node -p 4001:4001 -p 5001:5001 ipfs/go-ipfs:latest
```

## User Journey Demo

### Step 1: Connect Wallet
1. Open http://localhost:3000
2. Click "Connect Wallet"
3. Select MetaMask (or compatible wallet)
4. Approve connection request
5. Wallet address should appear in the header

### Step 2: Create User Profile
1. Navigate to Profile page
2. Click "Create Profile"
3. Fill in:
   - Username: `demo_user`
   - Email: `demo@example.com` (optional)
   - LinkedIn Profile: (optional)
4. Click "Create Profile"
5. Confirm transaction in MetaMask
6. Profile should be created and visible

### Step 3: Create Organization
1. Navigate to Organizations page
2. Click "Create Organization"
3. Fill in:
   - Name: `Demo Organization`
   - Description: `Demo organization for hackathon`
4. Click "Create Organization"
5. Confirm transaction in MetaMask
6. Organization should be created and visible

### Step 4: Upload Document
1. Navigate to Documents page
2. Click "Upload Document"
3. Fill in:
   - Title: `Demo Document`
   - Organization: Select your organization
   - File: Choose a PDF or document file
4. Click "Upload"
5. Document will be uploaded to IPFS
6. Confirm transaction to mint NFT
7. Document should appear with NFT token ID

### Step 5: Sign Document
1. Find your uploaded document
2. Click "Sign Document"
3. Review document details
4. Click "Confirm Signature"
5. Sign message in MetaMask
6. Confirm transaction
7. Signature should be recorded and visible

### Step 6: View Dashboard
1. Navigate to Dashboard
2. Verify:
   - Your wallet address is shown
   - Your organization is listed
   - Your document is shown with signature status
   - NFT metadata is accessible

## Testing Commands

### Run Smart Contract Tests
```bash
# Run all tests
bun test

# Run specific contract tests
bun test -- --grep "UserProfile"
bun test -- --grep "Organization"
bun test -- --grep "DocumentRWA"
```

### Run Frontend Tests
```bash
# Run component tests
bun run test:component

# Run integration tests
bun run test:integration

# Run E2E tests
bun run test:e2e
```

### Run Performance Tests
```bash
# Test document upload performance
bun run test:performance

# Test gas usage
bun run test:gas
```

## Demo Script

For a complete automated demo, run:
```bash
bun run demo
```

This will:
1. Create a test wallet
2. Create user profile
3. Create organization
4. Upload sample document
5. Sign document
6. Display results

## Troubleshooting

### Common Issues

**Wallet Connection Failed**
- Ensure MetaMask is unlocked
- Check if you're on Base Sepolia network
- Clear browser cache and try again

**Contract Deployment Failed**
- Check if you have sufficient ETH on Base Sepolia
- Verify RPC endpoint is accessible
- Check contract compilation errors

**IPFS Upload Failed**
- Verify Pinata API keys are correct
- Check file size limits (free tier: 1GB)
- Ensure internet connection is stable

**Transaction Failed**
- Check gas price settings
- Ensure sufficient ETH balance
- Verify contract addresses are correct

### Debug Commands

```bash
# Check network status
bun run network:status

# Check contract deployment
bun run contracts:verify

# Reset local development
bun run clean:install

# Generate test report
bun run test:report
```

## Success Metrics

Verify the following after completing the quickstart:

- ✅ Wallet connects successfully
- ✅ User profile creation works
- ✅ Organization creation works
- ✅ Document upload to IPFS works
- ✅ NFT minting works
- ✅ Document signing works
- ✅ Dashboard displays correct information
- ✅ All transactions complete within time limits
- ✅ No console errors in browser

## Next Steps

After completing the quickstart:

1. **Customize the UI**: Modify components in `frontend/src/components/`
2. **Add more features**: Extend contracts with additional functionality
3. **Deploy to production**: Update environment variables for mainnet
4. **Add more chains**: Extend support for other EVM chains
5. **Implement advanced features**: Multi-sig, role-based access, etc.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review contract test cases for expected behavior
- Examine frontend component examples
- Check console logs for error details

This quickstart should get you up and running with sv3.network in under 10 minutes!