import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgSidebar from "../assets/bg-sidebar-desktop.svg";

const Finish = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState({});
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
   
    const savedPlan = JSON.parse(localStorage.getItem("plan"));
    const savedAddOns = JSON.parse(localStorage.getItem("selectedAddOns"));
    setPlan(savedPlan || {});
    setSelectedAddOns(savedAddOns || {});
  }, []);

  useEffect(() => {
    const planPrices = {
      Arcade: { monthly: 9, yearly: 90 },
      Advanced: { monthly: 12, yearly: 120 },
      Pro: { monthly: 15, yearly: 150 }
    };

    const addOnPrices = {
      online: 1,
      storage: 2,
      custom: 2
    };

    let planPrice = 0;
    if (plan?.plan) {
      planPrice = plan?.billing === 'Yearly'
        ? planPrices[plan.plan]?.yearly
        : planPrices[plan.plan]?.monthly;
    }

    const addOnTotal = Object.keys(selectedAddOns).reduce((total, addOn) => {
      if (selectedAddOns[addOn]) {
        total += addOnPrices[addOn] || 0;
      }
      return total;
    }, 0);

    setTotal((planPrice || 0) + addOnTotal);
  }, [plan, selectedAddOns]);

  return (
    <div className="w-[940px] flex p-4 rounded-2xl mt-4 h-[560px] m-auto bg-white">
      <div
        className="w-[274px] h-[530px] bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${bgSidebar})` }}>
        <div className="p-7">
          {/* Navigation Steps */}
          <div className="flex items-center gap-5 mt-4 cursor-pointer" onClick={() => navigate("/personal")}>
            <div className="flex justify-center items-center">
              <span className="w-[33px] h-[33px] border-white border-[1.5px] text-white font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">1</span>
            </div>
            <div>
              <h2 className="text-[#ABBCFF] text-[12px] font-thin">STEP 1</h2>
              <h1 className="font-[700] text-[14px] text-white">YOUR INFO</h1>
            </div>
          </div>
          <div className="flex mt-6 items-center gap-5 cursor-pointer" onClick={() => navigate("/select")}>
            <div className="flex justify-center items-center">
              <span className="w-[33px] h-[33px] border-white border-[1.5px] text-white font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">2</span>
            </div>
            <div>
              <h2 className="text-[#ABBCFF] text-[12px] font-thin">STEP 2</h2>
              <h1 className="font-[700] text-[14px] text-white">SELECT PLAN</h1>
            </div>
          </div> 
          <div className="flex mt-6 items-center gap-5 cursor-pointer" onClick={() => navigate("/pick-add")}>
            <div className="flex justify-center items-center">
              <span className="w-[33px] h-[33px] border-white border-[1.5px] text-white font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">3</span>
            </div>
            <div>
              <h2 className="text-[#ABBCFF] text-[12px] font-thin">STEP 3</h2>
              <h1 className="font-[700] text-[14px] text-white">ADD-ONS</h1>
            </div>
          </div>
          <div className="flex mt-6 items-center gap-5 cursor-pointer" onClick={() => navigate("/finish")}>
            <div className="flex justify-center items-center">
              <span className="w-[33px] h-[33px] border-white border-[1.5px] bg-[#B4E2FF] text-[#002960] font-[700] text-[14px] p-1 rounded-full flex justify-center items-center">4</span>
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
          <h1 className="font-[700] text-[#022959] leading-[24px] text-left text-[32px]">Finishing up</h1>
          <h2 className="font-[400] text-[16px] mt-4 text-[#9699AA]">Double-check everything looks OK before confirming.</h2>
        </div>
        <div className="mt-9 p-4 bg-[#F9F9FD] rounded-lg">
          <h3 className="text-[#022959] font-[700] text-[18px]">Plan Details</h3>
          <div className="mt-4 flex justify-between text-[#022959]">
            <div>
              <p className="font-[500]">{plan?.plan} ({plan?.billing} billing)</p>
              <p className="text-[#9699AA] cursor-pointer" onClick={() => navigate("/select")}>Change</p>
            </div>
            <p className="font-[700]">
              {plan?.billing === 'Monthly' 
                ? `$${plan?.plan === 'Arcade' ? '9' : plan?.plan === 'Advanced' ? '12' : '15'}/mo`
                : `$${plan?.plan === 'Arcade' ? '90' : plan?.plan === 'Advanced' ? '120' : '150'}/yr`}
            </p>
          </div>
          <h3 className="text-[#022959] font-[700] text-[18px] mt-6">Add-Ons</h3>
          <div className="mt-4 space-y-2">
            {Object.keys(selectedAddOns).map((addOn) => selectedAddOns[addOn] && (
              <div key={addOn} className="flex justify-between text-[#022959]">
                <p className="font-[500]">
                  {addOn === 'online' ? 'Online Service' :
                  addOn === 'storage' ? 'Larger Storage' :
                  'Customizable Profile'}
                </p>
                <p className="font-[700]">
                  {addOn === 'online' ? '+$1/mo' :
                   addOn === 'storage' ? '+$2/mo' : '+$2/mo'}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[#022959]">
            <p className="font-[700]">Total (per month)</p>
            <p className="font-[700] text-[#483EFF]">+${total.toFixed(2)}/mo</p>
          </div>
        </div>
        <div className="mt-auto flex justify-between">
          <button
            className="w-[123px] h-[48px] bg-[#B4E2FF] text-[#022959] rounded-lg font-[500] text-[16px] hover:bg-[#a0c4e5] transition-all duration-400"
            onClick={() => navigate("/pick-add")}>
            Go Back
          </button>
          <button
            className="w-[123px] h-[48px] bg-[#022959] text-white rounded-lg font-[500] text-[16px] hover:bg-[#0f3a6f] transition-all duration-400"
            onClick={() => {
              const confirmMessage = `
                Thank you
                Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
              `;
              alert(confirmMessage);
            }}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finish;
