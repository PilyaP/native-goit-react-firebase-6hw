// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvMxZgarsnWLIET0BwWKb6B0fzErFJPqc",
  authDomain: "nativegoit.firebaseapp.com",
  databaseURL:
    "https://nativegoit-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nativegoit",
  storageBucket: "nativegoit.appspot.com",
  messagingSenderId: "280401342211",
  appId: "1:280401342211:web:44d02b6ec3a7345fa38336",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
