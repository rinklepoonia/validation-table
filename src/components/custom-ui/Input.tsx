"use client";
import React from "react";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  error,
  value,
  onChange,
  className,
}) => {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <input
        className={`font-normal text-sm md:text-base !leading-150  placeholder:text-black py-3 pr-3.5 bg-transparent outline-none border-b border-b-black ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="h-2 -mt-2 sm:-mt-3">
        {error && (
          <span className="text-red-600 text-xs font-montserrat">{error}</span>
        )}
      </div>
    </div>
  );
};

export default Input;
