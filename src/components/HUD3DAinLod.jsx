// HUD3DLoader.jsx
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Ring() {
  return (
    <mesh>
      <torusGeometry args={[1, 0.1, 16, 100]} />
      <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.8} />
    </mesh>
  );
}

export default function HUD3DAniLod() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-black">
      <motion.div
        className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 3]} />
          <Ring />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </motion.div>
    </div>
  );
}
