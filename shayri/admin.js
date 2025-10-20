function addShayari() {
  const input = document.getElementById('shayariInput');
  const status = document.getElementById('status');
  const text = input.value.trim();

  if (!text) {
    status.textContent = '❌ शायरी खाली नहीं हो सकती।';
    status.style.color = 'red';
    return;
  }

  // Get existing
  const existing = JSON.parse(localStorage.getItem('myShayari') || '[]');
  existing.unshift(text); // Add to top

  // Save
  localStorage.setItem('myShayari', JSON.stringify(existing));

  // Clear & show success
  input.value = '';
  status.textContent = '✅ शायरी जोड़ दी गई!';
  status.style.color = 'green';

  // Optional: reload public page in 1 sec
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}
