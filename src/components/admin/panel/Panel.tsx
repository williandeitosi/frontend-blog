import { Eye, PencilLine, Trash } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import style from './Panel.module.css';

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

interface PostListProps {
  posts: PostType[];
  onDeletePost: (postId: string) => void;
  onEditPost: (post: PostType) => void;
}

export function Panel({ posts, onDeletePost, onEditPost }: PostListProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };
  const handleEditClick = (post: PostType) => {
    onEditPost(post);
    navigate(`/admin/edit/${post.id}`);
  };

  const handleDeleteClick = (postId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este post?')) {
      onDeletePost(postId);
    }
  };

  return (
    <div className={style.container}>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{formatDate(post.created_at)}</td>
              <td className={style.btn}>
                <button className={style.view}>
                  <Link to={`/posts/${post.id}`}>
                    <Eye size={22} color='#707070' />
                  </Link>
                </button>
                <button
                  className={style.editar}
                  onClick={() => handleEditClick(post)}
                >
                  <PencilLine size={22} color='#9c00f0' />
                </button>
                <button
                  className={style.deletar}
                  onClick={() => handleDeleteClick(post.id)}
                >
                  <Trash size={22} color='#f00000' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={'/admin/newpost'} className={style.addPost}>
        Add Post +
      </Link>
    </div>
  );
}
