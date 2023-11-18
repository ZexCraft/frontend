import Layout from "@/components/Layout";
import NFTCard from "@/components/NFTCard";
import { shortenEthereumAddress } from "@/utils";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Relation() {
  const router = useRouter();
  const { relation } = router.query;
  return (
    <Layout>
      <div className="min-h-[90vh] mt-20 w-[80%]  mx-auto flex space-x-32 justify-between">
        <div className="flex flex-col justify-center">
          <NFTCard
            image="/sample-nfts/noun.png"
            owner="0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"
            address="0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"
            rarity="ZexStar"
            tokenId="79"
            size={200}
            mode="create ✨"
          />
        </div>

        <div className="flex-1 flex flex-col justify-start">
          <p className=" text-5xl font-semibold ">Relationship</p>
          <Link
            target="_blank"
            href={`https://sepolia.etherscan.io/address/${relation}`}
            className="text-lg my-2 tracking-wider text-[#9c9e9e] font-semibold"
          >
            {shortenEthereumAddress(relation as string)}&nbsp;
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="text-[#9c9e9e] text-sm font-normal my-auto"
            />
          </Link>
          {/* <p className=" text-4xl font-semibold ">Offsprings</p> */}
        </div>

        <div className="flex flex-col justify-center">
          <NFTCard
            image="/sample-nfts/punk.png"
            owner="0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"
            address="0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"
            rarity="Legend"
            tokenId="21"
            size={200}
            mode="create ✨"
          />
        </div>
      </div>
    </Layout>
  );
}
