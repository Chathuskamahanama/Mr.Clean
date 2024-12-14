import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

import DashboardLayout from "../../../components/DashboardLayout";
import { AuthContext } from "../../../context/AuthContext";
import JobResolverSchema from "./JobResolverSchema";
import http from "../../../util/HttpHelper";
import Modal from "../../../components/Modal";

const defaultValues = {
  address: "",
  description: "",
};

const Service = () => {
  const [typeList, setTypeList] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [location, setLocation] = useState();

  const { user } = useContext(AuthContext);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
  });

  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(JobResolverSchema),
  });

  const { errors } = formState;

  const handleFetchTypes = async () => {
    try {
      const res = await http.get("type/all");
      setTypeList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchEmployees = async () => {
    try {
      if (selectedType === "") {
        setEmpList([]);
        return;
      }
      setIsDataLoading(true);
      const res = await http.get("emp/all", {
        params: {
          type: selectedType !== "" ? selectedType : null,
        },
      });
      setEmpList(res.data.data);
      setIsDataLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenJobPopup = async (emp) => {
    setSelectedEmp(emp);
    setTitle(`Create Job`);
    setIsOpen(true);
  };

  const handleCloseJobPopup = async () => {
    setSelectedEmp(null);
    setIsOpen(false);
  };

  const onSubmit = async (formData) => {
    if (isLoading) return;

    console.log("Form Data: ", formData);
    const { description, address } = formData;

    setIsLoading(true);
    const jobOb = {
      description,
      address,
      idClient: user?.user?._id,
      idEmployee: selectedEmp._id,
    };

    try {
      const res = await http.post("job/create", jobOb);
      toast.success(res.data.message);
      reset();
      handleFetchEmployees();
      setIsLoading(false);
      handleCloseJobPopup();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };

  const handleViewLocation = async (id) => {
    try {
      const res = await http.get("emp/location", {
        params: {
          id,
        },
      });
      setLocation(res.data.data);
      setIsLocationOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchTypes();
  }, []);

  return (
    <DashboardLayout
      body={
        <>
          <Modal
            body={
              <>
                <form
                  name="jobCreationForm"
                  noValidate
                  className="min-w-[300px]"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="address"
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <div>
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Address
                        </label>
                        <textarea
                          id="address"
                          name={name}
                          value={value}
                          onChange={onChange}
                          rows={3}
                          className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                            !!errors.address
                              ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                              : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                          placeholder=""
                        />
                        {!!errors.address && (
                          <p className="mt-2 text-sm text-red-600">
                            <span className="font-medium">
                              {errors?.address?.message}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { name, value, onChange } }) => (
                      <div>
                        <label
                          htmlFor="description"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name={name}
                          value={value}
                          onChange={onChange}
                          rows={3}
                          className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                            !!errors.description
                              ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                              : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          }`}
                          placeholder=""
                        />
                        {!!errors.description && (
                          <p className="mt-2 text-sm text-red-600">
                            <span className="font-medium">
                              {errors?.description?.message}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <div className="flex justify-center items-center">
                    <button
                      className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="submit"
                    >
                      Create Job
                    </button>
                  </div>
                </form>
              </>
            }
            isOpen={isOpen}
            onClose={() => handleCloseJobPopup()}
            title={title}
          />

          <Modal
            body={
              <div className="w-[600px]">
                {isLoaded ? (
                  <GoogleMap
                    center={{ lat: 7.8731, lng: 80.7718 }}
                    zoom={8}
                    mapContainerStyle={{ width: "100%", height: "80vh" }}
                  >
                    {location && (
                      <MarkerF
                        position={{
                          lat: location?.lat,
                          lng: location?.lon,
                        }}
                        // onClick={() => handleActiveMarker(id)}
                        // icon={{
                        //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                        //   scaledSize: { width: 50, height: 50 }
                        // }}
                      ></MarkerF>
                    )}
                  </GoogleMap>
                ) : null}
              </div>
            }
            isOpen={isLocationOpen}
            onClose={() => setIsLocationOpen(false)}
            title={"Live Location"}
          />

          <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-auto"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Employee
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <h3 className="text-3xl font-bold text-gray-800 my-3">
            Find Service Providers
          </h3>

          <div className="">
            <div className="p-3">
              <h4 className="text-xl font-bold text-gray-800 my-3">
                Search for Nearest Service Providers
              </h4>
              <form className="flex items-center gap-3">
                <div>
                  <select
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="">Choose a Service</option>
                    {typeList.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="select-none rounded-lg bg-gray-800 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={() => handleFetchEmployees()}
                >
                  Search
                </button>
              </form>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Provider
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Service Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isDataLoading ? (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th
                        scope="row"
                        colSpan={8}
                        className="px-6 py-4 font-medium text-center text-red-600 whitespace-nowrap dark:text-white"
                      >
                        <div
                          role="status"
                          className="w-full flex justify-center items-center text-center"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </th>
                    </tr>
                  ) : (
                    <>
                      {empList.length === 0 ? (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th
                            scope="row"
                            colSpan={8}
                            className="px-6 py-4 font-medium text-red-600 text-center whitespace-nowrap dark:text-white"
                          >
                            No Data
                          </th>
                        </tr>
                      ) : (
                        <>
                          {empList.map((emp, index) => (
                            <tr
                              key={index}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {emp?.user?.name}
                              </th>
                              <td className="px-6 py-4">{emp?.user?.email}</td>
                              <td className="px-6 py-4">
                                {emp?.rating ? emp?.rating?.toFixed(2) : 0}
                              </td>
                              <td className="px-6 py-4">
                                {emp?.user?.phoneNo}
                              </td>
                              <td className="px-6 py-4">
                                {emp?.provider?.name}
                              </td>
                              <td className="px-6 py-4">{emp?.type?.name}</td>
                              <td className="px-6 py-4 text-center">
                                <span
                                  className="font-medium text-green-600 hover:underline cursor-pointer"
                                  onClick={() => handleViewLocation(emp._id)}
                                >
                                  View Location
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span
                                  className="font-medium text-blue-600 hover:underline cursor-pointer"
                                  onClick={() => handleOpenJobPopup(emp)}
                                >
                                  Create Job
                                </span>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
    />
  );
};

export default Service;
