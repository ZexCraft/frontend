import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PowerupDropdown() {
  const [powerup, setPowerup] = useState("");
  const [powerupDropdown, setPowerupDropdown] = useState(false);

  return (
    <>
      <button
        className="text-white font-semibold text-xl text-left flex justify-between my-6 mx-1"
        onClick={() => {
          if (powerupDropdown) setPowerupDropdown(false);
          else setPowerupDropdown(true);
        }}
      >
        <p>Powerup</p>
        <FontAwesomeIcon
          icon={faChevronDown}
          size="xs"
          className="my-auto"
          flip={powerupDropdown ? "vertical" : "horizontal"}
        ></FontAwesomeIcon>
      </button>
      {powerupDropdown && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+1 Boost"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("+1 Boost");
            }}
          >
            +1 Boost
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+2 Boost"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("+2 Boost");
            }}
          >
            +2 Boost
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+5 Boost"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("+5 Boost");
            }}
          >
            +5 Boost
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+10 Boost"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("+10 Boost");
            }}
          >
            +10 Boost
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+1 Rare"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("+1 Rare");
            }}
          >
            +1 Rare
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+1 Epic"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("+1 Epic");
            }}
          >
            +1 Epic
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+1 Legend"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("+1 Legend");
            }}
          >
            +1 Legend
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+1 Star"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("+1 Star");
            }}
          >
            +1 Star
          </button>
          <button
            className={` rounded-lg p-3  text-lg font-semibold ${
              powerup == "+1 Twins"
                ? "bg-[#d0d1d1] text-black"
                : "bg-[#25272b] text-white"
            }`}
            onClick={() => {
              setPowerup("Twins");
            }}
          >
            Twins
          </button>
        </div>
      )}
    </>
  );
}
