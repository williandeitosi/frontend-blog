import style from './CreateContent.module.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';

import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/python';
import { useState, FormEvent } from 'react';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ script: 'sub' }, { script: 'super' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    [{ 'code-block': true }],
    ['clean'],
  ],
  syntax: {
    highlight: (text: string) =>
      hljs.highlightAuto(text, ['javascript', 'python']).value,
  },
};

const formats = [
  'header',
  'font',
  'list',
  'bullet',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'script',
  'color',
  'background',
  'align',
  'link',
  'image',
  'video',
  'code-block',
];

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface ModalProps {
  onClose: () => void;
  addPost: (post: PostType) => void;
}

export function CreateContent({ onClose, addPost }: ModalProps) {
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

  return (
    <div className={style.twoColunms}>
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
                  modules={modules}
                  formats={formats}
                  onChange={setContent}
                />
              </div>
            </div>
          </div>
          <div className={style.boxBtns}>
            <button type='submit' className={style.btnPublic}>
              Publicar
            </button>
          </div>
        </div>
      </form>
      <div className={style.blogView}>
        <div className={style.content}>
          <h2>Title:</h2>
          <p>{title}</p>
        </div>
        <div className={style.content}>
          <h2>Author:</h2>
          <p>{author}</p>
        </div>
        <div>
          <h3>Content:</h3>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {/* TODO put content in textarea for show scroll bar */}
        </div>
      </div>
    </div>
  );
}
