import { useEffect, useState } from 'react';
import { Post } from './Post';

interface PostType {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export function PostList() {
  const [postList, setPostList] = useState<PostType[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: PostType[]) => {
        setPostList(data);
      })
      .catch((error) => console.error('error fetch posts: ', error));
  }, []);

  return (
    <>
      {postList.map((post, index) => (
        <Post
          key={index}
          author={post.author}
          date={post.date}
          title={post.title}
          description={post.content}
        />
      ))}
    </>
  );
}
