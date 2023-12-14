"use client";
import "@rainbow-me/rainbowkit/styles.css";

import * as React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, sepolia, avalancheFuji, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Footer from "@/components/Footer";

const pego: Chain = {
  name: "PEGO Mainnet",
  id: 20201022,
  network: "goerli",
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

const { chains, publicClient } = configureChains(
  [pego, polygonMumbai],
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
