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

export const dbcheckById = async (uid, id) => {
  try {
    const docSnap = await getDoc(doc(db, "users", uid, "buys", id));

    const data = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const dbsale = async (q, li) => {
  try {
    const { docs } = await getDocs(
      query(
        collection(db, "users", q, "sales"),
        orderBy("cre", "desc"),
        limit(li)
      )
    );

    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const dbbuy = async (uid, li) => {
  try {
    const { docs } = await getDocs(
      query(
        collection(db, "users", uid, "buys"),
        orderBy("cre", "desc"),
        limit(li)
      )
    );

    const product = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    return null;
  }
};

export const dbbuyCheck = async (uid, li) => {
  try {
    const { docs } = await getDocs(
      query(
        collection(db, "users", uid, "buys"),
        where("close", "==", false),
        limit(li)
      )
    );

    const product = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    return null;
  }
};
