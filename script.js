import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDO8K1h8JwzZBVMtHpVnNOxBotQllmgC2k",
  authDomain: "test-8f4a9.firebaseapp.com",
  projectId: "test-8f4a9",
  storageBucket: "test-8f4a9.firebasestorage.app",
  messagingSenderId: "1926207768",
  appId: "1:1926207768:web:8b41686fee2d4eeb87266d"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// 👤 Check user auth state
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

// 🎲 Helper to randomize stats
function getRandomStat() {
  return Math.floor(Math.random() * 100) + 1;
}

// 🐶 Adopt pet and save data
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

  // Save to Firestore if logged in
  if (window.currentUser) {
    const userRef = doc(db, "users", window.currentUser.uid);
    await setDoc(userRef, { adoptedPet: petData });
  }

  // Also store in localStorage and redirect
  localStorage.setItem("adoptedPet", JSON.stringify(petData));
  window.location.href = "adopted.html";
}

// ✅ Expose adoptPet so it's available globally
window.adoptPet = adoptPet;
