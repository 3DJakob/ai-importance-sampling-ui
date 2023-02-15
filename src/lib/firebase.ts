import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCDcK1pbCve_Z4q38M6KBeLP4QKK5VYZR4',
  authDomain: 'ai-sampling.firebaseapp.com',
  projectId: 'ai-sampling',
  storageBucket: 'ai-sampling.appspot.com',
  messagingSenderId: '40770890521',
  appId: '1:40770890521:web:7fc027e95c0fc8d51df388'
}

export const app = initializeApp(firebaseConfig)
