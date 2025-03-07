import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../alert/AlertMessage";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { listCategoryAPI } from "../../services/category/categoryServices";
import { updateTransactionAPI } from "../../services/transactions/transactionServices";

const validationSchema = Yup.object({
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string(),
  date: Yup.date(),
  description: Yup.string(),
});

const UpdateTransaction = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryFn: listCategoryAPI,
    queryKey: ['list-category'],
  })
  // For navigation to Dashboard 
  const navigate = useNavigate();
  // Mutation - To send the values from the formik to the userServices
  const { mutateAsync, isSuccess, isError, error } = useMutation({
    mutationFn: updateTransactionAPI,
    mutationKey: ["updateTransaction"],
  })
  // Form state management and validations from Yup
  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values, id
      }
      mutateAsync(data)
        .then((data) => console.log(data))
        .catch(e => console.log(e));
    }
  })
  // Redirect after adding transaction
  useEffect(() => {
    setTimeout(() => {
      if(isSuccess){
        navigate("/dashboard");
      }
    }, 1000)
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Update Transaction Details
        </h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>
      {/* Display alert message */}
      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something happened please try again later"
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Transaction updated successfully, redirecting..."
        />
      )}
      {/* Amount Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="amount" className="text-gray-700 font-medium">
          <FaDollarSign className="inline mr-2 text-blue-500" />
          Amount
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="Amount"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-red-500 text-xs italic">{formik.errors.amount}</p>
        )}
      </div>

      {/* Category Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="category" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Category
        </label>
        <select
          {...formik.getFieldProps("category")}
          id="category"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        >
          <option value="">Select a category</option>
          {/* <option value="expense">Expense</option> */}
          {data?.map((category) => (
            <option key={category?._id} value={category?.name}>{category?.name}</option>
          ))}
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.category}
          </p>
        )}
      </div>

      {/* Date Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="date" className="text-gray-700 font-medium">
          <FaCalendarAlt className="inline mr-2 text-blue-500" />
          Date
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date")}
          id="date"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {formik.touched.date && formik.errors.date && (
          <p className="text-red-500 text-xs italic">{formik.errors.date}</p>
        )}
      </div>

      {/* Description Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="description" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" />
          Description (Optional)
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Description"
          rows="3"
          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs italic">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
      >
        Update Transaction
      </button>
    </form>
  );
};

export default UpdateTransaction;