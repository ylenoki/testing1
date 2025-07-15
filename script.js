import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDO8K1h8JwzZBVMtHpVnNOxBotQllmgC2k",
  authDomain: "test-8f4a9.firebaseapp.com",
  projectId: "test-8f4a9",
  storageBucket: "test-8f4a9.firebasestorage.app",
  messagingSenderId: "1926207768",
  appId: "1:1926207768:web:8b41686fee2d4eeb87266d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data.adoptedPet) {
        alert(`You already adopted a ${data.adoptedPet.breed} (${data.adoptedPet.gender})`);
      }
    }
  }
});

function getRandomStat() {
  return Math.floor(Math.random() * 100) + 1;
}

window.generateTraits = (select, breed) => {
  const gender = select.value;
  if (!gender) return;

  const traits = {
    intelligence: getRandomStat(),
    playfulness: getRandomStat(),
    affection: getRandomStat(),
    energy: getRandomStat(),
    loyalty: getRandomStat()
  };

  const traitDiv = document.getElementById(`traits-${breed}`);
  traitDiv.innerHTML = `
    🧠 Intelligence: ${traits.intelligence}<br>
    🐾 Playfulness: ${traits.playfulness}<br>
    ❤️ Affection: ${traits.affection}<br>
    ⚡ Energy: ${traits.energy}<br>
    🛡️ Loyalty: ${traits.loyalty}
  `;

  select.setAttribute("data-traits", JSON.stringify(traits));
};

window.adoptPet = async (breed) => {
  const select = document.querySelector(`select[onchange*="${breed}"]`);
  const gender = select.value;
  const traits = JSON.parse(select.getAttribute("data-traits") || "{}");

  if (!gender) {
    alert("Please choose a gender before adopting!");
    return;
  }

  if (!traits.intelligence) {
    alert("Please select a gender to generate traits first!");
    return;
  }

  const petData = {
    breed,
    gender,
    image: `${breed}.gif`,
    ...traits
  };

  if (currentUser) {
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { adoptedPet: petData });
  }

  localStorage.setItem("adoptedPet", JSON.stringify(petData));
  window.location.href = "adopted.html";
};


