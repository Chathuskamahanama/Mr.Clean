import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import SignInResolverSchema from "./SignInResolverSchema";
import { toast } from "react-toastify";
import http from "../../../util/HttpHelper";
import { AuthContext } from "../../../context/AuthContext";

const defaultValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(SignInResolverSchema),
  });

  const { errors } = formState;

  const onSubmit = async (formData) => {
    if (isLoading) return;

    console.log("Form Data: ", formData);
    const { email, password } = formData;

    setIsLoading(true);

    const loginOb = {
      email,
      password,
    };

    try {
      const res = await http.post("public/login", loginOb);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.data);
      toast.success(res.data.message);
      reset();
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex">
      <div
        className="hidden h-full flex-auto items-center justify-center overflow-hidden md:flex"
        
        
        style={{
          backgroundImage:
            "url(https://scrubnbubbles.com/wp-content/uploads/2020/10/cleaning-companies.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#dedce7",
        }}
      ></div>
        <div className="h-screen overflow-y-auto p-3 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mx-auto">
        <img src="/assets/logo.png" alt="logo" width="150px" height="150px" />
      </div>
      <div className="text-3xl text-center text-[#212B36] leading-normal font-bold mt-3">
        Sign in to Continue
      </div>
      <div className="flex items-baseline justify-center font-medium text-[#212B36] my-3">
        <div>New user?</div>
        <div
          className="ml-4 text-green-600 font-semibold hover:underline cursor-pointer"
          onClick={() => navigate("/sign-up")}
        >
          Create an account
        </div>
      </div>
          <form
            name="loginForm"
            noValidate
            className="mt-9 flex w-full flex-col justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
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

            <div className="flex items-center justify-end">
              <div
                className="text-md font-medium text-[#212B36] underline cursor-pointer"
                onClick={() => navigate("/password-reset")}
              >
                Forgot password?
              </div>
            </div>

            <button
              className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
