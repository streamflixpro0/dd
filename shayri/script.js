// ✨ Shayari yahan add karein — bas array mein likho
const shayariCollection = [
  `तुम्हारे बिना जीना सीख लिया,\nअब तुम्हारे साथ मरना भूल गया।`,
  `दिल टूटा तो शीशे की तरह नहीं टूटता,\nवो तो चुपचाप टूटता है… और ख़ामोशी से सहता है।`,
  `मैं वो नहीं जो हर बार तुम्हारे पीछे भागूँ,\nमैं वो हूँ जो तुम्हारे जाने के बाद भी तुम्हारा इंतज़ार करूँ।`
  // Naye shayari yahan comma ke saath add karein
];

// DOM mein shayari dikhao
const container = document.getElementById('shayari-list');
shayariCollection.forEach(text => {
  const card = document.createElement('div');
  card.className = 'shayari-card';
  card.innerHTML = `
    <p>${text}</p>
    <div class="buttons">
      <button class="btn copy-btn" onclick="copyShayari(this, \`${text.replace(/`/g, '\\`')}\`)">📋 कॉपी</button>
      <button class="btn share-btn" onclick="shareShayari(\`${text.replace(/`/g, '\\`')}\`)">📤 शेयर</button>
    </div>
  `;
  container.appendChild(card);
});

// Copy function
function copyShayari(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.innerHTML;
    btn.innerHTML = '✅ कॉपी हुआ!';
    setTimeout(() => btn.innerHTML = original, 1500);
  });
}

// Share function
function shareShayari(text) {
  const url = window.location.href;
  const fullText = `${text}\n\n— मेरी शायरी\n${url}`;

  if (navigator.share) {
    navigator.share({
      title: 'मेरी शायरी',
      text: text,
      url: url
    }).catch(err => console.log('Share cancelled', err));
  } else {
    navigator.clipboard.writeText(fullText).then(() => {
      alert('शायरी + लिंक कॉपी हो गया!');
    });
  }
}
