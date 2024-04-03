-include .env

abi:
	forge build && jq ".abi" ./out/FundMe.sol/FundMe.json > ../Frontend/src/FundMe.abi.json

anvil deploy:
	forge script ./script/DeployFundMe.s.sol --broadcast --private-key $(ANVIL_ADDRESS_ZERO_PRIVATE_KEY)