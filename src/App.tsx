import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from './components/admin/login/Login';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Home } from './components/home/Home';
import { CreateContent } from './components/pageContent/CreateContent';
import { ReadMore } from './components/readPoster/ReadMore';
import { Panel } from './components/admin/panel/Panel';
import './App.css';

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

export function App() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const addPost = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

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
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete post');
      }
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error('Failed to delete post:');
    }
  };

  return (
    <Router>
      <div className='app-container'>
        <Header />
        <main className='app-content'>
          <Routes>
            <Route path='/' element={<Home posts={posts} />} />
            <Route path='/posts/:id' element={<ReadMore />} />
            <Route path='/admin' element={<Login />} />
            <Route
              path='/admin/panel'
              element={<Panel posts={posts} onDeletePost={deletePost} />}
            />
            <Route
              path='/admin/newpost'
              element={<CreateContent addPost={addPost} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
