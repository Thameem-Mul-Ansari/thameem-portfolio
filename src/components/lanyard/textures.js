import * as THREE from 'three';

const BLUE = '#2f4bff';
const ORANGE = '#ff6a2b';
const INK = '#16181d';
const INK2 = '#4a4f5c';
const MIST = '#f3f4f7';

export const CARD = { w: 1.6, h: 2.25, d: 0.02, r: 0.09 };

async function fontsReady() {
  if (!document.fonts) return;
  const loads = [
    '160px "Instrument Serif"',
    'italic 140px "Instrument Serif"',
    '600 44px Geist',
    '500 34px Geist',
  ].map((f) => document.fonts.load(f).catch(() => null));
  await Promise.race([Promise.all(loads), new Promise((r) => setTimeout(r, 2500))]);
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function pill(ctx, x, y, text, bg, fg) {
  ctx.font = '600 34px Geist, sans-serif';
  const w = ctx.measureText(text).width + 48;
  ctx.fillStyle = bg;
  roundRect(ctx, x, y, w, 64, 32);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x + 24, y + 33);
  ctx.textBaseline = 'alphabetic';
  return w;
}

function wrap(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ');
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineH;
    } else line = test;
  }
  ctx.fillText(line, x, y);
  return y;
}

function toTexture(canvas) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.needsUpdate = true;
  return t;
}

export async function makeCardFront(photoSrc, info) {
  await fontsReady();
  const W = 1024, H = 1440;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // punched slot
  ctx.fillStyle = MIST;
  roundRect(ctx, W / 2 - 100, 44, 200, 36, 18);
  ctx.fill();

  ctx.fillStyle = INK2;
  ctx.font = '500 34px Geist, sans-serif';
  ctx.fillText(info.siteName, 80, 160);
  ctx.textAlign = 'right';
  ctx.fillText(String(new Date().getFullYear()), W - 80, 160);
  ctx.textAlign = 'left';

  // photo
  const img = await loadImage(photoSrc);
  const size = 340, px = 80, py = 210;
  ctx.save();
  ctx.beginPath();
  ctx.arc(px + size / 2, py + size / 2, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = MIST;
  ctx.fillRect(px, py, size, size);
  if (img) {
    const s = Math.min(img.width, img.height);
    ctx.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, px, py, size, size);
  }
  ctx.restore();

  // stamp to the right of the photo
  ctx.save();
  ctx.translate(720, 380);
  ctx.rotate(-0.12);
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 6;
  roundRect(ctx, -170, -70, 340, 140, 24);
  ctx.stroke();
  ctx.fillStyle = ORANGE;
  ctx.font = '600 38px Geist, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Open to', 0, -8);
  ctx.fillText('opportunities', 0, 40);
  ctx.restore();
  ctx.textAlign = 'left';

  // name
  ctx.fillStyle = INK;
  ctx.font = '170px "Instrument Serif", Georgia, serif';
  ctx.fillText(info.firstName, 72, 740);
  ctx.fillStyle = BLUE;
  ctx.font = 'italic 150px "Instrument Serif", Georgia, serif';
  ctx.fillText(info.lastName, 72, 870);

  ctx.fillStyle = INK;
  ctx.font = '600 46px Geist, sans-serif';
  ctx.fillText(info.role, 80, 950);

  ctx.fillStyle = INK2;
  ctx.font = '500 34px Geist, sans-serif';
  wrap(ctx, `${info.current} at ${info.company}`, 80, 1010, W - 160, 44);

  let x = 80;
  x += pill(ctx, x, 1110, '4× Microsoft certified', BLUE, '#ffffff') + 16;
  pill(ctx, x, 1110, '5× hackathon winner', ORANGE, INK);

  // footer band
  ctx.fillStyle = BLUE;
  ctx.fillRect(0, 1290, W, 150);
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 40px Geist, sans-serif';
  ctx.fillText(info.city, 80, 1378);
  // barcode
  let bx = W - 80;
  const bars = [6, 3, 9, 3, 4, 8, 3, 5, 10, 3, 6, 4, 3, 9, 5, 3, 7, 4];
  for (const b of bars) {
    bx -= b;
    ctx.fillRect(bx, 1330, b, 70);
    bx -= 6;
  }
  return toTexture(c);
}

export async function makeCardBack(info) {
  await fontsReady();
  const W = 1024, H = 1440;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = BLUE;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  roundRect(ctx, W / 2 - 100, 44, 200, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '130px "Instrument Serif", Georgia, serif';
  let y = wrap(ctx, 'Agents, voice bots and automations that do real work.', 80, 420, W - 160, 130);
  ctx.font = '500 38px Geist, sans-serif';
  ctx.fillText(info.email, 80, y + 160);
  ctx.fillStyle = ORANGE;
  ctx.fillRect(80, 1300, 120, 12);
  return toTexture(c);
}

export function makeStrapTexture(label) {
  const W = 1024, H = 96;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = BLUE;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 44px Geist, sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 40, H / 2 + 2);
  const t = toTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

export function cardShape() {
  const { w, h, r } = CARD;
  const x = -w / 2, y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
