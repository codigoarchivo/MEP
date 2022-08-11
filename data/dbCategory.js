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

export const dbCategoryValid = async (id, dbC) => {
  let q = "";
  switch (dbC) {
    case "dbCatOne":
      q = query(collection(db, "serchs"), where("ct", "==", id), limit(1));
      break;
    case "dbCatTwo":
      q = query(collection(db, "categories"), where("na", "==", id), limit(1));
      break;
  }
  const r = await getDocs(q);
  return {
    r: r.size,
  };
};

export const dbcategoryAll = async (li) => {
  try {
    const { docs } = await getDocs(
      query(collection(db, "categories"), orderBy("cre", "desc"), limit(li))
    );

    const category = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return category;
  } catch (error) {
    return null;
  }
};

export const dbcategoryById = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "categories", id));

    const category = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return category;
  } catch (error) {
    return null;
  }
};
