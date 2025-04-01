import React from "react";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
export default function Model() {
  function Model({ url }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} />;
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Model url="/path/to/your/model.glb" />
          <Environment preset="apartment" /> {/* For realistic lighting */}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}
