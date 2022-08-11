import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const dbProducts = async (i = "", dbP = "", val1, val2) => {
  let q = "";
  switch (dbP) {
    case "dbProSix":
      q = query(
        collection(db, "serchs"),
        where("pr", ">=", val1),
        where("pr", "<=", val2),
        limit(25)
      );
      break;
    case "dbProSeven":
      q = query(collection(db, "serchs"), where("ct", "==", i), limit(25));
      break;
  }

  const { docs } = await getDocs(q);

  const data = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return JSON.parse(JSON.stringify(data));
};

export const dbProductsById = async (id) => {
  const docSnap = await getDoc(doc(db, "serchs", id));

  const product = {
    id: docSnap.id,
    ...docSnap.data(),
  };

  return JSON.parse(JSON.stringify(product));
};

export const dbProductEdit = async (id, dbE, val) => {
  switch (dbE) {
    case "dbProEditOne":
      await updateDoc(doc(db, "serchs", id), { cn: val });
      break;
  }
};

export const dbProductAll = async (uid, li) => {
  try {
    const q = query(
      collection(db, "serchs"),
      where("uid", "==", uid),
      where("cre", "!=", false),
      orderBy("cre", "desc"),
      limit(li)
    );

    const { docs } = await getDocs(q);

    const product = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    return null;
  }
};
