import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-viem'

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  // defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      type: 'edr-simulated',
      chainId: 31337,
    },
    localhost: {
      type: 'http',
      chainId: 31337,
      url: 'http://127.0.0.1:8545',
    },
    baseSepolia: {
      type: 'http',
      url: process.env.BASE_SEPOLIA_RPC || 'https://sepolia.base.org',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 84532,
    },
    // etherscan: {
    // type: 'http',
    // apiKey: {
    //   baseSepolia: process.env.BASESCAN_API_KEY || '',
    // },
    // customChains: [
    //   {
    //     network: 'baseSepolia',
    //     chainId: 84532,
    //     urls: {
    //       apiURL: 'https://api-sepolia.basescan.org/api',
    //       browserURL: 'https://sepolia.basescan.org',
    //     },
    //   },
    // ],
    // },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
