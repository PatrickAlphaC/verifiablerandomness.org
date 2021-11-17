/* eslint-disable node/no-unpublished-import */
import { HardhatRuntimeEnvironment } from "hardhat/types"
// eslint-disable-next-line node/no-missing-import
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"

const deployMocks: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    let linkTokenAddress, vrfCoordinatorAddress
    if (developmentChains.includes(hre.network.name)) {
        let linkToken = await get("LinkToken")
        linkTokenAddress = linkToken.address
        let vrfCoordinatorMock = await get("VRFCoordinatorMock")
        vrfCoordinatorAddress = vrfCoordinatorMock.address
    } else {
        linkTokenAddress = networkConfig[hre.network.name].linkToken!
        vrfCoordinatorAddress = networkConfig[hre.network.name].vrfCoordinator!
    }
    log("Deploying verifiablerandomnessorg...")
    const verifiablerandomnessorg = await deploy("VerifiableRandomnessOrg", {
        from: deployer,
        args: [vrfCoordinatorAddress, linkTokenAddress, networkConfig[hre.network.name].keyHash, networkConfig[hre.network.name].fee],
        log: true,
    })
    if (!developmentChains.includes(hre.network.name)) {
        await verify(verifiablerandomnessorg.address, hre, [vrfCoordinatorAddress, linkTokenAddress, networkConfig[hre.network.name].keyHash, networkConfig[hre.network.name].fee])
    }
    log(`Your contract has been deployed to ${verifiablerandomnessorg.address}`)
}

async function verify (address: string, hre: HardhatRuntimeEnvironment, constructorArguments: any[]) {
    console.log("Started verification")
    await hre.run("verify:verify", {
        address,
        constructorArguments,
        contract: "contracts/VerifiableRandomnessOrg.sol:VerifiableRandomnessOrg", // optional
    })
    return "VerifiableRandomnessOrg Verified"
}

export default deployMocks
deployMocks.tags = ['all', 'mocks']
