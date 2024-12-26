import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/database/firebase';
import { Dispatch, SetStateAction } from 'react';
import { User } from '@/types/auth';

export async function signIn({
  email,
  password,
  setUser
}: {
  email: string;
  password: string;
  setUser: Dispatch<SetStateAction<User | null>>;
}) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      setUser({
        id: userCredential.user.uid,
        email: userCredential.user.email as string
      });
      return userCredential;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function signUp({ email, password }: { email: string; password: string }) {
  createUserWithEmailAndPassword(auth, email, password).catch((error) => {
    console.error(error);
  });
}
