import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { useWriteContract } from "wagmi";
import { parseEther } from "ethers";

import { FundMeABI } from "../FundMe.abi";

function FundersModal() {
  const [fundingEth, setFundingEth] = useState<string>("0");
  const [showForm, setShowForm] = useState<boolean>(true);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    data: hash,
    error: fundingError,
    isError: isFundingError,
    isIdle: isFundingIdle,
    isPending: isFundingPending,
    writeContract,
  } = useWriteContract();

  const handleFundAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFundingEth(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const tx = writeContract({
        abi: FundMeABI,
        functionName: "fund",
        address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
        chainId: 31337,
        args: [],
        value: parseEther(fundingEth),
      });

      // setTxHash(tx);
      // setShowForm(false);
    } catch (error) {
      setErrorMessage(error.message);
      setShowError(true);
    } finally {
      setShowForm(true);
    }
  };

  const handleRetry = () => {
    setShowForm(true);
    setShowError(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setTxHash(null);
  };

  //Use Effect to clear the form details.
  useEffect(() => {
    setFundingEth("0");
  }, [showForm]);

  return (
    <Paper sx={{ padding: "1em" }}>
      <Typography gutterBottom>Fund ETH to Contract</Typography>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              gap: "1em",
              alignItems: "center",
            }}
          >
            <TextField
              label="Fund ETH"
              variant="outlined"
              onChange={handleFundAmount}
            />
            <Button type="submit" variant="contained">
              Fund
            </Button>
          </Box>
        </form>
      ) : isFundingPending ? (
        <CircularProgress />
      ) : null}

      {/* isTxPending ? (
        <CircularProgress />
      ) : txHash ? (
        <Box>
          <Typography>Transaction Hash: {txHash}</Typography>
          <Button onClick={handleShowForm}>Fund Again</Button>
        </Box>
      ) : showError ? (
        <Box>
          <Typography>Error: {errorMessage}</Typography>
          <Button variant="contained" onClick={handleRetry}>
            Retry
          </Button>
        </Box>
      ) : null} */}
    </Paper>
  );
}

export default FundersModal;
