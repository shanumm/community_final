import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const get_user_details = async (param) => {
  console.log(param, "this is param 5");
  try {
    const userNamesDocRef = doc(db, "users", param);
    const userNamesDocSnap = await getDoc(userNamesDocRef);

    if (userNamesDocSnap.exists()) {
      console.log(userNamesDocSnap.data(), "user data");
      return { res: userNamesDocSnap.data() };
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    console.error("Error fetching user details:", err);
    throw err; // Propagate the error to the caller
  }
};

export default async function handler(req, res) {
  console.log(req.query, "this is req");
  const { param } = req.query;
  console.log(param, "this is param query");

  try {
    const test = await get_user_details(param);
    res.status(200).json({ message: "success", value: test });
  } catch (err) {
    console.error("Error in handler:", err);
    res.status(500).json({ message: "failed", error: err.message });
  }
}
