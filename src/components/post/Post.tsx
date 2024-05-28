import style from './Post.module.css';

interface PostProps {
  title: string;
  description: string;
}

export function Post({ title, description }: PostProps) {
  return (
    <div className={style.containerPost}>
      <h1>{title}</h1>
      <p>{description}</p>

      <a href='#'>Ler Mais +</a>
    </div>
  );
}
