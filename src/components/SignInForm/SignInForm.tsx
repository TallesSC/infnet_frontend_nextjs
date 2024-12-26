'use client';

import styles from './SignInForm.module.scss';
import { useContext, useState } from 'react';
import { UserContext } from '@/Context/UserContext';
import { useFormik } from 'formik';
import { signIn } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function SignInForm() {
  const [error, setError] = useState<string>();
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [, setCookie] = useCookies(['user_token']);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      await signIn({
        email: values.email,
        password: values.password,
        setUser
      })
        .then((userCredential) => {
          if (userCredential) {
            setCookie('user_token', userCredential.user.refreshToken);
            console.log('Log in successful');
            router.push('/');
          }
        })
        .catch((error) => setError(error));
    }
  });

  return (
    <section className={styles.section}>
      <div className="container">
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              name="email"
              id="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              required
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              name="password"
              id="password"
              type="password"
              onChange={handleChange}
              value={values.password}
              required
            />
          </label>
          <button className={styles.button} type="submit">
            Sign In
          </button>
          {error && <p className={styles.error}>Login Inválido</p>}
        </form>
      </div>
    </section>
  );
}
