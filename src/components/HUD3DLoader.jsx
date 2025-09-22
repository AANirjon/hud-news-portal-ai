// HUD3DLoader.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";

const Ring = ({ radius, color, speed }) => (
  <motion.mesh
    animate={{ rotation: [0, Math.PI * 2, 0] }}
    transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
  >
    <torusGeometry args={[radius, 0.02, 16, 100]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
  </motion.mesh>
);

const HUD3DLoader = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", background: "#000" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={10} depth={50} count={500} factor={4} saturation={0} fade />
        
        {/* Rotating HUD Rings */}
        <Ring radius={1} color="#00ff99" speed={2} />
        <Ring radius={1.5} color="#39ff14" speed={1} />
        <Ring radius={2} color="#00ff99" speed={4} />
        <Ring radius={2.5} color="#00ff99" speed={3} />
        <Ring radius={2.8} color="#00ff99" speed={6} />
        
        {/* Optional HUD Dots */}
        {[...Array(10)].map((_, i) => (
          <motion.mesh
            key={i}
            position={[Math.cos((i / 8) * Math.PI * 2) * 2, Math.sin((i / 8) * Math.PI * 2) * 2, 0]}
            animate={{ scale: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
          >
            <sphereGeometry args={[0.05, 16, 16 ]} />
            <meshStandardMaterial color="#00ff99" emissive="#00ff99" />
          </motion.mesh>
        ))}

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default HUD3DLoader;
