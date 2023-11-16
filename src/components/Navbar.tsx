// components/Navbar.tsx

import Link from "next/link";
import Logo from "./Logo";
import NavItems from "./NavItems";
import { useState } from "react";
import NavItem from "./NavItem";
import {
  faChartLine,
  faHammer,
  faHeart,
  faImage,
  faLevelUp,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="w-full flex justify-between ">
      <div className="flex">
        <Logo />
        <input
          type="text"
          placeholder={"Search for NFTs, Relationships and Family Trees"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="font-theme font-semibold placeholder:text-[#6c6f70] text-md placeholder:text-sm bg-[#25272b] my-1 pl-6 text-white p-2 rounded-xl focus:outline-none  focus:border-black w-[50%] flex-shrink-0 mr-2"
        />
        <NavItem content={"Create"} link={"/create"} icon={faHammer} />
        <NavItem content={"NFTs"} link={"/profile"} icon={faImage} />
        <NavItem content={"Relationships"} link={"/"} icon={faHeart} />

        <NavItem content={"Trees"} link={"/"} icon={faTree} />
        <NavItem content={"Powerups"} link={"/"} icon={faChartLine} />
      </div>
      <NavItems />
    </div>
  );
};

export default Navbar;
