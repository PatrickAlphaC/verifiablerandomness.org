/* eslint-disable no-process-exit */
import { ethers, deployments, run, network } from 'hardhat'
import { networkConfig } from "../helper-hardhat-config"

function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function requestRNG () {
  const { get } = deployments
  const accounts = await ethers.getSigners()
  const VerifiableRandomnessOrg = await ethers.getContractFactory('VerifiableRandomnessOrg')
  const VRODeployment = await get('VerifiableRandomnessOrg')
  // eslint-disable-next-line no-undef
  const verifiableRandomnessOrg = new ethers.Contract(VRODeployment.address, VerifiableRandomnessOrg.interface, accounts[0])
  let range = 7
  await run("fund-link", { contract: verifiableRandomnessOrg.address, linkaddress: networkConfig[network.name].linkToken! })
  const requestTx = await verifiableRandomnessOrg.getRandomNumber(range)
  const requestReceipt = await requestTx.wait()
  let requestId = requestReceipt.events![3].topics[1]
  console.log(`Entered with requestId of ${requestId}!\n  Waiting for response...`)
  await sleep(120 * 1000)
  console.log(`Your random number is ${await verifiableRandomnessOrg.s_requestIdToRNG(requestId)}`)
  console.log("If the answer is 0, you likely have to just wait longer!")
  return requestTx
}

requestRNG()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
