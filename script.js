document.addEventListener('DOMContentLoaded', function() {
  console.log('Basic JS is running.');
  const message = 'Hello from script.js!';
  if (document.body) {
    const el = document.createElement('div');
    el.textContent = message;
    el.style.fontFamily = 'Arial, sans-serif';
    el.style.padding = '10px';
    document.body.appendChild(el);
  }
});