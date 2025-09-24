#!/bin/bash

# SignVault Contract Deployment Script
# Usage: ./deploy.sh [network]
# Example: ./deploy.sh sepolia

set -e

# Default network
NETWORK=${1:-sepolia}

echo "🚀 Deploying SignVault contracts to $NETWORK..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please copy .env.example to .env and fill in your values."
    exit 1
fi

# Source environment variables
source .env

# Validate required environment variables
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ PRIVATE_KEY not set in .env file"
    exit 1
fi

if [ -z "$ALCHEMY_API_KEY" ]; then
    echo "❌ ALCHEMY_API_KEY not set in .env file"
    exit 1
fi

# Set RPC URL based on network
case $NETWORK in
    sepolia)
        RPC_URL="https://eth-sepolia.g.alchemy.com/v2/$ALCHEMY_API_KEY"
        CHAIN_ID=11155111
        ;;
    goerli)
        RPC_URL="https://eth-goerli.g.alchemy.com/v2/$ALCHEMY_API_KEY"
        CHAIN_ID=5
        ;;
    mumbai)
        RPC_URL="https://polygon-mumbai.g.alchemy.com/v2/$ALCHEMY_API_KEY"
        CHAIN_ID=80001
        ;;
    arbitrum-sepolia)
        RPC_URL="https://arb-sepolia.g.alchemy.com/v2/$ALCHEMY_API_KEY"
        CHAIN_ID=421614
        ;;
    avax)
        RPC_URL="https://api.avax.network/ext/bc/C/rpc"
        CHAIN_ID=43114
        ;;
    bnb-testnet)
        RPC_URL="https://data-seed-prebsc-1-s3.bnbchain.org:8545"
        CHAIN_ID=97
        ;;
    bnb)
        RPC_URL="https://bsc-dataseed1.binance.org/"
        CHAIN_ID=56
        ;;
    *)
        echo "❌ Unsupported network: $NETWORK"
        echo "Supported networks: sepolia, goerli, mumbai, arbitrum-sepolia, avax, bnb-testnet, bnb"
        exit 1
        ;;
esac

echo "📋 Network: $NETWORK"
echo "📋 Chain ID: $CHAIN_ID"
echo "📋 RPC URL: $RPC_URL"
echo "📋 Deployer: $(/Users/harjjotsinghh/.foundry/bin/cast wallet address "$PRIVATE_KEY")"



# Deploy contracts
echo "🔨 Deploying contracts..."
/Users/harjjotsinghh/.foundry/bin/forge script script/Deploy.s.sol:DeployScript \
    --rpc-url "$RPC_URL" \
    --private-key "$PRIVATE_KEY" \
    --broadcast \
    --verify \
    --etherscan-api-key "$ETHERSCAN_API_KEY" \
    -vvvv

echo "✅ Deployment completed!"
echo "📄 Check the broadcast folder for deployment details and contract addresses."