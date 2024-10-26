"use client";

import { get_profile_details } from "@/utils/profile_details/profile_details";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [user_profile, set_user_profile] = useState(null);

  const test_obh = {
    displayName: "pushkar mishravbc8l",
    cover_img:
      "https://cdn.pixabay.com/photo/2021/08/18/19/26/background-6556413_1280.jpg",
    user_name: "pushkar-mishra12",
    comm_img:
      "https://cdn.pixabay.com/photo/2020/11/11/20/25/boy-5733595_1280.jpg",
    email: "shanumishra199@gmail.com",
    pageDetails: {
      Title: "this is the ",
      Host: "this is the host",
      Description: "this is the desc",
    },
  };
  useEffect(() => {
    // get_user_profile_data(params.user);
  }, []);

  const get_user_profile_data = async (user_id) => {
    const fetch_profile_data = await get_profile_details(user_id);
    set_user_profile(fetch_profile_data);
    console.log(fetch_profile_data);
  };

  return (
    <div className="bg-[#F5F5F5] p-16 h-screen">
      <div className="bg-[#FFFFFF] w-2/3  rounded-lg overflow-hidden">
        <div className="h-80 overflow-hidden relative">
          <Image
            src={test_obh.cover_img}
            layout="fill"
            objectFit="cover"
            alt="cover image"
          />
        </div>
        <div className="relative">
          <div className="w-64 h-64 rounded-full bg-red-600 border-[6px] border-white -translate-y-2/3 translate-x-10  overflow-hidden absolute">
            <Image
              src={test_obh.comm_img}
              layout="fill"
              objectFit="cover"
              alt="community image"
            />
          </div>
          <div className="pt-40 ml-10">
            <div>{test_obh.displayName}</div>
            <div>@{test_obh.user_name}</div>
            <div>{test_obh.email}</div>
            <div>
              <button>Join</button>
              <button>Share Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
