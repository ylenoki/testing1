function getRandomStat() {
  return Math.floor(Math.random() * 51) + 50; // 50–100
}

function generateTraits(selectEl, id) {
  if (!selectEl.value) return;
  const gender = selectEl.value;
  const traits = `
    <strong>Gender:</strong> ${gender}<br>
    🧠 Intelligence: ${getRandomStat()}<br>
    🐾 Playfulness: ${getRandomStat()}<br>
    ❤️ Affection: ${getRandomStat()}<br>
    ⚡ Energy: ${getRandomStat()}<br>
    🛡️ Loyalty: ${getRandomStat()}
  `;
  document.getElementById("traits-" + id).innerHTML = traits;
}
