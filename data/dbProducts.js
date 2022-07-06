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

export const dbProducts = async (id = "", dbP = "", valA = "") => {
  let q = "";
  let ref = collection(db, "serchs");

  switch (dbP) {
    case "dbProOne":
      q = query(ref, limit(4), orderBy("na", "asc"));
      break;
    case "dbProTwo":
      q = query(ref, where("uid", "==", id), limit(2));
      break;
    case "dbProThree":
      q = query(
        collection(db, "serchs", id, "messages"),
        orderBy("cre", "desc")
      );
      break;
    case "dbProFour":
      q = ref;
      break;
    case "dbProSix":
      q = query(
        ref,
        where("pr", ">=", Number(valA[0])),
        where("pr", "<=", Number(valA[1])),
        limit(25)
      );
      break;
    case "dbProSeven":
      q = query(ref, where("ct", "==", id), limit(25));
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
