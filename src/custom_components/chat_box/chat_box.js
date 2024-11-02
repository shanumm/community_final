import { image_icons, large_image_icons } from "@/_chat_icons/chat_icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Chat_box({ icon_name, button_color }) {
  var image_icon = image_icons;
  var large_image_icon = large_image_icons;
  return (
    <div className="border h-56 w-80 border-slate-300 justify-start pl-6 pt-4 rounded-xl mr-8 mb-8">
      <div className="pb-4">{large_image_icon[icon_name]}</div>
      <div className="font-bold text-lg">{icon_name}</div>
      <div className="pt-2 text-sm text-slate-400 w-60">
        Link your {icon_name} account to connect your server
      </div>
      <div className="pt-5 w-100">
        <Link
          href={{
            pathname: `/dashboard/connect/${icon_name}`,
          }}
        >
          <button
            className={`h-10 w-60 flex justify-center ${button_color} items-center text-white rounded-full`}
          >
            {image_icon[icon_name]}
            <div className="pl-2 text-sm">Connect {icon_name}</div>
          </button>
        </Link>
      </div>
    </div>
  );
}
