// Typing effect
const typingText=["Competitive Programmer","Frontend Developer","Software Developer"];
let index=0,charIndex=0;
const typingElement=document.querySelector(".typing");
function type(){if(charIndex<typingText[index].length){typingElement.textContent+=typingText[index].charAt(charIndex);charIndex++;setTimeout(type,100);}else setTimeout(erase,2000);}
function erase(){if(charIndex>0){typingElement.textContent=typingText[index].substring(0,charIndex-1);charIndex--;setTimeout(erase,50);}else{index=(index+1)%typingText.length;setTimeout(type,500);}}
document.addEventListener("DOMContentLoaded",()=>type());

// Section reveal
// const sections=document.querySelectorAll("section");
// function revealSections(){sections.forEach(sec=>{const top=sec.getBoundingClientRect().top;if(top<window.innerHeight-120&&!sec.classList.contains("show"))sec.classList.add("show");});}
// window.addEventListener("scroll",revealSections);revealSections();
const sections = document.querySelectorAll("section");

function revealSections(){
  sections.forEach(sec=>{
    const top = sec.getBoundingClientRect().top;
    if(top < window.innerHeight-120 && !sec.classList.contains("show")){
      sec.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSections);

// Delay first reveal, but still allow scroll to trigger immediately after
document.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(()=>{ revealSections(); }, 600);
});




// Skills reveal
const skillsSec=document.querySelector("#skills"),skillItems=[...document.querySelectorAll(".skill")];let skillsShown=false;
// function revealSkills(){const top=skillsSec.getBoundingClientRect().top;if(top<window.innerHeight-120&&!skillsShown){skillsShown=true;let batch=0;for(let i=0;i<skillItems.length;i+=4){setTimeout(()=>{skillItems.slice(i,i+4).forEach(it=>it.classList.add("show"));},batch*800);batch++;}}}
function revealSkills(){
  const top = skillsSec.getBoundingClientRect().top;
  if(top < window.innerHeight - 120 && !skillsShown){
    skillsShown = true;
    let batch = 0;
    // 👇 2 at a time for <=768px, otherwise 4
    let step = window.innerWidth <= 768 ? 2 : 4;
    for(let i=0; i<skillItems.length; i+=step){
      setTimeout(()=>{
        skillItems.slice(i, i+step).forEach(it => it.classList.add("show"));
      }, batch*800);
      batch++;
    }
  }
}

window.addEventListener("scroll",revealSkills);

// Active nav highlight
const navLinks=document.querySelectorAll("nav a");
window.addEventListener("scroll",()=>{let current="";sections.forEach(sec=>{const secTop=sec.offsetTop-150;if(scrollY>=secTop)current=sec.getAttribute("id");});navLinks.forEach(a=>{a.classList.remove("active");if(a.getAttribute("href")==="#"+current)a.classList.add("active");});});

// Particles background
particlesJS("particles-js",{"particles":{"number":{"value":120},"size":{"value":2},"move":{"speed":0.5},"line_linked":{"enable":false},"color":{"value":"#fff"},"opacity":{"value":0.8}}});

const projects = [
  {
    title: "DreamConnect",
    desc: "A platform for personal goal sharing and tracking with community features. Includes progress tracking, AI suggestions, and community wall.",
    demo: "https://manasa1349.github.io/DreamConnect/",
    repo: "https://github.com/manasa1349/DreamConnect",
    images: ["d2.png", "d3.png", "d4.png", "d5.png"],
    tech: "React, Node.js, MongoDB, Docker",
    duration: "Jan 2025 – Apr 2025",
    role: "Full-stack Developer (UI + API Integration)",
    features: [
      "✔️ Responsive, mobile-first design",
      "✔️ Real-time updates & interactive features",
      "✔️ Secure authentication and role management",
      "✔️ Optimized backend for performance"
    ]
  },
  {
    title: "Planurise",
    desc: "Event planning & budget tracker for birthdays, weddings, and more. Features guest management, reminders, and cost breakdowns.",
    demo: "https://manasa1349.github.io/Planurise/",
    repo: "https://github.com/manasa1349/Planurise",
    images: ["p2.png", "p3.png", "p4.png", "p5.png"],
    tech: "HTML, CSS, JavaScript",
    duration: "Oct 2024 – Dec 2024",
    role: "Frontend Developer",
    features: [
      "✔️ Dynamic budget breakdowns",
      "✔️ Guest list with RSVP tracking",
      "✔️ Event reminders & notifications",
      "✔️ Clean UI with responsive design"
    ]
  },
  {
    title: "Digital Library",
    desc: "Book issuing and management system with admin dashboard, issue tracking, and user management. Still under development.",
    demo: null, // no demo yet
    repo: null, // no repo yet
    images: ["l2.png", "l3.png", "l4.png", "l5.png"],
    tech: "Python, Flask, SQL",
    duration: "Feb 2025 – Ongoing",
    role: "Backend Developer",
    features: [
      "✔️ Book issue/return system",
      "✔️ Admin dashboard for tracking",
      "✔️ Student record management",
      "✔️ Database optimized for queries"
    ]
  }
];

let currentProj = 0, currentImg = 0;

function openModal(i) {
  currentProj = i;
  currentImg = 0;

  // Title + Description
  document.getElementById("modalTitle").textContent = projects[i].title;
  document.getElementById("modalDesc").textContent = projects[i].desc;

  // Tech stack, duration, role
  document.getElementById("modalExtra").innerHTML =
    `<strong>Tech Stack:</strong> ${projects[i].tech} <br>
     <strong>Duration:</strong> ${projects[i].duration} <br>
     <strong>Role:</strong> ${projects[i].role}`;

  // Features list
  const featuresList = document.getElementById("modalFeatures");
  featuresList.innerHTML = "";
  projects[i].features.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    featuresList.appendChild(li);
  });

  // Links: show/hide depending on availability
  const demoLinkEl = document.getElementById("demoLink");
  const repoLinkEl = document.getElementById("repoLink");
  const badge = document.getElementById("modalBadge");
  if (projects[i].demo) {
    demoLinkEl.style.display = "inline-block";
    demoLinkEl.href = projects[i].demo;
  } else {
    demoLinkEl.style.display = "none";
  }
  if (projects[i].repo) {
    repoLinkEl.style.display = "inline-block";
    repoLinkEl.href = projects[i].repo;
  } else {
    repoLinkEl.style.display = "none";
  }
  // If both missing, show "In Progress" badge
  if (!projects[i].demo && !projects[i].repo) {
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }

  // Carousel first image
  const carousel = document.getElementById("carouselImg");
  if (projects[i].images && projects[i].images.length) {
    carousel.src = projects[i].images[0];
  } else {
    carousel.src = "placeholder.jpg";
  }

  // Show modal
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }
}

