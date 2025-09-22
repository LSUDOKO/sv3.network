#!/bin/bash

# SignVault On-Chain Test Script
# Usage: ./test-onchain.sh [network] [contract_addresses_file]
# Example: ./test-onchain.sh sepolia broadcast/Deploy.s.sol/11155111/run-latest.json

set -e

# Default network
NETWORK=${1:-sepolia}

echo "🧪 Running on-chain tests for SignVault contracts on $NETWORK..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please copy .env.example to .env and fill in your values."
    exit 1
fi

# Source environment variables
source .env

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
    bnb)
        RPC_URL="https://bsc-dataseed1.binance.org/"
        CHAIN_ID=56
        ;;
    *)
        echo "❌ Unsupported network: $NETWORK"
        echo "Supported networks: sepolia, goerli, mumbai, arbitrum-sepolia, avax, bnb"
        exit 1
        ;;
esac

# Set broadcast file path based on chain ID
BROADCAST_FILE="broadcast/Deploy.s.sol/$CHAIN_ID/run-latest.json"

# Check if broadcast file exists
if [ ! -f "$BROADCAST_FILE" ]; then
    echo "❌ Broadcast file not found: $BROADCAST_FILE"
    echo "Please deploy contracts first using ./deploy.sh"
    exit 1
fi

echo "📋 Network: $NETWORK"
echo "📋 Chain ID: $CHAIN_ID"
echo "📋 RPC URL: $RPC_URL"
echo "📋 Broadcast file: $BROADCAST_FILE"

# Use contract addresses from environment variables (loaded from .env file)
echo "📄 Using contract addresses from environment..."

echo "📋 Contract Addresses:"
echo "  DocumentRWA: $DOCUMENT_RWA_ADDRESS"
echo "  Organization: $ORGANIZATION_ADDRESS"
echo "  UserProfile: $USER_PROFILE_ADDRESS"
echo "  Message: $MESSAGE_ADDRESS"
echo "  NFT: $NFT_ADDRESS"

# Verify all addresses are set
if [[ -z "$DOCUMENT_RWA_ADDRESS" || -z "$ORGANIZATION_ADDRESS" || -z "$USER_PROFILE_ADDRESS" || -z "$MESSAGE_ADDRESS" || -z "$NFT_ADDRESS" ]]; then
    echo "❌ Contract addresses not found in environment variables"
    echo "Please ensure .env file contains all contract addresses"
    exit 1
fi

# Run on-chain tests
echo "🔨 Running on-chain tests..."
/Users/harjjotsinghh/.foundry/bin/forge script script/OnChainTest.s.sol:OnChainTestScript \
    --rpc-url $RPC_URL \
    --private-key $PRIVATE_KEY \
    --broadcast \
    -vvvv

echo "✅ On-chain tests completed!"