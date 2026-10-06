const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initCarousel(root: HTMLElement) {
  if (root.dataset.ready) return;
  root.dataset.ready = 'true';
  const track = root.querySelector<HTMLElement>('[data-track]');
  if (!track) return;
  const slides = Array.from(track.children) as HTMLElement[];
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-dot]'));
  const counter = root.querySelector<HTMLElement>('[data-counter]');
  let index = 0;

  const update = () => {
    index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
  };
  const go = (i: number) => {
    const next = (i + slides.length) % slides.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: reduceMotion() ? 'auto' : 'smooth' });
  };

  root.querySelector('[data-prev]')?.addEventListener('click', () => go(index - 1));
  root.querySelector('[data-next]')?.addEventListener('click', () => go(index + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  });
  let raf = 0;
  track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
  update();
}

export function initCarousels(scope: ParentNode = document) {
  scope.querySelectorAll<HTMLElement>('[data-carousel]').forEach(initCarousel);
}
