import Image from "next/image";

export default function Profile(props: { address: string }) {
  const { address } = props;
  return (
    <div className="flex flex-col justify-start min-h-[90vh]  ">
      <div className="bg-[#25272b] w-full h-[25vh] mt-10 rounded-2xl"></div>
      <div className="relative">
        <div className="absolute bottom-24 left-10 w-full h-full">
          <Image
            src={"/collections/punk.png"}
            width={150}
            height={150}
            alt="pfp"
            className="rounded-full"
          ></Image>
        </div>
        <div className="mt-20 ml-10">
          <p className=" font-semibold text-4xl ">Gabrielaxy</p>
          <p className="">{address}</p>
        </div>
      </div>
    </div>
  );
}
