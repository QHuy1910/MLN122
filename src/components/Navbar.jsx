import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Nguồn Gốc', id: 'origin', path: '/#origin' },
    { name: 'Bản Chất', id: 'nature', path: '/#nature' },
    { name: 'Phương pháp', id: 'methodology', path: '/#methodology' },
    { name: 'Trò chơi', path: '/game' },
    { name: 'CQ', path: '/cq' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white py-4 border-b border-zinc-200 shadow-md'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className={`font-black tracking-[0.3em] uppercase text-sm transition-all duration-500 ${
            scrolled
              ? 'text-[#9C5F4D] scale-105'
              : 'text-[#E1C699] [text-shadow:0_1px_0_rgba(255,255,255,0.35),0_3px_8px_rgba(0,0,0,0.6)]'
          }`}
        >
          MLN122 <span className={scrolled ? 'text-[#D49B28]' : 'text-[#E1C699]'}>Giá trị thặng dư</span>
        </Link>
        
        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            item.id ? (
              <a
                key={item.id}
                href={item.path}
                className={`font-medium text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative group ${
                  scrolled ? 'text-zinc-700' : 'text-[#F5F0E1]'
                }`}
              >
                <span className={`transition-colors ${scrolled ? 'group-hover:text-[#9C5F4D]' : 'group-hover:text-[#E1C699]'}`}>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D49B28] transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative group ${
                  scrolled ? 'text-zinc-700' : 'text-[#F5F0E1]'
                }`}
              >
                <span className={`transition-colors ${scrolled ? 'group-hover:text-[#9C5F4D]' : 'group-hover:text-[#E1C699]'}`}>{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D49B28] transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
