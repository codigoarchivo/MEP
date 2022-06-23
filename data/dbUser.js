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

export const dbUser = async (id, dbU) => {
  let q = "";
  switch (dbU) {
    case "dbUserOne":
      q = collection(db, "buys"); // dbUserOne getStaticPaths;
      break;
    case "dbUserTwo":
      q = collection(db, "users");
      break;
    case "dbUserThree":
      q = query(collection(db, "sales"), orderBy("cre", "desc"), limit(2));
      break;
    case "dbUserFour": // dbUserFour path /checkout
      q = query(
        collection(db, "buys"),
        where("uid", "==", id),
        where("close", "==", false)
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

export const dbUserByUID = async (id, dbU) => {
  let q = {};
  switch (dbU) {
    case "dbUserOneID":
      q = doc(db, "users", id);
      break;
    case "dbuserTwoID":
      q = doc(db, "buys", id);
      break;
    case "dbuserThreeID":
      q = doc(db, "sales", id);
      break;
  }

  const docSnap = await getDoc(q);

  const data = {
    id: docSnap.id,
    ...docSnap.data(),
  };

  return JSON.parse(JSON.stringify(data));
};
