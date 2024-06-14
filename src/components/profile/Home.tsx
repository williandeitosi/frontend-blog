import { PostList } from '../post/PostList';
import style from './Home.module.css';

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface HomeProps {
  posts: PostType[];
}

export function Home({ posts }: HomeProps) {
  return (
    <>
      <div className={style.container}>
        <div className={style.boxAvatar}>
          <div className={style.border}>
            <img
              className={style.avatar}
              src='https://avatars.githubusercontent.com/u/104787632?v=4'
              alt='avatar'
            />
          </div>
          <div>
            <h1>Willian Giovanini Dei Tosi</h1>
            <span>Full Stack Developer</span>
          </div>
        </div>
        <div className={style.newPost}>
          <h3>Posts recentes</h3>
        </div>
      </div>
      <PostList posts={posts} />
    </>
  );
}
