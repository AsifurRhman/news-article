import React from 'react'

import Post from '@/components/Post/Post'
import Link from 'next/link'


import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from '../types/type';



const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/author/${email}`);
    const { posts } = await res.json();
    return posts;
  } catch (error) {
    return null;
  }
};

export default async function Dashboard() {
  
  
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const email = session?.user?.email;
  const name = session?.user?.name
  let postsData = [];
  if (email) {
    postsData = await getPosts(email);
  }

  let textPost;
  if (postsData.length >1) {
  textPost = <h1>Dear,<br/> {name}. You Have {postsData.length} posts</h1>
  }
  else if (postsData.length === 1) {
    textPost = <h1>Dear,<br/> {name}. You Have 1 post</h1>
  }
  else {
    textPost = <h1>Dear,<br/>  {name}. You Have No post</h1>
}
  return (
    <div>
    
        {textPost} 
        {
        postsData && postsData.length > 0
      
          ?
          (
            postsData.map((post : TPost) => (<Post
              key={post.id}
              id={post.id}
              author={""}
              authorEmail={post.authorEmail}
              date={post.createdAt}
              thumbnail={post.imageUrl}
              category={post.categoryName}
              title={post.title}
              content={post.content}
              links={post.links || []}
            
            />))
           )
        : (
          <div className = "py-6">
 <Link className='underline' href={`/create-post`}>Create A Post</Link>
                          
          </div>
         
        )
    
    }
          </div>
  )
}
