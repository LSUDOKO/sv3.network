# sv3.network

A Next.js + Ethereum starter kit with Viem, Wagmi, Web3Modal, SIWE, Tailwind, daisyUI and more to quickly ship production-ready Web3 Apps 📜

![sv3.network Readme Image](https://sv3.network/opengraph-image)

## Packages 📦

- [App](./packages/app) - Next.js 14, with App router
- [Hardhat](./packages/hardhat/) - Hardhat projects
- [Foundry](./packages/foundry/) - Foundry projects

Choose the framework to use, "hardhat" or "foundry", eliminating the one we will not use.

1- Delete the folder of the framework that will not be used:
./packages/hardhat/ or ./packages/foundry/

2- Go to "packages/app/wagmi.config.ts" and remove the plugin that will not be used.

```ts
hardhat({
    project: '../hardhat',
    deployments: {
    Message: {
        11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89',
    },
    },
}),
foundry({
    project: '../foundry',
    deployments: {
    Message: {
        11155111: '0xcc5a0d6268d70811edad77799f2168afe6382e89',
    },
    },
}),
```

## Development 🛠️

```bash
npm run dev
# or
bun dev
```

## Funding

This project is funding its core dependencies with [Drips protocol](https://www.drips.network/app/projects/github/SignVault/sv3.network?exact). A split contract that splits 60% of all proceeds with core contributors and 40% for dependencies.

### Contributors

Contributors to this repository are rewarded based on their contributions to the project. Their contribution score is calculated based on a combination of the commits, issues, pull requests, and other contributions that determine the amount of funding they receives.

The score is calculated using [Contributor Graph](https://github.com/SignVault/contributor-graph).

### Distribution

- In 2024 the project received $7,075 USD in funding. 60% ($4,245) is distributed to core contributors.
  - https://arbiscan.io/tx/0x95d6cd302374d64a401e35a27570fec9793bd9751cbfdeec36d3ade3b1965c24

## Deploy on Vercel 🚢

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwslyvh%2Fsv3.network)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=sv3.network&filter=next.js&utm_source=sv3.network&utm_campaign=sv3.network-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
