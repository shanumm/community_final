// src/context/MyContext.js
"use client";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { name_availabilty } from "@/utils/name_taken_utils/name_taken";
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

      const userNameDocRef = doc(db, "taken_user_names", sanitizedDisplayName);

      const userNameData = {
        user_name: sanitizedDisplayName,
        user_id: authUser.uid,
      };
      console.log(userNameData);
      await setDoc(userNameDocRef, userNameData);
      return sanitizedDisplayName;
    } else {
      const updated_name = generateRandomString(authUser.displayName);
      console.log(updated_name, ">>>>>>>");
      authUser.displayName = updated_name;
      return await update_user_name(authUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
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
            };

            await setDoc(userDocRef, userData);

            console.log("User document created:", userData);
          } else {
            console.log("User document already exists.");
          }
          handle_sign_in(authUser); // Update user state
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    });
    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  useEffect(() => {
    const get_user_data = async (email) => {
      const users_details = await get_user_details(email);
      setUser_details(users_details.value.res);
    };
    if (user) {
      console.log(user.email, "thisis the user");
      get_user_data(user.email);
    }
  }, [user]);

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
