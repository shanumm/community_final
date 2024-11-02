// src/context/MyContext.js
"use client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  add_new_user_data,
  add_user_profile,
  name_availability,
} from "@/utils/name_utils/name_utils";
import { formatName, generateRandomString } from "@/utils/helper/helper";
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

  const handle_sign_in = (authUser) => {
    setUser(authUser || null);
    setIs_signedIn(!!authUser);
  };

  const check_name_available = async (name) => {
    const check_name_availability = await name_availability(name);
    return check_name_availability.value?.available;
  };

  const add_new_user = async (authUser) => {
    const sanitizedDisplayName = formatName(authUser.displayName);
    const checking_value = await check_name_available(sanitizedDisplayName);
    if (checking_value) {
      return sanitizedDisplayName;
    } else {
      const updated_name = generateRandomString(authUser.displayName);
      authUser.displayName = updated_name;
      return await add_new_user(authUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser && !is_signedIn) {
        try {
          const userDocRef = doc(db, "users", authUser.email); // Use user's UID as document ID
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            const display_name = authUser.displayName;
            const added_new_user_name = await add_new_user(authUser);

            const userData = {
              email: authUser.email,
              user_name: added_new_user_name,
              uid: authUser.uid,
              display_name: display_name,
            };
            print(userData, ">>>>>>>>>>>>>>");
            await setDoc(userDocRef, userData);

            const userProfileData = {
              email: authUser.email,
              user_name: added_new_user_name,
              displayName: display_name || "",
              comm_img:
                "https://cdn.pixabay.com/photo/2024/06/12/16/25/plant-8825881_1280.png",
              cover_img:
                "https://cdn.pixabay.com/photo/2020/09/03/03/43/abstract-5540113_1280.png",
            };
            const add_new_name_url = await add_user_profile(
              added_new_user_name,
              userProfileData
            );

            get_user_data(authUser.email);
          } else {
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
