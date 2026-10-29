import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Server-only. Returns null until the env vars in .env.local are set.
export function getDb() {
  const apiKey = process.env.FIREBASE_API_KEY;
  const authDomain = process.env.FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
  const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID;
  const appId = process.env.FIREBASE_APP_ID;
  const databaseId = process.env.FIREBASE_DATABASE_ID || "(default)";

  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) return null;

  const app = getApps()[0] ?? initializeApp({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  });
  return getFirestore(app, databaseId);
}