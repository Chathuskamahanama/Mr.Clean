import React, { useContext, useEffect } from "react";

import DashboardLayout from "../../../components/DashboardLayout";
import { AuthContext } from "../../../context/AuthContext";
import http from "../../../util/HttpHelper";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useContext(AuthContext);

  const handleSaveLocation = async (lat, lng) => {
    try {
      const res = await http.put(
        "emp/location/save",
        { lat, lng },
        {
          params: {
            id: user?.empProfile?._id,
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user !== null && user?.empProfile !== null) {
      navigator.geolocation.getCurrentPosition((position) => {
        handleSaveLocation(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [user]);
  return (
    <DashboardLayout
    body={
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="mr-8"> {/* Added margin-right to create space */}
          <img src="/assets/logo.png" alt="logo" width="200px" height="268px" />
        </div>
        <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold mb-4">Welcome to Mr Clean</h1>
          <p className="text-gray-700 mb-4">
            Thank you for visiting our website. We are excited to have you
            here!
          </p>
          <p className="text-gray-700 mb-4">
            Whether you need a plumber, electrician, gardener, or any other
            service, our platform makes it easy to find reliable
            professionals.
          </p>
        </div>
      </div>
    }
  />
  );
};

export default Home;
