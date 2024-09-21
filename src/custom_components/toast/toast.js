"use client";
import React, { useEffect, useRef } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastComponent() {
  // Reference to hold the interval ID so we can clear it when needed
  const intervalRef = useRef(null);

  const notify = () =>
    toast("🦄 Wow so easy!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  useEffect(() => {
    // Function to start random notifications
    // const startRandomNotifications = () => {
    //   intervalRef.current = setInterval(() => {
    //     const randomDelay = Math.random() * 8000; // Random time between 0 and 20000 milliseconds (0-20 seconds)
    //     setTimeout(notify, randomDelay); // Call notify after random delay
    //   }, 8000); // Set interval to 20 seconds
    // };

    // startRandomNotifications();

    // Cleanup function to clear the interval when component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <ToastContainer limit={2} />
    </div>
  );
}
