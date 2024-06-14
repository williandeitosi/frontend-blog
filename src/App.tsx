import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Login } from './components/admin/login/Login';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Home } from './components/home/Home';
import { CreateContent } from './components/pageContent/CreateContent';
import { ReadMore } from './components/readPoster/ReadMore';

interface PostType {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
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
      .catch((error) => console.error('error fetch posts: ', error));
  }, []);

  return (
    <Router>
      <div className='container'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home posts={posts} />} />
            <Route path='/posts/:id' element={<ReadMore />} />
            <Route
              path='/hidden'
              element={<CreateContent addPost={addPost} />}
            />
            <Route path='/admin' element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
