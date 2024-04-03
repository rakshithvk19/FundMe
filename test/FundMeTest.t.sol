// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Test, console} from "forge-std/Test.sol";
import {FundMe} from "../src/FundMe.sol";
import {DeployFundMe} from "../script/DeployFundMe.s.sol";

contract FundMeTest is Test {
    FundMe fundMe;
    address MILIND = makeAddr("Milind");
    uint256 constant SEND_VALUE = 0.1 ether;
    uint256 constant STARTING_BALANCE = 10 ether;
    uint256 constant GAS_PRICE = 2;

    function setUp() external {
        // fundMe = new FundMe(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        DeployFundMe deployFundMe = new DeployFundMe();
        vm.deal(MILIND, STARTING_BALANCE);
        fundMe = deployFundMe.run();
    }

    modifier funded() {
        vm.prank(MILIND);
        fundMe.fund{value: SEND_VALUE}(); //Funding 10ETH
        _;
    }

    function test_MinmumDollarIsFive() public view {
        assertEq(fundMe.MINIMUM_USD(), 5e18);
    }

    function test_OwnerIsMessageSender() public view {
        assertEq(fundMe.getOwner(), msg.sender);
    }

    function test_PriceFeedVersionIsV4() public view {
        uint256 version = fundMe.getVersion();
        assertEq(version, 4);
    }

    function test_FundFailsWithoutEnoughETH() public {
        vm.expectRevert();

        fundMe.fund();
    }

    function test_FundingUpdatesMapping() public {
        vm.prank(MILIND);
        fundMe.fund{value: SEND_VALUE}(); //Funding 10ETH

        uint256 amountFunded = fundMe.getAddressToAmountFunded(MILIND);
        assertEq(amountFunded, SEND_VALUE);
    }

    function test_FundingUpdatesFundersArray() public {
        vm.prank(MILIND);

        //send ETH to contract.
        fundMe.fund{value: SEND_VALUE}();

        //Get 0th address.
        address zerothAddr = fundMe.getFundersAddress(0);
        assertEq(zerothAddr, MILIND);
    }

    function test_OnlyOwnerCanWithdrawFromContract() public {
        //Fund 10Eth to the contract.
        //Check if the balance of the msg.sender is nearby 10ETH
    }

    function test_FailsWhenFundersTryToWithdraw() public funded {
        vm.prank(MILIND);
        vm.expectRevert(bytes("Only owner can call this function"));

        //Fails if accounts other than owner calls withdraw function.
        fundMe.withdraw();
    }

    function test_WithdrawWithASingleFunder() public funded {
        //Arrange -> Arranging the testing setup
        uint256 startingOwnerBalance = fundMe.getOwner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        //Act -> acting on the testing condition.
        vm.prank(fundMe.getOwner());
        fundMe.withdraw();

        //Assert -> Asserting the testing scenario.
        uint256 endingOwnerBalance = fundMe.getOwner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;
        assertEq(endingFundMeBalance, 0);
        assertEq(
            startingOwnerBalance + startingFundMeBalance,
            endingOwnerBalance
        );
    }

    function testingWithDrawFromMultipleFunders() public funded {
        //Arrange
        uint160 numberOfFunders = 10;
        uint160 startingFunderIndex = 1;

        for (uint160 i = startingFunderIndex; i < numberOfFunders; i++) {
            hoax(address(i), SEND_VALUE);
            fundMe.fund{value: SEND_VALUE}();
        }

        uint256 startingOwnerBalance = fundMe.getOwner().balance;
        uint256 startingFundMeBalance = address(fundMe).balance;

        //Act
        uint256 gasStart = gasleft();
        vm.txGasPrice(GAS_PRICE);
        vm.startPrank(fundMe.getOwner());
        fundMe.withdraw();
        vm.stopPrank();
        uint256 gasEnd = gasleft();
        uint256 gasUsed = gasStart - gasEnd;
        console.log("gasUsed", gasUsed);

        //Assert
        uint256 endingOwnerBalance = fundMe.getOwner().balance;
        uint256 endingFundMeBalance = address(fundMe).balance;
        assertEq(endingFundMeBalance, 0);
        assertEq(
            startingOwnerBalance + startingFundMeBalance,
            endingOwnerBalance
        );
    }
}
