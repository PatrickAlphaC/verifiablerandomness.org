/* eslint-disable node/no-unpublished-import */
import { HardhatRuntimeEnvironment } from "hardhat/types"
// eslint-disable-next-line node/no-missing-import
import { DeployFunction } from "hardhat-deploy/types"

const deployMocks: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    if (hre.network.name == "hardhat" || hre.network.name == "localhost") {
        log("Deploying mocks...")
        const linkToken = await deploy("LinkToken", {
            from: deployer,
            args: [],
            log: true,
        })
        await deploy('VRFCoordinatorMock', {
            from: deployer,
            log: true,
            args: [linkToken.address]
        })
        log('Mocks Deployed!')
    }
}
export default deployMocks
deployMocks.tags = ['all', 'mocks']
