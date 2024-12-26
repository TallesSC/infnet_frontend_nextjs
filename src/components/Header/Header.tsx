'use client';

import React, { useContext } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { UserContext } from '@/Context/UserContext';

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className="container">
        <Link href="/" className={styles.title}>
          Tech<span className={styles.highlight}>NEWS</span>
        </Link>
        <ul className={styles.links}>
          <li className={styles.item}>
            <Link className={styles.link} href="/">
              Home
            </Link>
          </li>
          <li className={styles.item}>
            {user ? (
              <Link href="/profile" className={`${styles.link} ${styles.highlighted}`}>
                {user.email.split('@')[0]}
              </Link>
            ) : (
              <Link className={styles.link} href="/sign_in">
                Sign In
              </Link>
            )}
          </li>
          {!user && (
            <li className={styles.item}>
              <Link className={`${styles.link} ${styles.highlighted}`} href="/sign_up">
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
