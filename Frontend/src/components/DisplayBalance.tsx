import { Paper, Typography } from "@mui/material";
const FUNDME_CONTRACT_ADDRESS = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
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
