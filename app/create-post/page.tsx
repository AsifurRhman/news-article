import CreatePost from '@/components/CreatePost/CreatePost'
import React from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function page() {


  const session = await getServerSession(authOptions);
console.log(session,"session")
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <CreatePost/>
  )
}
