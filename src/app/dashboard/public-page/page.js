"use client";
import { MyContext } from "@/context/context";
import Chat_box from "@/custom_components/chat_box/chat_box";
import {
  add_user_profile,
  delete_url,
  name_availabilty,
  update_page_url_api,
} from "@/utils/name_utils/name_utils";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../firebase";
import Link from "next/link";

const InputComponent = ({
  title,
  type = "input",
  pageDetails,
  setPageDetails,
  isLoading,
  updatePageDetailsField,
}) => (
  <>
    {type == "input" ? (
      <div className="mt-8 p-4  border border-gray-300 rounded-lg">
        <div className="text-xs text-gray-400 pb-2">{title}</div>
        <input
          className="outline-none w-full"
          value={pageDetails[title]}
          onChange={(e) =>
            setPageDetails({
              ...pageDetails,
              [title]: e.target.value,
            })
          }
        />
      </div>
    ) : (
      <div className="mt-8  p-4 border border-gray-300 rounded-lg">
        <div className="text-xs text-gray-400 pb-2">Description</div>
        <textarea
          className="w-full outline-none"
          value={pageDetails[title]}
          onChange={(e) =>
            setPageDetails({
              ...pageDetails,
              [title]: e.target.value,
            })
          }
        />
      </div>
    )}
    <div className="flex my-4">
      <button
        type="button"
        class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={() => updatePageDetailsField(title, pageDetails[title])}
      >
        {isLoading[title] ? <LoaderIcon /> : "Update " + title}
      </button>
    </div>
  </>
);

const LoaderIcon = () => (
  <svg
    aria-hidden="true"
    role="status"
    class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="#1C64F2"
    />
  </svg>
);

