function getRandomStat() {
  return Math.floor(Math.random() * 100) + 1;
}

function adoptPet(breed) {
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

  localStorage.setItem("adoptedPet", JSON.stringify(petData));
  window.location.href = "adopted.html"; // ✅ this takes you to the next page
}
