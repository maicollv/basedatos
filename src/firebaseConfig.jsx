// firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase. La puedes obtener desde la consola de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBUnkdbFc_ITfXmQwNvwo_S2clMpMT0xAk",
    authDomain: "clasemiercoles-7dbc6.firebaseapp.com",
    projectId: "clasemiercoles-7dbc6",
    storageBucket: "clasemiercoles-7dbc6.firebasestorage.app",
    messagingSenderId: "836303024669",
    appId: "1:836303024669:web:f3d948ea0ed7dc7ab54cf4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
