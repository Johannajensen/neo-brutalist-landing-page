import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MarqueeTicker: React.FC = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 监听滚动来动态调节跑马灯移动
    const st = ScrollTrigger.create({
      trigger: tickerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        if (track1Ref.current) {
          gsap.to(track1Ref.current, {
            x: `+=${velocity * 0.04}`,
            ease: 'power1.out',
            duration: 0.3,
          });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const hardwareSpecs = [
    'CNC TITANIUM UNIBODY',
    'MAGNETIC HAPTIC DIAL',
    'ACID POLYCARBONATE #8ED500',
    'ON-DEVICE NPU 32TOPS',
    'HAZARD HEAT-SINK 45°',
    'HOT-SWAP TACTILE KEYS',
    'USB-C 0.02MS LATENCY',
    '48H BATTERY CELL',
  ];

  return (
    <div
      ref={tickerRef}
      className="relative w-full overflow-hidden border-y-[3px] border-[#141414] bg-[#8ed500] py-3.5 select-none z-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <div
        ref={track1Ref}
        className="flex whitespace-nowrap gap-8 items-center animate-marquee"
        style={{
          display: 'flex',
          width: 'max-content',
        }}
      >
        {[...hardwareSpecs, ...hardwareSpecs, ...hardwareSpecs].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-mono text-base font-black tracking-widest text-[#141414] uppercase">
              {text}
            </span>
            <span className="inline-block w-2.5 h-2.5 bg-[#141414] transform rotate-45" />
          </div>
        ))}
      </div>
    </div>
  );
};
