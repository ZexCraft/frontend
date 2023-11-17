import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import BlockchainDropdown from "./BlockchainDropdown";
import ModeDropdown from "./ModeDropdown";
import OriginDropdown from "./OriginDropdown";
import PowerupDropdown from "./PowerupDropdown";
import RarityDropdown from "./RarityDropdown";
import CollectionDropdown from "./CollectionDropdown";

export default function Dropdown() {
  return (
    <div className="flex flex-col border border-[#3c3f41] w-[100%] rounded-xl px-5 pt-4 ">
      <BlockchainDropdown />
      <div className="h-[1px] bg-[#3c3f41]  "></div>
      <ModeDropdown />
      <div className="h-[1px] bg-[#3c3f41]  "></div>
      <OriginDropdown />

      <div className="h-[1px] bg-[#3c3f41]  "></div>
      <RarityDropdown />

      <div className="h-[1px] bg-[#3c3f41]  "></div>
      <PowerupDropdown />
      <div className="h-[1px] bg-[#3c3f41]  "></div>
      <CollectionDropdown />
    </div>
  );
}
