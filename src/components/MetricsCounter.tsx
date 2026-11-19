import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MetricsCounter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stats = [
        { ref: num1Ref, target: 0.01, suffix: 'MM', decimals: 2 },
        { ref: num2Ref, target: 60, suffix: ' STEPS', decimals: 0 },
        { ref: num3Ref, target: 99.8, suffix: '%', decimals: 1 },
        { ref: num4Ref, target: 32, suffix: ' TOPS', decimals: 0 },
      ];

      const animateNumbers = () => {
        stats.forEach((item) => {
          if (!item.ref.current) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: item.target,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: () => {
              if (item.ref.current) {
                item.ref.current.innerText = obj.val.toFixed(item.decimals) + item.suffix;
              }
            },
          });
        });
      };

      const resetNumbers = () => {
        stats.forEach((item) => {
          if (item.ref.current) {
            item.ref.current.innerText = (0).toFixed(item.decimals) + item.suffix;
          }
        });
      };

      // 保证用户上下往复滚动时，每次进入视口都能重置并重新播放数字动效
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => animateNumbers(),
        onEnterBack: () => animateNumbers(),
        onLeave: () => resetNumbers(),
        onLeaveBack: () => resetNumbers(),
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#101010] border-b-2 border-[#262626]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <div className="p-6 bg-[#141414] border-2 border-[#262626] hover:border-[#8ed500] transition-colors relative group">
            <div className="font-mono text-[10px] text-[#8ed500] uppercase mb-1">
              [CNC PRECISION]
            </div>
            <div className="font-mono text-3xl sm:text-5xl font-black text-white group-hover:text-[#8ed500] transition-colors">
              <span ref={num1Ref}>0.00MM</span>
            </div>
            <div className="mt-2 text-xs font-mono text-[#888] uppercase tracking-wider">
              Titanium Milled Tolerance
            </div>
          </div>

          {/* Stat 2 */}
          <div className="p-6 bg-[#141414] border-2 border-[#262626] hover:border-[#8ed500] transition-colors relative group">
            <div className="font-mono text-[10px] text-[#8ed500] uppercase mb-1">
              [HAPTIC DETENTS]
            </div>
            <div className="font-mono text-3xl sm:text-5xl font-black text-white group-hover:text-[#8ed500] transition-colors">
              <span ref={num2Ref}>0 STEPS</span>
            </div>
            <div className="mt-2 text-xs font-mono text-[#888] uppercase tracking-wider">
              Magnetic Stepper Feedback
            </div>
          </div>

          {/* Stat 3 */}
          <div className="p-6 bg-[#141414] border-2 border-[#262626] hover:border-[#8ed500] transition-colors relative group">
            <div className="font-mono text-[10px] text-[#8ed500] uppercase mb-1">
              [QC STANDARDS]
            </div>
            <div className="font-mono text-3xl sm:text-5xl font-black text-[#8ed500]">
              <span ref={num3Ref}>0.0%</span>
            </div>
            <div className="mt-2 text-xs font-mono text-[#888] uppercase tracking-wider">
              Anodized Shield Yield Rate
            </div>
          </div>

          {/* Stat 4 */}
          <div className="p-6 bg-[#141414] border-2 border-[#262626] hover:border-[#8ed500] transition-colors relative group">
            <div className="font-mono text-[10px] text-[#8ed500] uppercase mb-1">
              [EDGE INFERENCE]
            </div>
            <div className="font-mono text-3xl sm:text-5xl font-black text-white group-hover:text-[#8ed500] transition-colors">
              <span ref={num4Ref}>0 TOPS</span>
            </div>
            <div className="mt-2 text-xs font-mono text-[#888] uppercase tracking-wider">
              On-Device Tensor Silicon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
