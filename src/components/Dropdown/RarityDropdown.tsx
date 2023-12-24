import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
export default function RarityDropdown() {
  const [rarity, setRarity] = useState("");
  const [rarityDropdown, setRarityDropdown] = useState(false);
  return (
    <>
      <button
        className="text-white font-semibold text-xl text-left flex justify-between my-6 mx-1"
        onClick={() => {
          if (rarityDropdown) setRarityDropdown(false);
          else setRarityDropdown(true);
        }}
      >
        <p>Rarity</p>
        <FontAwesomeIcon
          icon={faChevronDown}
          size="xs"
          className="my-auto"
          flip={rarityDropdown ? "vertical" : "horizontal"}
        ></FontAwesomeIcon>
      </button>
      {rarityDropdown && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              rarity == "Common"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setRarity("Common");
            }}
          >
            Common
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              rarity == "Basic"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setRarity("Basic");
            }}
          >
            Basic
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              rarity == "Rare"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setRarity("Rare");
            }}
          >
            Rare
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              rarity == "Epic"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setRarity("Epic");
            }}
          >
            Epic
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              rarity == "Legendary"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setRarity("Legendary");
            }}
          >
            Legendary
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              rarity == "InStar"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setRarity("InStar");
            }}
          >
            InStar
          </button>
        </div>
      )}
    </>
  );
}
