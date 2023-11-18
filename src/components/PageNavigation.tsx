import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PageNavigation() {
  const router = useRouter();
  const route = router.route;

  return (
    <div className="flex space-x-5 text-2xl mb-6 font-bold text-[#9c9e9e]">
      <Link
        href={"/nfts"}
        className={`hover:text-[#d0d1d1] ${
          route == "/nfts" ? "text-white" : ""
        }`}
      >
        NFTs
      </Link>
      <Link
        href={"/relations"}
        className={`hover:text-[#d0d1d1] ${
          route == "/relations" ? "text-white" : ""
        }`}
      >
        Relationships
      </Link>
      <Link
        href={"/trees"}
        className={`hover:text-[#d0d1d1] ${
          route == "/trees" ? "text-white" : ""
        }`}
      >
        Trees
      </Link>
    </div>
  );
}
