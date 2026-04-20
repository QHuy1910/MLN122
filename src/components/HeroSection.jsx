import React from 'react';
import { motion } from 'framer-motion';
const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-white overflow-hidden border-b-8 border-soviet-red">
      
      <div className="z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="mb-4 inline-block bg-soviet-red text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.4em] shadow-lg shadow-soviet-red/20">
            Học thuyết kinh tế của C. Mác
          </div>
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-soviet-red mb-8 uppercase leading-none">
            Giá trị <br /> <span className="text-soviet-orange">Thặng dư</span>
          </h1>
          <div className="h-2 w-48 bg-soviet-gold mx-auto mb-12 shadow-sm rounded-full" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-2xl md:text-4xl font-serif italic text-zinc-700 leading-tight max-w-4xl mx-auto"
        >
          "Tư bản là lao động chết, giống như ma cà rồng, chỉ sống bằng cách hút lao động sống, và sống càng nhiều, hút được càng nhiều lao động."
          <footer className="mt-8 text-sm md:text-xl font-sans uppercase tracking-[0.3em] text-soviet-red font-black not-italic">
            — Karl Marx
          </footer>
        </motion.blockquote>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-black">Khám phá bản chất của tư bản</span>
          <div className="w-1 h-16 bg-gradient-to-b from-soviet-red via-soviet-gold to-transparent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
