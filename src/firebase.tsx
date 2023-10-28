import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup, signOut } from "firebase/auth"
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyADZ9OeYm6PPmoYDEtq32l44cg3vVbXCDs",
  authDomain: "studybuddiesdb.firebaseapp.com",
  projectId: "studybuddiesdb",
  storageBucket: "studybuddiesdb.appspot.com",
  messagingSenderId: "549638769130",
  appId: "1:549638769130:web:62e235b4e4e5327cd60a93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export function writeUserData(userId, name, email) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
    });
  }

export const signInWithGoogle = () => {
    signInWithPopup(auth,provider)
    .then((result) =>{
        console.log(result)
        const name = result.user.displayName;
        const email = result.user.email;
        const userID = result.user.uid;

        localStorage.setItem("name", String(name))
        localStorage.setItem("email", String(email))
        localStorage.setItem("userID", String(userID))
        writeUserData(userID, name, email)
        location.reload();
    }).catch((error) => {
        console.log(error)
    })
}

export const signUserOut = () => {
    signOut(auth).then(() => {
        localStorage.clear();
    })
}

export const checkUserSignIn = (navigate) => {
  if(localStorage.getItem("name")!=null&&
  localStorage.getItem("email")!=null&&
  localStorage.getItem("userID")!=null) {
    navigate("/dashboard/");
    return true;
  }
  else {
    return false;
  }
}