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
const NavItems: React.FC = () => {
  return (
    <div className="flex">
      <CurrentChain />
      <ConnectButton />
    </div>
  );
};

export default NavItems;
