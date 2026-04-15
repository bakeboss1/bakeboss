/* ── Cursor ── */
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = -100,
  my = -100,
  rx = -100,
  ry = -100;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

(function loop() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  cur.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(loop);
})();

/* ── Floating crumbs ── */
for (let i = 0; i < 22; i++) {
  const c = document.createElement("div");
  c.className = "crumb";
  const size = Math.random() * 4 + 2;
  c.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}vw;
      bottom:${Math.random() * 20 - 10}px;
      animation-duration:${8 + Math.random() * 14}s;
      animation-delay:${Math.random() * 12}s;
      opacity:0;
      background:${Math.random() > 0.5 ? "#d4a853" : "#c49a6c"};
    `;
  document.body.appendChild(c);
}

/* ── Glitter dots around "Launching Soon" ── */
const wrap = document.getElementById("launchWrap");
const glitters = [
  { top: "-18px", left: "10px", delay: "0s", dur: "2.1s" },
  { top: "-22px", left: "50%", delay: ".4s", dur: "1.8s" },
  { top: "-14px", right: "12px", delay: ".8s", dur: "2.4s" },
  { top: "50%", left: "-14px", delay: "1.1s", dur: "1.9s" },
  { top: "50%", right: "-14px", delay: ".2s", dur: "2.6s" },
  { bottom: "-16px", left: "25%", delay: ".6s", dur: "2s" },
  { bottom: "-18px", right: "20%", delay: "1.3s", dur: "1.7s" },
];
glitters.forEach((g) => {
  const d = document.createElement("div");
  d.className = "glitter";
  Object.assign(d.style, g, {
    animationDelay: g.delay,
    animationDuration: g.dur,
  });
  wrap.appendChild(d);
});

/* ── Notify button ── */
function handleNotify(btn) {
  btn.textContent = "✓ You're on the list!";
  btn.style.background = "#6b8e5e";
  btn.style.color = "#fff";
  btn.disabled = true;
  /* mini burst */
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("div");
    s.style.cssText = `
        position:fixed;
        width:6px;height:6px;
        border-radius:50%;
        background:#d4a853;
        left:${btn.getBoundingClientRect().left + btn.offsetWidth / 2}px;
        top:${btn.getBoundingClientRect().top + btn.offsetHeight / 2}px;
        pointer-events:none;
        z-index:9999;
        transition:all .7s cubic-bezier(.2,.8,.3,1);
        opacity:1;
      `;
    document.body.appendChild(s);
    const angle = (i / 8) * Math.PI * 2;
    const dist = 40 + Math.random() * 30;
    requestAnimationFrame(() => {
      s.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
      s.style.opacity = "0";
    });
    setTimeout(() => s.remove(), 800);
  }
}
