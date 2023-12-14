import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavItem from "./NavItem";
import {
  faCab,
  faChain,
  faClover,
  faCoffee,
  faHammer,
  faHeart,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ConnectButton from "./ConnectButton";
import CurrentChain from "./CurrentChain";
import Link from "next/link";
import useWindowSize from "@/hooks/useWindowSize";
const NavItems: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <div className="flex ">
      <CurrentChain />
      <ConnectButton />
      <Link
        href={"/profile"}
        className=" rounded-full bg-[#d0d1d1] flex justify-center items-center my-auto ml-3 p-3"
      >
        <FontAwesomeIcon icon={faUser} className="text-black text-lg" />
      </Link>
    </div>
  );
};

export default NavItems;
