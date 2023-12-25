import CategoryList from '@/components/Category/CategoryList'
import Post from '@/components/Post/Post'
import { postsData } from '@/data'
import Image from 'next/image'

export default function Home() {
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
              author={post.author}
              authorEmail={"test@gmail.com"}
              date={post.datepublished}
              thumbnail ={post.thumbnail}
              category={post.category}
              title={post.title}
              content={post.content}
              links ={post.links || []}
            
            />))
           )
        : (
          <div>No Posts</div>
        )
    
    }
    </>
  )
}
