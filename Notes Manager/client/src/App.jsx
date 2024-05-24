import React from "react";
import ColorSwitcher from "../ColorSwitcher";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <ColorSwitcher />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/signin" element={} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
