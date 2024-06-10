import React from "react";
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    <form>
      <div className="w-full relative">
        <input
          type="text"
          name=""
          id=""
          placeholder="send a message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <BsSend />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
