const FUNDME_CONTRACT_ADDRESS = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
import { Paper, Typography } from "@mui/material";
import { config } from "../../config";
import { useReadContract, type BaseError } from "wagmi";

function DisplayFunders() {
  const {
    data: data,
    error: fundersError,
    isPending,
  } = useReadContract({
    // address: FUNDME_CONTRACT_ADDRESS,
    config,
    functionName: "s_funders",
    address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    chainId: 31337,
  });

  if (isPending)
    return (
      <Paper sx={{ padding: 1, marginY: 1 }}>
        <Typography>Loading...</Typography>
      </Paper>
    );

  if (fundersError)
    return (
      <Paper sx={{ padding: 1, marginY: 1 }}>
        <Typography>
          Error:{" "}
          {(fundersError as BaseError).shortMessage || fundersError.message}
        </Typography>
      </Paper>
    );

  return (
    <Paper sx={{ padding: 1, marginY: 1 }}>
      <Typography>
        {console.log(data)}
        {/* Project Balance: {`${balance.value} ${balance.symbol} `} */}
      </Typography>
    </Paper>
  );
}

export default DisplayFunders;
