"use client";

import { get_profile_details } from "@/utils/profile_details/profile_details";
import Image from "next/image";
import { useEffect, useState } from "react";
import LargeContainerBox from "@/custom_components/LargeContainerBox/LargeContainerBox";

export default function Page({ params }) {
  const [user_profile, set_user_profile] = useState(null);

  const get_user_profile_data = async (user_id) => {
    const fetch_profile_data = await get_profile_details(user_id);
    set_user_profile(fetch_profile_data);
  };

  return (
    <div>
      <div>photo</div>
      <div>title</div>
      <div>desc</div>
    </div>
  );
}
