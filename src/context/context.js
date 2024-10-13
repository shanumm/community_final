// src/context/MyContext.js
"use client";
import { createContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [group_state, set_group_state] = useState([]);
  const [selected_groups, set_selected_groups] = useState([]);
  const [whatsapp_qr_generated, set_whatsapp_qr_generated] = useState(false);
  const [is_signedIn, setIs_signedIn] = useState(false);
  const [user, setUser] = useState(null);

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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
