import { PostList } from '../post/PostList';
import style from './Home.module.css';

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

interface HomeProps {
  posts: PostType[];
}

export function Home({ posts }: HomeProps) {
  return (
    <>
      <div className='flex flex-col items-center'>
        <div className=' flex items-center justify-start w-full gap-2 my-6 px-4 lg:px-16 xl:px-20'>
          <div className={style.border}>
            <img
              className={style.avatar}
              src='https://avatars.githubusercontent.com/u/104787632?v=4'
              alt='avatar'
            />
          </div>
          <div>
            <h1 className='text-sm md:text-xl'>Willian Giovanini Dei Tosi</h1>
            <span className='opacity-40 text-xs md:text-base'>
              Full Stack Developer
            </span>
          </div>
        </div>
        <h3 className='text-xl font-bold mb-6'>Posts recentes</h3>
      </div>
      <PostList posts={posts} />
    </>
  );
}
