// src/context/MyContext.js
"use client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { add_new_url, name_availabilty } from "@/utils/name_utils/name_utils";
import generateRandomString from "@/utils/helper/helper";
import { get_user_details } from "@/utils/user_details/user_details";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [group_state, set_group_state] = useState([]);
  const [selected_groups, set_selected_groups] = useState([]);
  const [whatsapp_qr_generated, set_whatsapp_qr_generated] = useState(false);
  const [is_signedIn, setIs_signedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [user_details, setUser_details] = useState(null);

  const manage_selected_groups = (group, action = "add") => {
    if (action === "add") {
      set_selected_groups((prev) => {
        // Check if a group with the same name is already in the array
        if (prev.some((item) => item.name === group.name)) {
          return prev; // Return the current array if a group with the same name is already present
        }
        return [...prev, group]; // Add the group if it's not present
      });
    } else if (action === "remove") {
      set_selected_groups(
        (prev) => prev.filter((item) => item.name !== group.name) // Remove the group based on the name
      );
    }
  };

  const handle_sign_in = (user) => {
    if (user) {
      setIs_signedIn(true);
      setUser(user);
    } else {
      setUser(null);
      setIs_signedIn(false);
    }
  };

  const update_user_name = async (authUser) => {
    const check_name_availability = await name_availabilty(
      authUser.displayName
    );
    if (
      check_name_availability &&
      check_name_availability.value?.available === 1
    ) {
      const sanitizedDisplayName = String(authUser.displayName)
        .toLowerCase()
        .replace(/\s+/g, "-");
      const add_new_name_url = await add_new_url(
        sanitizedDisplayName,
        authUser.uid
      );
      console.log(add_new_name_url);
      return sanitizedDisplayName;
    } else {
      const updated_name = generateRandomString(authUser.displayName);
      authUser.displayName = updated_name;
      return await update_user_name(authUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      console.log(authUser, is_signedIn);
      if (authUser && !is_signedIn) {
        try {
          const userDocRef = doc(db, "users", authUser.email); // Use user's UID as document ID
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            const added_user_name = await update_user_name(authUser);
            console.log(added_user_name);
            const userData = {
              uid: authUser.uid,
              email: authUser.email,
              displayName: authUser.displayName || "",
              user_name: added_user_name,
              comm_img:
                "https://cdn.pixabay.com/photo/2024/06/12/16/25/plant-8825881_1280.png",
              cover_img:
                "https://cdn.pixabay.com/photo/2020/09/03/03/43/abstract-5540113_1280.png",
            };

            await setDoc(userDocRef, userData);
            get_user_data(authUser.email);

            console.log("User document created:", userData);
          } else {
            console.log("User document already exists.");
            get_user_data(authUser.email);
          }
          handle_sign_in(authUser); // Update user state
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    });
    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const get_user_data = async (email) => {
    const users_details = await get_user_details(email);
    setUser_details(users_details.value.res);
  };

  return (
    <MyContext.Provider
      value={{
        group_state,
        set_group_state,
        selected_groups,
        manage_selected_groups,
        whatsapp_qr_generated,
        set_whatsapp_qr_generated,
        handle_sign_in,
        user,
        is_signedIn,
        user_details,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
