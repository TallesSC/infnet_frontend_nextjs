'use client';

import styles from './SignUpForm.module.scss';
import { useState } from 'react';
import { useFormik } from 'formik';
import { signUp } from '@/services/auth';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      await signUp({
        email: values.email,
        password: values.password
      })
        .then(() => {
          alert('Account created successfully');
          router.push('/');
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
            Sign Up
          </button>
          {error && <p className={styles.error}>Login Inválido</p>}
        </form>
      </div>
    </section>
  );
}
