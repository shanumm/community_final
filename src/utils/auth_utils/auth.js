// src/auth.js

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import { MyContext } from "@/context/context";
// import { useContext } from "react";

// const { handle_sign_in } = useContext(MyContext);
const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = provider.credentialFromError(error);
      console.error("Error during sign in:", errorCode, errorMessage);
    });
};

export { signInWithGoogle };
