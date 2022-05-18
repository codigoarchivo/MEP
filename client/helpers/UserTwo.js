import Toast from "./Toast";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase/config";

const UserTwo = async (id) => {
  try {
    const docRef = collection(db, "users", id, "buys");

    const q = query(docRef);

    const el = await getDocs(q);

    const dataUser = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      dataUser,
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
};

export default UserTwo;