export default function page() {
  const [index, setIndex] = useState(0);
  const { user_details } = useContext(MyContext);
  const [isUrlChanged, setIsUrlChanged] = useState(false);
  const [isUrlUpdating, setIsUrlUpdating] = useState(false);
  const [updation_message, setUpdation_message] = useState("");
  const [comm_image, setComm_image] = useState("");
  const [cover_img, setCover_img] = useState("");
  const [pageDetails, setPageDetails] = useState({
    Title: "",
    Host: "",
    Description: "",
  });
  const [isLoading, setIsLoading] = useState({
    public_url: false,
    comm_image: false,
    cover_img: false,
    title: false,
    host: false,
    description: false,
  });

  const [original_url, set_original_url] = useState(
    user_details?.user_name || null
  );
  const [public_url, setPublicUrl] = useState(
    user_details?.user_name || "Loading..."
  );

  useEffect(() => {
    setPublicUrl(user_details?.user_name || "Loading...");
    set_original_url(user_details?.user_name || null);
    setComm_image(user_details?.comm_img || "Loading...");
    setCover_img(user_details?.cover_img || "Loading...");
    setPageDetails({
      Title: user_details?.pageDetails?.Title || "",
      Host: user_details?.pageDetails?.Host || "",
      Description: user_details?.pageDetails?.Description || "",
    });
  }, [user_details]);

  useEffect(() => {
    if (original_url && original_url != public_url) {
      setIsUrlChanged(true);
    } else {
      setIsUrlChanged(false);
    }
  }, [public_url]);

  const update_image_url = async (key, value) => {
    const img_ref = doc(db, "users", user_details.email);

    await updateDoc(img_ref, {
      [key]: value,
    });
    location.reload();
  };

  const update_page_url = async (url) => {
    setIsUrlUpdating(true);
    const check_name_availability = await name_availabilty(url);
    if (check_name_availability?.value?.available) {
      const update_page_url = await update_page_url_api(
        url,
        user_details.email,
        user_details.uid,
        original_url
      );
      const delete_older_page_url = await delete_url(original_url);
      setUpdation_message("");
    } else {
      setUpdation_message("Already Taken");
    }

    setIsUrlUpdating(false);
    location.reload();
  };

  const updatePageDetailsField = async (key, value) => {
    setIsLoading((prevState) => ({ ...prevState, [key]: true }));
    const userRef = doc(db, "users", user_details.email);

    await updateDoc(userRef, {
      [`pageDetails.${key}`]: value,
    });
    setIsLoading((prevState) => ({ ...prevState, [key]: false }));
    location.reload();
  };

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
            <div className="mb-4">
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
                      value={public_url}
                      onChange={(e) => {
                        setPublicUrl(e.target.value);
                      }}
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
                  <Link
                    href={{
                      pathname: `/profile/${public_url}`,
                    }}
                    target="_blank"
                  >
                    <button className="flex justify-center items-center">
                      Open
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-2"
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
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex mb-2">
              {public_url.length > 0 && isUrlChanged && (
                <button
                  type="button"
                  class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  onClick={() => update_page_url(public_url)}
                >
                  {isUrlUpdating && <LoaderIcon />}
                  Update Url
                </button>
              )}
              {public_url.length > 0 && isUrlChanged && (
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setPublicUrl(original_url)}
                >
                  Reset
                </button>
              )}
            </div>
            <div className="text-red-700 mb-2">{updation_message || ""}</div>
            <hr />
            <div className="mt-8">
              <div className="pb-2">Community Image</div>
              <div className="w-52 h-52 bg-gray-500 rounded-lg relative overflow-hidden group">
                <Image
                  className="transition-opacity duration-300"
                  src={user_details?.comm_img}
                  layout="fill"
                  objectFit="cover"
                  alt="community image"
                />
              </div>
              <div>
                <div className="border flex p-2 rounded-lg flex-1 my-2">
                  <input
                    className="h-full w-full outline-none"
                    type="text"
                    placeholder="image url"
                    value={comm_image}
                    onChange={(e) => {
                      setComm_image(e.target.value);
                    }}
                  />
                </div>
                <div className="flex">
                  <button
                    type="button"
                    class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={() => update_image_url("comm_img", comm_image)}
                  >
                    {isUrlUpdating && <LoaderIcon />}
                    Update Image Url
                  </button>
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setComm_image(user_details.comm_img)}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
            <InputComponent
              title="Title"
              type="input"
              pageDetails={pageDetails}
              setPageDetails={setPageDetails}
              isLoading={isLoading}
              updatePageDetailsField={updatePageDetailsField}
            />
            <InputComponent
              title="Host"
              type="input"
              pageDetails={pageDetails}
              setPageDetails={setPageDetails}
              isLoading={isLoading}
              updatePageDetailsField={updatePageDetailsField}
            />
            <InputComponent
              title="Description"
              type="textarea"
              pageDetails={pageDetails}
              setPageDetails={setPageDetails}
              isLoading={isLoading}
              updatePageDetailsField={updatePageDetailsField}
            />

            <hr />
            <div className="mt-8">
              <div className="mb-2">Cover Photo</div>
              <div className="w-96 h-72 border rounded-lg bg-red-400 relative overflow-hidden">
                <Image
                  className="transition-opacity duration-300"
                  src={user_details?.cover_img}
                  layout="fill"
                  objectFit="cover"
                  alt="community image"
                />
              </div>
              <div>
                <div className="border flex p-2 rounded-lg flex-1 my-2">
                  <input
                    className="h-full w-full outline-none"
                    type="text"
                    placeholder="image url"
                    value={cover_img}
                    onChange={(e) => {
                      setCover_img(e.target.value);
                    }}
                  />
                </div>
                <div className="flex">
                  <button
                    type="button"
                    class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={() => update_image_url("cover_img", cover_img)}
                  >
                    {isUrlUpdating && <LoaderIcon />}
                    Update Image Url
                  </button>
                  <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setCover_img(user_details.cover_img)}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : index == 1 ? (
          <></>
        ) : index == 2 ? (
          <>
            <div className="flex flex-wrap">
              <Chat_box icon_name="Whatsapp" button_color="bg-green-400" />
              <Chat_box icon_name="Discord" button_color="bg-indigo-500" />
              <Chat_box icon_name="Telegram" button_color="bg-sky-400" />
              <Chat_box icon_name="Facebook" button_color="bg-blue-600" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
