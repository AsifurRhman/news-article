

"use client"

import { categoriesData } from '@/data'
import Link from 'next/link'
import React, { useState } from 'react'

export default function CreatePost() {

    const [links, setLinks] = useState<string[]>([])
    const [linkInput, setLinkInput] = useState("")



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
    return (
        <div>
            <h2>Create A Post</h2>

            <form className="flex flex-col gap-2">

                <input type="text" placeholder="title" />
                <textarea className="" placeholder="content"> </textarea>

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

                <select className="p-3 rounded-md border appearance-none">
                    <option value="">Select A Category</option>
                    {
                        categoriesData && categoriesData.map(category =>

                            <option key={category.id} value={category.name}>{category.name}</option>
                        )
                    }
                </select>

                <button className="primary-btn">Create</button>

                <div className="p-2 text-red-500 font-bold">Error Message</div>
            </form>
        </div>
    )
}
