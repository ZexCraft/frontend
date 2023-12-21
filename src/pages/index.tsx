// import Image from "next/image";

import Home from "@/components/Home";
import Layout from "@/components/Layout";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function HomePage() {
  const { address } = useAccount();
  const { openConnectModal, connectModalOpen } = useConnectModal();

  useEffect(() => {
    if (address == null && !connectModalOpen)
      openConnectModal && openConnectModal();
  }, [address, connectModalOpen]);

  return <Layout>{address && <Home />}</Layout>;
}
