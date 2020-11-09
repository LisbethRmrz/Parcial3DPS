import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7NMApnJKJvYeVLKE7Hebp8xeJ0tNVmPk",
    authDomain: "parcial3dps-e7dcc.firebaseapp.com",
    databaseURL: "https://parcial3dps-e7dcc.firebaseio.com",
    projectId: "parcial3dps-e7dcc",
    storageBucket: "parcial3dps-e7dcc.appspot.com",
    messagingSenderId: "617021783933",
    appId: "1:617021783933:web:868b54d67e68bb96cf9614",
    measurementId: "G-X7KMLG9ZDB"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Representa el proveedor de autenticación de inicio de sesión de Google.
// Utilice esta clase para obtener
const provider = new firebase.auth.GoogleAuthProvider();

//Para acceder con una ventana emergente, llama a signInWithPopup
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  //En algunos casos, puede ser útil crear una referencia de documento con un ID 
  //generado automáticamente y, luego, usar la referencia más adelante. 
  //Para este caso práctico, puedes llamar a doc():
  const userRef = firestore.doc(`users/${user.uid}`);

  // Para obetner el registro creado
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      // Para crear o reemplazar un solo documento, usa el método set()
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error crear el usuario", error);
    }
  }
  return getUserDocument(user.uid);
};

// getUserDocument , consulta un registro por medio del id
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error extraer usuario", error);
  }
};
