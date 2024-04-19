import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import OwnerModal from "./components/OwnerModal";
import { FundersModal } from "./components/FundersModal";
import { WagmiWrapper } from "./components/WagmiWrapper";
import DisplayBalance from "./components/DisplayBalance";
import DisplayFunders from "./components/DisplayFunders";

import { useAccount } from "wagmi";
// import DisplayVersion from "./components/DisplayVersion";

function App() {
  // const account = useAccount();
  // const checkOwner = (): boolean => {
  //   let isOwner = false;

  //   if (account === VITE_OWNER_ADDRESS) {
  //     isOwner = true;
  //   }

  //   console.log(isOwner);
  //   return isOwner;
  // };

  const owner = false;
  return (
    <main>
      <Container
        maxWidth="sm"
        sx={{ height: "100vh", border: 1, borderColor: "primary.main" }}
      >
        <Typography variant="h1">FUND ME!!!</Typography>
        <WagmiWrapper>
          {/* <DisplayBalance /> */}
          {/* <DisplayFunders /> */}

          {/* {checkOwner()} */}
          <Paper>{owner ? <OwnerModal /> : <FundersModal />}</Paper>
        </WagmiWrapper>
      </Container>
    </main>
  );
}

export default App;