function prevImg() {
  currentImg = (currentImg - 1 + projects[currentProj].images.length) % projects[currentProj].images.length;
  document.getElementById("carouselImg").src = projects[currentProj].images[currentImg];
}
function nextImg() {
  currentImg = (currentImg + 1) % projects[currentProj].images.length;
  document.getElementById("carouselImg").src = projects[currentProj].images[currentImg];
}


// ====== Certifications carousel (desktop: CSS anim, mobile: JS-driven) ======
(function () {
  const carouselWrapper = document.querySelector('.cert-carousel-wrapper');
  const certCarousel = document.getElementById('certCarousel');
  if (!carouselWrapper || !certCarousel) return;

  // Save original content (first-time)
  if (!certCarousel.dataset.original) {
    certCarousel.dataset.original = certCarousel.innerHTML.trim();
  }

  function cleanupDesktopHandlers() {
    certCarousel.onmouseover = null;
    certCarousel.onmouseout = null;
    // stop any transform
    certCarousel.style.transform = '';
    certCarousel.style.transition = '';
    // clear interval if any
    if (window.__certInterval) {
      clearInterval(window.__certInterval);
      window.__certInterval = null;
    }
  }

  function initDesktop() {
    cleanupDesktopHandlers();

    // restore original and duplicate it for seamless CSS loop
    const original = certCarousel.dataset.original;
    certCarousel.innerHTML = original + original; // seamless loop needs duplicated set

    // reset widths/styles
    const cards = certCarousel.querySelectorAll('.cert-card');
    cards.forEach(c => {
      c.style.flex = '';
      c.style.maxWidth = '';
    });
    certCarousel.style.width = '';
    certCarousel.style.animation = certCarousel.style.animation || ''; // let CSS handle it

    // add hover pause (desktop only)
    certCarousel.onmouseover = () => {
      certCarousel.style.animationPlayState = 'paused';
    };
    certCarousel.onmouseout = () => {
      certCarousel.style.animationPlayState = 'running';
    };
  }

function initMobileOrTablet() {
  cleanupDesktopHandlers();

  // restore original (single set) — JS slider will handle movement
  const original = certCarousel.dataset.original;
  certCarousel.innerHTML = original;

  const cards = certCarousel.querySelectorAll('.cert-card');
  if (!cards.length) return;

  // compute exact pixel width we must slide by (wrapper's visible width)
  const visibleWidth = carouselWrapper.clientWidth;

  // set exact widths so each card occupies exactly visibleWidth
  certCarousel.style.width = `${visibleWidth * cards.length}px`;

  cards.forEach(card => {
    card.style.flex = `0 0 ${visibleWidth}px`;
    card.style.maxWidth = `${visibleWidth}px`;
    card.style.margin = "0"; // 🔑 enforce no margin
  });

  // Auto-slide
  let currentIndex = 0;

  // clear previous interval if any
  if (window.__certInterval) clearInterval(window.__certInterval);

  window.__certInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    certCarousel.style.transform = `translateX(-${currentIndex * visibleWidth}px)`;
    certCarousel.style.transition = 'transform 0.6s ease';
  }, 3000);
}

  // initializer that chooses mode based on width
  function initCertCarousel() {
    const w = window.innerWidth;
    if (w > 1024) {
      initDesktop();
    } else {
      initMobileOrTablet();
    }
  }

  // Run on load
  document.addEventListener('DOMContentLoaded', initCertCarousel);

  // Re-init on resize (debounced)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initCertCarousel, 150);
  });
})();


