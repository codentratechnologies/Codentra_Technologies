const loaderScript = () => {
    const logo          = document.getElementById('main-logo');
    const logoGlow      = document.getElementById('logo-glow');
    const logoGlow2     = document.querySelector('.logo-glow-2');
    const orbitFlare    = document.getElementById('orbit-flare');
    const logoScanner   = document.getElementById('logo-scanner');
    const logoStage     = document.getElementById('logo-stage');
    const fill          = document.getElementById('progress-fill');
    const dot           = document.getElementById('progress-dot');
    const label         = document.getElementById('progress-label');
    const ring1         = document.querySelector('.ring-1');
    const ring2         = document.querySelector('.ring-2');
    const ring3         = document.querySelector('.ring-3');
    const brandLetters  = document.querySelectorAll('.brand-name span');
    const brandSub      = document.getElementById('brand-sub');
    const brandDivider  = document.getElementById('brand-divider');
    const progressSec   = document.querySelector('.progress-section');
    const gridOverlay   = document.querySelector('.grid-overlay');
    const bgCanvas      = document.getElementById('bg-canvas');
    if (!bgCanvas) return; // safeguard
    const bgCtx         = bgCanvas.getContext('2d', { alpha: true });

    function resizeBg() {
        bgCanvas.width  = Math.min(window.innerWidth, 1920);
        bgCanvas.height = Math.min(window.innerHeight, 1080);
    }
    resizeBg();

    // Lightweight particles count to ensure zero CPU/GPU lag on budget devices
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 18 : 32;

    const particles = Array.from({ length: particleCount }, () => ({
        x:  Math.random() * bgCanvas.width,
        y:  Math.random() * bgCanvas.height,
        r:  Math.random() * 0.8 + 0.3,
        vy: -(Math.random() * 0.25 + 0.08),
        vx: (Math.random() - 0.5) * 0.08,
        op: Math.random() * 0.3 + 0.1,
        od: Math.random() > 0.5 ? 1 : -1,
    }));

    function drawBg(p) {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        const r  = p / 100;
        const cx = bgCanvas.width / 2;
        const cy = bgCanvas.height / 2;

        const g = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, bgCanvas.width * 0.55);
        g.addColorStop(0,   `rgba(0,55,180,${0.12 * r})`);
        g.addColorStop(0.4, `rgba(0,210,255,${0.04 * r})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        bgCtx.fillStyle = g;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

        particles.forEach(pt => {
            pt.y  += pt.vy;
            pt.x  += pt.vx;
            pt.op += pt.od * 0.003;
            if (pt.op > 0.4 || pt.op < 0.05) pt.od *= -1;
            if (pt.y < -5) { pt.y = bgCanvas.height + 5; pt.x = Math.random() * bgCanvas.width; }

            bgCtx.beginPath();
            bgCtx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
            bgCtx.fillStyle = `rgba(0,210,255,${pt.op * r})`;
            bgCtx.fill();
        });
    }

    const easeInOutCubic = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    const easeOutExpo    = t => t === 1 ? 1 : 1 - Math.pow(2, -10*t);
    const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

    let phaseGrid     = false;
    let phaseProgress = false;
    let phaseRings    = false;
    let phaseLetters  = false;
    let phaseDivider  = false;
    let phaseSub      = false;

    function applyProgress(p) {
        const r    = p / 100;
        const ease = easeInOutCubic(r);

        if (p > 5 && !phaseGrid) {
            phaseGrid = true;
            gridOverlay.style.opacity = '1';
        }

        if (p > 2 && !phaseProgress) {
            phaseProgress = true;
            progressSec.style.opacity   = '1';
            progressSec.style.transform = 'translateY(0)';
        }

        fill.style.width  = p + '%';
        dot.style.left    = p + '%';
        dot.style.opacity = p > 1 ? '1' : '0';

        label.innerText     = Math.floor(p) + '%';
        label.style.opacity = p > 1 ? '1' : '0';

        const logoEase     = easeOutExpo(r);
        const logoOpacity  = clamp(0.06 + logoEase * 0.94, 0.06, 1);
        const logoBright   = clamp(0.35 + logoEase * 1.15, 0.35, 1.3);

        logo.style.opacity = logoOpacity;
        logo.style.filter  = `brightness(${logoBright})`;

        logoGlow.style.opacity   = clamp(ease * 0.9, 0, 0.8);
        logoGlow.style.transform = `scale(${0.7 + ease * 0.4})`;

        if (p >= 15 && !phaseRings) {
            phaseRings = true;
            [ring1, ring2, ring3].forEach(r => r.style.animationPlayState = 'running');
            orbitFlare.style.animationPlayState = 'running';
            logoScanner.style.animationPlayState = 'running';
            logoGlow2.style.animationPlayState   = 'running';
        }
        orbitFlare.style.opacity = clamp((ease - 0.1) * 1.5, 0, 0.9);
        logoScanner.style.opacity = clamp((ease - 0.1) * 2, 0, 1);
        logoGlow2.style.opacity   = clamp(ease * 0.6, 0, 0.5);
        ring1.style.opacity = clamp(ease * 2.5 - 0.2, 0, 1);
        ring2.style.opacity = clamp(ease * 2.5 - 0.5, 0, 0.65);
        ring3.style.opacity = clamp(ease * 2.5 - 0.8, 0, 0.4);

        if (p >= 25 && !phaseLetters) {
            phaseLetters = true;
            brandLetters.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition  = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
                    el.style.opacity     = '1';
                    el.style.transform   = 'translateY(0)';
                }, i * 35);
            });
        }

        if (p >= 45 && !phaseDivider) {
            phaseDivider = true;
            brandDivider.style.width = '145px';
        }

        if (p >= 50 && !phaseSub) {
            phaseSub = true;
            brandSub.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
            brandSub.style.opacity    = '1';
            brandSub.style.transform  = 'translateY(0)';
        }

        drawBg(p);
    }

    const DURATION = 1200; // Snappy 1.2s loading time to prevent lag
    let startTime = null;

    function tick(ts) {
        if (!startTime) startTime = ts;
        const p = clamp((ts - startTime) / DURATION * 100, 0, 100);
        applyProgress(p);
        if (p < 100) {
            requestAnimationFrame(tick);
        } else {
            applyProgress(100);
            setTimeout(hideLoader, 400);
        }
    }

    function hideLoader() {
        const screen = document.getElementById('loader-screen');
        if (!screen) return;
        screen.style.transition = 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)';
        screen.style.opacity    = '0';
        document.body.style.overflow = '';
        setTimeout(() => {
            screen.remove();
        }, 650);
    }

    document.body.style.overflow = 'hidden';
    requestAnimationFrame(tick);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loaderScript);
} else {
    loaderScript();
}
