"use client";

/**
 * ============================================================================
 *  BUILDING SCENE — the cinematic scroll-driven construction visualisation.
 * ============================================================================
 *
 *  HOW IT WORKS (read this before editing):
 *  -----------------------------------------
 *  • `scrollState.progress` (0 → 1) is written by the GSAP ScrollTrigger in
 *    `Hero.tsx`. Inside `useFrame` we ease it towards the target so motion
 *    feels architectural, not jumpy.
 *  • The building is composed of PART GROUPS. Every part group declares a
 *    [start, end] window on the 0–1 progress timeline. `stageT()` maps the
 *    current progress into a local 0–1 value for that group, which drives
 *    its scale / opacity / position.
 *
 *  TIMELINE MAP (edit windows here to retune the build sequence):
 *    0.00–0.10  site & footings          (PLANNING)
 *    0.10–0.50  columns rise + slabs     (STRUCTURAL EXECUTION)
 *    0.45–0.65  masonry walls            (MASONRY & SERVICES)
 *    0.62–0.78  balconies + façade fins  (MASONRY & SERVICES cont.)
 *    0.75–0.92  glazing + finishing      (FINISHING)
 *    0.90–1.00  final lighting reveal    (FINAL HANDOVER)
 *
 *  To add more geometry: build it under a <group ref>, give it a window,
 *  and drive it inside its own useFrame the same way the parts below do.
 * ============================================================================
 */

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";

/* ---------- helpers ---------- */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Map global progress p into a local 0–1 window [a, b], eased in-out. */
function stageT(p: number, a: number, b: number) {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t); // smoothstep
}

/** Standard materials shared across the build (edit colours here). */
function useMaterials() {
  return useMemo(
    () => ({
      rcc: new THREE.MeshStandardMaterial({ color: "#9aa0a6", roughness: 0.9 }),
      slab: new THREE.MeshStandardMaterial({ color: "#b9bdc2", roughness: 0.95 }),
      wall: new THREE.MeshStandardMaterial({ color: "#d9d5cb", roughness: 0.9 }),
      glass: new THREE.MeshStandardMaterial({
        color: "#9fc8d8",
        roughness: 0.15,
        metalness: 0.6,
        emissive: "#1a2b33",
        emissiveIntensity: 0.4,
      }),
      cladding: new THREE.MeshStandardMaterial({ color: "#3d4653", roughness: 0.6, metalness: 0.4 }),
      gold: new THREE.MeshStandardMaterial({ color: "#c8a15a", roughness: 0.35, metalness: 0.8 }),
      ground: new THREE.MeshStandardMaterial({ color: "#10141b", roughness: 1 }),
    }),
    []
  );
}

/* ---------- static site base ---------- */

function Ground({ mat }: { mat: THREE.Material }) {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow material={mat}>
        <planeGeometry args={[70, 70]} />
      </mesh>
      {/* subtle blueprint grid overlay */}
      <gridHelper args={[70, 70, "#22303f", "#141c26"]} position={[0, 0.01, 0]} />
    </group>
  );
}

/* ---------- part group wrapper ---------- */

/** Renders children scaled-in (from below / shrinking footprint) over a window. */
function Part({
  window: w,
  grow = "y",
  children,
}: {
  window: [number, number];
  grow?: "y" | "full" | "fade";
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const t = stageT(scrollState.eased, w[0], w[1]);
    const g = ref.current;
    if (!g) return;
    g.visible = t > 0.001;
    if (grow === "y") g.scale.set(1, Math.max(t, 0.0001), 1);
    else if (grow === "full") g.scale.setScalar(Math.max(t, 0.0001));
    else g.scale.setScalar(1); // fade variant keeps scale
    g.position.y = grow === "y" ? 0 : (1 - t) * -0.2;
  });
  return <group ref={ref}>{children}</group>;
}

/* ---------- building parts ---------- */

