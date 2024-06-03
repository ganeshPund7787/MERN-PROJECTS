import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [ImageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImg = (idx) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== idx),
    });
  };
  return (
    <main className="p-3 font-bold">
      <h1 className="text-center my-7 text-3xl font-bold">Create a Listing</h1>
      <form className="flex items-center w-f flex-col sm:flex-row gap-4">
        <div className=" flex w-f flex-col sm:flex-row">
          <div className="flex flex-col p-5 gap-4 flex-1">
            <input
              type="text"
              placeholder="listing name"
              name="name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength={"62"}
              minLength={"10"}
              required
            />
            <textarea
              type="text"
              placeholder="desc"
              name="desc"
              className="border p-3 rounded-lg"
              id="desc"
              required
            />
            <input
              type="text"
              placeholder="addresse"
              name="address"
              className="border p-3 rounded-lg"
              id="address"
              required
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" name="" id="sale" className="w-5" />
                <span>Sell</span>
              </div>

              <div className="flex gap-2">
                <input type="checkbox" name="" id="rent" className="w-5" />
                <span>Rent</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  className="w-5"
                />
                <span>parking Sopt</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  className="w-5"
                />
                <span>Furnished</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  className="w-5"
                />
                <span>Offer</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-1 border border-gray-300 rounded-lg"
                />
                <p>Beds</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="batherooms"
                  id="batherooms"
                  min="1"
                  max="10"
                  required
                  className="p-1 border border-gray-300 rounded-lg"
                />
                <p>Bath's</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="regularPrice"
                  id="regularPrice"
                  min="1"
                  max="10"
                  required
                  className="p-1 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Regular Price</p>
                  <span className="text-xs">($ / months)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="descountPrice"
                  id="descountPrice"
                  min="1"
                  max="10"
                  required
                  className="p-1 border border-gray-300 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p>Descount Price</p>
                  <span className="text-xs">($ / months)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-5 flex-1 gap-4">
            <p className="font-semibold ">
              Images :
              <span className="font-normal text-gray-600 ml-2">
                The first image will be cover (max-6)
              </span>{" "}
            </p>
            <div className="flex gap-4">
              <input
                onChange={(e) => setFiles(e.target.files)}
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                name=""
                id="images"
                accept="image/*"
                multiple
              />
              <button
                onClick={handleImageSubmit}
                disabled={uploading}
                type="button"
                className="py-1 disabled:cursor-not-allowed px-2 font-bold text-green-700 border border-green-700 rounded hover:text-white uppercase hover:bg-green-600 disabled:opacity-80"
              >
                {uploading ? `Uploading...` : `Upload`}
              </button>
            </div>
            <p className="text-sm text-red-700">
              {ImageUploadError && ImageUploadError}
            </p>

            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, idx) => {
                return (
                  <div
                    key={url}
                    className="flex justify-between p-2 border items-center"
                  >
                    <img
                      src={url}
                      alt="listing images"
                      className="h-20 w-20 rounded-lg object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImg(idx)}
                      className="p-2 text-red-700 uppercase hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}

            <button
              disabled={uploading}
              className="p-3 disabled:bg-orange-400 bg-orange-500 text-white rounded-lg uppercase hover:bg-orange-300 disabled:cursor-not-allowed"
            >
              Create list
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
