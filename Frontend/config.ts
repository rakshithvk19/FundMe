import { http, createConfig } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_ETH_SEPOLIA_RPC_URL),
  },
  connectors: [injected()],
});
