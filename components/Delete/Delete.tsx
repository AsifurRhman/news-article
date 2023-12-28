

"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import React from 'react'
import Swal from "sweetalert2";

export default function Delete({ id }: { id: string }) {

  const router = useRouter();
  const deleteImage = async (publicId: string) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
  };
  // const handleDelete = async () => {
  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this post?"
  //   );

  //   if (confirmed) {
  //     try {
  //       const res = await fetch(`/api/posts/${id}`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       });

  //       if (res.ok) {
  //         console.log("Post deleted");
  //         const post = await res.json();
  //          const { publicId } = post;
  //          await deleteImage(publicId);

  //         toast.success("Post deleted successfully");
  //         router.refresh();
  //       }
  //     } catch (error) {
  //       toast.error("Something went wrong");
  //       console.log(error);
  //     }
  //   }
  // };
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
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
         
          const { publicId } = post;
          
          if (publicId) {
            await deleteImage(publicId);
          }
         
  
          toast.success( "Your post has been deleted.");
          router.refresh();
        }
      } catch (error) {
        toast.error("Error !!! Something went wrong.Try Again ");
        console.log(error);
      }
    }
  };
  return (
    <button onClick={handleDelete} className="text-red-500">Delete</button>
  )
}
