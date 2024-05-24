import React from "react";
import ColorSwitcher from "../ColorSwitcher";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <ColorSwitcher />
      <Toaster />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        {/* <Route>
          <Route />
        </Route> */}
      </Router>
    </>
  );
};

export default App;
