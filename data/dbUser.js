import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
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
      q = collection(db, "sales");
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

  const data = docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort(function (a, b) {
      return b.cre - a.cre;
    });

  return JSON.parse(JSON.stringify(data));
};

export const dbUserData = async (id, dbU) => {
  let q = "";
  switch (dbU) {
    case "dbUserData":
      q = query(
        collection(db, "sales"),
        where("own", "==", id),
        orderBy("cre", "desc"),
        limit(2)
      );
      break;
    case "dbUserTwo":
      q = query(
        collection(db, "buys"),
        where("buy", "==", id),
        where("close", "==", false),
        limit(2)
      );
      break;
    case "dbUserThree":
      q = query(collection(db, "sales"), where("sal", "==", id), limit(2));
      break;
    case "dbUserFour": // lista compras solo los que este logueados
      q = query(collection(db, "buys"), where("buy", "==", id), limit(2));
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
