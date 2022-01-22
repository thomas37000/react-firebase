import React, { useEffect, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, projectStorage } from "../firebase/config.js";
import "./Upload.css";

// Import react-circular-progressbar module and styles
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [database, setDatabase] = useState(null);

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
    uploadFiles(selectedImg);
  };

  const uploadFiles = (file) => {
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
          setUrl(downloadURL);
        });
      }
    );
  };

  /********************* après le upload de l'image ************************************************** */
  /********************* state null pour faire disparaitre la ProgressBar **************************** */
  
  // useEffect(() => {
  //   if (url) {
  //     setFile(null);
  //   }
  // }, [url]);

  return (
    <>
      <form onSubmit={formHandler}>
        <input type="file" className="btn btn-light ms-2 upload" />
        <button type="submit" className="btn btn-light ms-2">
          Upload
        </button>
      </form>
      <div>{error && <div className="error">{error}</div>}</div>

      <div className="container-img-upload">
        {/* Progress Bar */}

        {/* {file && (
          <div>
            <div style={{ color: " #f1f1f1" }}>
              Chargement réussi à :{progress}%
            </div>

            <div className="circular-progress-bar">
              {file && <CircularProgressbar value={progress} />}
            </div>
          </div>
        )} */}

        {file && <img src={url} alt={file.name} className="img-profil" />}
      </div>
    </>
  );
};

export default Upload;
