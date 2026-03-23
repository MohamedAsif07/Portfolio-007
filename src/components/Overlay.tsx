'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

export default function Overlay({ progress }: { progress: MotionValue<number> }) {
  const opacity1 = useTransform(progress, [0, 0.15], [1, 0]);
  const y1 = useTransform(progress, [0, 0.15], [0, -50]);

  const opacity2 = useTransform(progress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const y2 = useTransform(progress, [0.2, 0.3, 0.4], [50, 0, -50]);

  const opacity3 = useTransform(progress, [0.5, 0.6, 0.75], [0, 1, 0]);
  const y3 = useTransform(progress, [0.5, 0.6, 0.75], [50, 0, -50]);

  return (
    <div className="w-full h-full relative pointer-events-none z-10 text-white">
      <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-5xl md:text-8xl font-bold mb-4 drop-shadow-lg" style={{ fontFamily: 'Clash Display, sans-serif' }}>Mohammed Asif.</h1>
        <p className="text-xl md:text-3xl font-light text-[#00FF94] tracking-wide">Android Dev & Cyber Enthusiast.</p>
      </motion.div>
      <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-24">
        <h2 className="text-4xl md:text-6xl font-medium max-w-3xl drop-shadow-lg leading-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
          I build mobile apps & robust automation pipelines.
        </h2>
      </motion.div>
      <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24 text-right">
        <h2 className="text-4xl md:text-6xl font-medium max-w-3xl drop-shadow-lg leading-tight" style={{ fontFamily: 'Clash Display, sans-serif' }}>
          Bridging deep development & cybersecurity.
        </h2>
      </motion.div>
    </div>
  );
}
