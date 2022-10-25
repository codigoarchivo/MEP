import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Toast } from "../helpers/Toast";

import { types } from "../type";

export const testimonialsList = (data) => ({
  type: types.userTestimonials,
  payload: data,
});

export const testimonialsAdd = (data, uid, err) => {
  return async (dispatch) => {
    try {
      await dispatch(addTestimonials(data));

      await setDoc(doc(db, "coments", uid.toString()), data);
    } catch (error) {
      Toast(err, "error", 3000);
    }
  };
};

const addTestimonials = (data) => ({
  type: types.userTestimonialsAdd,
  payload: data,
});
