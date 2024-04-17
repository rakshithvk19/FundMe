import { http, createConfig } from "@wagmi/core";
import { anvil, sepolia } from "@wagmi/core/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia, anvil],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_ETH_SEPOLIA_RPC_URL),
    [anvil.id]: http(),
  },
  connectors: [injected()],
});
