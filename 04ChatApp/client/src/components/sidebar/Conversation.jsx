import React from "react";

const Conversation = () => {
  return (
    <>
      <div className="flex gap-2 hover:bg-cyan-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://avatar.iran.liara.run/public/boy?"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">Ganu_Pund</p>
            <span className="">😡</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h1" />
    </>
  );
};

export default Conversation;
