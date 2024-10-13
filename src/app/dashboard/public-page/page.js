"use client";
import React, { useState } from "react";

export default function page() {
  const [index, setIndex] = useState(0);

  const Top_navigation = () => (
    <div>
      <ul className="border-b flex w-1/2 justify-between my-8 pb-2">
        <li onClick={() => setIndex(0)}>Public Page</li>
        <li onClick={() => setIndex(1)}>Member access</li>
        <li onClick={() => setIndex(2)}>Chat</li>
        <li onClick={() => setIndex(3)}>Email preferences</li>
      </ul>
    </div>
  );

  return (
    <div className="flex ">
      <div className="w-56">testing</div>
      <div className="flex-1 py-20 px-40">
        <div className="text-2xl font-bold py-4">Settings</div>
        <Top_navigation />
        {index == 0 ? (
          <>
            <div className="pb-8">
              <div className="text-xl font-semibold pb-2">Public page</div>
              <div className="text-gray-700">
                This page shows non-members basic information about your
                community.
              </div>
            </div>
            <div className="mb-8">
              <div className="pb-1">Public Url</div>
              <div className="flex w-2/3">
                <div className="flex flex-1 mr-2">
                  <div className="border p-2 rounded-l-lg bg-gray-200">
                    tes.io
                  </div>
                  <div className="border flex p-2 rounded-r-lg flex-1">
                    <input
                      className="h-full w-full outline-none"
                      type="text"
                      value={"testing-111"}
                    />
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_17_1173)">
                        <path
                          d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"
                          fill="#323232"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_17_1173">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="rounded-lg bg-black text-white flex items-center justify-center px-4">
                  <button className="flex justify-center items-center">
                    open
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_6_16075)">
                        <path
                          d="M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z"
                          fill="#ffffff"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6_16075">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-8">
              <div className="pb-2">Community Image</div>
              <div className="w-52 h-52 bg-gray-500 rounded-lg"></div>
            </div>
            <div className="mt-8 p-4  border border-gray-300 rounded-lg">
              <div className="text-xs text-gray-400 pb-2">Title</div>
              <input className="outline-none" value="title" />
            </div>
            <div className="mt-8 p-4  border border-gray-300 rounded-lg">
              <div className="text-xs text-gray-400 pb-2">Host</div>
              <input className="outline-none" value="Host" />
            </div>
            <div className="mt-8  p-4 border border-gray-300 rounded-lg">
              <div className="text-xs text-gray-400 pb-2">Description</div>
              <textarea value="Description" className="w-full outline-none" />
            </div>
            <hr />

            <div className="mt-8">
              <div className="mb-2">Cover Photo</div>
              <div className="w-96 h-72 border rounded-lg bg-red-400"></div>
            </div>
          </>
        ) : index == 1 ? (
          <></>
        ) : index == 2 ? (
          <></>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
