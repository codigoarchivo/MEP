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

export const dbCategory = async (na = "", dbC = "") => {
  let q = "";

  switch (dbC) {
    case "dbCatOne":
      q = query(collection(db, "categories"), orderBy("cre", "desc"));
      break;
    case "dbCatTwo":
      q = query(
        collection(db, "categories"),
        limit(25),
        orderBy("cre", "desc")
      );
      break;
  }

  const { docs } = await getDocs(q);

  const data = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return JSON.parse(JSON.stringify(data));
};

export const dbCategoryById = async (id) => {
  //  product
  const docRef = doc(db, "categories", id);

  const docSnap = await getDoc(docRef);

  const data = {
    id: docSnap.id,
    ...docSnap.data(),
  };

  return JSON.parse(JSON.stringify(data));
};
