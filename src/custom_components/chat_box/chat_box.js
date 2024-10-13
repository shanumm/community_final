import Image from "next/image";
import React from "react";

export default function Chat_box() {
  var name = "Discord";
  var des = "Link your Discord account to connect your server";
  return (
    <div className="border h-56 w-80 border-slate-300 justify-start pl-6 pt-4 rounded-xl">
      <div className="pb-4">
        {" "}
        <Image
          src="/assets/social_icons/discord.png"
          width={38}
          height={38}
          alt="Discord Icon"
          className="object-contain"
        />
      </div>
      <div className="font-bold text-lg">{name}</div>
      <div className="pt-2 text-sm text-slate-400 w-60">{des}</div>
      <div className="pt-5 w-100">
        <button className="h-10 w-60 flex justify-center bg-indigo-600 items-center text-white rounded-full">
          <svg
            width="20"
            height="21"
            viewBox="0 0 80 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M67.7676 5.0778C62.5115 2.67146 56.9627 0.964328 51.263 0C50.4831 1.39428 49.7773 2.8288 49.1488 4.29757C43.0775 3.3827 36.9034 3.3827 30.832 4.29757C30.2032 2.82895 29.4975 1.39444 28.7178 0C23.0144 0.972471 17.462 2.68366 12.2006 5.09038C1.75548 20.544 -1.07604 35.6138 0.339722 50.4697C6.45667 54.9891 13.3033 58.4262 20.5819 60.6316C22.2209 58.4273 23.6711 56.0888 24.9173 53.641C22.5504 52.7569 20.2658 51.6663 18.0902 50.3816C18.6628 49.9663 19.2228 49.5384 19.7639 49.1232C26.0946 52.1003 33.0041 53.6439 39.9999 53.6439C46.9956 53.6439 53.9051 52.1003 60.2358 49.1232C60.7832 49.5699 61.3432 49.9978 61.9095 50.3816C59.7297 51.6684 57.441 52.7611 55.0698 53.6472C56.3145 56.094 57.7648 58.4305 59.4052 60.6316C66.6901 58.4351 73.5419 54.9996 79.66 50.476C81.3211 33.248 76.8222 18.3166 67.7676 5.0778ZM26.7106 41.3334C22.7653 41.3334 19.506 37.7532 19.506 33.3486C19.506 28.9441 22.6521 25.3324 26.698 25.3324C30.7439 25.3324 33.9782 28.9441 33.9089 33.3486C33.8397 37.7532 30.7314 41.3334 26.7106 41.3334ZM53.2891 41.3334C49.3376 41.3334 46.0908 37.7532 46.0908 33.3486C46.0908 28.9441 49.2369 25.3324 53.2891 25.3324C57.3413 25.3324 60.5504 28.9441 60.4812 33.3486C60.412 37.7532 57.3099 41.3334 53.2891 41.3334Z"
              fill="#ffffff"
            />
          </svg>
          <div className="pl-2 text-sm">Connect {name}</div>
        </button>
      </div>
    </div>
  );
}
