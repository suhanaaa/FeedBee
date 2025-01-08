"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ButtonCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/billing/create-checkout", {
        successUrl: window.location.href + "/success",
        cancelUrl: window.location.href,
      });

      const checkoutUrl = response.data.url;

      //to redirect the user to different page here the user will be redirected to checkoutUrl
      window.location.href = checkoutUrl;
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Something went wrong";

      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 p-0.5 shadow-lg">
      <button
        onClick={() => handleSubscribe()}
        className="btn normal-case text-lg px-6 rounded-4xl  text-white border-0 hover:opacity-90  hover:shadow-xl hover:-translate-y-1"
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Subscribe
      </button>
    </div>
  );
};

export default ButtonCheckout;
