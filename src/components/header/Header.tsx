import style from './Header.module.css';

export function Header() {
  return (
    <nav className={style.container}>
      <h1 className={style.logo}>Jornada Dev</h1>
      <ul>
        <li>
          <a href=''>Home</a>
        </li>
        <li>
          <a href='#'>Sobre</a>
        </li>
        <li>
          <a href=''>Contanto</a>
        </li>
      </ul>
    </nav>
  );
}
