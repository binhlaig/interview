"use server";

import { db, auth } from "@/Firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;
  try {
    const userRecord = await db.collection('users').doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: 'User already exists'
      }
    }
    await db.collection('users').doc(uid).set({ name, email });
    



  } catch (e: any) {
    console.error('Error creating user:', e);

    if (e.code === 'auth/email-already-exists') {
      return {
        success: false,
        message: 'Email already exists'
      }
    }
    return {
      success: false,
      message: 'Error creating user'
    }

  }


}

export async function setSessionCookie(idToken: string) {
  const cookingStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 });
  cookingStore.set('session', sessionCookie, {
    maxAge: 60 * 60 * 24 * 5,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })


}
export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: 'User not found'
      }
    }
    await setSessionCookie(idToken);
    return {
      success: true,
      message: 'Login successful'
    }

  } catch (error) {
    console.error('Error signing in:', error);
    return {
      success: false,
      message: 'Fail to login'
    }

  }
}