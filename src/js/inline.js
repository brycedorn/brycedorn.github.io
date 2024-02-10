window.addEventListener('resize', setScale);
window.addEventListener('load', onLoad);

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
  const hues = ["#46be56","#ff3636","#1978ff","#ffc533"];
  const vars = shuffleArray([...hues,"#ccc"]).map((color, i) => `--color-${i}: ${color};`).join('');
  const hueVars = shuffleArray(hues).map((color, i) => `--hue-${i}: ${color};`).join('');
  style.textContent = `*{${vars}${hueVars}}`;
  document.head.appendChild(style);
}

function onLoad() {
  setScale();
  insertCSSVars();
}