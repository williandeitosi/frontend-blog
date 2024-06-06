import { Footer } from './components/footer/Footer';
import { Profile } from './components/profile/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <>
      <Profile />
      <Footer />
    </>
  );
}
