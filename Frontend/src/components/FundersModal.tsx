import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function FundersModal() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
  };

  return (
    <Paper sx={{ padding: "0.5em" }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            alignItems: "center",
          }}
        >
          <TextField label="Name" variant="outlined" />
          <Button type="submit" variant="contained">
            Fund
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default FundersModal;
