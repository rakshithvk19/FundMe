import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import { FundMeContract } from "../FundMe";

function OwnerModal() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Paper sx={{ padding: "0.5em" }}>
      {/* <Typography>{owner}</Typography> */}
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            alignItems: "center",
          }}
        >
          <TextField label="Withdraw" variant="outlined" />
          <Button type="submit" variant="contained">
            Fund
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default OwnerModal;
