// NAV activation + click handling
document.querySelectorAll('.header-nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.getElementById(a.dataset.target);
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

// Highlight nav based on visible section (IntersectionObserver)
const sections = document.querySelectorAll('.snap-child');
const navLinks = document.querySelectorAll('.header-nav a');

const obs = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id = entry.target.id;
      navLinks.forEach(link=>link.classList.toggle('active', link.dataset.target === id));
    }
  });
},{threshold:0.6});

sections.forEach(s => obs.observe(s));

// keyboard navigation: ArrowDown / ArrowUp
let currentIndex = 0;
function goToIndex(i){
  i = Math.max(0, Math.min(sections.length-1, i));
  sections[i].scrollIntoView({behavior:'smooth'});
  currentIndex = i;
}
window.addEventListener('keydown', e=>{
  if(e.key === 'ArrowDown') goToIndex(currentIndex+1);
  if(e.key === 'ArrowUp') goToIndex(currentIndex-1);
});

// wheel / touch helper: small debounce so scroll jumps one section at a time
let wheelDebounce = false;
window.addEventListener('wheel', e=>{
  if(wheelDebounce) return;
  wheelDebounce = true;
  setTimeout(()=> wheelDebounce=false, 600);

  if(e.deltaY > 0) goToIndex(currentIndex+1);
  else goToIndex(currentIndex-1);
});

// typing animation in home code window
const typingEl = document.getElementById('typing');
const lines = [
  'function build(){ return "impact"; }',
  'const run = async () => { await deploy(); }',
  'console.log("Hello from Obakeng")'
];
let li = 0, pos = 0;
function loopTyping(){
  const txt = lines[li];
  typingEl.textContent = txt.slice(0, pos);
  pos++;
  if(pos > txt.length + 10){
    pos = 0;
    li = (li+1) % lines.length;
  }
  setTimeout(loopTyping, 60);
}
if(typingEl) loopTyping();

// ensure currentIndex updates on manual scroll
sections.forEach((s, idx)=>{
  s.addEventListener('mouseenter', ()=> currentIndex = idx);
});
