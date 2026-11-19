import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShoppingBag, Mail, Copy, Check } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const authorEmail = 'Johannajensen1@gmail.com';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0] + ' UTC+8');
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(authorEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#141414]/90 backdrop-blur-md border-[#8ed500]/40 py-2.5 shadow-lg'
          : 'bg-[#141414] border-[#262626] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO & Author Tag */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#8ed500] border-2 border-[#141414] flex items-center justify-center font-black text-[#141414] text-lg transform group-hover:rotate-12 transition-transform duration-300">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-black text-sm tracking-wider text-[#f3f3f3] group-hover:text-[#8ed500] transition-colors">
                KINETIC<span className="text-[#8ed500]">-01</span>
              </span>
              <span className="text-[9px] font-mono text-[#8ed500] tracking-widest uppercase font-bold">
                BY JOHANNAJENSEN
              </span>
            </div>
          </a>

          {/* Author Contact Pill */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#333]">
            <a
              href={`mailto:${authorEmail}`}
              onClick={handleCopyEmail}
              title="Click to copy email"
              className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1a1a1a] hover:bg-[#8ed500] hover:text-[#141414] border border-[#333] hover:border-[#8ed500] text-[10px] font-mono text-[#aaa] transition-all cursor-pointer"
            >
              <Mail className="w-3 h-3 text-[#8ed500]" />
              <span>{authorEmail}</span>
              {copiedEmail ? (
                <Check className="w-3 h-3 text-[#8ed500]" />
              ) : (
                <Copy className="w-3 h-3 text-[#666]" />
              )}
            </a>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs font-bold uppercase tracking-wider">
          <a
            href="#hero"
            className="text-[#888] hover:text-[#8ed500] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#8ed500] after:transition-all"
          >
            [01] // OVERVIEW
          </a>
          <a
            href="#features"
            className="text-[#888] hover:text-[#8ed500] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#8ed500] after:transition-all"
          >
            [02] // TEARDOWN
          </a>
          <a
            href="#showcase"
            className="text-[#888] hover:text-[#8ed500] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#8ed500] after:transition-all"
          >
            [03] // USE MODES
          </a>
          <a
            href="#playground"
            className="text-[#888] hover:text-[#8ed500] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#8ed500] after:transition-all"
          >
            [04] // CAD LAB
          </a>
        </nav>

        {/* Right Action CTA & Clock */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right font-mono text-[10px] text-[#666]">
            <div>{currentTime || '12:00:00 UTC+8'}</div>
            <div className="text-[#8ed500]">ARCHITECT: JJ</div>
          </div>

          <a
            href="#preorder"
            className="group relative inline-flex items-center gap-1.5 px-4 py-2 bg-[#8ed500] text-[#141414] font-black text-xs font-mono uppercase border-2 border-[#8ed500] shadow-[3px_3px_0px_#f3f3f3] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>PRE-ORDER</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
          </a>
        </div>
      </div>
    </header>
  );
};
