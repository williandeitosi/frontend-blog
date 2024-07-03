import style from './CreateContent.module.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';

import 'highlight.js/lib/languages/javascript';
import 'highlight.js/lib/languages/python';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    highlight: (text: string) => hljs.highlightAuto(text).value,
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
  created_at: string;
}

interface CreateContentProps {
  addPost: (post: PostType) => void;
  editPost?: (post: PostType) => void;
  postToEdit?: PostType | null;
}

export function CreateContent({
  addPost,
  editPost,
  postToEdit,
}: CreateContentProps) {
  const [title, setTitle] = useState<string>(
    postToEdit ? postToEdit.title : ''
  );
  const [content, setContent] = useState<string>(
    postToEdit ? postToEdit.content : ''
  );
  const [author, setAuthor] = useState<string>(
    postToEdit ? postToEdit.author : 'Willian'
  );
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const postData = {
      id: postToEdit ? postToEdit.id : '',
      title,
      content,
      author,
    };

    if (postToEdit) {
      postData.id = postToEdit.id;
    }
    try {
      const getToken = (): string | null => {
        return localStorage.getItem('token');
      };
      const response = await fetch(
        `http://localhost:3000/posts${postToEdit ? `/${postToEdit.id}` : ''}`,
        {
          method: postToEdit ? 'PUT' : 'POST',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(
          postToEdit ? 'Failed to update post' : 'Failed to create post'
        );
      }

      const result = await response.json();
      if (postToEdit && editPost) {
        editPost(result);
      } else {
        addPost(result);
      }
      navigate(`/posts/${result.id}`);
    } catch (error) {
      console.error(
        postToEdit ? 'Error updating post: ' : 'Error creating post: ',
        error
      );
    }
  };

  return (
    <div className={style.twoColumns}>
      <form onSubmit={handleSubmit}>
        <div className={style.modal}>
          <div>
            <h2>{postToEdit ? 'Editar Post' : 'Criar um novo post'}</h2>
            <p>
              Preencha o formulário para {postToEdit ? 'edit' : 'create'} uma
              postagem no blog.
            </p>
          </div>
          <div className={style.containerInputs}>
            <div className={style.inputsArea}>
              <div className={style.boxInputs}>
                <label htmlFor='title'>Título</label>
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
                <label htmlFor='content'>Conteúdo</label>
                <ReactQuill
                  className='my-editing-area'
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
              {postToEdit ? 'Editar' : 'Publicar'}
            </button>
          </div>
        </div>
      </form>
      <div className={style.blogView}>
        <div className={style.content}>
          <h2>Título:</h2>
          <p>{title}</p>
        </div>
        <div className={style.content}>
          <h2>Autor:</h2>
          <p>{author}</p>
        </div>
        <div className='ql-snow'>
          <h3>Conteúdo:</h3>
          <div
            className='ql-editor'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
