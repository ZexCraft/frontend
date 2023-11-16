import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { keyframes } from "styled-components";

export default function Logo() {
  return (
    <Link href={"/"} className="flex cursor-pointer">
      <Image
        src="/logo.png"
        width={35}
        height={35}
        alt="logo"
        className="my-auto  mx-2"
      />
      {/* <p className="font-noun font-logo font-bold text-black text-3xl tracking-wider ml-4 my-auto"> */}
      <AnimatedGradientText className=" ml-2  tracking-wider">
        ZexCraft
      </AnimatedGradientText>
      {/* </p> */}
    </Link>
  );
}
const hue = keyframes`
 from {
   -webkit-filter: hue-rotate(0deg);
 }
 to {
   -webkit-filter: hue-rotate(-360deg);
 }
`;
const AnimatedGradientText = styled.h1`
  color: #f35626;
  background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: ${hue} 10s infinite linear;
  font-family: "Londrina Solid", sans-serif;
  font-feature-settings: "kern";
  font-size: 30px;
  font-weight: 600;
  line-height: 48px;
  overflow-wrap: break-word;
  text-align: center;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
`;
