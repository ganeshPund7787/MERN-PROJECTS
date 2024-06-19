import React from "react";
import SideBar from "../components/sidebar/SideBar";
import MessageContainer from "../components/Messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row sm:h-[450px] md:h-[550px] border rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SideBar />
      <MessageContainer />
    </div>
  );
};

export default Home;
