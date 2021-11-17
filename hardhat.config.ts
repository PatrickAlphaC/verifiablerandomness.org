import * as dotenv from "dotenv"

import { HardhatUserConfig, task } from "hardhat/config"
import "@typechain/hardhat"
import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "hardhat-deploy"
import "hardhat-gas-reporter"
import '@appliedblockchain/chainlink-plugins-fund-link'

dotenv.config()

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.7"
      },
      {
        version: "0.6.6"
      },
      {
        version: "0.4.24"
      }
    ]
  },
  networks: {
    kovan: {
      url: process.env.KOVAN_RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    }
  },
  gasReporter: {
    enabled: true,
    gasPrice: 100,
    currency: "USD",
    outputFile: "gasReport.md",
    noColors: true
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}

export default config
