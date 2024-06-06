import { Plus } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Cover } from '../cover/Cover';
import { Modal } from '../modal/Modal';
import { PostList } from '../post/PostList';
import style from './Profile.module.css';

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export function Profile() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: PostType[]) => {
        setPosts(data);
      })
      .catch((error) => console.error('error fetch posts: ', error));
  }, []);

  const handleNewPost = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addPost = (post: PostType) => {
    setPosts([post, ...posts]);
  };

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
          <button onClick={handleNewPost}>
            <Plus size={18} weight='fill' /> Novo post
          </button>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          addPost={addPost}
        />
      </div>
      <PostList posts={posts} />
    </>
  );
}
