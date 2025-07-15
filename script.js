import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    window.currentUser = user;
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data.adoptedPet) {
        alert(`You already adopted a ${data.adoptedPet.breed} (${data.adoptedPet.gender})!`);
      }
    }
  }
});

function getRandomStat() {
  return Math.floor(Math.random() * 100) + 1;
}

async function adoptPet(breed) {
  const genderSelect = document.querySelector(`select[onchange*="${breed}"]`);
  const gender = genderSelect.value;
  if (!gender) {
    alert("Please choose a gender before adopting!");
    return;
  }

  const petData = {
    breed: breed,
    gender: gender,
    intelligence: getRandomStat(),
    playfulness: getRandomStat(),
    affection: getRandomStat(),
    energy: getRandomStat(),
    loyalty: getRandomStat()
  };

  if (window.currentUser) {
    const userRef = doc(db, "users", window.currentUser.uid);
    await setDoc(userRef, { adoptedPet: petData });
  }

  localStorage.setItem("adoptedPet", JSON.stringify(petData));
  window.location.href = "adopted.html";
}
