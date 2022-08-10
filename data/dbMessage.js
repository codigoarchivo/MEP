import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { db } from "../firebase/config";

export const dbMessage = async (id) => {
  try {
    const q = query(
      collection(db, "serchs", id, "messages"),
      orderBy("cre", "desc"),
      limit(5)
    );

    const { docs } = await getDocs(q);

    const msg = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return msg;
  } catch (error) {
    return null;
  }
};
