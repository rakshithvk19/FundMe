import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import OwnerModal from "./components/OwnerModal";
import FundersModal from "./components/FundersModal";
import { WagmiWrapper } from "./components/WagmiWrapper";

function App() {
  return (
    <main>
      <Container
        maxWidth="sm"
        sx={{ height: "100vh", border: 1, borderColor: "primary.main" }}
      >
        <Typography variant="h1">FUND ME!!!</Typography>
        <WagmiWrapper>
          <Paper>
            <OwnerModal />
            <FundersModal />
          </Paper>
        </WagmiWrapper>
      </Container>
    </main>
  );
}

export default App;