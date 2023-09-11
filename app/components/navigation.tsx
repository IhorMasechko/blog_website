"use client";

import Link from "next/link";
import useStore from "../../store";

const Navigation = () => {
  const { user } = useStore();

  return (
    <header className="border-b py-5">
      <div className="container max-w-screen-xl mx-auto relative flex justify-center items-center">
        <Link href="/" className=" font-bold text-xl cursor-pointer">
          Posts page
        </Link>

        <div className="absolute right-5">
          {user.id ? (
            <div className="flex space-x-4">
              <Link href="/auth/profile">Profile</Link>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/signup">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
