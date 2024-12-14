import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";

import SignUpResolverSchema from "./SignUpResolverSchema";
import http from "../../../util/HttpHelper";

const defaultValues = {
  email: "",
  password: "",
  repassword: "",
  phone: "",
  name: "",
  photo: null,
};

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(SignUpResolverSchema),
  });

  const { errors } = formState;

  const onSubmit = async (formData) => {
    if (isLoading) return;

    console.log("Form Data: ", formData);
    const { name, email, password, repassword, phone, photo } = formData;

    if (password !== repassword) {
      toast.error("Passwords don't match");
    }

    setIsLoading(true);

    const registerOb = {
      email,
      password,
      name,
      photo,
      phoneNo: phone,
    };

    try {
      const res = await http.post("public/register", registerOb);
      toast.success(res.data.message);
      reset();
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };

  const uploadedFile = watch("photo");

  return (
    <div className="w-screen h-screen flex">
      <div
        className="hidden h-full flex-auto items-center justify-center overflow-hidden md:flex"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/3b/68/68/3b68683652f36be53253c5503e6df884--faut-rive-nord.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#dedce7",
        }}
      ></div>
      <div className="h-screen overflow-y-auto p-3 flex justify-center py-8 ltr:border-r-1 rtl:border-l-1 sm:w-auto sm:h-auto sm:rounded-2xl sm:shadow md:h-full md:w-[480px] md:rounded-none md:shadow-none">
        <div className="mx-auto w-full sm:mx-0 sm:w-[350px]">
          <img src="/assets/logo192.png" alt="logo" />
          <div className="text-3xl text-left text-[#212B36] leading-normal font-bold mt-3">
            Get started
          </div>
          <div className="flex items-baseline font-medium text-[#212B36] my-3">
            <div>Already have an account?</div>
            <div
              className="ml-4 text-green-600 font-600 hover:underline cursor-pointer"
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </div>
          </div>
          <form
            name="registerForm"
            noValidate
            className="mt-9 flex w-full flex-col justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                      !!errors.name
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder=""
                  />
                  {!!errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">
                        {errors?.name?.message}
                      </span>
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field: { name, value, onChange, error } }) => (
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                      !!errors.email
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder=""
                  />
                  {!!errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">
                        {errors?.email?.message}
                      </span>
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { name, value, onChange, error } }) => (
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                      !!errors.password
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder=""
                  />
                  {!!errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">
                        {errors?.password?.message}
                      </span>
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="repassword"
              control={control}
              render={({ field: { name, value, onChange, error } }) => (
                <div>
                  <label
                    htmlFor="repassword"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Re-enter Password
                  </label>
                  <input
                    type="password"
                    id="repassword"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                      !!errors.repassword
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder=""
                  />
                  {!!errors.repassword && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">
                        {errors?.repassword?.message}
                      </span>
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field: { name, value, onChange, error } }) => (
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone No
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                      error
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder=""
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">{error.message}</span>
                    </p>
                  )}
                </div>
              )}
            />

            {uploadedFile && (
              <img
                src={uploadedFile}
                alt="Uploaded profile picture"
                className="rounded-full mx-auto w-128 h-128 my-10"
              />
            )}

            <Controller
              name="photo"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <div className="flex items-center flex-col justify-center w-full">
                  <div className="block mb-2 mt-1 text-sm font-medium text-gray-900 text-left w-full">
                    Photo
                  </div>
                  <label
                    htmlFor="photo"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Click to upload Photo
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      name={name}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          onChange(reader.result);
                        };
                        reader.onerror = (error) => {
                          console.error("Error: ", error);
                        };
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            />

            <div className="mt-3">
              <span className="text-xs text-gray-500 sm:text-center dark:text-gray-400">
                By signing up, I agree to{" "}
                <span className="text-green-600">
                  Terms of Service and Privacy Policy
                </span>
              </span>
            </div>

            <button
              className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
