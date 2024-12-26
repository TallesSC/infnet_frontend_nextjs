import { getPostList } from '@/services/posts';
import { Post as PostProps } from '@/types/posts';
import Post from '@/components/Post/Post';
import styles from './PostPage.module.scss';
import CommentTextarea from '@/components/CommentTextarea/CommentTextarea';
import PostComments from '@/components/PostComments/PostComments';

export async function generateStaticParams() {
  const posts = await getPostList();

  return posts.map((post) => ({ slug: post.slug }));
}

async function getPost(params: { slug: string }): Promise<PostProps | undefined> {
  const posts = await getPostList();

  return posts.find((post) => post.slug === params.slug);
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost(await params);

  return (
    <section className={styles.section}>
      <div className="container">
        {post && <Post post={post} />}
        <PostComments postId={post?.id} />
        <CommentTextarea postId={post?.id} />
      </div>
    </section>
  );
}
