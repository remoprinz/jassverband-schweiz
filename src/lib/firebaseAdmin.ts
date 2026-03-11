import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getAuth, type Auth } from 'firebase-admin/auth';

let app: App;
let db: Firestore;
let auth: Auth;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (serviceAccount) {
    const parsed = JSON.parse(serviceAccount);
    app = initializeApp({
      credential: cert(parsed),
    });
  } else if (process.env.FIREBASE_PROJECT_ID) {
    app = initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    throw new Error(
      'Firebase Admin: FIREBASE_SERVICE_ACCOUNT_KEY oder FIREBASE_PROJECT_ID fehlt.'
    );
  }

  return app;
}

export function getAdminFirestore(): Firestore {
  if (!db) {
    db = getFirestore(getAdminApp());
  }
  return db;
}

export function getAdminAuth(): Auth {
  if (!auth) {
    auth = getAuth(getAdminApp());
  }
  return auth;
}
