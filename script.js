// --- SECUENCIA DE INTRO (FADE IN/OUT) ---
window.addEventListener('load', () => {
    const introText = document.getElementById('intro-text');
    const introPhoto = document.getElementById('intro-photo');
    const introLayer = document.getElementById('intro-layer');
    const mainContent = document.getElementById('main-content');

    setTimeout(() => { introText.style.opacity = '1'; }, 500);
    setTimeout(() => { introText.style.opacity = '0'; introPhoto.style.opacity = '1'; }, 2500);
    setTimeout(() => { 
        introLayer.style.opacity = '0'; 
        setTimeout(() => { 
            introLayer.style.display = 'none'; 
            mainContent.style.opacity = '1';
            document.body.classList.remove('no-scroll');
        }, 1500);
    }, 5000);
});

// --- RASTRO DE ONDAS ---
const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');
let points = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    points.push({ x: e.clientX, y: e.clientY, size: 20, opacity: 1 });
});

function animateTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach((p, i) => {
        p.opacity -= 0.02;
        p.size += 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 65, ${p.opacity})`;
        ctx.stroke();
        if (p.opacity <= 0) points.splice(i, 1);
    });
    requestAnimationFrame(animateTrail);
}
animateTrail();

// --- CONTADOR PROTOCOL 14-06 ---
function updateCountdown() {
    const target = new Date('June 14, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;

    document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);
