import { Eye, PencilLine, Trash } from '@phosphor-icons/react';
import style from './Panel.module.css';
import { Link } from 'react-router-dom';

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface PostListProps {
  posts: PostType[];
}

export function Panel({ posts }: PostListProps) {
  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td className={style.btn}>
                <button className={style.editar}>
                  <PencilLine size={22} color='#9c00f0' />
                </button>
                <button className={style.deletar}>
                  <Trash size={22} color='#f00000' />
                </button>
                <button className={style.view}>
                  <Eye size={22} color='#707070' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/admin/newpost'} className={style.assPost}>
        Add Post +
      </Link>
    </div>
  );
}
