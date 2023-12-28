


"use client"

import { TCategory, TPost } from '@/app/types/type'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { CldUploadButton, CldUploadWidgetResults } from 'next-cloudinary';
import Image from 'next/image'



export default function EditForm({ post }: { post: TPost }) {

    const [links, setLinks] = useState<string[]>([])
    const [linkInput, setLinkInput] = useState("")
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState<TCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [publicId, setPublicId] = useState("");
console.log(selectedCategory,"selectedCategory");
    const router = useRouter();

console.log(  fetch(`${process.env.NEXTAUTH_URL}/api/categories`));

  
  
    useEffect(() => {
      const fetchAllCategories = async () => {
        const res = await fetch("/api/categories");
        const categoryNames = await res.json();
        setCategories(categoryNames);
        console.log(categoryNames,"categoryNames");
      };
  console.log(categories,"categories");
      fetchAllCategories();


      const initValues = () => {
        setTitle(post.title);
        setContent(post.content);
        setImageUrl(post.imageUrl || "");
        setPublicId(post.publicId || "");
        setSelectedCategory(post.categoryName || "");
        setLinks(post.links || []);
      };

      initValues();
    }, [
      post.title,
      post.content,
      post.imageUrl,
      post.publicId,
      post.categoryName,
      post.links,]);

  
    const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (linkInput.trim() !== "") {
            setLinks((prev) => [...prev, linkInput])
            setLinkInput("")
        }
    }

const deleteLink =(index:number)=>{
    setLinks((prev)=>prev.filter((_,i)=> i !== index))
}





const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      const errorMessage = "Title and content are required";
      toast.error(errorMessage);
      return;
    }

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          links,
          selectedCategory,
          imageUrl,
          publicId,
        }),
      });

      if (res.ok) {
        toast.success("Post edited successfully");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Something went wrong.Please check");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageUpload = (result: CldUploadWidgetResults) => {
    console.log("result: ", result);
     const info = result.info as object;

    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
      console.log("url: ", url);
      console.log("public_id: ", public_id);
    }
  };
  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/removeImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });

      if (res.ok) {
        toast.success("Thumbnail Remove successed")
        setImageUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

    
    return (
        <div>
            <h2>Edit The Post</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">

       <input 
      onChange={(e) => setTitle(e.target.value)}
  type = "text" placeholder = "title"
    
  value={title}
    />
         <textarea
    onChange={(e) => setContent(e.target.value)}
    className="" placeholder = "content" 
    value={content}
      > </textarea>

                {
                    links && links.map((link, i) =>
                        <div
                            className ="flex items-center gap-4"
                            key={i}>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                </svg>

                            </span>
                            <Link className="link" href={link}>{link}</Link>
                            <span
                            
                            onClick = {()=>deleteLink(i)}
                                className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </span>
                           
                        </div>
                    )
                }
                <div className="flex gap-2">
                    <input
                        onChange={e => setLinkInput(e.target.value)}
                        value={linkInput}
                        className="flex-1" type="text" placeholder=" Paste the link and click on Add" />
                    <button
                        onClick={addLink}
                        className="btn">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                <CldUploadButton
                onUpload={handleImageUpload}
              uploadPreset = {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              className = {`h-72 border-2 mt-4 border-dotted grid place-items-center bg-slate-100 rounded-md relative ${
                imageUrl && "pointer-events-none"
              }`} >
                           <div>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              
                  </div>
                  
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      fill
                      className="absolute object-cover inset-0"
                      alt={title}
                    />
                  )}
                                </CldUploadButton>
                                {publicId && (
                                  <button
                                    onClick={removeImage}
                                    className="py-2 px-4 rounded-md font-bold w-fit  bg-slate-200 mb-4"
                                  >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-8">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                                
                                  </button>
                                )}
                <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-3 rounded-md border appearance-none"
                value={selectedCategory}
              >
                <option value="">Select A Category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
              </select>

                <button className="primary-btn">Update</button>

             
                  </form>
                  
        </div>
    )
}
