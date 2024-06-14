import style from './Login.module.css';

export function Login() {
  return (
    <div className={style.boxLogin}>
      <h1>Login Admin</h1>
      <div className={style.boxInputs}>
        <label htmlFor='Email'>Email: </label>
        <input type='email' />
        <label htmlFor='Password'>Password: </label>
        <input type='password' />
      </div>
      <button>Login</button>
    </div>
  );
}
