import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Footer } from './components/footer/Footer';
import { Profile } from './components/profile/Profile';
import { ReadMore } from './components/readPoster/ReadMore';

export function App() {
  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Profile />} />
          <Route path='/posts/:id' element={<ReadMore />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
