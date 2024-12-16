import React from "react";

export default function LargeContainerBox({ heading, subheading, size }) {
  return (
    <div className="bg-white rounded-lg p-4 min-h-80 flex flex-col my-8">
      <div>
        <div className="text-3xl font-medium text-[#313638]">{heading}</div>
        <div className="text-md text-[#313638]">{subheading}</div>
      </div>
      <div className="bg-[#FFEBD3] rounded-lg flex-grow my-4 p-4">
      </div>
      <div className="flex justify-end items-center">
        <div className="mx-4 text-[#313638]">Members only</div>
        <button
          type="button"
          class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          buy
        </button>
      </div>
    </div>
  );
}
