import { useLocation } from 'react-router-dom';
import './Footer.module.css';

export function Footer() {
  const location = useLocation();
  return (
    location.pathname !== '/hidden' && <footer>&copy; 2024 Willian</footer>
  );
}
