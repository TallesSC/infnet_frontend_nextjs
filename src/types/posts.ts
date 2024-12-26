import { Timestamp } from '@firebase/firestore';

export interface Post {
  id: string;
  title: string;
  subtitle: string;
  date: Timestamp;
  text: string;
  slug: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  user_email: string;
  comment: string;
}
