"use client";

import { image_icons, large_image_icons } from "@/_chat_icons/chat_icons";
import Pill from "@/custom_components/pills/pill";
import { get_profile_details } from "@/utils/profile_details/profile_details";
import Image from "next/image";
import { useEffect, useState } from "react";
import { instance } from "../../../../razorpay";

export default function Page({ params }) {
  const [user_profile, set_user_profile] = useState(null);

  const printP = () => {
    const aa = [4000, 3000, 40000, 20000];
    setInterval(() => {
      const amount = aa[Math.floor(Math.random() * aa.length)];
      console.log(
        `[ALERT] Payment Failed | Amount: ${amount} RS| Reason: Overload | Suggested Action: Increase Balance`
      );
    }, 2000);
  };
  printP();

  useEffect(() => {
    var options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
      receipt: "testing",
    };
    instance.orders.create(options, function (err, order) {
      console.log(order, "this is order id");
    });
  }, []);

  const test_obh = {
    displayName: "pushkar mishravbc8l",
    cover_img:
      "https://cdn.pixabay.com/photo/2018/04/28/22/03/tree-3358468_1280.jpg",
    user_name: "pushkar-mishra12",
    comm_img:
      "https://cdn.pixabay.com/photo/2020/11/11/20/25/boy-5733595_1280.jpg",
    email: "shanumishra199@gmail.com",
    available_chats: [
      {
        name: "whatsapp",
        icon: large_image_icons.Whatsapp,
        isActive: true,
        members: 10242,
      },
      {
        name: "discord",
        icon: large_image_icons.Discord,
        isActive: false,
        members: 102,
      },
      {
        name: "telegram",
        icon: large_image_icons.Telegram,
        isActive: true,
        members: 34002,
      },
      {
        name: "facebook",
        icon: large_image_icons.Facebook,
        isActive: true,
        members: 12349,
      },
    ],
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
    <div className="bg-[#F6F6F6] h-screen py-8">
      <div className="w-1/2 mx-auto">
        <div className="relative h-56 rounded-2xl overflow-hidden">
          <Image
            src={test_obh.cover_img}
            layout="fill"
            objectFit="cover"
            alt="cover image"
            className="overflow-hidden"
          />
        </div>
        <div className="flex justify-between pt-2">
          {/* below container */}
          <div className="flex flex-1  h-max justify-between mx-2">
            {test_obh.available_chats.map((chat) => (
              <div className="p-2 rounded-lg h-max">{chat.icon}</div>
            ))}
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col items-center -translate-y-16">
              <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                <Image
                  src={test_obh.comm_img}
                  layout="fill"
                  objectFit="cover"
                  alt="cover image"
                  className="overflow-hidden"
                />
              </div>
              <div className="font-medium text-center py-2 text-gray-700 text-2xl">
                {test_obh.displayName}
              </div>
              <div className=" text-center">{test_obh.user_name}</div>
              <div className=" text-center">
                {test_obh.available_chats.reduce(
                  (total, chat) => total + chat.members,
                  0
                )}{" "}
              </div>
              <div>Members</div>
            </div>
          </div>
          <div className="flex-1 flex justify-center pt-2 h-max">testing</div>
        </div>
      </div>
      <div className="flex w-1/2 mx-auto">
        <Pill name="testgin" active={true} />
        <Pill name="testgin" />
        <Pill name="testgin" />
      </div>
    </div>
  );
}
