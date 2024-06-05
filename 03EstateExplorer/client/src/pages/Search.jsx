import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col md:flex-row font-semibold">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-bold whitespace-nowrap">Search Term: </label>
            <input
              type="text"
              id="seachTerm"
              placeholder="search"
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-bold" htmlFor="">
              Type:{" "}
            </label>

            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent </span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="Sale" className="w-5" />
              <span>Sale</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-bold" htmlFor="">
              Amenities:{" "}
            </label>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking </span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>furnished </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-bold " htmlFor="">
              Sort:{" "}
            </label>
            <select className="border rounded-lg p-2" id="sort_order">
              <option value="">Price hign to low</option>
              <option value="">Price low to high</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
            </select>
          </div>
          <button
            className="bg-orange-500 text-white p-2 rounded-lg uppercase hover:bg-orange-400"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-2 text-orange-500 mt-5">
          Listing Results :{" "}
        </h1>
      </div>
    </div>
  );
};

export default Search;
