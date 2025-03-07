import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userServices";
import AlertMessage from "../alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";
import { useDispatch } from 'react-redux';

//! Validations
const validationSchema = Yup.object({
  user: Yup.string().required("Enter your username or email address"),
  password: Yup.string().min(5, "Password must be at least 5 characters").required("Enter your password")
})

const LoginForm = () => {
  // For navigation to Profile after user logged in
  const navigate = useNavigate();
  // Dispatch
  const dispatch = useDispatch();
  // Mutation - To send the values from the formik to the userServices
  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  })
  // Form state management and validations from Yup
  const formik = useFormik({
    initialValues: {
      user: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Http request
      mutateAsync(values)
        .then((data) => {
          // Dispatch the user to redux
          dispatch(loginAction(data));
          // Save user to local storage
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch(e => {console.log(e)});
    }
  })
  useEffect(() => {
      setTimeout(() => {
        if(isSuccess){
          navigate("/profile");
        }
      }, 1000)
    })
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Login
      </h2>
      {/* Display messages */}
      {isPending && <AlertMessage type={"loading"} message={'Loading...'}/>}
      {isError && <AlertMessage type={"error"} message={error?.response?.data?.message || "Error Occured"}/>}
      {isSuccess && <AlertMessage type={"success"} message={'Login Success'}/>}
      <p className="text-sm text-center text-gray-500">
        Login to access your account
      </p>

      {/* Input Field - Username/Email */}
      <div className="relative">
        <FaUser className="absolute top-3 left-3 text-gray-400" />
        <input
          id="user"
          type="text"
          // Take care of the value of the input
          {...formik.getFieldProps("user")}
          placeholder="Username or Email"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {/*Throw an error from the validationSchema below the input field if the cursor moves away from input*/}
        {formik.touched.user && formik.errors.user && (
          <span className="text-xs text-red-500">{formik.errors.user}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          // Take care of the value of the input
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {/*Throw an error from the validationSchema below the input field if the cursor moves away from input*/}
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;