import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import OwnerModal from "./components/OwnerModal";
import FundersModal from "./components/FundersModal";
import { WagmiWrapper } from "./components/WagmiWrapper";
import DisplayBalance from "./components/DisplayBalance";

function App() {
  const owner = true;
  return (
    <main>
      <Container
        maxWidth="sm"
        sx={{ height: "100vh", border: 1, borderColor: "primary.main" }}
      >
        <Typography variant="h1">FUND ME!!!</Typography>
        <WagmiWrapper>
          <DisplayBalance />
          <Paper>{owner ? <OwnerModal /> : <FundersModal />}</Paper>
        </WagmiWrapper>
      </Container>
    </main>
  );
}

export default App;
