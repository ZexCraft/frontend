// components/Navbar.tsx

import Link from "next/link";
import Logo from "./Logo";
import NavItems from "./NavItems";

const Navbar: React.FC = () => {
  return (
    <div className="w-full flex justify-center absolute top-[2%]">
      <div className="flex justify-between absolute w-[60%] ">
        <Logo />
        <NavItems />
      </div>
    </div>
  );
};

export default Navbar;
