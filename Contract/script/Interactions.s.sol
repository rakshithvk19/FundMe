//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Script, console} from "forge-std/Script.sol";
import {DevOpsTools} from "../lib/foundry-devops/src/DevOpsTools.sol";
import {FundMe} from "../src/FundMe.sol";

contract FundFundMe is Script {
    uint256 constant SEND_VALUE = 0.01 ether;

    function fundFundMe(address getMostRecentlyDeployed) public {
        vm.startBroadcast();
        FundMe(payable(getMostRecentlyDeployed)).fund{value: SEND_VALUE}();
        vm.startBroadcast();
    }

    function run() external {
        address getMostRecentlyDeployed = DevOpsTools
            .get_most_recent_deployment("FundMe", block.chainid);

        fundFundMe(getMostRecentlyDeployed);
    }
}

contract WithdrawFundMe is Script {
    constructor() {}
}
