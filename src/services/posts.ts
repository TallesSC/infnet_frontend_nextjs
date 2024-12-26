'use server';

import { addDoc, collection, getDocs } from '@firebase/firestore';
import { db } from '@/database/firebase';
import { Post, PostComment } from '@/types/posts';
import { User } from '@/types/auth';
import { FIREBASE_COLLECTION_POST_COMMENTS, FIREBASE_COLLECTION_POSTS } from '@/constants/collections';

export async function getPostList() {
  let posts: Post[] = [];
  await getDocs(collection(db, FIREBASE_COLLECTION_POSTS)).then((querySnapshot) => {
    posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Post);
  });
  return posts;
}

export async function getPostComments(postId: string) {
  let comments: PostComment[] = [];
  await getDocs(collection(db, FIREBASE_COLLECTION_POST_COMMENTS)).then((querySnapshot) => {
    comments = querySnapshot.docs
      .filter((doc) => doc.data().post_id === postId)
      .map((doc) => ({ ...doc.data(), id: doc.id }) as PostComment);
  });
  return comments;
}

export async function createPostComment(postId: string, user: User, comment: string) {
  await addDoc(collection(db, FIREBASE_COLLECTION_POST_COMMENTS), {
    post_id: postId,
    user_id: user.id,
    user_email: user.email,
    comment
  });
}
