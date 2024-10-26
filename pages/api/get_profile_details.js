import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const get_profile_details = async (param) => {
  try {
    const userNamesDocRef = doc(db, "user_profiles", param);
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
  const { user_id } = req.query;

  try {
    const test = await get_profile_details(user_id);
    res.status(200).json({ message: "success", value: test });
  } catch (err) {
    console.error("Error in handler:", err);
    res.status(500).json({ message: "failed", error: err.message });
  }
}
