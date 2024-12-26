'use client';

import styles from './CommentTextarea.module.scss';
import { useFormik } from 'formik';
import { UserContext } from '@/Context/UserContext';
import { useContext } from 'react';
import * as Yup from 'yup';
import { createPostComment } from '@/services/posts';

export default function CommentTextarea({ postId }: { postId?: string }) {
  const { user } = useContext(UserContext);
  const { handleChange, handleSubmit, values, resetForm } = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema: Yup.object().shape({
      comment: Yup.string().required('Comment is required')
    }),
    onSubmit: async (submitValues) => {
      if (!user || !postId) return null;

      await createPostComment(postId, user, submitValues.comment).then(() => {
        resetForm();
        alert('Comment submitted successfully');
      });
    }
  });

  if (!user || !postId) return null;

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Leave a comment</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          id="comment"
          name="comment"
          value={values.comment}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Write your comment here..."
          rows={6}
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
