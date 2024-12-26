import { getPostComments } from '@/services/posts';
import styles from './PostComments.module.scss';

export default async function PostComments({ postId }: { postId?: string }) {
  if (!postId) return null;

  const comments = await getPostComments(postId);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {comments.map((comment) => (
          <li className={styles.item} key={comment.id}>
            <p className={styles.userEmail}>{comment.user_email}</p>
            <p className={styles.comment}>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
