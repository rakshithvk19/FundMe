import { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useWriteContract } from "wagmi";
import { parseEther } from "ethers";
import { FundMeABI } from "../FundMe.abi";

const FundersModal: React.FC = () => {
  const [fundingEth, setFundingEth] = useState<string>("0");
  const [showFundingForm, setShowFundingForm] = useState<boolean>(true);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMsg, setErrorMessage] = useState<string>(
    "Something went wrong. Please try again!"
  );

  const {
    data: hash,
    error: fundingError,
    status: fundingStatus,
    reset: fundingReset,
    writeContract,
  } = useWriteContract();

  useEffect(() => {
    if (fundingStatus === "idle") {
    }

    if (fundingStatus === "pending") {
      setShowFundingForm(false);
    }

    if (fundingStatus === "error") {
      if (fundingError.name === "TransactionExecutionError") {
        setErrorMessage(
          "User Denied the transcation. Please accept the transaction"
        );
      }
      setShowErrorModal(true);
    }

    if (fundingStatus === "success") {
    }
  }, [fundingStatus]);

  const handleFundAmount = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFundingEth(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    //Throws error if funding ETH is zero.
    if (fundingEth === "0") {
      setShowFundingForm(false);
      setShowErrorModal(true);
      setErrorMessage("0.5 ETH is the minimum ETH to fund.");
      return;
    }

    try {
      writeContract({
        abi: FundMeABI,
        functionName: "fund",
        address: import.meta.env.VITE_ANVIL_FUNDME_ADDRESS,
        chainId: 31337,
        args: [],
        value: parseEther(fundingEth),
      });
    } catch (error) {
      if (error instanceof TypeError) {
        setErrorMessage("Please enter ETH value in numbers");
      }
      setShowFundingForm(false);
      setShowErrorModal(true);
    }
  };

  const handleRetry = (): void => {
    setErrorMessage("");
    setFundingEth("0");
    setShowErrorModal(false);
    setShowFundingForm(true);
  };

  const handleFundAgain = (): void => {
    setFundingEth("0");
    setShowErrorModal(false);
    setShowFundingForm(true);
    fundingReset();
  };

  return (
    <Paper sx={{ padding: "1em" }}>
      <Typography gutterBottom>Fund ETH to Contract</Typography>

      {showFundingForm && (
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
      )}

      {showErrorModal && (
        <Box
          border={"2px solid"}
          borderColor={"error.main"}
          borderRadius={2}
          padding={1}
        >
          <Typography>Error: {errorMsg}</Typography>
          <Button variant="contained" onClick={handleRetry}>
            Retry
          </Button>
        </Box>
      )}

      {fundingStatus === "pending" && <CircularProgress />}

      {fundingStatus === "success" && (
        <>
          <Box
            border={"2px solid"}
            borderColor={"success.main"}
            borderRadius={2}
            padding={1}
          >
            <Typography>Transaction Successful</Typography>
            <Typography>Thank you for your contribution</Typography>
            <Typography>Please check the transaction hash below:</Typography>
            <Typography variant="subtitle2"> {hash}</Typography>
            <Button variant="contained" onClick={handleFundAgain}>
              Fund Again
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

export { FundersModal };
