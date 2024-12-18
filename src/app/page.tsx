'use client';
import styles from "../app/css/home.module.css";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const { 'reserva-token': token } = parseCookies();
    if (!token) {
      router.push('/Login');
    }
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src="/macarrao.jpg"
          className={styles.headerImage}
          alt="Prato de massa"
        />
        <h1 className={styles.title}>Cantina da Massa</h1>
        <nav className={styles.nav}>
          <a href="#about" className={styles.navLink}>Sobre Nós</a>
          <a href="#menu" className={styles.navLink}>Menu</a>
          <a href="#contact" className={styles.navLink}>Contato</a>
          <a href="/Login" className={styles.loginLink}>Login</a>
        </nav>
      </header>
      <main className={styles.main}>
        <section id="about" className={styles.section}>
        <center> <h2 className={styles.sectionTitle}>Sobre Nós</h2></center> 
          <div className={styles.aboutContent}>
            <img
              src="/italian-chef.jpg"
              className={styles.aboutImage}
              alt="Chef italiano preparando massa"
            />
            
            <p className={styles.text}>
              Bem-vindo à Cantina da Massa! Oferecemos uma experiência gastronômica autêntica, 
              trazendo o melhor da culinária italiana. De massas frescas a molhos artesanais, 
              tudo é preparado com ingredientes selecionados e muita paixão. Venha nos visitar 
              e descubra os sabores da Itália em cada prato.
            </p>
            
          </div>
        </section>
        <br/>
        <br/>
        <section id="menu" className={styles.section}>
          <center><h2 className={styles.sectionTitle}>Nosso Menu</h2></center>
          <div className={styles.menuGrid}>
            <div className={styles.menuItem}>
              <img
                src="/Espaguete.jpg"
                className={styles.menuImage}
                alt="Espaguete"
              />
              <p>Espaguete ao Pomodoro</p>
            </div>
            <div className={styles.menuItem}>
              <img
                src="/lasanha.jpg"
                className={styles.menuImage}
                alt="Lasanha"
              />
              <p>Lasanha de Carne</p>
            </div>
            <div className={styles.menuItem}>
              <img
                src="/ravioli.jpg"
                className={styles.menuImage}
                alt="Ravioli"
              />
              <p>Ravioli de Queijo</p>
            </div>
            <div className={styles.menuItem}>
              <img
                src="/nhoquePesto.jpg"
                className={styles.menuImage}
                alt="Nhoque"
              />
              <p>Nhoque ao Pesto</p>
            </div>
            <div className={styles.menuItem}>
              <img
                src="/penne.jpg"
                className={styles.menuImage}
                alt="Penne"
              />
              <p>Penne ao Alfredo</p>
            </div>
            <div className={styles.menuItem}>
              <img
                src="/capeletti.jpg"
                className={styles.menuImage}
                alt="Capeletti"
              />
              <p>Capeletti in brodo</p>
            </div>
            <div className={styles.menuItem}>
              <img
                src="/rondelli.jpg"
                className={styles.menuImage}
                alt="Rondelli"
              />
              <p>Rondelli de Presunto e Queijo</p>
            </div>
            <div className={styles.menuItem}>
              <img
                src="/macarraoMolhoBranco.jpg"
                className={styles.menuImage}
                alt="Rondelli"
              />
              <p>Macarrão ao Molho Branco com Brócolis e Bacon</p>
            </div>
          </div>
        </section>
        
        <section id="contact" className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Contato</h2>
          <p className={styles.text}>Telefone: (99) 99999-9999</p>
          <p className={styles.text}>Endereço: Rua Itália, 123</p>
        </section>

      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2024 Cantina da Massa. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
