import React from "react";

export default function Navigation() {
  return (
    <div className="flex justify-center items-center p-4 bg-white  border-b border-gray-300 text-sm">
      <div className="flex-1 h-full flex items-center px-2">test</div>
      <div className="nav_links flex-1  h-full flex justify-end mx-2">
        <ul className="flex  h-full items-center  justify-between w-1/2 ">
          <li className="cursor-pointer">Help</li>
          <li className="cursor-pointer">Dashboard</li>
          <li className=" cursor-pointer border rounded-full border-gray-200 bg-[#21262B] text-white p-3">
            Login / Sign Up
          </li>
        </ul>
      </div>
    </div>
  );
}
