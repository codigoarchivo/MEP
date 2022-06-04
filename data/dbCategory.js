import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";

export const dbCategory = async () => {
  const q = query(
    collection(db, "categories"),
    limit(25),
    orderBy("na", "asc")
  );
  const { docs } = await getDocs(q);

  const category = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return JSON.parse(JSON.stringify(category));
};
