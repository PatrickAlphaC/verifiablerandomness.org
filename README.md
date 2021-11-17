# verifiablerandomness.org

The contracts for verifiable randomness org site.

# Prerequisites

- [nodejs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) or [YARN](https://yarnpkg.com/)

# Quickstart

```sh 
git clone https://github.com/PatrickAlphaC/verifiablerandomness.org
cd verifiablerandomness.org
yarn 
```

### Deploy contracts

```sh
npx hardhat deploy
```

### Deploy and start a local node

```sh
npx hardhat node
```

### Deploy to Kovan

To deploy to a testnet or a live network, you need the following environment variables:

1. KOVAN_RPC_URL=https://eth-ropsten.alchemyapi.io/v2/<YOUR ALCHEMY KEY>
2. PRIVATE_KEY=0xabc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc1

Your `KOVAN_RPC_URL` is the URL of your blockchain node, for example, from [alchemy](https://www.alchemy.com/).

Your `PRIVATE_KEY` is the private key of your metamask or cryptowallet. Make sure it starts with `0x`. You might have to add `0x` if you're pulling the key from something like metamask. 

You can set them in a file named `.env`. You can follow the example of `.env.example` of what the contents of that file will look like. 

You'll also need testnet ETH and testnet LINK. You can [find both here.](https://faucets.chain.link/)

Once you do so, you can run:

```
npx hardhat deploy --network kovan
```
And make your request (it funds for you!)
``` 
npx hardhat run scripts/request.ts --network kovan
```

# Etherscan verification

Set your `ETHERSCAN_API_KEY` environment variable the same way you set your `PRIVATE_KEY` and `KOVAN_RPC_URL` above. 

```shell
npx hardhat verify --network <network> <contract_address> [arguments]
```
ie:
```
npx hardhat verify --network kovan 0x1234567654 0x123452413253 0x123452413253 0x123452413253 10000000000
```

