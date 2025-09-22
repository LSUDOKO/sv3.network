# SignVault Deployment Guide

### 🚀 Live Deployment on BNB Smart Chain (Chain ID: 56):
```
DocumentRWA: 0x1150cf86b0611e392729a76c215d2ed1d5c98363
Organization: 0x5dfb2ee27b1f0d638425a6665818ff86c7021be1
UserProfile: 0x5d6e20e003c431bd36e293c6898e6b0356737f26
Message: 0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d
NFT: 0xb69929057eb74181ac89da3012e25a705f6b1fdc

Total Gas Used: 839,751 gas
Total Cost: 0.0000839751 BNB (~$0.02)
Status: ✅ All contracts verified on Bscscan
```

## 🚀 Current Deployment Status:

### ✅ BNB Smart Chain (Mainnet) - LIVE
- **Status**: Successfully deployed and tested
- **Network**: BNB Smart Chain (Chain ID: 56)
- **Deployer**: 0x869620d5f4020383Eae89dFFdC67192749628B18
- **All contracts verified on Bscscan**

### 🔄 Available for Deployment:

#### Avalanche C-Chain (Mainnet)
```bash
./deploy.sh avax
```

#### Ethereum Testnets
For testing purposes, you can deploy to:
```bash
./deploy.sh sepolia          # Sepolia Testnet
./deploy.sh goerli           # Goerli Testnet (if needed)
```

**Testnet Faucets (if needed):**
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Chainlink Sepolia Faucet](https://faucets.chain.link/sepolia)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

## 🔧 Available Commands:

### Build & Test:
```bash
/Users/harjjotsinghh/.foundry/bin/forge build
/Users/harjjotsinghh/.foundry/bin/forge test --no-match-test "testFork"
```

### Deploy to Supported Networks:
```bash
./deploy.sh bnb              # Deploy to BNB Smart Chain (LIVE ✅)
./deploy.sh avax             # Deploy to Avalanche C-Chain
./deploy.sh sepolia          # Deploy to Sepolia Testnet
./deploy.sh goerli           # Deploy to Goerli Testnet
./deploy.sh mumbai           # Deploy to Polygon Mumbai
./deploy.sh arbitrum-sepolia # Deploy to Arbitrum Sepolia
```

### Test On-Chain:
```bash
./test-onchain.sh bnb        # Test on BNB Smart Chain (WORKING ✅)
./test-onchain.sh avax       # Test on Avalanche C-Chain
./test-onchain.sh sepolia    # Test on Sepolia Testnet
```

### Check Balances:
```bash
# BNB Smart Chain
/Users/harjjotsinghh/.foundry/bin/cast balance 0x869620d5f4020383Eae89dFFdC67192749628B18 --rpc-url https://bsc-dataseed1.binance.org/

# Avalanche C-Chain
/Users/harjjotsinghh/.foundry/bin/cast balance 0x869620d5f4020383Eae89dFFdC67192749628B18 --rpc-url https://api.avax.network/ext/bc/C/rpc

# Sepolia Testnet
/Users/harjjotsinghh/.foundry/bin/cast balance 0x869620d5f4020383Eae89dFFdC67192749628B18 --rpc-url https://eth-sepolia.g.alchemy.com/v2/3x2E4cGp8IBOhtoRj17VKOAYqbdgTrrY
```
