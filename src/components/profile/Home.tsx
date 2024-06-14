import { Cover } from '../cover/Cover';
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
      <Cover />
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
        <div className={style.boxInfo}>
          <h2>Um simpes blog</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            mollitia, veritatis facilis reiciendis tenetur blanditiis laboriosam
            eaque quas vero rerum autem cumque cum alias, cupiditate unde at!
            Illo, explicabo debitis.
          </p>
        </div>
        <div className={style.newPost}>
          <h3>Posts recentes</h3>
        </div>
      </div>
      <PostList posts={posts} />
    </>
  );
}
