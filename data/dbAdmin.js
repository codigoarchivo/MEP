import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const dbAdminAll = async (uid, li) => {
  try {
    const q = query(
      collection(db, "sales"),
      where("own", "==", uid),
      where("cre", "!=", false),
      orderBy("cre", "desc"),
      limit(li)
    );

    const { docs } = await getDocs(q);

    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    return null;
  }
};

export const dbAdminById = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "sales", id));

    const active = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return active;
  } catch (error) {
    return null;
  }
};
