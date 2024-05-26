import React from "react";
import ColorSwitcher from "../ColorSwitcher";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import AddForm from "./components/AddForm";

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
          <Route path="*" element={<Navigate to={"/"} />} />
          <Route element={<PrivateRoute />}>
            <Route path="/addNote" element={<AddForm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;

//     body:   'Roboto, sans-serif',
//     mono:    'Menlo, monospace',
//     heading: 'Roboto, sans-serif',
