import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card3D } from './Card3D';
import { ArrowRight, GalleryHorizontal, ShieldCheck, ArrowLeftRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface UseModeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  month: string;
  date: string;
  variant: 'classic' | 'acid' | 'dark';
  tech: string[];
}

const hardwareModes: UseModeItem[] = [
  {
    id: '01',
    title: '3D SPATIAL DOCK',
    category: 'CAD & VISION DOCK',
    description: '在 Blender、Unreal 空间中，利用无级物理旋钮微调旋转三维模型，段落级触觉反馈直达指尖。',
    month: 'MODE',
    date: '01',
    variant: 'classic',
    tech: ['CAD MAPPING', 'HAPTIC FEEDBACK', '0.1° PRECISION'],
  },
  {
    id: '02',
    title: 'BEAT & SYNTH DOCK',
    category: 'PORTABLE AUDIO SYNTH',
    description: '如同口袋合成器般纯粹。物理拨动控制振荡器截止频率、步进音序与滤波器，随时随地捕捉灵感。',
    month: 'MODE',
    date: '02',
    variant: 'acid',
    tech: ['MIDI USB-C', 'STEP SEQUENCER', 'ANALOG EMULATION'],
  },
  {
    id: '03',
    title: 'AI PUSH-TO-ACT',
    category: 'LOCAL AGENT CONSOLE',
    description: '一键激活内置 32TOPS 离线微模型。实体旋钮直接调控模型思考深度，物理按键执行复杂工程自动化。',
    month: 'MODE',
    date: '03',
    variant: 'classic',
    tech: ['OFFLINE AI', 'LOCAL WHISPER', 'ZERO CLOUD LEAK'],
  },
  {
    id: '04',
    title: 'TACTILE MACRO DECK',
    category: 'DEV & STREAMING CONSOLE',
    description: '视频剪辑时间线精细穿梭、Git 工作流批量提交、全按键多层逻辑自由映射的先锋生产力底座。',
    month: 'MODE',
    date: '04',
    variant: 'acid',
    tech: ['QMK/VIA COMPAT', 'LAYER MATRIX', 'HOT-SWAP'],
  },
];

export const HorizontalShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !triggerRef.current) return;

      const getScrollAmount = () => {
        if (!containerRef.current) return 0;
        // 动态计算总宽度差值，自适应手机、平板与桌面宽屏
        return -(containerRef.current.scrollWidth - window.innerWidth + 40);
      };

      gsap.fromTo(
        containerRef.current,
        {
          x: 0,
        },
        {
          x: getScrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: () => `+=${Math.max(1800, window.innerHeight * 2)}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${self.progress * 100}%`;
              }
              if (bgTextRef.current) {
                gsap.set(bgTextRef.current, {
                  x: -self.progress * (window.innerWidth > 768 ? 600 : 300),
                });
              }
            },
          },
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="showcase" className="relative bg-[#141414] overflow-hidden">
      {/* 触发与固钉包裹容器 */}
      <div ref={triggerRef} className="h-screen w-full flex flex-col justify-between overflow-hidden relative">
        {/* 背景巨型反向视差水印 */}
        <div
          ref={bgTextRef}
          className="absolute top-1/4 sm:top-1/3 left-0 whitespace-nowrap font-mono font-black text-[28vw] sm:text-[22vw] text-white opacity-[0.03] select-none pointer-events-none will-change-transform"
        >
          01 // 02 // 03 // 04 MODES
        </div>

        {/* 顶部标题栏与进度 */}
        <div className="pt-20 sm:pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full z-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-[#262626]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-[#8ed500]" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#8ed500] uppercase tracking-wider flex items-center gap-1.5">
                  [SECTION 03 // HORIZONTAL TRACK]
                  <ArrowLeftRight className="w-3 h-3" />
                </span>
              </div>
              <h2 className="text-xl sm:text-4xl font-black uppercase text-white tracking-tight flex items-center gap-2.5">
                OPERATING MODES
                <GalleryHorizontal className="w-5 h-5 sm:w-6 sm:h-6 text-[#8ed500]" />
              </h2>
            </div>
            
            {/* 进度指示条 */}
            <div className="mt-3 sm:mt-0 flex items-center gap-3">
              <span className="font-mono text-[11px] sm:text-xs text-[#888]">SWIPE / SCROLL</span>
              <div className="w-28 sm:w-36 h-2 bg-[#222] border border-[#333] overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full bg-[#8ed500] transition-all duration-75"
                  style={{ width: '0%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 横向移动的核心轨道 */}
        <div className="flex-1 flex items-center py-2 sm:py-0">
          <div
            ref={containerRef}
            className="flex items-center gap-6 sm:gap-14 px-4 sm:px-16 will-change-transform"
            style={{ width: 'fit-content' }}
          >
            {/* 开场说明卡 */}
            <div className="w-[260px] sm:w-[340px] flex-shrink-0 p-6 sm:p-8 bg-[#181818] border-2 border-[#333] shadow-brutal-acid">
              <span className="px-2 py-0.5 bg-[#141414] border border-[#8ed500] font-mono text-[9px] sm:text-[10px] text-[#8ed500] uppercase">
                ONE DEVICE. 4 REALMS.
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white mt-3 sm:mt-4 mb-2 sm:mb-3">
                全场景硬件生态
              </h3>
              <p className="text-[11px] sm:text-xs text-[#aaa] leading-relaxed mb-4 sm:mb-6">
                无论是在空间建模、音频合成、离线 AI 呼叫还是极客宏控制台，KINETIC-01 都能瞬间切换为最趁手的物理控制中心。
              </p>
              <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#8ed500] font-bold">
                <span>SCROLL DOWN TO ADVANCE</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
              </div>
            </div>

            {/* 4 个大型硬件工作模式 3D 展柜 */}
            {hardwareModes.map((item) => (
              <div
                key={item.id}
                className="w-[270px] sm:w-[320px] flex-shrink-0"
              >
                <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-[#777]">
                  <span className="text-[#8ed500] font-bold">SYS//{item.id}</span>
                  <span>{item.category}</span>
                </div>

                <Card3D
                  title={item.title}
                  content={item.description}
                  month={item.month}
                  date={item.date}
                  tag={item.category}
                  ctaText="INSPECT PROFILE"
                  variant={item.variant}
                  enableMouseTilt={true}
                />

                <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5">
                  {item.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[8px] sm:text-[9px] font-mono px-2 py-0.5 bg-[#1f1f1f] text-[#aaa] border border-[#333]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* 结尾收尾卡 */}
            <div className="w-[240px] sm:w-[280px] flex-shrink-0 p-6 sm:p-8 border-2 border-dashed border-[#8ed500]/50 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#8ed500] mb-2 sm:mb-3" />
              <div className="font-mono text-xs sm:text-sm font-black text-white uppercase">
                OPEN FIRMWARE SDK
              </div>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#777] mt-2">
                FULLY PROGRAMMABLE VIA PYTHON & C++ / ZERO PROPRIETARY LOCK-IN.
              </p>
            </div>
          </div>
        </div>

        {/* 底部导航提示 */}
        <div className="pb-4 sm:pb-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-[#555]">
          <span>PIN: TRUE // ADAPTIVE WIDTH</span>
          <span className="text-[#8ed500]">JJ HARDWARE LAB</span>
        </div>
      </div>
    </section>
  );
};
