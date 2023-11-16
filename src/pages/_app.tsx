"use client";
import "@rainbow-me/rainbowkit/styles.css";

import * as React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, sepolia, avalancheFuji, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Footer from "@/components/Footer";

const { chains, publicClient } = configureChains(
  [goerli, sepolia, avalancheFuji, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "ZexCraft",
  projectId: process.env.NEXT_PROJECT_ID ?? "0354c8dc98c64f51775522050a4a0cfa",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className="mx-8 my-4">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
