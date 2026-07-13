/**
 * Fio que segue o cursor
 * 
 * Princípios:
 * - SRP: Canvas animado seguindo o cursor
 * - OCP: Configurações podem ser ajustadas sem alterar a lógica
 */

/**
 * Inicializa fio que segue o cursor
 * @param {string} selector 
 * @param {Object} options
 */
export function initThreadCursor(
  selector = 'thread-cursor',
  options = { points: 16, ease: 0.35 }
) {
  const canvas = document.getElementById(selector);
  if (!canvas || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const ctx = canvas.getContext('2d');
  const POINTS = options.points;
  const EASE = options.ease;
  const colors = ['#912c2c', '#bc8769', '#576b53'];

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let points = Array.from({ length: POINTS }, () => ({ x: mouse.x, y: mouse.y }));
  let hasMoved = false;

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    hasMoved = true;
  });

  document.addEventListener('mouseleave', () => { hasMoved = false; });

  function animate() {
    points[0].x += (mouse.x - points[0].x) * EASE;
    points[0].y += (mouse.y - points[0].y) * EASE;

    for (let i = 1; i < points.length; i++) {
      points[i].x += (points[i - 1].x - points[i].x) * EASE;
      points[i].y += (points[i - 1].y - points[i].y) * EASE;
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if (hasMoved) {
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const t = i / points.length;
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.lineWidth = Math.max(0.6, 3.2 * (1 - t));
        ctx.strokeStyle = colors[i % colors.length];
        ctx.globalAlpha = 1 - t * 0.85;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#912c2c';
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