// Achievement counters
function animateValue(el,start,end,duration,appendPlus=false){
  const startTime=performance.now();
  function tick(now){
    const progress=Math.min((now-startTime)/duration,1);
    const value=Math.floor(start+(end-start)*progress);
    el.textContent=value+(appendPlus?'+':'');
    if(progress<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const achCards=document.querySelectorAll('.ach-card[data-count]');
const achObserver=new IntersectionObserver((entries,obs)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const target=e.target;
      const numEl=target.querySelector('.ach-num');
      const final=parseInt(target.dataset.count,10);
      animateValue(numEl,0,final,2000,true);
      obs.unobserve(target);
    }
  });
},{threshold:0.5});
achCards.forEach(c=>achObserver.observe(c));

// Tools train effect
const tools=document.querySelectorAll('#toolsRow .tool');
const toolsObserver=new IntersectionObserver((entries,obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      tools.forEach((tool,i)=>{
        setTimeout(()=>tool.classList.add('show'),i*200);
      });
      obs.unobserve(entry.target);
    }
  });
},{threshold:0.3});
const toolsRow=document.getElementById('toolsRow');
if(toolsRow)toolsObserver.observe(toolsRow);

// Contact form fake submit
const form=document.querySelector('.contact-right');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('button');
    btn.textContent='Sending...';btn.disabled=true;
    setTimeout(()=>{
      btn.textContent='Sent ✓';
      setTimeout(()=>{
        btn.textContent='Send';btn.disabled=false;form.reset();
      },1500);
    },1000);
  });
}


function openSidebar() {
  document.getElementById("sidebar").style.right = "0";
  document.body.style.overflow = "hidden"; // prevent background scroll
}
function closeSidebar() {
  document.getElementById("sidebar").style.right = "-260px";
  document.body.style.overflow = ""; 
}

