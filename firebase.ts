
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_API_KEY,
  authDomain: (import.meta as any).env.VITE_AUTH_DOMAIN,
  projectId: (import.meta as any).env.VITE_PROJECT_ID,
  storageBucket: (import.meta as any).env.VITE_STORAGE_BUCKET,
  messagingSenderId: (import.meta as any).env.VITE_MESSAGING_SENDER_ID,
  appId: (import.meta as any).env.VITE_APP_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