// Layout constants — change these to reshape the building.
export const FLOORS = 4;
export const FH = 1.15;              // floor height
const XS = [-3, -1, 1, 3];           // column X positions
const ZS = [-2.2, 0, 2.2];           // column Z positions

function Footings({ mats }: any) {
  return (
    <Part window={[0.02, 0.14]} grow="full">
      {XS.flatMap((x) =>
        ZS.map((z) => (
          <mesh key={`f${x}${z}`} position={[x, 0.18, z]} castShadow material={mats.rcc}>
            <boxGeometry args={[1.1, 0.36, 1.1]} />
          </mesh>
        ))
      )}
      {/* plinth beams */}
      {[-2.2, 0, 2.2].map((z) => (
        <mesh key={`pb${z}`} position={[0, 0.42, z]} castShadow material={mats.rcc}>
          <boxGeometry args={[7.4, 0.22, 0.4]} />
        </mesh>
      ))}
    </Part>
  );
}

function Columns({ mats }: any) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    g.children.forEach((col, i) => {
      const floor = Math.floor(i / (XS.length * ZS.length));
      const t = stageT(scrollState.eased, 0.1 + floor * 0.08, 0.22 + floor * 0.08);
      col.scale.y = Math.max(t, 0.0001);
      col.position.y = floor * FH + (FH / 2) * t;
      col.visible = t > 0.001;
    });
  });
  const cols: React.ReactNode[] = [];
  for (let f = 0; f < FLOORS; f++)
    for (const x of XS)
      for (const z of ZS)
        cols.push(
          <mesh key={`c${f}${x}${z}`} castShadow material={mats.rcc}>
            <boxGeometry args={[0.28, FH, 0.28]} />
          </mesh>
        );
  return <group ref={ref}>{cols}</group>;
}

function Slabs({ mats }: any) {
  return (
    <>
      {Array.from({ length: FLOORS }).map((_, i) => (
        <Part key={`s${i}`} window={[0.2 + i * 0.07, 0.3 + i * 0.07]} grow="y">
          <mesh position={[0, (i + 1) * FH, 0]} castShadow receiveShadow material={mats.slab}>
            <boxGeometry args={[7.8, 0.18, 5.6]} />
          </mesh>
        </Part>
      ))}
    </>
  );
}

function Walls({ mats }: any) {
  const W = 6.6, D = 4.6;
  return (
    <>
      {Array.from({ length: FLOORS }).map((_, i) => (
        <Part key={`w${i}`} window={[0.45 + i * 0.045, 0.56 + i * 0.045]} grow="y">
          <group position={[0, i * FH + FH / 2 + 0.1, 0]}>
            <mesh castShadow material={mats.wall}><boxGeometry args={[W, FH - 0.2, 0.16]} /></mesh>
            <mesh castShadow material={mats.wall} position={[0, 0, 0]}>
              <boxGeometry args={[0.16, FH - 0.2, D]} />
            </mesh>
            <mesh position={[0, 0, -D / 2]} castShadow material={mats.wall}>
              <boxGeometry args={[W, FH - 0.2, 0.16]} />
            </mesh>
            <mesh position={[0, 0, D / 2]} castShadow material={mats.wall}>
              <boxGeometry args={[W, FH - 0.2, 0.16]} />
            </mesh>
          </group>
        </Part>
      ))}
    </>
  );
}

function Balconies({ mats }: any) {
  return (
    <Part window={[0.6, 0.72]} grow="full">
      {Array.from({ length: FLOORS - 1 }).map((_, i) => (
        <group key={`b${i}`}>
          {[-2.4, 0, 2.4].map((x) => (
            <mesh key={x} position={[x, (i + 1) * FH + 0.13, 3.15]} castShadow material={mats.slab}>
              <boxGeometry args={[1.9, 0.14, 1.2]} />
            </mesh>
          ))}
        </group>
      ))}
    </Part>
  );
}

