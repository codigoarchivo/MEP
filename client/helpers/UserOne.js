import Toast from "./Toast";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/config";

const UserOne = async (id) => {
  try {
    const docRef = doc(db, "users", id);

    const docSnap = await getDoc(docRef);

    const dataUser = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return {
      dataUser: JSON.parse(JSON.stringify(dataUser)),
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
};

export default UserOne;
