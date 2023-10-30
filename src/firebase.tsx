import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup, signOut } from "firebase/auth"
import { getDatabase, ref, set, query, get, DataSnapshot } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import type { DatabaseReference } from "firebase/database";
import 'firebase/firestore';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const firebaseConfig = {
  apiKey: "AIzaSyADZ9OeYm6PPmoYDEtq32l44cg3vVbXCDs",
  authDomain: "studybuddiesdb.firebaseapp.com",
  projectId: "studybuddiesdb",
  storageBucket: "studybuddiesdb.appspot.com",
  messagingSenderId: "549638769130",
  appId: "1:549638769130:web:62e235b4e4e5327cd60a93"
};

//Initialize FlatPickr
const fromDate = flatpickr('#from1', {});
const toDate = flatpickr('#to1', {});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider()
const db = getDatabase();

export function writeUserData(userId, name, email) {
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
        location.replace("/signin");
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

export const searchUsers = () => {
  let matchedTutorName = ""
  let matchedTutor = "";
  let matchLevel = -1;
  var dates = JSON.parse(localStorage.getItem("dates")||"")
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const subjects: string[] = [];
  checkboxes.forEach(checkbox => {
    const checkboxElement = checkbox as HTMLInputElement;
    if (checkboxElement.checked) {
      subjects.push(checkboxElement.value);
    }
  });
  //remove first on
  if (subjects.length > 0 && subjects[0] === "on") {
    subjects.shift();
  }
 
  if(dates!="") {
    var start = new Date(dates[0]);
    var end = new Date(dates[1]);
    const tutorsRef = ref(db, 'tutors/');
    get(tutorsRef).then((snapshot: DataSnapshot) => {
      snapshot.forEach((tutorSnapshot: DataSnapshot) => {
        const tutorData = tutorSnapshot.val();
        if(tutorData.subjects) {
          let matchingSubjects = subjects.filter(subject => tutorData.subjects[subject]);
          if(matchingSubjects.length > 0) {
            let tutorStartDate = new Date(tutorData.startTime);
            let tutorEndDate = new Date(tutorData.endTime);
            //check if dates overlap
            if((start <= tutorEndDate && end >= tutorStartDate) ||
            (end <= tutorEndDate && end >= tutorStartDate) ||
            (start >= tutorStartDate && start <= tutorEndDate)) {
              //check for best matching tutor
              if(matchingSubjects.length>matchLevel) {
                matchedTutor=tutorData;
                matchedTutorName=tutorSnapshot.key||"";
                matchLevel = matchingSubjects.length;
              }
            }
          }
        }
      });
      if(matchedTutor != "") {
        let friends: string[] = JSON.parse(localStorage.getItem("friends")||'["None","None","None","None","None"]')
        friends.pop()
        friends.unshift(matchedTutorName)
        localStorage.setItem("friends", JSON.stringify(friends));
        location.reload();
      }
      else {
        alert("No Tutor Found for your Subject and Dates")
      }
    });
  }
  else {
    alert("Please select both a start and end date.")
  }
}

export const updatedFriendInfo = (friend, info) => {
  let friendRef = ref(db, `tutors/${friend}`);
  get(friendRef)
  .then((snapshot) => {
    if(snapshot.exists()) {
      const tutorData = snapshot.val();
      console.log("FOUND",tutorData[info])
      return tutorData[info];
    } else {
      console.log("Friend not found");
      return "None"
    }
  })
  .catch((error) => {
    console.error("Error getting friend data:", error);
    return "None"
  });
}