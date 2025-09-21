// src/components/AuthLayout.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AuthLayout({ children, title }) {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 font-mono">
      <div
        ref={containerRef}
        className="w-full max-w-md bg-[#0d0d0d] border border-green-400 rounded-2xl p-8 shadow-xl shadow-green-400/30"
      >
        <h1 className="text-3xl font-bold mb-6 text-center tracking-widest">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
