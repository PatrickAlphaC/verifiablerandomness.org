//  __ __    ___  ____   ____  _____  ____   ____  ____   _        ___
// |  |  |  /  _]|    \ |    ||     ||    | /    ||    \ | |      /  _]
// |  |  | /  [_ |  D  ) |  | |   __| |  | |  o  ||  o  )| |     /  [_
// |  |  ||    _]|    /  |  | |  |_   |  | |     ||     || |___ |    _]
// |  :  ||   [_ |    \  |  | |   _]  |  | |  _  ||  O  ||     ||   [_
//  \   / |     ||  .  \ |  | |  |    |  | |  |  ||     ||     ||     |
//   \_/  |_____||__|\_||____||__|   |____||__|__||_____||_____||_____|

//  ____    ____  ____   ___     ___   ___ ___  ____     ___  _____ _____
// |    \  /    ||    \ |   \   /   \ |   |   ||    \   /  _]/ ___// ___/
// |  D  )|  o  ||  _  ||    \ |     || _   _ ||  _  | /  [_(   \_(   \_
// |    / |     ||  |  ||  D  ||  O  ||  \_/  ||  |  ||    _]\__  |\__  |
// |    \ |  _  ||  |  ||     ||     ||   |   ||  |  ||   [_ /  \ |/  \ |
// |  .  \|  |  ||  |  ||     ||     ||   |   ||  |  ||     |\    |\    |
// |__|\_||__|__||__|__||_____| \___/ |___|___||__|__||_____| \___| \___|

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

contract VerifiableRandomnessOrg is VRFConsumerBase {
    bytes32 internal s_keyHash;
    uint256 internal s_fee;

    mapping(bytes32 => uint256) public s_requestIdToRange;
    mapping(bytes32 => uint256) public s_requestIdToRNG;

    event RequestedRandomness(bytes32 indexed requestId, uint256 range);
    event RandomnessFulfilled(bytes32 indexed requestId, uint256 randomness);

    constructor(
        address vrfCoordinator,
        address linkToken,
        bytes32 keyHash,
        uint256 fee
    )
        VRFConsumerBase(
            vrfCoordinator, // VRF Coordinator
            linkToken // LINK Token
        )
    {
        s_keyHash = keyHash;
        s_fee = fee;
    }

    /**
     * Requests randomness
     */
    function getRandomNumber(uint256 range) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK - fill contract with faucet");
        requestId = requestRandomness(s_keyHash, s_fee);
        s_requestIdToRange[requestId] = range;
        emit RequestedRandomness(requestId, range);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        s_requestIdToRNG[requestId] = randomness % s_requestIdToRange[requestId];
        emit RandomnessFulfilled(requestId, randomness);
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
