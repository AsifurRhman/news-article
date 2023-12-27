import { TPost } from "@/app/types/type";
import Post from "@/components/Post/Post";

const getPosts = async (categoryName: string): Promise<TPost[] | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${categoryName}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const categories = await res.json();
      const posts = categories.posts;
      return posts;
    }
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default async function CategoryPosts({
  params,
}: {
  params: { categoryName: string };
}) {
  const category = params.categoryName;
  const posts = await getPosts(category);

  return (
    <>
      <h1>
        <span className="font-normal">Category: </span>{" "}
        {decodeURIComponent(category)}
      </h1>

      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author.name}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            thumbnail={post.imageUrl}
            category={post.categoryName}
            title={post.title}
            content={post.content}
            links={post.links || []}
          />
        ))
      ) : (
        <div className="py-6">No posts to display</div>
      )}
    </>
  );
}
