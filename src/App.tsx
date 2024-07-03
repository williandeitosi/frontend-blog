import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/admin/login/Login';
import { Panel } from './components/admin/panel/Panel';
import PrivateRoute from './components/admin/privateRoute/PrivateRoutes';
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
  created_at: string;
}

export function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postToEdit, setPostToEdit] = useState<PostType | null>(null);

  const addPost = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

  const editPost = (updatePost: PostType) => {
    setPosts(
      posts.map((post) => (post.id === updatePost.id ? updatePost : post))
    );
  };

  const handleEditClick = (post: PostType) => {
    setPostToEdit(post);
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
              element={
                <PrivateRoute
                  element={
                    <Panel
                      posts={posts}
                      onDeletePost={deletePost}
                      onEditPost={handleEditClick}
                    />
                  }
                />
              }
            />
            <Route
              path='/admin/newpost'
              element={
                <PrivateRoute element={<CreateContent addPost={addPost} />} />
              }
            />
            <Route
              path='/admin/edit/:id'
              element={
                <PrivateRoute
                  element={
                    <CreateContent
                      addPost={addPost}
                      editPost={editPost}
                      postToEdit={postToEdit}
                    />
                  }
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
