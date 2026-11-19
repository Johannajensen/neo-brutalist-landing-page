import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ShoppingBag, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CallToAction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const patternBoxRef = useRef<HTMLDivElement>(null);

  const authorEmail = 'Johannajensen1@gmail.com';

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (patternBoxRef.current) {
        gsap.to(patternBoxRef.current, {
          y: -140,
          rotate: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="preorder"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#8ed500] text-[#141414] overflow-hidden border-b-[3px] border-[#141414]"
    >
      {/* 视差漂浮斜纹装饰块 */}
      <div
        ref={patternBoxRef}
        className="absolute -top-16 -right-16 w-80 h-80 pattern-hazard-original border-[4px] border-[#141414] shadow-brutal-black pointer-events-none hidden md:block"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 bg-[#141414]" />
          <span className="font-mono text-xs font-black tracking-widest uppercase text-[#141414]">
            [GLOBAL PRODUCTION // LEAD ARCHITECT: JOHANNAJENSEN]
          </span>
        </div>

        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tight leading-[0.9] text-[#141414]">
            SECURE YOUR <br />
            <span className="bg-[#141414] text-[#8ed500] px-3 inline-block transform -rotate-1 mt-2">
              BATCH // 001
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-xl font-bold text-[#141414] max-w-2xl leading-relaxed">
            首发全球限量 500 台独立编号样机。附赠 Johannajensen 专属客制化激光雕刻背板、三款触觉阻尼旋钮替换帽及终身开源固件 OTA 特权。
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            <button
              onClick={() => alert(`Batch // 001 Reservation Confirmed!\nDirect inquiries: ${authorEmail}`)}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 bg-[#141414] text-[#8ed500] font-mono text-xs sm:text-sm font-black uppercase border-2 border-[#141414] shadow-[4px_4px_0px_#f3f3f3] sm:shadow-[6px_6px_0px_#f3f3f3] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>PRE-ORDER NOW — $299 USD</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <a
              href={`mailto:${authorEmail}`}
              className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 bg-transparent text-[#141414] font-mono text-xs sm:text-sm font-black uppercase border-2 border-[#141414] hover:bg-[#141414] hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>CONTACT ARCHITECT</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs font-bold text-[#141414]">
            <span>✓ ESTIMATED SHIPPING: JUNE 29, 2026</span>
            <span>✓ DESIGNED BY: JOHANNAJENSEN</span>
            <span>✓ EMAIL: {authorEmail}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
