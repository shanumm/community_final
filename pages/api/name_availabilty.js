import { doc, getDoc } from "firebase/firestore";
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
    reject("not found");
  }
};

export default async function handler(req, res) {
  const { param } = req.query;
  try {
    const name = String(param).toLowerCase().split(" ").join("-");
    const test = await check_name_availabilty(name);
    res.status(200).json({ message: "success", value: test });
  } catch (err) {
    console.log(err);
  }
}
