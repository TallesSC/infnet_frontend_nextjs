import { Post as PostProps } from '@/types/posts';
import styles from './Post.module.scss';

export default function Post({ post }: { post: PostProps }) {
  return (
    <div className={styles.post}>
      <h1 className={styles.title}>{post.title}</h1>
      <span className={styles.date}>{post.date.toDate().toDateString()}</span>
      <p className={styles.subtitle}>{post.subtitle}</p>
      <p className={styles.text}>{post.text}</p>
    </div>
  );
}
