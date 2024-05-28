import { Post } from './Post';

export function PostList() {
  const posts = [
    {
      title: 'agua',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore qui sed doloribus a est quaerat voluptate tempore similique, officiis, cupiditate perspiciatis. Mollitia nisi perspiciatis dolor optio repellat ratione a ab!',
    },
    {
      title: 'pedra',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore qui sed doloribus a est quaerat voluptate tempore similique, officiis, cupiditate perspiciatis. Mollitia nisi perspiciatis dolor optio repellat ratione a ab!',
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
