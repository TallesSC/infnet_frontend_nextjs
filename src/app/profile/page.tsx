'use client';

import { useContext } from 'react';
import { UserContext } from '@/Context/UserContext';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/database/firebase';
import { useCookies } from 'react-cookie';
import styles from './Profile.module.scss';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [, , removeCookie] = useCookies(['user_token']);

  if (!user) router.push('/');

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.card}>
          <h1 className={styles.email}>{user?.email}</h1>
          <button
            className={styles.signOutButton}
            onClick={() => {
              signOut(auth).then(() => {
                removeCookie('user_token');
                setUser(null);
                router.push('/');
              });
            }}>
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}
