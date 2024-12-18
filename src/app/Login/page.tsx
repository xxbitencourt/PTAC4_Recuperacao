'use client';
import styles from "../css/login.module.css";
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie, parseCookies } from 'nookies';
import { ApiURL } from "../config";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { 'reserva-token': token } = parseCookies();
    if (token) {
      router.push('/');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const { erro, mensagem, token } = await response.json();
        if (erro) {
          setError(mensagem);
        } else {
          setCookie(undefined, 'reserva-token', token, { maxAge: 60 * 60 * 1 });
          router.push('/');
        }
      } else {
        setError("Erro na conexão com o servidor.");
      }
    } catch (error) {
      setError("Erro ao tentar realizar login.");
      console.error(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Bem-vindo à Cantina da Massa</h1>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.formInput}
            placeholder="Digite seu e-mail"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.formInput}
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Entrar
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
      <a href="/Cadastro" className={styles.signupLink}>
        Ainda não tem conta? Cadastre-se
      </a>
    </div>
  );
}
