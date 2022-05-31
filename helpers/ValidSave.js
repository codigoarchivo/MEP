import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const ValidSave = async (patch, indice, data) => {
  const q = query(collection(db, patch), where(indice, "==", data));
  const el = await getDocs(q);
  const match = el.docs.length === 0;
  return {
    match,
  };
};

export default ValidSave;
