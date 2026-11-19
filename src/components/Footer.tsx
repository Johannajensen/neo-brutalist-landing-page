import React, { useState } from 'react';
import { ArrowUp, Mail, Copy, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const authorEmail = 'Johannajensen1@gmail.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(authorEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#101010] text-[#777] font-mono text-xs border-t-2 border-[#262626] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#222]">
        {/* Brand & Author Col */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#8ed500] text-[#141414] font-black flex items-center justify-center text-sm">
              K
            </div>
            <span className="text-white font-black text-sm tracking-widest uppercase">
              KINETIC-01 // JOHANNAJENSEN
            </span>
          </div>
          <p className="text-xs text-[#888] max-w-sm leading-relaxed">
            先锋新野兽派硬件与空间交互系统。由独立设计师与创作者{' '}
            <strong className="text-[#8ed500]">Johannajensen</strong> 主导构想与工程设计。
          </p>

          {/* Author Contact Box */}
          <div className="p-3 bg-[#161616] border border-[#2e2e2e] space-y-2 max-w-md">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold uppercase tracking-wider text-[10px]">
                LEAD ARCHITECT
              </span>
              <span className="text-[#8ed500] font-black">Johannajensen</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-[#262626]">
              <a
                href={`mailto:${authorEmail}`}
                className="text-[#aaa] hover:text-[#8ed500] flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8ed500]" />
                <span>{authorEmail}</span>
              </a>
              <button
                onClick={copyEmail}
                className="text-[10px] text-[#8ed500] hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Links Col 1 */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-white font-bold uppercase tracking-wider text-[11px] mb-2">
            [DOCUMENTATION]
          </div>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#hero" className="hover:text-[#8ed500] transition-colors">
                // 01. Hardware Overview
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-[#8ed500] transition-colors">
                // 02. Modular Teardown
              </a>
            </li>
            <li>
              <a href="#showcase" className="hover:text-[#8ed500] transition-colors">
                // 03. 4-Mode Workflows
              </a>
            </li>
            <li>
              <a href="#playground" className="hover:text-[#8ed500] transition-colors">
                // 04. CAD Exploded View
              </a>
            </li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-white font-bold uppercase tracking-wider text-[11px] mb-2">
            [SYS & CERTIFICATION]
          </div>
          <div className="p-3 bg-[#141414] border border-[#262626] space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span>DESIGNER:</span>
              <span className="text-[#8ed500]">JOHANNAJENSEN</span>
            </div>
            <div className="flex justify-between">
              <span>CONTACT:</span>
              <span className="text-white">Johannajensen1@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span>CERTIFICATION:</span>
              <span className="text-[#8ed500]">FCC / CE / ROHS 2.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
        <div>
          © 2026 KINETIC-01. CONCEIVED & ARCHITECTED BY <strong className="text-[#8ed500]">JOHANNAJENSEN</strong>.
        </div>

        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-3 py-1.5 bg-[#181818] border border-[#333] hover:border-[#8ed500] hover:text-[#8ed500] text-white transition-all uppercase cursor-pointer"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
};
