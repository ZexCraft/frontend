import { useState } from "react";

export default function Powerup({
  changeTotal,
  price,
  title,
  description,
  ownCount,
}: {
  changeTotal: (value: number, isIncrement: boolean) => void;
  price: number;
  title: string;
  description: string;
  ownCount: number;
}) {
  const [count, setCount] = useState(0);
  return (
    <div className="group  rounded-xl border border-[#25272b]">
      <p className="text-center font-semibold text-4xl my-4 ">{title}</p>
      <p className="text-center text-[#9c9e9e] font-semibold text-lg mt-8  mx-8">
        {description}
      </p>
      <div className="flex justify-around">
        <div className="text-center font-semibold mt-4 mb-2">
          <p>Price</p>
          <p>{price} PG</p>
        </div>
        <div className="text-center font-semibold mt-4 mb-2">
          <p>You own</p>
          <p>{ownCount}</p>
        </div>
      </div>
      <div className="mx-20 rounded-xl my-4 py-4 text-4xl font-semibold bg-[#25272b]  text-[#9c9e9e]  flex justify-center space-x-5">
        <button
          className="hover:text-[#d0d1d1]"
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
              changeTotal(price, false);
            }
          }}
        >
          -
        </button>
        <p className="text-white">{count}</p>
        <button
          className="hover:text-[#d0d1d1]"
          onClick={() => {
            setCount(count + 1);
            changeTotal(price, true);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
