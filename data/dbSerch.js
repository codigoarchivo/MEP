import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";

export const dbSerch = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "serchs", id));

    const product = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return product;
  } catch (error) {
    return null;
  }
};
