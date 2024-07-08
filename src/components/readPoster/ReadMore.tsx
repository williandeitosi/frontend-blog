import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div className={`break-all sm:mx-10 lg:mx-24 ql-snow`}>
      <h1 className='text-center font-bold text-3xl mb-10'>{readPost.title}</h1>
      <p className='font-bold mb-4 opacity-40'>
        Autor: <span>{readPost.author}</span>
      </p>
      <p className='font-bold mb-4 opacity-40'>
        Publicado: <span>{readPost.created_at}</span>
      </p>
      <div
        className='ql-editor'
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </div>
  );
}
