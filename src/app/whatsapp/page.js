"use client";
import { useContext, useEffect, useState } from "react";
import QR_modal from "../_components/QR_modal";
import { MyContext } from "@/context/context";

export default function Whatsapp() {
  const { group_state, selected_groups, manage_selected_groups } =
    useContext(MyContext);
  const [dropdown, setdropdown] = useState(false);
  return (
    <div>
      <h1>WhatsApp Initialization</h1>

      {group_state && group_state.length > 0 && (
        <>
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            data-dropdown-trigger="hover"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={() => setdropdown(!dropdown)}
          >
            Select Groups
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdownHover"
            className={`z-10 ${
              dropdown ? "" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 max-h-48 overflow-y-auto`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownHoverButton"
            >
              {group_state.map((group, index) => (
                <li key={index}>
                  <a
                    onClick={() =>
                      manage_selected_groups(
                        { name: group.name, id: group.id },
                        "add"
                      )
                    }
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {group.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {selected_groups &&
        selected_groups.length > 0 &&
        selected_groups.map((group) => (
          <div className="flex">
            {group.name}

            <svg
              onClick={() => manage_selected_groups(group, "remove")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        ))}

      <QR_modal />
    </div>
  );
}
