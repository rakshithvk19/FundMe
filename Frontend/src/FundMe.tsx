import Web3 from "web3";

import fundMeContractABI from "./FundMe.abi.json";
const fundMeContractAddress = import.meta.env.VITE_ANVIL_FUNDME_ADDRESS;

const web3 = new Web3(window.ethereum);

export const FundMeContract = new web3.eth.Contract(
  fundMeContractABI,
  fundMeContractAddress
);
