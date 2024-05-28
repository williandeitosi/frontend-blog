import { Post } from './Post';

export function PostList() {
  const posts = [
    {
      title: 'agua',
      description: ';kalhjfasdkljhdfalkj',
    },
    {
      title: 'pedra',
      description: ';kalhjfasdkljhdfalkj',
    },
  ];

  return (
    <>
      {posts.map((post) => (
        <Post title={post.title} description={post.description} />
      ))}
    </>
  );
}
