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

export const dbProducts = async (id, dbP) => {
  let q = "";
  let ref = collection(db, "serchs");
console.log(id, dbP);
  switch (dbP) {
    case "dbProOne":
      q = query(ref, limit(2), orderBy("na", "asc"));
      break;
    case "dbProTwo":
      q = query(ref, where("uid", "==", id.toString()), limit(2));
      break;
    case "dbProThree":
      q = collection(db, "serchs", id.toString(), "messages");
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
  //  product
  const docRef = doc(db, "serchs", id.toString());

  const docSnap = await getDoc(docRef);

  const data = {
    id: docSnap.id,
    ...docSnap.data(),
  };

  return JSON.parse(JSON.stringify(data));
};
