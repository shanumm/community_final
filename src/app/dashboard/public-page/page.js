import Chat_box from "@/custom_components/chat_box/chat_box";
import React from "react";


const Top_navigation = () => (
  <div>
    <ul className="border-b flex w-1/2 justify-between">
      <li>Public Page</li>
      <li>Member access</li>
      <li>Chat</li>
      <li>Email preferences</li>
    </ul>
  </div>
);

export default function page() {
  return (
    // <div className="flex border-2 border-red-700 h-screen">
    //   <div className="w-56">testing</div>
    //   <div className="border-2 border-red-800 flex-1 py-20 px-40">
    //     <div>Settings</div>
    //     <Top_navigation />
    //     <div className="text-2xl">public page</div>
    //     <div>
    //       This page shows non-members basic information about your community.
    //     </div>
    //   </div>
      <Chat_box/>
    // </div>
  );
}
