import { Post } from './Post';
import style from './Post.module.css';

interface PostType {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface PostListProps {
  posts: PostType[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className={style.postListContainer}>
      {posts.map((post, index) => (
        <Post
          key={index}
          author={post.author}
          date={post.date}
          title={post.title}
          description={post.content}
        />
      ))}
    </div>
  );
}
