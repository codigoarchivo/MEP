import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const dbSerch = async (id) => {
  try {
    const docSnap = await getDoc(doc(db, "serchs", id));

    const product = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return product;
  } catch (error) {
    return null;
  }
};

export const dbSerchAll = async (li) => {
  try {
    const { docs } = await getDocs(
      query(collection(db, "serchs"), orderBy("cre", "desc"), limit(li))
    );

    const product = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return product;
  } catch (error) {
    return null;
  }
};

export const dbSerchSelect = async (locale, data) => {
  try {
    const { docs } = await getDocs(
      query(collectionGroup(db, "serchs"), where(locale, "==", data))
    );

    const productSelect = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return productSelect;
  } catch (error) {
    return null;
  }
};

export const dbBlogAll = async () => {
  try {
    const categories = await getDocs(collection(db, "categories"));
    const buys = await getDocs(collection(db, "sales"));
    const product = await getDocs(collection(db, "serchs"));

    return {
      product: product.size.toString(),
      buys: buys.size.toString(),
      categories: categories.size.toString(),
    };
  } catch (error) {
    return null;
  }
};
