import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import { Home } from './components/profile/Home';
import { ReadMore } from './components/readPoster/ReadMore';
import { CreateContent } from './components/pageContent/CreateContent';
import { useEffect, useState } from 'react';
import { Header } from './components/header/Header';

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
          </Routes>
        </div>
        {window.location.pathname !== '/hidden' && <Footer />}
      </div>
    </Router>
  );
}
