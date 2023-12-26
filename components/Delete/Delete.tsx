

"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import React from 'react'

export default function Delete({ id }: { id: string }) {

  const router = useRouter();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (res.ok) {
          console.log("Post deleted");
          const post = await res.json();
          // const { publicId } = post;
          // await deleteImage(publicId);

          toast.success("Post deleted successfully");
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-500">Delete</button>
  )
}
