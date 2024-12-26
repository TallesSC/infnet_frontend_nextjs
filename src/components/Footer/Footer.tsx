import React from 'react';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Estudos de Gatsby. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
