import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";

export const userById = async (uid) => {
  try {
    const docSnap = await getDoc(doc(db, "users", uid));

    const user = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return user;
  } catch (error) {
    return null;
  }
};
