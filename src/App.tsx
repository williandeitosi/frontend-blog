import { Cover } from './components/cover/Cover';
import { Footer } from './components/footer/Footer';
import { PostList } from './components/post/PostList';
import { Profile } from './components/profile/Profile';

export function App() {
  return (
    <div>
      <Cover />
      <Profile />
      <div className='posts'>
        <PostList />
      </div>
      <Footer />
    </div>
  );
}
