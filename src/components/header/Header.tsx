import { List } from '@phosphor-icons/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`flex justify-between items-center px-4 lg:px-16 xl:px-20 bg-[#eee] h-24 ${style.myBoxShadow}`}
    >
      <h1 className='text-xl font-bold'>Jornada Dev</h1>
      <div className='hidden lg:flex gap-10 text-base'>
        <Link to={'/'} className='hover:font-bold'>
          Home
        </Link>
        <a className='hover:font-bold'>Sobre</a>
      </div>
      <button
        className='flex justify-center items-center lg:hidden bg-black rounded-full size-10 hover:bg-[#3d3d3d] transition-colors'
        onClick={handleClick}
      >
        <List size={32} color='#f9f5f5' />
      </button>

      <div
        className={`absolute z-50 top-[90px] right-0 w-full text-center bg-[#eee] shadow-md rounded-b-lg overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? 'max-h-40' : 'max-h-0 hidden'
        }`}
      >
        <ul className='p-2 flex flex-col gap-3'>
          <li>
            <Link to={'/'} className='hover:font-bold'>
              Home
            </Link>
          </li>
          <li>
            <a className='cursor-pointer hover:font-bold'>Sobre</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
