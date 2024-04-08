import { Paper, Typography } from "@mui/material";
const FUNDME_CONTRACT_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
import { config } from "../../config";
import { useBalance, type BaseError } from "wagmi";

function DisplayBalance() {
  const {
    data: balance,
    error,
    isPending,
  } = useBalance({
    address: FUNDME_CONTRACT_ADDRESS,
    config,
    unit: "ether",
  });

  if (isPending)
    return (
      <Paper sx={{ padding: 1, marginY: 1 }}>
        <Typography>Loading...</Typography>
      </Paper>
    );

  if (error)
    return (
      <Paper sx={{ padding: 1, marginY: 1 }}>
        <Typography>
          Error: {(error as BaseError).shortMessage || error.message}
        </Typography>
      </Paper>
    );

  return (
    <Paper sx={{ padding: 1, marginY: 1 }}>
      <Typography>
        Project Balance: {`${balance.value} ${balance.symbol} `}
      </Typography>
    </Paper>
  );
}

export default DisplayBalance;
