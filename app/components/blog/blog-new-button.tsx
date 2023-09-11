"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import useStore from "../../../store";

const BlogNewButton = () => {
  const { user } = useStore();
  const [login, setLogin] = useState(false);

  const renderButton = () => {
    if (login) {
      return (
        <div className="mb-5 flex justify-end">
          <Link href="blog/new">
            <div className="text-white bg-yellow-500 hover:brightness-110 rounded py-1 px-8">
              New post
            </div>
          </Link>
        </div>
      );
    }
  };

  useEffect(() => {
    if (user.id) {
      setLogin(true);
    }
  }, [user]);

  return <>{renderButton()}</>;
};

export default BlogNewButton;
