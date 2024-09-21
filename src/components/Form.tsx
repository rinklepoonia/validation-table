"use client";
import React, { useEffect, useState } from "react";
import Input from "./custom-ui/Input";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
}

interface FormErrors {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  message: string;
  error: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    message: "",
    error: "",
  });

  const [submitFormData, setSubmitFormData] = useState<boolean>(false);
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isPopupOpen) {
      const timer = setTimeout(() => setIsPopupOpen(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isPopupOpen]);

  const validateField = (name: keyof FormData, value: string): string => {
    let error = "";
    switch (name) {
      case "first_name":
        error = value.trim() ? "" : "First name is required";
        break;
      case "last_name":
        error = value.trim() ? "" : "Last name is required";
        break;
      case "email":
        error = !value.trim()
          ? "Email is required"
          : !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
          ? "Invalid email format"
          : "";
        break;
      case "phone_number":
        error = !value.trim()
          ? "Phone number is required"
          : !/^\d{10}$/.test(value)
          ? "Phone number must be 10 digits"
          : "";
        break;
      case "message":
        error = value.trim() ? "" : "Message is required";
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      first_name: validateField("first_name", formData.first_name),
      last_name: validateField("last_name", formData.last_name),
      email: validateField("email", formData.email),
      phone_number: validateField("phone_number", formData.phone_number),
      message: validateField("message", formData.message),
      error: "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldError = validateField(name as keyof FormData, value);
    //   same-mail
    if (name === "email" && errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitFormData(true);

    //   same-mail
    const emailExists = tableData.some(
      (entry) => entry.email === formData.email
    );
    if (emailExists) {
      setErrors((prev) => ({
        ...prev,
        email: "This email is already registered.",
      }));
      return; // Stop further execution
    }

    if (validateForm()) {
      setTableData((prev) => [...prev, formData]);
      setIsPopupOpen(true);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        message: "",
      });
      setSubmitFormData(false);
    }
  };

  return (
    <div className="container px-3 mx-auto pt-20">
      <form onSubmit={handleSubmit} className="lg:w-[50%] w-full ps-10">
        <div className="flex justify-between gap-4 sm:gap-6 flex-col sm:flex-row">
          <div className="w-full">
            <Input
              className=""
              placeholder="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              error={
                submitFormData && errors.first_name ? errors.first_name : ""
              }
            />
          </div>
          <div className="w-full">
            <Input
              className=""
              placeholder="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              error={submitFormData && errors.last_name ? errors.last_name : ""}
            />
          </div>
        </div>
        <div className="flex justify-between gap-4 sm:gap-6 flex-col sm:flex-row mt-3">
          <div className="w-full">
            <Input
              className=""
              placeholder="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={submitFormData && errors.email ? errors.email : ""}
            />
          </div>
          <div className="w-full">
            <Input
              className=""
              placeholder="Phone No"
              type="number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              error={
                submitFormData && errors.phone_number ? errors.phone_number : ""
              }
            />
          </div>
        </div>
        <div className="mt-2">
          <textarea
            className="!outline-none xl:min-w-[500px] w-full  bg-transparent !resize-none placeholder:!text-black !text-black  xl:pb-3 sm:pb-3 pb-1 pe-3 font-normal text-sm md:text-base !leading-150 font-montserrat border-b xl:h-[95px] sm:h-20 h-16 text-star border-b-black lg:mt-6 mt-3"
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <div className="h-2 -mt-2 sm:-mt-3">
            {submitFormData && errors.message && (
              <span className="text-red-600 text-xs font-montserrat">
                {errors.message}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          aria-label="submit"
          className="lg:!mt-12 !mt-8 flex max-lg:mx-auto bg-blue-600 text-white px-7 py-3 rounded-full"
        >
          Submit
        </button>
        {isPopupOpen && (
          <div
            className={`fixed right-4 flex items-center justify-between bg-black text-white p-3 rounded-lg shadow-lg !z-[1000] duration-300 common-transition -bottom-20 max-w-0 ${
              isPopupOpen && "!max-w-sm !bottom-4"
            }`}
          >
            <div className="flex flex-col">
              <p> Thank You for Reaching Out!</p>
              {/* <p> Your inquiry has been successfully received.</p> */}
            </div>
          </div>
        )}
      </form>

      {tableData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="mt-20 w-full border-collapse border border-gray-200">
            <thead>
              <tr className="text-center">
                <th className="border border-gray-200 px-4 py-2 text-nowrap">
                  First Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-nowrap">
                  Last Name
                </th>
                <th className="border border-gray-200 px-4 py-2 text-nowrap">
                  Email
                </th>
                <th className="border border-gray-200 px-4 py-2 text-nowrap">
                  Phone Number
                </th>
                <th className="border border-gray-200 px-4 py-2 text-nowrap">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((entry, index) => (
                <tr className="text-center" key={index}>
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.first_name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.last_name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.phone_number}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {entry.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;
