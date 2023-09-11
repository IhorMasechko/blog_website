"use client";

import { FormEvent, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "../supabase-provider";
import { v4 as uuidv4 } from "uuid";

import useStore from "../../../store";
import Loading from "../../loading";

const BlogNew = () => {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { user } = useStore();
  const titleRef = useRef<HTMLInputElement>(null!);
  const contentRef = useRef<HTMLTextAreaElement>(null!);
  const [image, setImage] = useState<File>(null!);
  const [loading, setLoading] = useState(false);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files?.length == 0) {
        return;
      }
      setImage(files[0]);
    },
    []
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (user.id) {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("blogs")
        .upload(`${user.id}/${uuidv4()}`, image);

      if (storageError) {
        alert(storageError.message);
        setLoading(false);
        return;
      }

      const { data: urlData } = await supabase.storage
        .from("blogs")
        .getPublicUrl(storageData.path);

      const { error: insertError } = await supabase.from("blogs").insert({
        title: titleRef.current.value,
        content: contentRef.current.value,
        image_url: urlData.publicUrl,
        user_id: user.id,
      });

      if (insertError) {
        alert(insertError.message);
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <div className="text-sm mb-1">Title</div>
          <input
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            ref={titleRef}
            type="text"
            id="title"
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-5">
          <div className="text-sm mb-1">Image</div>
          <input type="file" id="thumbnail" onChange={onUploadImage} required />
        </div>

        <div className="mb-5">
          <div className="text-sm mb-1">Content</div>
          <textarea
            className="w-full bg-gray-100 rounded border py-1 px-3 outline-none focus:bg-transparent focus:ring-2 focus:ring-yellow-500"
            ref={contentRef}
            id="content"
            placeholder="Content"
            rows={15}
            required
          />
        </div>

        <div className="text-center mb-5">
          {loading ? (
            <Loading />
          ) : (
            <button
              type="submit"
              className="w-full text-white bg-yellow-500 hover:brightness-110 rounded py-1 px-8"
            >
              Create
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BlogNew;
