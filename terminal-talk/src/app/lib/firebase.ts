import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// pull in
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const rawKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !rawKey) {
  throw new Error(
    'Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY'
  );
}

// turn the "\n" sequences back into real newlines
const privateKey = rawKey.replace(/\\n/g, '\n');

// initialize admin app once
const adminApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      })
    : getApps()[0];

export const db = getFirestore(adminApp);
