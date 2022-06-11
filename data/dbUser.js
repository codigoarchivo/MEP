import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const dbUser = async (id, dbU) => {
  let q = "";
  switch (dbU) {
    case "dbUserOne":
      q = query(
        collection(db, "users", id, "buys"),
        where("close", "==", false)
      );
      break;
    case "dbUserTwo":
      q = collection(db, "users");
      break;
  }

  const { docs } = await getDocs(q);

  const data = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return JSON.parse(JSON.stringify(data));
};

export const dbUserByUID = async (uid) => {
  const q = doc(db, "users", uid);

  const docSnap = await getDoc(q);

  const data = {
    id: docSnap.id,
    ...docSnap.data(),
  };

  return JSON.parse(JSON.stringify(data));
};
