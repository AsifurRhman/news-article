

"use client"

import { TCategory } from '@/app/types/type'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { CldUploadButton } from 'next-cloudinary';
export default function CreatePost() {

    const [links, setLinks] = useState<string[]>([])
    const [linkInput, setLinkInput] = useState("")
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoriesData, setCategoriesData] = useState<TCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [publicId, setPublicId] = useState("");

    const router = useRouter();

    useEffect(() => {
      const fetchAllCategories = async () => {
        const res = await fetch("api/categories");
        const categoryNames = await res.json();
         setCategoriesData(categoryNames);
      };
  
      fetchAllCategories();
    }, []);
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
      const res = await fetch("api/posts/", {
        method: "POST",
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
        toast.success("Post created successfully");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };


    
    return (
        <div>
            <h2>Create A Post</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">

       <input 
      onChange={(e) => setTitle(e.target.value)}
      type="text" placeholder = "title" />
         <textarea
    onChange={(e) => setContent(e.target.value)}
    className="" placeholder = "content" > </textarea>

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

                <CldUploadButton uploadPreset="wtlxz4ba" className="h-56 border-2 mt-4 border-dotted grid place-items-center bg-slate-400 rounded-md">
             <div>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

                </div>
                  </CldUploadButton>

                              
        <select     onChange={(e) => setSelectedCategory(e.target.value)}
          className = "p-3 rounded-md border appearance-none" >
                    <option value="">Select A Category</option>
                    {
                        categoriesData && categoriesData.map(category =>

                            <option key={category.id} value={category.categoryName}>{category.categoryName}</option>
                        )
                    }
                </select>

                <button className="primary-btn">Create</button>

             
            </form>
        </div>
    )
}
