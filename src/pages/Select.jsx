import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Select = () => {
  const navigate = useNavigate();


  const [isYearly, setIsYearly] = useState(false);


  const [selectedPlan, setSelectedPlan] = useState(null);


  const [error, setError] = useState("");


  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };


  const handleToggleChange = () => {
    setIsYearly(!isYearly);
  };


  const handleNextStep = () => {
    if (!selectedPlan) {
      setError("Please select a plan.");
      return;
    };

    const planData = {
      name: selectedPlan,
      billing: isYearly ? "yearly" : "monthly",
    };
    localStorage.setItem("selectedPlan", JSON.stringify(planData));

    setError("");
    navigate("/pick-add");
  };

  const getPrice = (plan) => {
    const prices = {
      arcade: isYearly ? "$90/yr" : "$9/mo",
      advanced: isYearly ? "$120/yr" : "$12/mo",
      pro: isYearly ? "$150/yr" : "$15/mo",
    };
    return prices[plan];
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
              <span className="w-[33px] h-[33px] border-white border-[1.5px] text-white font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">
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
              <span className="w-[33px] h-[33px] border-white border-[1.5px] bg-[#B4E2FF] text-[#002960] font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">
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
              <span className="w-[33px] h-[33px] border-white border-[1.5px] text-white font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">
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
              <span className="w-[33px] h-[33px] border-white border-[1.5px] text-white font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">
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
            Select your plan
          </h1>
          <h2 className="font-[400] text-[16px] mt-4 text-[#9699AA]">
            You have the option of monthly or yearly billing.
          </h2>
        </div>
        <div className="mt-9 flex gap-4">
          {["arcade", "advanced", "pro"].map((plan) => (
            <div
              key={plan}
              className={`w-[138px] h-[160px] p-4 border rounded-lg cursor-pointer flex flex-col justify-between ${
                selectedPlan === plan ? " border-[#723EFC] border-[1.5px] text-[#022959]" : "bg-white"
              }`}
              onClick={() => handlePlanSelect(plan)}>
              <div>
                <h3 className="font-[700] text-[16px]">{plan.charAt(0).toUpperCase() + plan.slice(1)}</h3>
                <p className="text-[#9699AA]">{getPrice(plan)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-6">
          <span className="text-[#9699AA] text-[14px]">Monthly</span>
          <div
            className="relative w-[60px] h-[30px] mx-4"
            onClick={handleToggleChange}>
            <div
              className={`absolute top-0 left-0 w-[30px] h-[30px] rounded-full bg-[#B4E2FF] transition-transform duration-300 ${
                isYearly ? "translate-x-[30px]" : ""
              }`}>
            </div>
            <div className="w-full h-full border rounded-full bg-[#f0f0f0]"></div>
          </div>
          <span className="text-[#9699AA] text-[14px]">Yearly</span>
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <div className="flex justify-between mt-auto">
          <button
            className="w-[123px] h-[48px] bg-[#B4E2FF] text-[#022959] rounded-lg font-[500] text-[16px] hover:bg-[#a0c4e5] transition-all duration-400"
            onClick={() => navigate("/personal")}>
            Go Back
          </button>
          <button
            className="w-[123px] h-[48px] bg-[#022959] text-white rounded-lg font-[500] text-[16px] hover:bg-[#0f3a6f] transition-all duration-400"
            onClick={handleNextStep}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select;
