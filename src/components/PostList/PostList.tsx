import React from 'react';
import styles from './PostList.module.scss';
import { Post } from '@/types/posts';
import Link from 'next/link';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <h1 className={styles.sectionTitle}>Latest News</h1>
        <ul className={styles.list}>
          {posts.length > 0 &&
            posts.map((post: Post) => (
              <li key={post.id} className={styles.card}>
                <Link href={`/posts/${post.slug}`} className={styles.link}>
                  <div className={styles.content}>
                    <p className={styles.date}>{post.date.toDate().toDateString()}</p>
                    <h2 className={styles.title}>{post.title}</h2>
                    <p className={styles.excerpt}>{post.text}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
