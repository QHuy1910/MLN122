import React from 'react';
import { motion } from 'framer-motion';
const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b-8 border-soviet-red">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/image/Gemini_Generated_Image_cylpk3cylpk3cylp.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-white/78 backdrop-blur-[1px]" />
      
      <div className="z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="mb-4 inline-block bg-soviet-red text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.4em] shadow-lg shadow-soviet-red/20">
            Học thuyết kinh tế của C. Mác
          </div>
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-8 uppercase leading-none">
            <span className="inline-block bg-gradient-to-b from-[#CD8D71] via-[#B5735C] to-[#9C5F4D] bg-clip-text text-transparent [text-shadow:0_2px_0_rgba(86,45,35,0.8),0_10px_18px_rgba(0,0,0,0.35)]">
              Giá trị
            </span>
            <br />
            <span className="inline-block bg-gradient-to-b from-[#F7C948] via-[#E3AF37] to-[#D49B28] bg-clip-text text-transparent [text-shadow:0_2px_0_rgba(120,81,18,0.85),0_10px_18px_rgba(0,0,0,0.35)]">
              Thặng dư
            </span>
          </h1>
          <div className="w-3 h-3 bg-[#D49B28] mx-auto rounded-full mb-4 shadow-[0_0_12px_rgba(212,155,40,0.65)]" />
          <div className="h-2 w-48 bg-[#D49B28] mx-auto mb-12 shadow-sm rounded-full" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-2xl md:text-4xl font-serif italic text-[#D6C1A4] leading-tight max-w-4xl mx-auto [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]"
        >
          "Tư bản là lao động chết, giống như ma cà rồng, chỉ sống bằng cách hút lao động sống, và sống càng nhiều, hút được càng nhiều lao động."
          <footer className="mt-8 text-sm md:text-xl font-sans uppercase tracking-[0.3em] text-[#D6C1A4] font-black not-italic flex items-center justify-center gap-3">
            <span> — KARL</span>
            <span className="inline-block h-6 w-[2px] bg-[#E74C3C]" />
            <span>MARX —</span>
          </footer>
        </motion.blockquote>
      </div>

      
    </section>
  );
};

export default HeroSection;
