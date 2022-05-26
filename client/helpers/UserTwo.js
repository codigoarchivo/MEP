import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase/config";

const UserTwo = async (id, coleccion) => {
  try {
    const docRef = collection(db, "users", id, coleccion);

    const q = query(docRef, where("close", "==", false));

    const el = await getDocs(q);

    const dataUser = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      dataUser: JSON.parse(JSON.stringify(dataUser)),
    };
  } catch (error) {
    return { props: {} };
  }
};

export default UserTwo;
