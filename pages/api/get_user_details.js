import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const get_user_details = async (param) => {
  try {
    return await new Promise(async (resolve, reject) => {
      const userNamesDocRef = doc(db, "users", param);
      const userNamesDocSnap = await getDoc(userNamesDocRef);
      if (userNamesDocSnap.exists()) {
        resolve({ res: userNamesDocSnap.data() });
      } else {
        reject({ res: "error" });
      }
      resolve(param);
    });
  } catch (err) {
    reject("not found");
  }
};

export default async function handler(req, res) {
  const { param } = req.query;
  try {
    const test = await get_user_details(param);
    res.status(200).json({ message: "success", value: test });
  } catch (err) {
    console.log(err);
  }
}
