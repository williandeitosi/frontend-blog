import { Link } from 'react-router-dom';
import style from './Post.module.css';

interface PostProps {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export function Post({ id, title, description }: PostProps) {
  return (
    <div
      className={`flex flex-col justify-center p-4 border-2 rounded-lg h-56 min-w-full ${style.myBoxShadow}`}
    >
      <h1 className='text-center font-bold text-xl'>{title}</h1>
      <div
        className={style.containerPost}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <Link
        className='text-center text-green-500 hover:text-green-600 hover:font-bold'
        to={`/posts/${id}`}
      >
        Ler Mais +
      </Link>
    </div>
  );
}
