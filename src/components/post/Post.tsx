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
    <div className={style.containerPost}>
      <h1>{title}</h1>
      <p>{id}</p>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <a href='#'>Ler Mais +</a>
    </div>
  );
}
