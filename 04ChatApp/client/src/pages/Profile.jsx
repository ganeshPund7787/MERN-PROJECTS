import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useAuthContex } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import useUploadImg from "../Hooks/useUploadImg";
import useUpdateUser from "../Hooks/useUpdateUser";

const Profile = () => {
  const { authUser } = useAuthContex();
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const EditYourProfile = () => {
    setIsEditable(true);
  };
  const { uploadImage, imageUrl, setImageUrl, filePer } = useUploadImg();
  const { updateUser } = useUpdateUser();

  const onChangeSet = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (imageUrl) {
      setUserData((prevData) => ({ ...prevData, profilePic: imageUrl }));
      // console.log("imageUrl", imageUrl);
    }
    console.log(`first`, userData);
    // await updateUser(userData);
    setImageUrl("");
  };

  return (
    <div className="flex flex-col md:flex-row sm:h-[450px] md:h-[550px] border rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {isEditable ? (
        <div className="font-bold flex mx-10 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <form onSubmit={handleUpdateSubmit} className="space-y-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
                hidden
                type="file"
                ref={fileRef}
              />
              <img
                src={authUser.profilePic}
                className="mx-auto h-24 w-24 object-cover border rounded-full"
                alt="User Profile"
                title="Profile Pic"
              />
              <div className="flex justify-center">
                {filePer && filePer > 1 ? (
                  <span className="text-green-500 text-center">{`Uploading ${filePer}`}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="relative">
                <FaEdit
                  onClick={() => fileRef.current.click()}
                  size={20}
                  className="cursor-pointer absolute bottom-3 text-pink-600 right-14 text-end"
                />
              </div>
            </div>
            <div className="mt-2">
              <input
                defaultValue={authUser.fullname}
                name="fullname"
                type="text"
                onChange={onChangeSet}
                className="block w-full rounded-md border-0 py-2 px-2 
                shadow-sm ring-1 ring-inset text-pink-500 placeholder:text-gray-400 
                outline-none "
              />
            </div>
            <div className="mt-2">
              <input
                defaultValue={authUser.username}
                name="username"
                onChange={onChangeSet}
                type="text"
                className="block w-full rounded-md border-0 py-2 px-2 
                 shadow-md ring-1 ring-inset text-pink-500 placeholder:text-gray-400 

                 outline-none"
              />
            </div>
            <div className="flex flex-col gap-5 mt-5">
              <button
                type="submit"
                className="bg-cyan-500 text-black rounded-md py-1"
              >
                save{" "}
              </button>
              <button
                type="button"
                onClick={() => setIsEditable(false)}
                className="bg-red-600 py-1 text-black rounded-md"
              >
                cancle
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="font-bold flex mx-10 min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <Link to={"/"} className="">
            <button className=" text-cyan-500">
              <IoArrowBackCircleSharp size={36} />
            </button>
          </Link>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  src={authUser.profilePic}
                  className="mx-auto h-24 w-24 object-cover border rounded-full"
                  alt="User Profile"
                  title="Profile Pic"
                />
              </div>
              <div>
                <div className="mt-2">
                  <input
                    name="fullname"
                    type="text"
                    defaultValue={authUser.fullname}
                    readOnly
                    className="block w-full rounded-md border-0 py-2 px-2 
                 shadow-sm ring-1 ring-inset text-pink-500 uppercase placeholder:text-gray-400 
                 outline-none "
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <input
                    name="username"
                    defaultValue={authUser.username}
                    readOnly
                    type="text"
                    className="block w-full rounded-md border-0 py-2 px-2 
                 shadow-md ring-1 ring-inset text-pink-500 placeholder:text-gray-400 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <FaEdit
                  size={20}
                  onClick={EditYourProfile}
                  className="cursor-pointer"
                />
              </div>
            </form>

            <div className={`mt-6 text-red-600 flex justify-between `}>
              <button type="button">Delete Profile</button>
              <button type="button">Log out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
