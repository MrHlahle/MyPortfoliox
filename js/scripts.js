// ===== Smooth scroll for nav links =====
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({behavior: 'smooth'});
  });
});

// ===== Typing animation =====
const typingEl = document.querySelector('.code-typing');
const lines = [
  'function build(){ return "impact"; }',
  'const run = async () => { await deploy(); }',
  'console.log("Hello from Obakeng")'
];
let li = 0, pos = 0;

function loopTyping(){
  if(!typingEl) return;
  const txt = lines[li];
  typingEl.textContent = txt.slice(0,pos);
  pos++;
  if(pos > txt.length + 10){
    pos = 0;
    li = (li + 1) % lines.length;
  }
  setTimeout(loopTyping, 60);
}

loopTyping();
