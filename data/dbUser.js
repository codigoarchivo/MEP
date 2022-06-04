import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";

export const dbUser = async (id, dbU) => {
  let q = "";
  switch (dbU) {
    case "dbUserOne":
      q = query(
        collection(db, "users", id, "buys"),
        limit(2),
        orderBy("na", "asc")
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
