import React, { useContext, useEffect, useState } from "react";
import QRCode from "qrcode.react";
import {
  connect_whatsapp_client,
  get_whatsapp_groups,
  get_whatsapp_qr_code,
} from "@/utils/whatsapp_utils/utils";
import { MyContext } from "@/context/context";

export default function QR_modal() {
  const {
    group_state,
    set_group_state,
    set_whatsapp_qr_generated,
    whatsapp_qr_generated,
  } = useContext(MyContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [showQr, setShowQr] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [is_whatsapp_connected, set_is_whatsapp_connected] = useState(false);
  const [groups_list, set_groups_list] = useState([]);

  useEffect(() => {
    if (toggleModal) {
      if (!whatsapp_qr_generated) {
        get_whatsapp_qr();
      } else {
        handle_whatsapp_connection();
      }
    }
  }, [toggleModal]);

  useEffect(() => {
    let interval;
    if (showQr) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      handle_whatsapp_connection();
    }

    return () => clearInterval(interval); // Clear the interval when component unmounts or showQr changes
  }, [showQr]);

  useEffect(() => {
    if (is_whatsapp_connected) handle_whatsapp_groups();
  }, [is_whatsapp_connected]);

  // useEffect(() => {
  //   const isConnected = localStorage.getItem("whatsappConnected");
  //   if (isConnected) {
  //     set_is_whatsapp_connected(true);
  //     handle_whatsapp_groups(); // Fetch groups if already connected
  //   }
  // }, []);

  const toggleModalHandler = () => {
    setToggleModal((prev) => !prev);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handle_whatsapp_connection = async () => {
    set_is_whatsapp_connected(false);
    const whatsapp_status = await connect_whatsapp_client();
    if (whatsapp_status.value == true) {
      set_is_whatsapp_connected(true);
      localStorage.setItem("whatsappConnected", "true"); // Save the connection state
    }
  };

  const get_whatsapp_qr = async () => {
    const getting_data = await get_whatsapp_qr_code();
    set_whatsapp_qr_generated(true);
    setQrCode(getting_data.value);
  };

  const handle_whatsapp_groups = async () => {
    const groups_data = await get_whatsapp_groups();
    set_groups_list(groups_data.value);
    set_group_state(groups_data.value);
  };

  return (
    <>
      {toggleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          toggleModal ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Connect Whatsapp
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModalHandler} // Correct event handler
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <p>
                Qr {qrCode && qrCode.length == 0 ? "generating" : "generated"}{" "}
              </p>
              {qrCode && qrCode && qrCode.length ? (
                <button
                  onClick={() => {
                    setShowQr(!showQr);
                    setTimer(180);
                  }}
                >
                  Click to scan
                </button>
              ) : null}

              {showQr && !is_whatsapp_connected && (
                <>
                  <QRCode value={qrCode} size={256} />
                  <p>Time left: {formatTime(timer)}</p>
                </>
              )}
              {is_whatsapp_connected && (
                <>
                  <p>client connected</p>
                </>
              )}
              {groups_list && groups_list.length > 0 && (
                <div>Groups fetched proced to select groups.</div>
              )}
            </div>
            <div>
              <span className="countdown">
                <span style={{ "--value": 10 }}></span>
              </span>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={toggleModalHandler} // Correct event handler
              >
                I accept
              </button>
              <button
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={toggleModalHandler} // Correct event handler
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
