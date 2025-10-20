// ✨ Default shayari — agar localStorage khali ho toh yeh dikhenge
const DEFAULT_SHAYARI = [
  `तुम्हारे बिना जीना सीख लिया,\nअब तुम्हारे साथ मरना भूल गया।`,
  `दिल टूटा तो शीशे की तरह नहीं टूटता,\nवो तो चुपचाप टूटता है… और ख़ामोशी से सहता है।`,
  `मैं वो नहीं जो हर बार तुम्हारे पीछे भागूँ,\nमैं वो हूँ जो तुम्हारे जाने के बाद भी तुम्हारा इंतज़ार करूँ।`
];

function loadShayari() {
  const feed = document.getElementById('shayari-feed');
  
  // localStorage se data lo, agar na ho toh default use karo
  const saved = localStorage.getItem('myShayari');
  const shayariList = saved ? JSON.parse(saved) : DEFAULT_SHAYARI;

  if (shayariList.length === 0) {
    feed.innerHTML = '<p class="empty">अभी तक कोई शायरी नहीं है।</p>';
    return;
  }

  feed.innerHTML = '';
  shayariList.forEach((text, index) => {
    const card = document.createElement('div');
    card.className = 'shayari-card';
    card.innerHTML = `
      <p>${text}</p>
      <div class="buttons">
        <button class="btn copy-btn" onclick="copyText(${index})">📋 कॉपी</button>
        <button class="btn share-btn" onclick="shareText(${index})">📤 शेयर</button>
      </div>
    `;
    feed.appendChild(card);
  });
}

function copyText(index) {
  const list = JSON.parse(localStorage.getItem('myShayari') || '[]') || DEFAULT_SHAYARI;
  navigator.clipboard.writeText(list[index]).then(() => {
    alert('शायरी कॉपी हो गई!');
  }).catch(() => {
    alert('कॉपी करने में त्रुटि।');
  });
}

function shareText(index) {
  const list = JSON.parse(localStorage.getItem('myShayari') || '[]') || DEFAULT_SHAYARI;
  const text = list[index];
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({ title: 'मेरी शायरी', text, url });
  } else {
    navigator.clipboard.writeText(`${text}\n\n— मेरी शायरी\n${url}`);
    alert('शायरी + लिंक कॉपी हो गया!');
  }
}

// Page load hote hi shayari dikhao
document.addEventListener('DOMContentLoaded', loadShayari);
