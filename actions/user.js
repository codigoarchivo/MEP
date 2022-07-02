import {
  // addDoc,
  // collection,
  // deleteDoc,
  doc,
  // setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import Toast from "../helpers/Toast";

// import { types } from "../type";

// export const listDataUser = (data) => {
//   return async (dispatch) => {
//     try {
//       if (data) {
//         await dispatch(userDataList(data));
//       }
//     } catch (error) {
//       Toast("Al parecer hay un error", "error", 5000);
//     }
//   };
// };

// const userDataList = (data) => ({
//   type: types.user,
//   payload: data,
// });

// export const addUser = (resData) => {
//   return async (dispatch) => {
//     try {
//       const { id } = await addDoc(collection(db, "serchs"), {
//         ...resData,
//       });

//       const data = { ...id, ...resData };

//       if (data) {
//         dispatch(userAdd(data));
//       }
//     } catch (error) {
//       Toast("Al parecer hay un error", "error", 5000);
//     }
//   };
// };

// const userAdd = (data) => ({
//   type: types.userAdd,
//   payload: data,
// });

// export const editUser = (data) => {
//   return async (dispatch) => {
//     try {
//       await setDoc(doc(db, "serchs", data.id), data);
//       await dispatch(userEdit(data));
//     } catch (error) {
//       Toast("Al parecer hay un error", "error", 5000);
//     }
//   };
// };

// const userEdit = (data) => ({
//   type: types.userEdit,
//   payload: data,
// });

// export const deleteUser = (id) => {
//   return async (dispatch) => {
//     try {
//       await deleteDoc(doc(db, "serchs", id));
//       dispatch(userDelete(id));
//     } catch (error) {
//       Toast("Al parecer hay un error", "error", 5000);
//     }
//   };
// };

// const userDelete = (id) => ({
//   type: types.userDelete,
//   payload: id,
// });

export const DataUserAdicional = (data, id, err) => {
  return async () => {
    try {
      await updateDoc(doc(db, "users", id), data);
    } catch (error) {
      Toast(err, "error", 5000);
    }
  };
};
