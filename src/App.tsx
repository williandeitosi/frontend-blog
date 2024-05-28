import { Cover } from './components/cover/Cover';
import { Footer } from './components/footer/Footer';
import { Post } from './components/post/Post';
import { Profile } from './components/profile/Profile';

export function App() {
  return (
    <div>
      <Cover />
      <Profile />
      <div className='posts'>
        <Post />
        <Post />
        <Post />
      </div>
      <Footer />
    </div>
  );
}
