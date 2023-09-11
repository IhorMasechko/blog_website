import { notFound } from "next/navigation";
import { createClient } from "../../../../utils/supabase-server";

import BlogEdit from "../../../components/blog/blog-edit";

type PageProps = {
  params: {
    blogId: string;
  };
};

const BlogEditPage = async ({ params }: PageProps) => {
  const supabase = createClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select()
    .eq("id", params.blogId)
    .single();

  if (!blog) return notFound();

  return <BlogEdit blog={blog} />;
};

export default BlogEditPage;
