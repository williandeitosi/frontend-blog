import style from './Post.module.css';
import { Link } from 'react-router-dom';

interface PostProps {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export function Post({ id, title, description }: PostProps) {
  return (
    <div className={style.containerPost}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <Link to={`/posts/${id}`}>Ler Mais +</Link>
    </div>
  );
}
