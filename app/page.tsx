import CategoryList from '@/components/Category/CategoryList'
import Post from '@/components/Post/Post'

import Image from 'next/image'
import { TPost } from './types/type'

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });

    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};



export default async function Home() {
  const postsData = await getPosts();
  return (
    <>
      <CategoryList />
      
      {
        postsData && postsData.length > 0
      
          ?
          (
            postsData.map((post) => (<Post
              key={post.id}
              id={post.id}
              author={post.author.name}
              authorEmail={post.authorEmail}
              date={post.createdAt}
              thumbnail ={post.imageUrl}
              category={post.categoryName}
              title={post.title}
              content={post.content}
              links ={post.links || []}
            
            />))
           )
        : (
          <div className="py-6">No Posts</div>
        )
    
    }
    </>
  )
}
