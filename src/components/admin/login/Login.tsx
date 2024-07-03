import axios from 'axios';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/admin/panel');
      } else {
        setError('Token de acesso não encontrado');
      }
    } catch (error) {
      setError('Credenciais inválidas');
    }

    setUsername('');
    setPassword('');
  };
  return (
    <div className={style.boxLogin}>
      <h1>Login Admin</h1>
      <form onSubmit={handleSubmit} className={style.boxInputs}>
        <label htmlFor='Username'>Username: </label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor='Password'>Password: </label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
}
