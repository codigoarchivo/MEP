import {
  collection,
  getDocs,
  limit,
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


