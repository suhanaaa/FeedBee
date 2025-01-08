"use client";

import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  return (
    <main>
      <button
        onClick={() => signOut()}
        className="btn normal-case text-lg px-6 rounded-4xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white border-0 hover:opacity-90  hover:shadow-xl hover:translate-y-1"
      >
        Logout
      </button>
    </main>
  );
};

export default ButtonLogout;
