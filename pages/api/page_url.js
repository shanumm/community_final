import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { formatName } from "@/utils/helper/helper";

// Common function to handle Firebase operations
const handleFirebaseOperation = async (operation, ref, data = {}) => {
  try {
    return await new Promise(async (resolve, reject) => {
      switch (operation) {
        case "get":
          const docSnap = await getDoc(ref);
          resolve(
            docSnap.exists()
              ? { res: "user exists", available: 0 }
              : { res: "user doesn't exist", available: 1 }
          );
          break;
        case "set":
          await setDoc(ref, data);
          resolve(data);
          break;
        case "update":
          await updateDoc(ref, data);
          resolve(data);
          break;
        case "delete":
          await deleteDoc(ref);
          resolve(ref.id);
          break;
        default:
          reject(new Error("Invalid operation"));
      }
    });
  } catch (err) {
    throw err;
  }
};

// Wrapper functions
const checkNameAvailability = (param) => {
  const userNamesDocRef = doc(db, "user_profiles", param);
  return handleFirebaseOperation("get", userNamesDocRef);
};

const updatePageUrl = async (param, email, user_data) => {
  const sanitizedDisplayName = formatName(param);
  await createUserProfile(sanitizedDisplayName, user_data);
  const userDocRef = doc(db, "users", email);
  return handleFirebaseOperation("update", userDocRef, { user_name: param });
};

const deletePageUrl = (param) => {
  const userNameDocRef = doc(db, "user_profiles", param);
  return handleFirebaseOperation("delete", userNameDocRef);
};

const createUserProfile = (param, userData) => {
  userData["user_name"] = param;
  const userProfileDocRef = doc(db, "user_profiles", param);
  return handleFirebaseOperation("set", userProfileDocRef, userData);
};

// Request handler
export default async function handler(req, res) {
  const { process, param, email, user_data } = req.query;
  try {
    const name = String(param).toLowerCase().split(" ").join("-");
    let result;

    switch (process) {
      case "name_check":
        result = await checkNameAvailability(name);
        break;
      case "update_name":
        result = await updatePageUrl(name, email, JSON.parse(user_data));
        break;
      case "add_user_profile":
        result = await createUserProfile(name, JSON.parse(user_data));
        break;
      case "delete_url":
        result = await deletePageUrl(name);
        break;
      default:
        throw new Error("Invalid process");
    }

    res.status(200).json({ message: "success", value: result });
  } catch (err) {
    console.error(err);
    res.status(300).json({ message: err.message });
  }
}
