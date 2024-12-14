import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";

import SignIn from "./app/auth/signin";
import SignUp from "./app/auth/signup";
import Service from "./app/dashboard/service";
import Home from "./app/dashboard/home";
import Employee from "./app/dashboard/employee";
import Job from "./app/dashboard/job";
import Payment from "./app/dashboard/payment";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/service" element={<Service />} />
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/job" element={<Job />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="light"
      />
    </>
  );
};

export default App;
