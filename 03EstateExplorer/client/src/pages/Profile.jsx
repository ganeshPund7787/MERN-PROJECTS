import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const { currentUser, isEditable } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [uploadFileError, setUploadFileError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setUploadFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURI) =>
          setFormData({ ...formData, profileImg: downloadURI })
        );
      }
    );
  };

  const handleLogout = () => {};
  const handleDelete = () => {};
  return (
    <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              hidden
              type="file"
              ref={fileRef}
            />
            <img
              onClick={() => fileRef.current.click()}
              className="mx-auto h-24 w-auto rounded-full"
              src={formData.profileImg || currentUser.profileImg}
              alt="Your Company"
              title="logo"
            />
            <p className="text-center font-bold">
              {uploadFileError ? (
                <span className="text-red-700">
                  Error Image Upload(Image must be less than 2mb)
                </span>
              ) : filePer > 0 && filePer < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePer}%`}</span>
              ) : filePer === 100 ? (
                <span className="text-green-700">
                  Image SuccessFully Uploaded
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div>
            <div className="mt-2">
              <input
                id="email"
                name="username"
                type="text"
                defaultValue={currentUser.username}
                readOnly
                autoComplete="email"
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                 outline-none "
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                id="password"
                name="email"
                defaultValue={currentUser.email}
                readOnly
                type="email"
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                 outline-none"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              // onClick={handleClick}
              className="disabled:bg-indigo-400 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit Profile
            </button>
          </div>
        </form>
        <div
          className={`mt-6 text-red-600 flex justify-between ${
            currentUser ? "flex" : "hidden"
          }`}
        >
          <button onClick={handleDelete}>delete Profile</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
