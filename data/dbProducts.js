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
    case "dbProOne":
      q = query(
        collection(db, "serchs"),
        where("cre", "!=", false),
        orderBy("cre", "desc"),
        limit(2)
      );
      break;
    case "dbProTwo":
      q = query(
        collection(db, "serchs"),
        where("uid", "==", i),
        where("cre", "!=", false),
        orderBy("cre", "desc"),
        limit(2)
      );
      break;
    case "dbProThree":
      q = query(
        collection(db, "serchs", i, "messages"),
        orderBy("cre", "desc")
      );
      break;
    case "dbProFour":
      q = collection(db, "serchs");
      break;
    case "dbProFive":
      q = query(collection(db, "serchs"), where("na", "==", i), limit(25));
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

export const dbProductsById = async (id, dbP) => {
  let q = "";
  switch (dbP) {
    case "dbProOneID":
      q = doc(db, "serchs", id);
      break;
  }

  const docSnap = await getDoc(q);

  const data = {
    id: docSnap.id,
    ...docSnap.data(),
  };

  return JSON.parse(JSON.stringify(data));
};

export const dbProductEdit = async (id, dbE, val) => {
  switch (dbE) {
    case "dbProEditOne":
      await updateDoc(doc(db, "serchs", id), { cn: val });
      break;
  }
};
