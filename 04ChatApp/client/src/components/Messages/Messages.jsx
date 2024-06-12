import React from "react";
import Message from "./Message";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeletons from "../skeletons/MessageSkeletons";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages", messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}

      {loading && [...Array(4)].map((_, idx) => <MessageSkeletons key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">
          send the message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
