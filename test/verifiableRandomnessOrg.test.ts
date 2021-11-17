import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { network, deployments, ethers, run } from "hardhat"
import { VerifiableRandomnessOrg } from "../typechain/VerifiableRandomnessOrg"
import { Deployment } from 'hardhat-deploy/dist/types'
import { VRFCoordinatorMock } from '../typechain'
import { expect } from 'chai'
const { developmentChains, networkConfig } = require("../helper-hardhat-config")

function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('VerifiableRandomnessOrg', async () => {
  let runTest = false
  let LinkToken: Deployment, VRFCoordinatorMock: Deployment, VRODeployment: Deployment
  let verifiableRandomnessOrg: VerifiableRandomnessOrg
  let vrfCoordinator: VRFCoordinatorMock
  let accounts: SignerWithAddress[]
  beforeEach(async () => {
    if (developmentChains.includes(network.name)) {
      runTest = true
    }
    await deployments.fixture(["all"])
    accounts = await ethers.getSigners()
    VRODeployment = await deployments.get("VerifiableRandomnessOrg")
    LinkToken = await deployments.get('LinkToken')
    VRFCoordinatorMock = await deployments.get('VRFCoordinatorMock')

    verifiableRandomnessOrg = await ethers.getContractAt("VerifiableRandomnessOrg", VRODeployment.address, accounts[0])
    vrfCoordinator = await ethers.getContractAt("VRFCoordinatorMock", VRFCoordinatorMock.address, accounts[0])
  })
  it("Should allow people to get a random number", async () => {
    if (runTest) {
      await run("fund-link", { contract: verifiableRandomnessOrg.address, linkaddress: LinkToken.address }) // we do this also to move the blocks along
      let range = 77
      let randomNumber = 777
      let transactionResponse = await verifiableRandomnessOrg.getRandomNumber(range)
      let transactionReceipt = await transactionResponse.wait()
      let requestId = transactionReceipt.events![3].topics[1]
      await vrfCoordinator.callBackWithRandomness(requestId, randomNumber, verifiableRandomnessOrg.address)
      expect(await verifiableRandomnessOrg.s_requestIdToRNG(requestId)).to.equal(randomNumber % range)
    }
  })

})

