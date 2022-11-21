import { OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Overlay } from "./Overlay";
import Scene from "./Scene";

export default function App() {
  const target = useRef();
  const { active, loaded, total } = useProgress();
  const isLoaded = !active && total > 0 && loaded === total;
  return (
    <main ref={target}>
      <Suspense fallback={null}>
        <Canvas
          shadows
          flat
          linear
          onCreated={(state) => state.events.connect(target.current)}
        >
          <Scene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minAzimuthAngle={-Math.PI * 0.3}
            maxAzimuthAngle={Math.PI * 0.1}
            minPolarAngle={0}
            maxPolarAngle={Math.PI * 0.45}
          />
        </Canvas>
        {isLoaded && <Overlay />}
      </Suspense>
    </main>
  );
}
