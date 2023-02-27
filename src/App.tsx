import React, { useEffect, useState } from "react";
import Wrapper from "./wrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "./firebase";

const queryClient = new QueryClient();

function App() {
  const [imgUrl, setImgUrl] = useState<string>("");

  const [progressPercent, setProgressPercent] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const file = e.target[0]?.files[0];

    const storageRef = ref(storage, `files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgUrl(downloadUrl);
        });
      }
    );
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Wrapper />
      </QueryClientProvider>
      <form onSubmit={handleSubmit} className="form">
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
      {!imgUrl && (
        <div className="outerbar">
          <div className="innerbar" style={{ width: `${progressPercent}%` }}>
            {progressPercent}%
          </div>
        </div>
      )}
      {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
    </>
  );
}

export default App;
