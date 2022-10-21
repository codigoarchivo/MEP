import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const dbComents = async () => {
  try {
    const q = query(
      collection(db, "coments"),
      orderBy("cre", "desc"),
      limit(4)
    );

    const { docs } = await getDocs(q);

    const coments = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return JSON.parse(JSON.stringify(coments));
  } catch (error) {
    return null;
  }
};
