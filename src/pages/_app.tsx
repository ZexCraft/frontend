"use client";
import "@rainbow-me/rainbowkit/styles.css";

import * as React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const pegoMainnet: Chain = {
  name: "PEGO Mainnet",
  id: 20201022,
  network: "pego-mainnet",
  nativeCurrency: { name: "PEGO", symbol: "PG", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://pegorpc.com"],
    },
    public: {
      http: ["https://pegorpc.com"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "PEGO Scan",
      url: "https://scan.pego.network",
    },
    default: {
      name: "PEGO Scan",
      url: "https://scan.pego.network",
    },
  },
  testnet: false,
};
const pegoTestnet: Chain = {
  name: "PEGO Testnet",
  id: 123456,
  network: "pego-testnet",
  nativeCurrency: { name: "TestPEGO", symbol: "tPG", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.pegotest.net/"],
    },
    public: {
      http: ["https://rpc.pegotest.net/"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "PEGO Scan",
      url: "https://scan.pegotest.net/",
    },
    default: {
      name: "PEGO Scan",
      url: "https://scan.pegotest.net/",
    },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [pegoMainnet, pegoTestnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "PegoCraft",
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
