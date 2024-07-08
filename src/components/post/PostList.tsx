import { Post } from './Post';

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

interface PostListProps {
  posts: PostType[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className='grid gap-3 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 '>
      {posts.map((post, index) => (
        <Post
          id={post.id}
          key={index}
          author={post.author}
          date={post.created_at}
          title={post.title}
          description={post.content}
        />
      ))}
    </div>
  );
}
