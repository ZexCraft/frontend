"use client";
import "@rainbow-me/rainbowkit/styles.css";

import * as React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai } from "viem/chains";

const injectiveDevnet: Chain = {
  name: "Injective EVM",
  id: 1738,
  network: "injective",
  nativeCurrency: { name: "INJECTIVE", symbol: "INJ", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://inevm-rpc.caldera.dev"],
    },
    public: {
      http: ["https://inevm-rpc.caldera.dev"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Injective Caldera Explorer",
      url: "https://inevm.calderaexplorer.xyz/",
    },
    default: {
      name: "Injective Caldera Explorer",
      url: "https://inevm.calderaexplorer.xyz/",
    },
  },
  testnet: true,
};
const { chains, publicClient } = configureChains(
  [injectiveDevnet, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "InCraft",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
