import { 
  createConfig, 
  http, 
  cookieStorage,
  createStorage
} from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, bsc, bscTestnet } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export function getConfig() {
  return createConfig({
    chains: [mainnet, polygon, optimism, arbitrum, base, bsc, bscTestnet],
    connectors: [injected(), metaMask(), walletConnect({ projectId: projectId! })],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [base.id]: http(),
      [bsc.id]: http(),
      [bscTestnet.id]: http(),
    },
  })
}

// Export config for server-side operations
export const config = getConfig()
