import PostList from '@/components/PostList/PostList';
import { getPostList } from '@/services/posts';

export default async function Home() {
  const posts = await getPostList();

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}
