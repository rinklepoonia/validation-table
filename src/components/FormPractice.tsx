"use client";
import React, { useState, FormEvent, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  number: string;
}

export const FormPractice: React.FC = () => {
  const [name, setName] = useState("");
  const [fistNameError, setFistNameError] = useState("");
  const [email, setMail] = useState("");
  const [mailError, setMailError] = useState("");
  const [number, setNumber] = useState("");
  const [numError, setNumError] = useState("");
  const [submittedData, setSubmittedData] = useState<FormData[]>([]);

  // useEffect(() => {
  //   const savedData = localStorage.getItem("submittedData");
  //   if (savedData) {
  //     setSubmittedData(JSON.parse(savedData));
  //   }
  // }, []);

  // const saveToLocalStorage = (data: FormData[]) => {
  //   localStorage.setItem("submittedData", JSON.stringify(data));
  // };

  const FormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const isValidUsername = validateUsername();
    const isValidMail = validateEmail();
    const isValidNumber = validateNumber();

    if (isValidUsername && isValidMail && isValidNumber) {
      const newData: FormData = { name, email, number };
       const updatedData = [...submittedData, newData];
       setSubmittedData(updatedData);
      //  saveToLocalStorage(updatedData);
      setName("");
      setMail("");
      setNumber("");
      setMailError("");
    }

    const emailExists = submittedData.some(
      (mailData) => mailData.email === email
    );
    if (emailExists) {
      setMailError("Email is already submitted.");
      return;
    }
  };

  const validateUsername = (): boolean => {
    const UserNameRegex = /^[0-9A-Za-z]{6,16}$/;
    if (!UserNameRegex.test(name)) {
      setFistNameError("min-6 and max-16 letters");
      return false;
    } else {
      setFistNameError("");
      return true;
    }
  };
  const validateEmail = (): boolean => {
    const Mailregx = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!Mailregx.test(email)) {
      setMailError("put valid mail address");
      return false;
    } else {
      setMailError("");
      return true;
    }
  };
  const validateNumber = (): boolean => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(number)) {
      setNumError("Phone Number must be 10 digit");
      return false;
    } else {
      setNumError("");
      return true;
    }
  };

  return (
    <div className="">
      <div className="container">
        <form onSubmit={FormSubmit}>
          <div className="flex items-center justify-center gap-20">
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="fullName" className="text-lg text-black">
                User Name:
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="fullName"
                name="fullName"
                className={`border-[0.5px] border-grey rounded-2xl h-[50px] sm:p-3 p-2 outline-none mt-2 ${
                  fistNameError ? "border-red-500" : ""
                }`}
              />
              {fistNameError && (
                <div className="text-red-500 text-sm">{fistNameError}</div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-20 mt-7">
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="email" className="text-lg text-black">
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => setMail(e.target.value)}
                type="email"
                id="email"
                name="email"
                className={`border-[0.5px] border-grey rounded-2xl h-[50px] sm:p-3 p-2 outline-none mt-2 ${
                  mailError ? "border-red-500" : ""
                }`}
              />
              {mailError && (
                <div className="text-red-500 text-sm">{mailError}</div>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="phone" className="text-lg text-black">
                Phone:
              </label>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                type="number"
                id="phone"
                name="phone"
                className={`border-[0.5px] border-grey rounded-2xl h-[50px] sm:p-3 p-2 outline-none mt-2 ${
                  numError ? "border-red-500" : ""
                }`}
              />
              {numError && (
                <div className="text-red-500 text-sm">{numError}</div>
              )}
            </div>
          </div>
          <div className="mx-auto text-center mt-9">
            <button
              type="submit"
              className="border border-white py-3 px-5 bg-blue-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
        {submittedData.length > 0 && (
          <table className="border-collapse w-full mt-20">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((obj, index) => (
                <tr key={index}>
                  <td className="border p-2">{obj.name}</td>
                  <td className="border p-2">{obj.email}</td>
                  <td className="border p-2">{obj.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
