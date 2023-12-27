import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { TPost } from '@/app/types/type';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import EditForm from "@/components/EditForm/EditForm";


const getPost = async (id: string): Promise<TPost | null> => {
    try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
        cache: "no-store",
      });
  
      if (res.ok) {
        const post = await res.json();
        return post;
      }
    } catch (error) {
      console.log(error);
    }
  
    return null;
  };
  export default async function EditPost({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      redirect("/sign-in");
    }
  
    const id = params.id;
    const post = await getPost(id);
  
      return (
          
          <>
          {
          post?
            <EditForm post={post} />
          :
       <div>
      Invalid Post
        
        </div>
          }
          
          </>
      )
          ;
  }
