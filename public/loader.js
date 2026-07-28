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
    const statusEl      = document.getElementById('status-text');
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
    const bgCtx         = bgCanvas.getContext('2d');

    const kf = document.createElement('style');
    kf.textContent = `
    @keyframes logoFloat {
        0%,100% { transform: translateY(5px) rotate(-0.6deg); }
        50%      { transform: translateY(-5px) rotate(0.6deg); }
    }
    @keyframes dotPing {
        0%   { box-shadow: 0 0 0 2.5px rgba(0,210,255,0.25), 0 0 14px #00d2ff, 0 0 35px rgba(0,210,255,0.5); }
        50%  { box-shadow: 0 0 0 5px rgba(0,210,255,0.15), 0 0 20px #00d2ff, 0 0 50px rgba(0,210,255,0.6); }
        100% { box-shadow: 0 0 0 2.5px rgba(0,210,255,0.25), 0 0 14px #00d2ff, 0 0 35px rgba(0,210,255,0.5); }
    }
    @keyframes logoPulse {
        0%,100% { transform: scale(1);    filter: brightness(var(--lb,1)) drop-shadow(0 0 var(--lg,20px) rgba(0,210,255,0.5)); }
        50%      { transform: scale(1.03); filter: brightness(calc(var(--lb,1) + 0.1)) drop-shadow(0 0 calc(var(--lg,20px) * 1.6) rgba(0,210,255,0.75)); }
    }`;
    document.head.appendChild(kf);

    const messages = [
        { at: 0,   msg: 'Initializing system...' },
        { at: 18,  msg: 'Loading assets...' },
        { at: 40,  msg: 'Building experience...' },
        { at: 68,  msg: 'Almost there...' },
        { at: 90,  msg: 'Welcome.' },
    ];
    let lastMsgIdx = -1;

    function updateStatus(p) {
        let idx = 0;
        messages.forEach((m, i) => { if (p >= m.at) idx = i; });
        if (idx === lastMsgIdx) return;
        lastMsgIdx = idx;
        statusEl.style.opacity = '0';
        setTimeout(() => {
            statusEl.innerText    = messages[idx].msg;
            statusEl.style.opacity = '1';
        }, 300);
    }

    function resizeBg() {
        bgCanvas.width  = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    }
    resizeBg();
    window.addEventListener('resize', resizeBg);

    const particles = Array.from({ length: 65 }, () => ({
        x:  Math.random() * window.innerWidth,
        y:  Math.random() * window.innerHeight,
        r:  Math.random() * 1.0 + 0.2,
        vy: -(Math.random() * 0.3 + 0.07),
        vx: (Math.random() - 0.5) * 0.1,
        op: Math.random() * 0.35 + 0.08,
        od: Math.random() > 0.5 ? 1 : -1,
    }));

    function drawBg(p) {
        bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        const r  = p / 100;
        const cx = bgCanvas.width / 2;
        const cy = bgCanvas.height / 2;

        const g = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, bgCanvas.width * 0.55);
        g.addColorStop(0,   `rgba(0,55,180,${0.12 * r})`);
        g.addColorStop(0.35,`rgba(0,210,255,${0.05 * r})`);
        g.addColorStop(1,   'rgba(0,0,0,0)');
        bgCtx.fillStyle = g;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

        if (r > 0.4) {
            const beamAlpha = (r - 0.4) * 0.06;
            const bg2 = bgCtx.createLinearGradient(0, cy, bgCanvas.width, cy);
            bg2.addColorStop(0, 'transparent');
            bg2.addColorStop(0.5, `rgba(0,210,255,${beamAlpha})`);
            bg2.addColorStop(1, 'transparent');
            bgCtx.fillStyle = bg2;
            bgCtx.fillRect(0, cy - 60, bgCanvas.width, 120);
        }

        particles.forEach(pt => {
            pt.y  += pt.vy;
            pt.x  += pt.vx;
            pt.op += pt.od * 0.003;
            if (pt.op > 0.45 || pt.op < 0.04) pt.od *= -1;
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
    let dotAnimating  = false;

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
        if (p > 1 && !dotAnimating) {
            dotAnimating = true;
            dot.style.animation = 'dotPing 2s ease-in-out infinite';
        }

        label.innerText     = Math.floor(p) + '%';
        label.style.opacity = p > 1 ? '1' : '0';
        if (p >= 90) {
            label.style.color = `rgba(0,210,255,${clamp((p-90)/10,0,1)})`;
        }

        statusEl.style.opacity = p > 2 ? '1' : '0';
        updateStatus(p);

        const logoEase     = easeOutExpo(r);
        const logoOpacity  = clamp(0.06 + logoEase * 0.94, 0.06, 1);
        const logoBright   = clamp(0.35 + logoEase * 1.15, 0.35, 1.5);
        const logoGlowPx   = logoEase * 55;
        const logoGlowAlpha = logoEase * 0.8;

        logo.style.opacity = logoOpacity;
        logo.style.filter  = `brightness(${logoBright}) drop-shadow(0 0 ${logoGlowPx}px rgba(0,210,255,${logoGlowAlpha}))`;

        logoGlow.style.opacity   = clamp(ease * 1.1, 0, 0.9);
        logoGlow.style.transform = `scale(${0.6 + ease})`;

        logoStage.style.transform = `scale(${1 + ease * 0.05})`;

        if (p >= 15 && !phaseRings) {
            phaseRings = true;
            [ring1, ring2, ring3].forEach(r => r.style.animationPlayState = 'running');
            orbitFlare.style.animationPlayState = 'running';
            logoScanner.style.animationPlayState = 'running';
            logoGlow2.style.animationPlayState   = 'running';
            logo.style.animation = 'logoFloat 4.5s cubic-bezier(0.4,0,0.2,1) infinite';
        }
        orbitFlare.style.opacity = clamp((ease - 0.1) * 1.5, 0, 0.9);
        logoScanner.style.opacity = clamp((ease - 0.1) * 2, 0, 1);
        logoGlow2.style.opacity   = clamp(ease * 0.7, 0, 0.6);
        ring1.style.opacity = clamp(ease * 2.5 - 0.2, 0, 1);
        ring2.style.opacity = clamp(ease * 2.5 - 0.5, 0, 0.65);
        ring3.style.opacity = clamp(ease * 2.5 - 0.8, 0, 0.4);

        if (p >= 30 && !phaseLetters) {
            phaseLetters = true;
            brandLetters.forEach((el, i) => {
                setTimeout(() => {
                    el.style.transition  = 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)';
                    el.style.opacity     = '1';
                    el.style.transform   = 'translateY(0)';
                }, i * 60);
            });
        }

        if (p >= 52 && !phaseDivider) {
            phaseDivider = true;
            brandDivider.style.width = '145px';
        }

        if (p >= 58 && !phaseSub) {
            phaseSub = true;
            setTimeout(() => {
                brandSub.style.transition = 'opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1)';
                brandSub.style.opacity    = '1';
                brandSub.style.transform  = 'translateY(0)';
            }, 150);
        }

        drawBg(p);
    }

    const DURATION = 2500;
    let startTime = null;

    function tick(ts) {
        if (!startTime) startTime = ts;
        const p = clamp((ts - startTime) / DURATION * 100, 0, 100);
        applyProgress(p);
        if (p < 100) {
            requestAnimationFrame(tick);
        } else {
            applyProgress(100);
            setTimeout(hideLoader, 1200);
        }
    }

    function hideLoader() {
        const screen = document.getElementById('loader-screen');
        if (!screen) return;
        screen.style.transition = 'opacity 1.4s cubic-bezier(0.4,0,0.2,1)';
        screen.style.opacity    = '0';
        document.body.style.overflow = '';
        setTimeout(() => {
            screen.remove();
        }, 1400);
    }

    document.body.style.overflow = 'hidden'; // lock scrolling while loading
    requestAnimationFrame(tick);
};

document.addEventListener('DOMContentLoaded', loaderScript);
