import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PickAdd = () => {
  const navigate = useNavigate();

  const [selectedAddOns, setSelectedAddOns] = useState({});

  const [error, setError] = useState("");

  const handleCheckboxChange = (addOn) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [addOn]: !prev[addOn],
    }));
  };

  const handleNextStep = () => {
    if (Object.keys(selectedAddOns).length === 0) {
      setError("Please select at least one add-on.");
      return;
    }
    setError("");

    localStorage.setItem("selectedAddOns", JSON.stringify(selectedAddOns));

    navigate("/finish");
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
              <span className="w-[33px] h-[33px] border-white border-[1.5px] text-white font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">
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
              <span className="w-[33px] h-[33px] border-white border-[1.5px] bg-[#B4E2FF] text-[#002960] font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">
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
            Pick add-ons
          </h1>
          <h2 className="font-[400] text-[16px] mt-4 text-[#9699AA]">
            Add-ons help enhance your gaming experience.
          </h2>
        </div>
        <div className="mt-9 space-y-5">
          {[
            {
              id: "online",
              title: "Online Service",
              description: "Access to multiplayer games",
              price: "+$1/mo",
            },
            {
              id: "storage",
              title: "Larger Storage",
              description: "Extra 1TB of cloud save",
              price: "+$2/mo",
            },
            {
              id: "custom",
              title: "Customizable Profile",
              description: "Custom theme on your profile",
              price: "+$2/mo",
            },
          ].map(({ id, title, description, price }) => (
            <div
              key={id}
              className={`w-full h-[81px] flex items-center p-4 border rounded-lg cursor-pointer ${
                selectedAddOns[id]
                  ? "border-[#723EFC] bg-[#DCDCDF]"
                  : "border-gray-300"
              }`}
              onClick={() => handleCheckboxChange(id)}>
              <input
                type="checkbox"
                checked={!!selectedAddOns[id]}
                readOnly
                className="w-6 h-6 mr-4"
              />
              <div>
                <h3 className="font-[700] text-[16px]">{title}</h3>
                <p className="text-[#9699AA]">{description}</p>
                <p className="text-[#9699AA]">{price}</p>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <div className="flex justify-between mt-auto">
          <button
            className="w-[123px] h-[48px] bg-[#B4E2FF] text-[#022959] rounded-lg font-[500] text-[16px] hover:bg-[#a0c4e5] transition-all duration-400"
            onClick={() => navigate("/select")}>
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

export default PickAdd;
