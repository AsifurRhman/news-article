
"use client"

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
    const { status, data: session } = useSession();
    console.log(session, "data")
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setIsPopupVisible(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        if (!isPopupVisible) {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isPopupVisible]);

    return (
        <div className="flex justify-between pb-4 border-b mb-4 relative">

            <div>
                <Link href={"/"}>
                    <h1 className="text-dark text-4xl font-bold tracking-tighter">Next News</h1>
                </Link>

                <p className="text-sm">

                    Unveiling Tomorrow&apos;s Breakthroughs,<br /> Byte by Byte.
                </p>

            </div>
            {
                status === "authenticated" ? (
                    <>
                        <div
                            ref={popupRef}
                            className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex-col gap-2 text-right min-w-[160px] ${isPopupVisible ? "flex" : "hidden"
                                }`}
                        >
                            <div className="font-bold flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg> {' '} : {' '}
                                {session?.user?.name}</div>
                            <div className=" flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                </svg> {' '} : 
                                {' '}
                                {session?.user?.email}
                            </div>
                            <Link
                                onClick={() => setIsPopupVisible(false)}
                                className="hover:underline"
                                href={"/dashboard"}
                            >
                                Dashboard
                            </Link>
                            <Link
                                onClick={() => setIsPopupVisible(false)}
                                className="hover:underline"
                                href={"/create-post"}
                            >
                                Create Post
                            </Link>
                            <button onClick={() => signOut()} className="btn text-red-700">
                                Sign Out
                            </button>
                        </div>

                        <div className="flex gap-2 items-center">
                            <Link
                                className="hidden md:flex gap-2 items-center mr-6"
                                href={"/create-post"}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                                <span>Create new</span>
                            </Link>
                            <div>

                                <Image
                                    src={session?.user?.image || "/blank.png"}
                                    width={36}
                                    height={36}
                                    alt="Profile Image"
                                    className="rounded-full cursor-pointer"
                                    onClick={() => setIsPopupVisible((prev) => !prev)}
                                />
                            </div>

                        </div>
                    </>

                )
                    :
                    <div className='flex items-center'>
                        <Link className="btn text-blue-700" href={"/sign-in"}>
                            SignIn
                        </Link>
                    </div>
            }


        </div>
    )
}
