import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const FileFirebasePerfil = (file, setUrlImage, setProgress) => {
  const storage = getStorage();

  const storageRef = ref(storage, `fotosPerfil/${file?.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const pro = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(pro);

      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          // User canceled the upload
          console.log("User canceled the upload");
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          console.log("Unknown error occurred, inspect error.serverResponse");
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUrlImage(downloadURL);
      });
    }
  );
};
