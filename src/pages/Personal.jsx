import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Personal() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "", phone: "" };

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      navigate("/select");
    }
  };

  const getStepStyle = (step) => {
    const isActive = location.pathname === `/${step}`;
    return isActive
      ? "bg-[#B4E2FF] text-[#002960] border-transparent"
      : "text-white border-white";
  };

  return (
    <div className="w-[940px] flex p-4 rounded-2xl mt-4 h-[560px] m-auto bg-white">
      <div
        className="w-[274px] h-[530px] bg-contain bg-no-repeat"
        style={{ backgroundImage: `url('./assets/bg-sidebar-desktop.svg')` }}>
        <div className="p-7">
          <div
            className="flex items-center gap-5 mt-4 cursor-pointer"
            onClick={() => navigate("/personal")}>
            <div className="flex justify-center items-center">
              <span
                className={`w-[33px] h-[33px] border-[1.5px] ${getStepStyle(
                  "personal"
                )} font-[700] text-[14px] p-1 rounded-full flex justify-center items-center`}>
                1
              </span>
            </div>
            <div>
              <h2 className="text-[#ABBCFF] text-[12px] font-thin">STEP 1</h2>
              <h1 className="font-[700] text-[14px] text-white">YOUR INFO</h1>
            </div>
          </div>
          <div
            className="flex mt-6 items-center gap-5 cursor-pointer"
            onClick={() => navigate("/select")}>
            <div className="flex justify-center items-center">
              <span
                className={`w-[33px] h-[33px] border-[1.5px] ${getStepStyle(
                  "select"
                )} font-[700] text-[14px] p-1 rounded-full flex justify-center items-center`}>
                2
              </span>
            </div>
            <div>
              <h2 className="text-[#ABBCFF] text-[12px] font-thin">STEP 2</h2>
              <h1 className="font-[700] text-[14px] text-white">SELECT PLAN</h1>
            </div>
          </div>
          <div
            className="flex mt-6 items-center gap-5 cursor-pointer"
            onClick={() => navigate("/pick-add")}>
            <div className="flex justify-center items-center">
              <span
                className={`w-[33px] h-[33px] border-[1.5px] ${getStepStyle(
                  "pick-add"
                )} font-[700] text-[14px] p-1 rounded-full flex justify-center items-center`}>
                3
              </span>
            </div>
            <div>
              <h2 className="text-[#ABBCFF] text-[12px] font-thin">STEP 3</h2>
              <h1 className="font-[700] text-[14px] text-white">ADD-ONS</h1>
            </div>
          </div>
          <div
            className="flex mt-6 items-center gap-5 cursor-pointer"
            onClick={() => navigate("/finish")}>
            <div className="flex justify-center items-center">
              <span
                className={`w-[33px] h-[33px] border-[1.5px] ${getStepStyle(
                  "finish"
                )} font-[700] text-[14px] p-1 rounded-full flex justify-center items-center`}>
                4
              </span>
            </div>
            <div>
              <h2 className="text-[#ABBCFF] text-[12px] font-thin">STEP 4</h2>
              <h1 className="font-[700] text-[14px] text-white">SUMMARY</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10 ml-7 flex flex-col justify-between flex-grow">
        <div>
          <h1 className="font-[700] text-[#022959] leading-[24px] text-left text-[32px]">
            Personal info
          </h1>
          <h2 className="font-[400] text-[16px] mt-4 text-[#9699AA]">
            Please provide your name, email address, and phone number.
          </h2>
        </div>
        <div className="mt-9 space-y-5">
          <div>
            <label htmlFor="name" className="font-[400] text-[14px]">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Stephen King"
              value={formData.name}
              onChange={handleChange}
              className={`border text-[16px] font-[500] p-2.5 w-full rounded-md outline-none ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="font-[400] text-[14px]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. stephenking@lorem.com"
              value={formData.email}
              onChange={handleChange}
              className={`border text-[16px] font-[500] p-2.5 w-full rounded-md outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="font-[400] text-[14px]">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. +1 234 567 890"
              value={formData.phone}
              onChange={handleChange}
              className={`border text-[16px] font-[500] p-2.5 w-full rounded-md outline-none ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-auto">
          <button
            className="w-[123px] h-[48px] bg-[#022959] text-white rounded-lg font-[500] text-[16px] hover:bg-[#0f3a6f] transition-all duration-400"
            onClick={handleNextStep}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

export default Personal;