function FaçadeFins({ mats }: any) {
  return (
    <Part window={[0.68, 0.78]} grow="y">
      <group position={[0, (FLOORS * FH) / 2, 2.86]}>
        {[-3.4, -1.7, 0, 1.7, 3.4].map((x) => (
          <mesh key={x} position={[x, 0, 0]} castShadow material={mats.cladding}>
            <boxGeometry args={[0.18, FLOORS * FH, 0.3]} />
          </mesh>
        ))}
      </group>
    </Part>
  );
}

function Glazing({ mats }: any) {
  return (
    <Part window={[0.76, 0.88]} grow="fade">
      {Array.from({ length: FLOORS }).map((_, i) => (
        <group key={`g${i}`} position={[0, i * FH + FH / 2 + 0.1, 0]}>
          {/* front glazing panels */}
          {[-2.4, 0, 2.4].map((x) => (
            <mesh key={x} position={[x, 0, 2.82]} material={mats.glass}>
              <boxGeometry args={[1.7, FH - 0.42, 0.06]} />
            </mesh>
          ))}
          {/* balcony glass railings */}
          {i < FLOORS - 1 &&
            [-2.4, 0, 2.4].map((x) => (
              <mesh key={`r${x}`} position={[x, 0.12, 3.72]} material={mats.glass}>
                <boxGeometry args={[1.85, 0.5, 0.05]} />
              </mesh>
            ))}
        </group>
      ))}
    </Part>
  );
}

function Roof({ mats }: any) {
  const top = FLOORS * FH;
  return (
    <Part window={[0.84, 0.94]} grow="y">
      <group position={[0, top, 0]}>
        <mesh castShadow material={mats.slab}><boxGeometry args={[8.2, 0.2, 6]} /></mesh>
        {[[0, 2.9], [0, -2.9]].map(([x, z]) => (
          <mesh key={`p${z}`} position={[x as number, 0.35, z as number]} castShadow material={mats.wall}>
            <boxGeometry args={[8.2, 0.5, 0.16]} />
          </mesh>
        ))}
        {/* gold accent coping */}
        <mesh position={[0, 0.62, 2.9]} material={mats.gold}>
          <boxGeometry args={[8.2, 0.06, 0.2]} />
        </mesh>
      </group>
    </Part>
  );
}

/* ---------- camera rig ---------- */

function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    const p = scrollState.eased;
    const angle = 0.5 + p * 2.6;            // slow orbit during the build
    const radius = 14.5 - p * 2;
    const y = 3.2 + Math.sin(p * Math.PI) * 5.5; // rise mid-scroll, settle
    camera.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
    camera.lookAt(0, FLOORS * FH * 0.45, 0);
  });
  return null;
}

/* ---------- key light that "turns on" at handover ---------- */

function RevealLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.intensity = stageT(scrollState.eased, 0.9, 1) * 60;
    }
  });
  return <pointLight ref={ref} position={[8, 8, 8]} color="#ffd9a0" distance={40} />;
}

/* ---------- exported scene ---------- */

export default function BuildingScene({ simple = false }: { simple?: boolean }) {
  const mats = useMaterials();

  // Ease the global progress once per frame, shared by every part group.
  useFrame((_, dt) => {
    scrollState.eased += (scrollState.progress - scrollState.eased) * Math.min(1, dt * 4);
  });

  return (
    <group>
      <ambientLight intensity={0.35} />
      <hemisphereLight args={["#39465a", "#0a0d12", 0.5]} />
      <directionalLight
        position={[10, 16, 8]}
        intensity={1.4}
        castShadow={!simple}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <RevealLight />
      <CameraRig />

      <Ground mat={mats.ground} />
      <Footings mats={mats} />
      <Columns mats={mats} />
      <Slabs mats={mats} />
      <Walls mats={mats} />
      <Balconies mats={mats} />
      <FaçadeFins mats={mats} />
      <Glazing mats={mats} />
      <Roof mats={mats} />
    </group>
  );
}
