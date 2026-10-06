import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { CARD, cardShape, makeCardBack, makeCardFront, makeStrapTexture } from './textures.js';

extend({ MeshLineGeometry, MeshLineMaterial });

// Rope segment length and where the strap is pinned (camera units).
const SEGMENT = 0.72;
const ANCHOR_Y = 3.05;

const INFO = {
  siteName: 'Ansari Automates',
  firstName: 'Thameem',
  lastName: 'Mul Ansari',
  role: 'AI & Automation Engineer',
  current: 'Junior Software Engineer',
  company: 'Unlimited Innovations',
  city: 'Chennai, India',
  email: 'ansariautomates@gmail.com',
};

function useCardAssets(photo) {
  const [assets, setAssets] = useState(null);
  useEffect(() => {
    let alive = true;
    Promise.all([
      makeCardFront(photo, INFO),
      makeCardBack(INFO),
      makeStrapTexture('ANSARI AUTOMATES   ✦   AI & AUTOMATION   ✦   '),
    ]).then(([front, back, strap]) => alive && setAssets({ front, back, strap }));
    return () => { alive = false; };
  }, [photo]);
  return assets;
}

function useCardGeometry() {
  return useMemo(() => {
    const shape = cardShape();
    const body = new THREE.ExtrudeGeometry(shape, { depth: CARD.d, bevelEnabled: false, curveSegments: 10 });
    body.translate(0, 0, -CARD.d / 2);
    const face = new THREE.ShapeGeometry(shape, 10);
    const pos = face.attributes.position;
    const uv = face.attributes.uv;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / CARD.w + 0.5, pos.getY(i) / CARD.h + 0.5);
    uv.needsUpdate = true;
    return { body, face };
  }, []);
}

function Band({ assets, anchorX, onReady, maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const geo = useCardGeometry();
  const v = useMemo(() => ({ vec: new THREE.Vector3(), ang: new THREE.Vector3(), rot: new THREE.Vector3(), dir: new THREE.Vector3() }), []);
  const { width, height } = useThree((s) => s.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], SEGMENT]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => { onReady?.(); }, [onReady]);

  useEffect(() => {
    if (!hovered) return undefined;
    document.body.style.cursor = dragged ? 'grabbing' : 'grab';
    return () => { document.body.style.cursor = ''; };
  }, [hovered, dragged]);

  useEffect(() => {
    document.documentElement.classList.toggle('badge-dragging', !!dragged);
  }, [dragged]);

  useFrame((state, delta) => {
    const { vec, ang, rot, dir } = v;
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) return;
    [j1, j2].forEach((r) => {
      if (!r.current.lerped) r.current.lerped = new THREE.Vector3().copy(r.current.translation());
      const d = Math.max(0.1, Math.min(1, r.current.lerped.distanceTo(r.current.translation())));
      r.current.lerped.lerp(r.current.translation(), delta * (minSpeed + d * (maxSpeed - minSpeed)));
    });
    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
  });

  curve.curveType = 'chordal';

  const startDrag = (e) => {
    e.stopPropagation();
    e.target?.setPointerCapture?.(e.pointerId);
    drag(new THREE.Vector3().copy(e.point).sub(v.vec.copy(card.current.translation())));
  };
  const endDrag = (e) => {
    e.target?.releasePointerCapture?.(e.pointerId);
    drag(false);
  };

  return (
    <>
      <group position={[anchorX, ANCHOR_Y, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[CARD.w / 2, CARD.h / 2, 0.01]} />
          <group onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} onPointerDown={startDrag} onPointerUp={endDrag}>
            <mesh geometry={geo.body}>
              <meshStandardMaterial color="#c9cfdc" roughness={0.5} metalness={0.05} />
            </mesh>
            <mesh geometry={geo.face} position={[0, 0, CARD.d / 2 + 0.0008]}>
              <meshBasicMaterial map={assets.front} toneMapped={false} />
            </mesh>
            <mesh geometry={geo.face} position={[0, 0, -CARD.d / 2 - 0.0008]} rotation={[0, Math.PI, 0]}>
              <meshBasicMaterial map={assets.back} toneMapped={false} />
            </mesh>
            <mesh position={[0, CARD.h / 2 + 0.12, 0]}>
              <boxGeometry args={[0.24, 0.26, 0.05]} />
              <meshStandardMaterial color="#cfd4de" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0, CARD.h / 2 + 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.07, 0.018, 12, 28]} />
              <meshStandardMaterial color="#cfd4de" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" toneMapped={false} depthTest={false} resolution={[width, height]} useMap map={assets.strap} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}

function Rig({ assets, onReady }) {
  const { viewport } = useThree();
  // Hang the badge right of centre; computed once so the physics anchor stays put.
  const [anchorX] = useState(() => Math.min(viewport.width * 0.25, 3.2));
  return <Band assets={assets} anchorX={anchorX} onReady={onReady} />;
}

export default function LanyardScene({ photo, onReady }) {
  const assets = useCardAssets(photo);
  const [source, setSource] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    setSource(hero);
    if (!hero) return undefined;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  if (!assets || !source) return null;

  return (
    <Canvas
      eventSource={source}
      eventPrefix="client"
      frameloop={visible ? 'always' : 'never'}
      camera={{ position: [0, 0, 10.5], fov: 25 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={1.2} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Rig assets={assets} onReady={onReady} />
      </Physics>
      <Environment resolution={256} blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}
