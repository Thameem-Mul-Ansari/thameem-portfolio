import { Component, Suspense, lazy, useEffect, useState } from 'react';

// The 3D scene (three.js + physics) is only downloaded on larger screens that allow motion.
const Scene = lazy(() => import('./LanyardScene.jsx'));
const QUERY = '(min-width: 900px) and (prefers-reduced-motion: no-preference)';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { document.documentElement.classList.remove('badge-3d-on'); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function Lanyard({ photo }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const update = () => setEnabled(mq.matches && hasWebGL());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) document.documentElement.classList.remove('badge-3d-on');
  }, [enabled]);

  if (!enabled) return null;
  return (
    <Boundary>
      <Suspense fallback={null}>
        <Scene photo={photo} onReady={() => document.documentElement.classList.add('badge-3d-on')} />
      </Suspense>
    </Boundary>
  );
}
