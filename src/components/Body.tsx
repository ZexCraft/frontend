import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NFTCard from "./NFTCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Body() {
  return (
    <div className="my-8 rounded-xl border-[1px] border-[#3c3f41]">
      <p className="font-theme font-semibold mx-8 mt-10 my-4 text-3xl">
        Latest ZexNFTs
      </p>
      <div className="bg-[#3c3f41] h-[1px] mx-8 mb-8"></div>
      <div className="grid grid-cols-6 gap-3 mt-4 mx-8">
        <NFTCard
          size={400}
          image={"/sample-generated/1.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/2.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"breed ❤️"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/3.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/4.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/5.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/1.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/2.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/3.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/4.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/5.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/4.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
        <NFTCard
          size={400}
          image={"/sample-generated/5.png"}
          owner={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          address={"0x24fEADf4Dd65393Ff3323eDF9312798E35A2b110"}
          rarity={"ZexStar"}
          tokenId={"69"}
          mode={"create ✨"}
        />
      </div>
      <Link
        href={"/nfts"}
        className="bg-[#25272b] m-8 py-4 flex justify-center rounded-xl"
      >
        <p className="mr-2 font-semibold text-lg font-theme">
          View all ZexNFTs
        </p>
        <FontAwesomeIcon icon={faArrowRight} className="text-lg my-auto" />
      </Link>
    </div>
  );
}
