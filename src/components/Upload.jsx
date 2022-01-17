import React, { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { projectStorage } from "../firebase/config.js";

// Import react-circular-progressbar module and styles
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    const selectedImg = e.target[0].files[0];
    console.log(selectedImg);

    if (selectedImg) {
      setFile(selectedImg);
      setError("");
    } else {
      setFile(null);
      setError("Please select an file file like png or jpg or svg or webp");
    }
    uploadfiles(file);

    setShowProgress(!showProgress);
  };

  const uploadfiles = (file) => {
    if (!file) return;
    const sotrageRef = ref(projectStorage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        setError(err);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Chargement réussi !", downloadURL);
        });
      }
    );
  };

  return (
    <>
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <div>{error && <div className="error">{error}</div>}</div>
      {file && <div>{file.name} </div>}
      <h3>Chargement réussi à :{progress}%</h3>
      {showProgress && (
        <div className="circular-progress-bar">
          <CircularProgressbar value={progress} />
        </div>
      )}
    </>
  );
};

export default Upload;
