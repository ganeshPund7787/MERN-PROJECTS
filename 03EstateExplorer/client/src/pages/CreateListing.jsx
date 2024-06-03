import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl">
      <h1 className="text-center my-7 text-2xl">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
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
              <input type="checkbox" name="offer" id="offer" className="w-5" />
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
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images :
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max-6)
            </span>{" "}
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              name=""
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95">
            Create list
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
