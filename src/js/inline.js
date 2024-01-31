window.addEventListener('resize', setScale);
window.addEventListener('load', insertCSSVars);

function setScale() {
  const collectionEl = document.getElementById('collection');
  const width = window.innerWidth;
  const size = Math.min(1, width/1800);
  collectionEl.style.transform = `scale(${size})`;
}

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  
  return a;
}

function insertCSSVars() {
  const style = document.createElement('style');
  const colors = shuffleArray(["#46be56","#ff3636","#1978ff","#ffc533","#ccc"]);
  const vars = colors.map((color, i) => `--color-${i}: ${color};`).join(' ');
  style.textContent = `*{${vars}}`;
  document.head.appendChild(style);
}