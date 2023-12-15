import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NFTCard from "./NFTCard";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import getNfts from "@/utils/supabase/get-nfts";
import resolveRarity from "@/utils/resolveRarity";

export default function Body() {
  const [nfts, setNfts] = useState<any>([]);

  useEffect(() => {
    (async function () {
      const res = await getNfts();

      setNfts(res.response);
    })();
  }, []);

  return (
    <div className="my-8 rounded-xl border-[1px] border-[#3c3f41]">
      <p className="font-theme font-semibold mx-8 mt-10 my-4 text-3xl">
        Latest CraftNFTs
      </p>
      <div className="bg-[#3c3f41] h-[1px] mx-8 mb-8"></div>
      <div className="grid grid-cols-6 gap-3 mt-4 mx-8">
        {nfts &&
          nfts.map((nft: any) => (
            <NFTCard
              image={nft.image}
              imageAlt={nft.image_alt}
              owner={nft.parent}
              address={nft.address}
              rarity={resolveRarity(nft.rarity)}
              tokenId={nft.token_id}
              size={400}
              mode={nft.type == 0 ? "create ✨" : "breed ❤️"}
            />
          ))}
      </div>
      <Link
        href={"/nfts"}
        className="bg-[#25272b] m-8 py-4 flex justify-center rounded-xl"
      >
        <p className="mr-2 font-semibold text-lg font-theme">
          View all CraftNFTs
        </p>
        <FontAwesomeIcon icon={faArrowRight} className="text-lg my-auto" />
      </Link>
    </div>
  );
}
