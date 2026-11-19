import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShoppingBag, Mail, Copy, Check, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#141414]/95 backdrop-blur-md border-[#8ed500]/40 py-2.5 shadow-lg'
            : 'bg-[#141414] border-[#262626] py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* LOGO & Author Tag */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#8ed500] border-2 border-[#141414] flex items-center justify-center font-black text-[#141414] text-lg transform group-hover:rotate-12 transition-transform duration-300">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-black text-sm tracking-wider text-[#f3f3f3] group-hover:text-[#8ed500] transition-colors">
                  KINETIC<span className="text-[#8ed500]">-01</span>
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-[#8ed500] tracking-widest uppercase font-bold">
                  BY JJ
                </span>
              </div>
            </a>

            {/* Author Contact Pill (Desktop Only) */}
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

          {/* Center Nav Links (Desktop) */}
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

          {/* Right Action CTA & Mobile Hamburger Button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right font-mono text-[10px] text-[#666]">
              <div>{currentTime || '12:00:00 UTC+8'}</div>
              <div className="text-[#8ed500]">NODE // ONLINE</div>
            </div>

            <a
              href="#preorder"
              className="hidden sm:inline-flex group relative items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#8ed500] text-[#141414] font-black text-xs font-mono uppercase border-2 border-[#8ed500] shadow-[3px_3px_0px_#f3f3f3] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>PRE-ORDER</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-[#1a1a1a] border border-[#333] text-[#8ed500] hover:bg-[#8ed500] hover:text-[#141414] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (移动端折叠抽屉) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[57px] z-40 bg-[#141414]/98 backdrop-blur-xl border-t border-[#333] flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-200">
          <nav className="space-y-4 pt-4 font-mono text-base font-black uppercase tracking-wider">
            <a
              href="#hero"
              onClick={closeMobileMenu}
              className="block p-3 border border-[#2a2a2a] hover:border-[#8ed500] bg-[#1a1a1a] text-white hover:text-[#8ed500] transition-colors"
            >
              [01] // OVERVIEW & HERO
            </a>
            <a
              href="#features"
              onClick={closeMobileMenu}
              className="block p-3 border border-[#2a2a2a] hover:border-[#8ed500] bg-[#1a1a1a] text-white hover:text-[#8ed500] transition-colors"
            >
              [02] // HARDWARE TEARDOWN
            </a>
            <a
              href="#showcase"
              onClick={closeMobileMenu}
              className="block p-3 border border-[#2a2a2a] hover:border-[#8ed500] bg-[#1a1a1a] text-white hover:text-[#8ed500] transition-colors"
            >
              [03] // 4-OPERATING MODES
            </a>
            <a
              href="#playground"
              onClick={closeMobileMenu}
              className="block p-3 border border-[#2a2a2a] hover:border-[#8ed500] bg-[#1a1a1a] text-white hover:text-[#8ed500] transition-colors"
            >
              [04] // 3D CAD EXPLODER
            </a>
          </nav>

          <div className="space-y-3 pt-6 border-t border-[#2a2a2a]">
            <a
              href="#preorder"
              onClick={closeMobileMenu}
              className="w-full py-3.5 bg-[#8ed500] text-[#141414] font-black font-mono text-center text-sm uppercase border-2 border-[#141414] shadow-brutal-white flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>PRE-ORDER BATCH 001 ($299)</span>
            </a>

            <div className="p-3 bg-[#181818] border border-[#2a2a2a] flex items-center justify-between text-xs font-mono text-[#aaa]">
              <span>ARCHITECT: Johannajensen</span>
              <a href={`mailto:${authorEmail}`} className="text-[#8ed500] underline">
                EMAIL ME
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
