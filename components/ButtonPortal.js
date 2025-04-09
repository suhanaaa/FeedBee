"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ButtonPortal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBilling = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/billing/create-portal", {
        returnUrl: window.location.href,
      });

      window.location.href = response.data.url;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong!";

      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 p-0.5 shadow-lg">
      <button
        onClick={() => handleBilling()}
        className="btn normal-case text-lg px-6 rounded-4xl  text-white border-0 hover:opacity-90  hover:shadow-xl hover:-translate-y-1"
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Billing
      </button>
    </div>
  );
};

export default ButtonPortal;
