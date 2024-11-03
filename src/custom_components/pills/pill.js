import React from "react";

export default function Pill({
  name,
  activePill,
  handleActivePill,
  pillNumber,
}) {
  return (
    <div onClick={() => handleActivePill(pillNumber)}>
      <span
        class={`${
          activePill ? "bg-gray-900 text-white" : "text-black"
        }  text-xs font-medium px-4 py-2 rounded-full mr-2 cursor-pointer`}
      >
        {name}
      </span>
    </div>
  );
}
