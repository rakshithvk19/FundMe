//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {MockV3Aggregator} from "../test/mocks/MockV3Aggregator.sol";

contract HelperConfig is Script {
    struct NetworkConfig {
        address priceFeed;
    }

    NetworkConfig public activeNetworkConfig;

    //Defining magic numbers
    uint8 public constant DECIMALS = 8;
    int public constant INITIAL_PRICE = 2000e8;
    uint public constant ETH_SEPOLIA_CHAIN_ID = 11155111;
    uint public constant ARB_SEPOLIA_CHAIN_ID = 421614;

    constructor() {
        //If on Anvil, deploy mock, else add the contract address associated with the network.

        if (block.chainid == ETH_SEPOLIA_CHAIN_ID) {
            activeNetworkConfig = getSepoliaEthConfig();
        } else if (block.chainid == ARB_SEPOLIA_CHAIN_ID) {
            activeNetworkConfig = getArbitrumSepoliaEthConfig();
        } else {
            activeNetworkConfig = getAnvilEthConfig();
        }
    }

    //Returns the contract address of AggregatorV3Interface in Sepolia Eth Testnet.
    function getSepoliaEthConfig() public pure returns (NetworkConfig memory) {
        NetworkConfig memory sepoliaConfig = NetworkConfig({
            priceFeed: 0x694AA1769357215DE4FAC081bf1f309aDC325306
        });

        return sepoliaConfig;
    }

    //Returns the contract address of AggregatorV3Interface in ARBITRUM SEPOLIA Eth Testnet.
    function getArbitrumSepoliaEthConfig()
        public
        pure
        returns (NetworkConfig memory)
    {
        NetworkConfig memory arbitrumSepoliaConfig = NetworkConfig({
            priceFeed: 0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165
        });

        return arbitrumSepoliaConfig;
    }

    //Returns the networkId and contract address of AggregatorV3Interface in local Anvil chain.
    function getAnvilEthConfig() public returns (NetworkConfig memory) {
        //Since AggregatorV3Interface is not on local anvil n/w, we are gonna deploy the contract on anvil.

        if (activeNetworkConfig.priceFeed != address(0)) {
            return activeNetworkConfig;
        }

        vm.startBroadcast();
        MockV3Aggregator mockPriceFeed = new MockV3Aggregator(
            DECIMALS,
            INITIAL_PRICE
        );
        vm.stopBroadcast();

        //Setting the value of network config
        NetworkConfig memory anvilConfig = NetworkConfig({
            priceFeed: address(mockPriceFeed)
        });

        return anvilConfig;
    }
}
