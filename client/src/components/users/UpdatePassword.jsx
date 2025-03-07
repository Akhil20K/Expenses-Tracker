import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI } from "../../services/users/userServices";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/slice/authSlice";

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});
const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Log out handler
  const logoutHandler = () => {
    // Logout user from redux
    dispatch(logoutAction());
    // Remove user from the local storage
    localStorage.removeItem('userInfo');
  }
  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["changePassword"],
  })
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch(e => {console.log(e)})
    },
  });
  useEffect(() => {
    setTimeout(() => {
      if(isSuccess){
        logoutHandler();
        navigate("/login");
      }
    }, 1000)
  })
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-4">Change Your Password</h2>
      <form onSubmit={formik.handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
        <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            Old Password
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="old-password"
              type="password"
              name="oldPassword"
              {...formik.getFieldProps("oldPassword")}
              className="outline-none flex-1"
              placeholder="Enter Old password"
            />
          </div>
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <span className="text-xs text-red-500">
              {formik.errors.oldPassword}
            </span>
          )}
          <br />
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>
          <div className="flex items-center border-2 py-2 px-3 rounded">
            <AiOutlineLock className="text-gray-400 mr-2" />
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="outline-none flex-1"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500">
              {formik.errors.password}
            </span>
          )}

        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;