export {};
import { notFound } from "next/navigation";
import { createClient } from "../../../utils/supabase-server";

import BlogItem from "./blog-item";

const BlogList = async () => {
  const supabase = createClient();

  const { data: blogsData } = await supabase
    .from("blogs")
    .select()
    .order("created_at", { ascending: false });

  if (!blogsData) return notFound();

  return (
    <div className="grid grid-cols-3 gap-5">
      {await Promise.all(
        blogsData.map(async (blogData) => {
          const { data: userData } = await supabase
            .from("profiles")
            .select()
            .eq("id", blogData.user_id)
            .single();

          const blog = {
            id: blogData.id,
            created_at: blogData.created_at,
            title: blogData.title,
            content: blogData.content,
            user_id: blogData.user_id,
            image_url: blogData.image_url,
            name: userData!.name,
            avatar_url: userData!.avatar_url,
          };

          return <BlogItem key={blog.id} {...blog} />;
        })
      )}
    </div>
  );
};

export default BlogList;
