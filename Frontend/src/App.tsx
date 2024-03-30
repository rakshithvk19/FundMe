import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import OwnerModal from "./components/OwnerModal";
import FundersModal from "./components/FundersModal";

function App() {
  return (
    <main>
      <Container maxWidth="sm">
        <Paper sx={{ border: 1, borderColor: "primary.main", height: "100vh" }}>
          <OwnerModal />
          <FundersModal />
        </Paper>
      </Container>
    </main>
  );
}

export default App;
