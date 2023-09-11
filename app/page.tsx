import React, { Suspense } from "react";

import BlogList from "./components/blog/blog-list";
import BlogNewButton from "./components/blog/blog-new-button";
import Loading from "./loading";

const Page = () => {
  return (
    <div className="h-full">
      <BlogNewButton />
      <Suspense fallback={<Loading />}>
        <BlogList />
      </Suspense>
    </div>
  );
};

export default Page;
