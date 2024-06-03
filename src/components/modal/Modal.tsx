import { FormEvent, useState } from 'react';
import style from './Modal.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface PostType {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  addPost: (post: PostType) => void;
}

export function Modal({ isOpen, onClose, addPost }: ModalProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const postData = {
      title,
      content,
      author,
    };
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const result = await response.json();
      addPost(result);
      onClose();
    } catch (error) {
      console.error('Error creating post: ', error);
    }
  };

  if (!isOpen) return null;
  return (
    <>
      <div className={style.modalOverlay}>
        <form onSubmit={handleSubmit}>
          <div className={style.modal}>
            <div>
              <h2>Criar um novo post</h2>
              <p>Preencha o formulário para criar uma nova postagem no blog.</p>
            </div>
            <div className={style.containerInputs}>
              <div className={style.inputsArea}>
                <div className={style.boxInputs}>
                  <label htmlFor='title'>Titulo</label>
                  <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className={style.boxInputs}>
                  <label htmlFor='author'>Autor</label>
                  <input
                    type='text'
                    id='author'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className={style.textContainer}>
                  <label htmlFor='content'>Counteudo</label>
                  <ReactQuill
                    className={style.textEdior}
                    theme='snow'
                    value={content}
                    onChange={setContent}
                  />
                </div>
              </div>
            </div>
            <div className={style.boxBtns}>
              <button onClick={onClose} className={style.btncancel}>
                Cancelar
              </button>
              <button type='submit' className={style.btnPublic}>
                Publicar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
