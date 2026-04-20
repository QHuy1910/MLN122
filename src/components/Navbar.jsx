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
        scrolled ? 'bg-white/95 backdrop-blur-md py-4 border-b-4 border-soviet-red shadow-2xl' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className={`font-black tracking-[0.3em] uppercase text-sm transition-all duration-500 ${scrolled ? 'text-soviet-red scale-110' : 'text-zinc-800'}`}
        >
          MLN122 <span className="text-soviet-orange">Giá trị thặng dư</span>
        </Link>
        
        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            item.id ? (
              <a
                key={item.id}
                href={item.path}
                className={`font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative group ${
                  scrolled ? 'text-zinc-500' : 'text-zinc-700'
                }`}
              >
                <span className="group-hover:text-soviet-red transition-colors">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-soviet-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 relative group ${
                  scrolled ? 'text-zinc-500' : 'text-zinc-700'
                }`}
              >
                <span className="group-hover:text-soviet-red transition-colors">{item.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-soviet-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
