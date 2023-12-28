import SignIn from '@/components/SignIn/SignIn'
import React from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import toast from 'react-hot-toast';
export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {

   
    redirect("/dashboard");
    
  }
  return (
    <SignIn/>
  )
}
