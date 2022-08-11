import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const dbMessageById = async (p, g) => {
  try {
    const docSnap = await getDoc(doc(db, "serchs", p, "messages", g));

    const msg = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return msg;
  } catch (error) {
    return null;
  }
};

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
