import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const check_name_availabilty = async (param) => {
  try {
    return await new Promise(async (resolve, reject) => {
      const userNamesDocRef = doc(db, "taken_user_names", param);
      const userNamesDocSnap = await getDoc(userNamesDocRef);
      if (userNamesDocSnap.exists()) {
        resolve({ res: "user exists", available: 0 });
      } else {
        resolve({ res: "user doesn't exists", available: 1 });
      }

      resolve(param);
    });
  } catch (err) {
    reject(err);
  }
};
const update_page_url = async (param, email, uid, ori) => {
  try {
    return await new Promise(async (resolve, reject) => {
      const sanitizedDisplayName = String(param)
        .toLowerCase()
        .replace(/\s+/g, "-");
      console.log(sanitizedDisplayName, uid);
      const add_new_name_url = await add_page_url(sanitizedDisplayName, uid);

      const userNamesDocRef = doc(db, "users", email);
      await updateDoc(userNamesDocRef, {
        user_name: param,
      });
      resolve(param);
    });
  } catch (err) {
    reject(err);
  }
};

const delete_page_url = async (param) => {
  try {
    return await new Promise(async (resolve, reject) => {
      const userNameDocRef = doc(db, "taken_user_names", param);
      deleteDoc(userNameDocRef);
      resolve(param);
    });
  } catch (err) {
    reject(err);
  }
};

const add_page_url = async (param, user_id) => {
  console.log(param, "----", user_id);
  try {
    return await new Promise(async (resolve, reject) => {
      const userNameDocRef = doc(db, "taken_user_names", param);
      const userNameData = {
        user_name: param,
        user_id: user_id,
      };
      await setDoc(userNameDocRef, userNameData);
      resolve(param);
    });
  } catch (err) {
    reject(err);
  }
};

const create_user_profile = async (param, user_id) => {
  console.log(param, "----", user_id);
};

export default async function handler(req, res) {
  const { process, param, email, user_id, ori } = req.query;
  if (process == "name_check") {
    try {
      const name = String(param).toLowerCase().split(" ").join("-");
      const test = await check_name_availabilty(name);
      res.status(200).json({ message: "success", value: test });
    } catch (err) {
      console.log(err);
      res.status(300).json({ message: err });
    }
  } else if (process == "update_name") {
    try {
      const name = String(param).toLowerCase().split(" ").join("-");
      const test = await update_page_url(name, email, user_id, ori);
      res.status(200).json({ message: "success", value: test });
    } catch (err) {
      console.log(err);
      res.status(300).json({ message: err });
    }
  } else if (process == "add_new_url") {
    try {
      const name = String(param).toLowerCase().split(" ").join("-");
      const test = await add_page_url(name, user_id);
      res.status(200).json({ message: "success", value: test });
    } catch (err) {
      console.log(err);
      res.status(300).json({ message: err });
    }
  } else if (process == "delete_url") {
    try {
      const name = String(param).toLowerCase().split(" ").join("-");
      const test = await delete_page_url(name);
      res.status(200).json({ message: "success", value: test });
    } catch (err) {
      console.log(err);
      res.status(300).json({ message: err });
    }
  } else if (process == "add_user_profile") {
    try {
      const name = String(param).toLowerCase().split(" ").join("-");
      console.log(name, user_id, ">>>>>>>>>>");
      res.status(200).json({ message: "success", value: "testing" });
    } catch (err) {
      console.log(err);
      res.status(300).json({ message: err });
    }
  }
}
