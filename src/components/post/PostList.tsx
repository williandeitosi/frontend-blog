import { Post } from './Post';
import style from './Post.module.css';

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
    <div className={style.postListContainer}>
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
