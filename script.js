document.addEventListener('DOMContentLoaded', () => {
    const text = document.getElementById('intro-text');
    const photo = document.getElementById('intro-photo');
    const layer = document.getElementById('intro-layer');
    const main = document.getElementById('main-content');

    // 1. SECUENCIA DE INTRO
    setTimeout(() => { if(text) text.style.opacity = '1'; }, 800);
    setTimeout(() => { if(text) text.style.opacity = '0'; }, 2800);
    setTimeout(() => { if(photo) photo.style.opacity = '1'; }, 4300);
    setTimeout(() => { if(photo) photo.style.opacity = '0'; }, 6300);
    setTimeout(() => {
        if(layer) {
            layer.style.opacity = '0';
            setTimeout(() => {
                layer.style.display = 'none';
                if(main) main.style.opacity = '1';
                document.body.classList.remove('no-scroll');
            }, 1000);
        }
    }, 7800);

    // 2. CRONÓMETRO PROTOCOL 14-06
    const target = new Date("June 14, 2026 00:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        if(diff > 0) {
            document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById('seconds').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
    }, 1000);

    // 3. RASTRO DE ONDAS DE SONIDO
    const canvas = document.getElementById('trail-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        particles.push({ x: e.clientX, y: e.clientY, radius: 2, opacity: 1 });
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 255, 65, ${p.opacity})`;
            ctx.stroke();
            p.radius += 1.5;
            p.opacity -= 0.02;
            if (p.opacity <= 0) { particles.splice(i, 1); i--; }
        }
        requestAnimationFrame(animate);
    }
    animate();
});