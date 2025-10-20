// Load shayari from localStorage
function loadShayari() {
  const feed = document.getElementById('shayari-feed');
  const saved = localStorage.getItem('myShayari');
  const shayariList = saved ? JSON.parse(saved) : [
    "तुम्हारे जाने से घर सूना हो गया,\nमगर दिल तो पहले ही सूना था।",
    "मैंने तुम्हें भुलाने की कोशिश की,\nपर हर कोशिश में तुम याद आ गए।"
  ];

  if (shayariList.length === 0) {
    feed.innerHTML = '<p class="loading">अभी तक कोई शायरी नहीं जोड़ी गई।</p>';
    return;
  }

  feed.innerHTML = '';
  shayariList.forEach((text, i) => {
    const card = document.createElement('div');
    card.className = 'shayari-card';
    card.innerHTML = `
      <p>${text}</p>
      <div class="buttons">
        <button class="btn copy-btn" onclick="copyText(${i})">📋 कॉपी</button>
        <button class="btn share-btn" onclick="shareText(${i})">📤 शेयर</button>
      </div>
    `;
    feed.appendChild(card);
  });
}

function copyText(index) {
  const saved = JSON.parse(localStorage.getItem('myShayari') || '[]');
  navigator.clipboard.writeText(saved[index]).then(() => {
    alert('शायरी कॉपी हो गई!');
  });
}

function shareText(index) {
  const saved = JSON.parse(localStorage.getItem('myShayari') || '[]');
  const text = saved[index];
  const url = window.location.origin + window.location.pathname;

  if (navigator.share) {
    navigator.share({ title: 'मेरी शायरी', text, url });
  } else {
    navigator.clipboard.writeText(`${text}\n\n— मेरी शायरी\n${url}`);
    alert('शायरी + लिंक कॉपी हो गया!');
  }
}

// Load on start
loadShayari();
