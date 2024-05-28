import style from './Cover.module.css';
import tech from '../../assets/tech.jpg';

export function Cover() {
  return (
    <div className={style.container}>
      <img className={style.imgCover} src={tech} alt='' />
      <h1 className={style.textCentered}>👾 Fala Devs</h1>
    </div>
  );
}
