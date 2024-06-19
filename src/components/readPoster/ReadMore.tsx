import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import style from './ReadMore.module.css';

interface PostData {
  title: string;
  author: string;
  content: string;
  created_at: string;
}

export function ReadMore() {
  const { id } = useParams<{ id: string }>();
  const [readPost, setReadPost] = useState<PostData | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReadPost(data);
      })
      .catch((err) => {
        console.log('Read post error: ', err);
      });
  }, [id]);

  if (!readPost) return <p>Post not found</p>;

  const sanitizedContent = readPost.content
    ? DOMPurify.sanitize(readPost.content)
    : '';

  return (
    <div className={`${style.container} ql-snow`}>
      <h1>{readPost.title}</h1>
      <p className={style.author}>
        Autor: <span>{readPost.author}</span>
      </p>
      <p className={style.author}>
        Publicado: <span>{readPost.created_at}</span>
      </p>
      <div
        className='ql-editor'
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
