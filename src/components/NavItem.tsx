import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCab } from "@fortawesome/free-solid-svg-icons";
const NavItem = ({
  icon,
  content,
  link,
}: {
  icon: IconDefinition;
  content: string;
  link: string;
}) => {
  return (
    <Link
      href={link}
      className="flex items-center justify-center rounded-lg border-[1px] border-[#cfbdba] px-3 mx-2 my-1 py-1"
    >
      <FontAwesomeIcon
        icon={icon}
        className=" text-black text-md font-bold mr-2"
      />
      <p className="font-theme text-black text-md font-bold">{content}</p>
    </Link>
  );
};

export default NavItem;
