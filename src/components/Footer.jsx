import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-24 px-6 bg-white border-t-8 border-t-soviet-red text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <blockquote className="text-4xl font-serif italic text-zinc-900 mb-16 relative inline-block">
          <span className="absolute -top-12 -left-12 text-9xl text-soviet-red opacity-10">"</span>
          Tư bản là lao động chết, chỉ sống bằng cách hút lao động sống.
          <span className="absolute -bottom-16 -right-12 text-9xl text-soviet-red opacity-10">"</span>
        </blockquote>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-16 border-t border-zinc-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-soviet-red rounded-full flex items-center justify-center shadow-lg shadow-soviet-red/20">
              <span className="text-white font-black text-xl">M</span>
            </div>
            <div className="text-left">
              <div className="text-soviet-red font-black text-sm uppercase tracking-widest">Giá Trị Thặng Dư</div>
              <div className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">Học thuyết kinh tế C. Mác &copy; 2026</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {[
              { name: 'Tổng quát', path: '/tong-quat' },
              { name: 'Nguồn Gốc', path: '/#origin' },
              { name: 'Bản Chất', path: '/#nature' },
              { name: 'Phương pháp', path: '/#methodology' },
              { name: 'CQ & Trò Chơi', path: '/cq' },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="text-zinc-500 hover:text-soviet-red font-black text-xs uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="px-6 py-2 bg-soviet-gold text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-full shadow-md">
            Học thuyết kinh tế Mác-xít
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
