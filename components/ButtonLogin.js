"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyle }) => {
  const dashboardUrl = "/dashboard";

  return session ? (
    <Link
      href={dashboardUrl}
      className={`btn normal-case px-6 rounded-4xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white border-0 hover:opacity-90  hover:shadow-xl hover:-translate-y-1  ${
        extraStyle ? extraStyle : ""
      }`}
    >
      Welcome back {session.user.name || "friend"}
    </Link>
  ) : (
    <button
      className={`btn normal-case text-lg px-6 rounded-4xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white border-0 hover:opacity-90  hover:shadow-xl hover:-translate-y-1 ${
        extraStyle ? extraStyle : ""
      }`}
      onClick={() => {
        signIn("undefined", { callbackUrl: dashboardUrl });
      }}
    >
      Get started
    </button>
  );
};

export default ButtonLogin;
