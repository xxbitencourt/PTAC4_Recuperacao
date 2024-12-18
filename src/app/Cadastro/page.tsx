'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiURL } from "../config";
import { setCookie } from 'nookies';
import styles from '../css/cadastro.module.css';

interface ResponseSignin {
  erro: boolean,
  mensagem: string,
  token?: string
}

export default function Cadastro() {
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    password: '',
    tipo: "cliente"
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiURL}/auth/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        const { erro, mensagem, token = '' }: ResponseSignin = await response.json();
        if (erro) {
          setError(mensagem);
        } else {
          setCookie(undefined, 'reserva-token', token, {
            maxAge: 60 * 60 * 1 // 1 hora
          });
          router.push('/');
        }
      } else {
        setError("Erro na conexão com o servidor.");
      }
    } catch (error) {
      setError("Erro ao tentar realizar cadastro.");
      console.error(error);
    }
  };

  const alterarUsuario = (campo: keyof typeof usuario, valor: string) => {
    setUsuario((usuarioAnterior) => ({ ...usuarioAnterior, [campo]: valor }));
  };

  return (
    <div className={styles.cadastroContainer}>
      <h1 className={styles.cadastroTitle}>Crie sua Conta na Cantina da Massa</h1>
      <form onSubmit={handleSubmit} className={styles.cadastroForm}>
        <div className={styles.formGroup}>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={usuario.nome}
            onChange={(e) => alterarUsuario("nome", e.target.value)}
            className={styles.formInput}
            placeholder="Digite seu nome"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={usuario.email}
            onChange={(e) => alterarUsuario("email", e.target.value)}
            className={styles.formInput}
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={usuario.password}
            onChange={(e) => alterarUsuario("password", e.target.value)}
            className={styles.formInput}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Cadastrar
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
      <p className={styles.loginPrompt}>
        Já possui conta? <a href="/Login" className={styles.loginLink}>Login</a>
      </p>
    </div>
  );
}
