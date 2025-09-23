import { defineConfig } from '@wagmi/cli'
import { actions, foundry } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'src/abis.ts',
  contracts: [],
  plugins: [
    actions(),
    // hardhat({
    //   project: '../hardhat',
    //   deployments: {
    //     Message: {
    //       11155111: '0xF11f180eE37dd6aa7dD08b8C1Cd670fC4DBE0e34',
    //     },
    //   },
    // }),
    foundry({
      project: '../foundry',
      forge: {
        build: false,
      },
      artifacts: '../foundry/out',
      include: [
        'DocumentRWA.sol/**',
        'Organization.sol/**', 
        'UserProfile.sol/**',
        'Message.sol/**',
        'NFT.sol/**',
      ],
      deployments: {
        DocumentRWA: {
          56: '0x1150cf86b0611e392729a76c215d2ed1d5c98363', // BNB Smart Chain
          11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89', // Sepolia (if needed)
        },
        Organization: {
          56: '0x5dfb2ee27b1f0d638425a6665818ff86c7021be1', // BNB Smart Chain
        },
        UserProfile: {
          56: '0x5d6e20e003c431bd36e293c6898e6b0356737f26', // BNB Smart Chain
        },
        Message: {
          56: '0x0dcc9cf9f1292f7a09b5b37047acde2e3d873b0d', // BNB Smart Chain
          11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89', // Sepolia (legacy)
        },
        NFT: {
          56: '0xb69929057eb74181ac89da3012e25a705f6b1fdc', // BNB Smart Chain
        },
      },
    }),
  ],
})
