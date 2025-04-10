import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="flex flex-col p-2 md:p-5 md:flex-row justify-center md:gap-2 items-center  bg-amber-400">
      <div className="img bg-amber-800">
        <span className="text-3xl text-white font-bold ">
          vous venez de gagné un bonus...!
        </span>
        <Image src="/images.jpg" alt="Photo 1" width={480} height={100} />
      </div>
      <div className="border p-4 bg-white text-black flex flex-col">
        <div className="flex flex-col justify-center items-center pb-2 border-b text-shadow-md text-xl ">
          Mettez vos information pour recevoir votre gain...!
        </div>
        <div className="flex flex-col gap-5">
          <span className="grid grid-rows-1">
            <label htmlFor="">nom et prénoms</label>
            <input
              type="text"
              className="h-8 border md:w-[400px] rounded-sm "
            />
          </span>
          <span className="grid grid-cols-1">
            <label htmlFor="">email</label>
            <input
              type="email"
              className="h-8 border md:w-[400px] rounded-sm "
            />
          </span>
          <span className="grid grid-cols-1">
            <label htmlFor="">numéro tel:</label>
            <input
              type="number"
              className="h-8 border md:w-[400px] rounded-sm "
            />
          </span>
          <button className="w-full bg-blue-800 h-[40px] cursor-pointer text-white text-xl">
            valider
          </button>
        </div>
      </div>
    </div>
  );
}
export default page;
