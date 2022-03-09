import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { types } from "../type";

export const startLoading = () => ({
  type: types.uiStartLoading,
});

export const finishLoading = () => ({
  type: types.uiFinishLoading,
});

export const DissableBotton = () => {
  const q = query(
    collection(db, "serchs"),
    where("es", "==", true),
    orderBy("no", "desc")
  );
  return async (dispatch) => {
    const el = await getDocs(q);

    const data = {
      first: el.docs[0].id,
      end: el.docs[el.docs.length - 1].id,
    };

    dispatch(bottoDisable(data));
  };
};
const bottoDisable = (data) => ({
  type: types.uiActiveEnds,
  payload: data,
});
