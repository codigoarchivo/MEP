import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const dbProducts = async (i = "", dbP = "", val1, val2) => {
  let q = "";
  switch (dbP) {
    case "dbProFive":
      q = query(
        collection(db, "serchs"),
        where("na", "==", i),
        where("ct", "==", i),
        limit(25)
      );
      break;
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

export const dbProductEdit = async (id, dbE, val) => {
  switch (dbE) {
    case "dbProEditOne":
      await updateDoc(doc(db, "serchs", id), { cn: val });
      break;
  }
};
