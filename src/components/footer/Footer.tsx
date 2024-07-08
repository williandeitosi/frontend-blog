import { useLocation } from 'react-router-dom';
// import './Footer.module.css';

export function Footer() {
  const location = useLocation();
  return (
    location.pathname !== '/hidden' && (
      <footer className='mt-6 h-20 text-black text-xs font-bold flex w-full justify-center items-center bg-gray-200 flex-shrink-0'>
        &copy; 2024 Willian
      </footer>
    )
  );
}
