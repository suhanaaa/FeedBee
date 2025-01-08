"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQListItem({ qa, className = "" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-gray-200">
          {qa.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <p className="mt-4 text-gray-400 leading-relaxed">{qa.answer}</p>
      )}
    </li>
  );
}
