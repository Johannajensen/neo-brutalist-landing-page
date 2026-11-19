import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card3D } from './Card3D';
import { Zap, Activity, CornerDownRight, Cpu, Mail, Copy, Check, Crosshair } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textParallaxRef = useRef<HTMLDivElement>(null);
  const shapeParallax1Ref = useRef<HTMLDivElement>(null);
  const shapeParallax2Ref = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const descParallaxRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const authorEmail = 'Johannajensen1@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(authorEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 入场动画 Timeline：配置 ScrollTrigger 支持往复重置播放 (restart reverse restart reverse)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'restart reverse restart reverse',
        },
        defaults: { ease: 'power3.out', duration: 0.9 },
      });

      tl.from('.hero-badge-item', {
        y: -40,
        opacity: 0,
        stagger: 0.1,
      })
        .from(
          '.hero-title-line',
          {
            y: 90,
            opacity: 0,
            stagger: 0.12,
            skewY: 4,
            duration: 1,
          },
          '-=0.4'
        )
        .from(
          descParallaxRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          cardContainerRef.current,
          {
            scale: 0.8,
            opacity: 0,
            rotationY: -30,
            rotationX: 15,
            duration: 1.1,
            ease: 'back.out(1.6)',
          },
          '-=0.7'
        )
        .from(
          '.hero-stat-item',
          {
            opacity: 0,
            y: 35,
            stagger: 0.1,
            duration: 0.6,
          },
          '-=0.5'
        );

      // 2. 多重滚轮双向视差动效 (Bidirectional Scroll Scrubbing Parallax)
      // 巨幅文字视差：以 0.5 倍速反向深推
      if (textParallaxRef.current) {
        gsap.to(textParallaxRef.current, {
          yPercent: 60,
          scale: 0.95,
          opacity: 0.12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 视差几何斜纹块 1：向上快速飘移
      if (shapeParallax1Ref.current) {
        gsap.to(shapeParallax1Ref.current, {
          y: -220,
          rotation: 25,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // 视差几何斜纹块 2：向左下微移
      if (shapeParallax2Ref.current) {
        gsap.to(shapeParallax2Ref.current, {
          y: 120,
          x: -60,
          rotation: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 十字准星视差
      if (crosshairRef.current) {
        gsap.to(crosshairRef.current, {
          y: -180,
          rotation: 90,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // 主卡片滚动深渊视差：在用户下滑时下沉翻转，上滑时完全复原
      if (cardContainerRef.current) {
        gsap.to(cardContainerRef.current, {
          y: 140,
          rotateX: 18,
          rotateY: -10,
          scale: 0.96,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden bg-grid-tech"
    >
      {/* 巨幅背景双向视差文字 */}
      <div
        ref={textParallaxRef}
        className="absolute top-16 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-5 z-0"
      >
        <span className="font-mono font-black text-[18vw] leading-none text-white whitespace-nowrap block">
          KINETIC-01 // JOHANNAJENSEN
        </span>
      </div>

      {/* 浮动斜纹视差几何装饰块 1 */}
      <div
        ref={shapeParallax1Ref}
        className="absolute -top-10 right-[12%] w-56 h-56 pattern-hazard-original border-2 border-[#8ed500]/40 opacity-50 pointer-events-none -z-0 hidden md:block"
      />

      {/* 浮动斜纹视差几何装饰块 2 */}
      <div
        ref={shapeParallax2Ref}
        className="absolute bottom-10 left-[5%] w-36 h-36 pattern-hazard-acid border-2 border-[#141414] opacity-30 pointer-events-none -z-0 hidden lg:block"
      />

      {/* 十字准星视差浮标 */}
      <div
        ref={crosshairRef}
        className="absolute top-1/3 right-[45%] text-[#8ed500]/30 pointer-events-none hidden md:block"
      >
        <Crosshair className="w-16 h-16 stroke-1" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* 左侧：硬核硬件先锋文案 */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Badge & Author Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="hero-badge-item px-2.5 py-1 bg-[#8ed500] text-[#141414] font-mono font-black text-[10px] tracking-widest uppercase border border-[#141414]">
              [FLAGSHIP HARDWARE // BATCH 001]
            </span>
            <span className="hero-badge-item px-2.5 py-1 bg-[#1e1e1e] text-[#8ed500] font-mono font-bold text-[10px] tracking-widest uppercase border border-[#333] flex items-center gap-1.5">
              <span>ARCHITECT: JOHANNAJENSEN</span>
            </span>
            <span className="hero-badge-item font-mono text-xs text-[#8ed500] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-[#8ed500]" />
              DUAL-WAY GSAP PARALLAX
            </span>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tight leading-[0.95] text-[#f3f3f3]"
          >
            <span className="hero-title-line block text-[#f3f3f3]">
              KINETIC-01
            </span>
            <span className="hero-title-line block text-transparent bg-clip-text bg-gradient-to-r from-[#8ed500] via-[#b6f932] to-[#8ed500]">
              TACTILE AI
            </span>
            <span className="hero-title-line flex items-center gap-3 text-[#f3f3f3]">
              TERMINAL
              <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 bg-[#8ed500] animate-bounce" />
            </span>
          </h1>

          {/* Subtitle / Description */}
          <div ref={descParallaxRef} className="mt-8 space-y-4">
            <p className="text-base sm:text-lg text-[#aaa] max-w-xl font-medium leading-relaxed">
              由建筑与数字硬件创作者{' '}
              <strong className="text-white font-mono underline decoration-[#8ed500] decoration-2 underline-offset-4">
                Johannajensen
              </strong>{' '}
              操刀设计。航空级钛合金 CNC 直角机身、无级磁悬浮触觉阻尼旋钮，与内置{' '}
              <strong className="text-[#8ed500] font-mono">32 TOPS 局部离线神经网络</strong>
              。上下滑动页面体验高自由度双向视差响应。
            </p>

            {/* Author Direct Email Card */}
            <div className="flex items-center gap-3 pt-2">
              <span className="font-mono text-xs text-[#888]">AUTHOR CONTACT:</span>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#181818] hover:bg-[#8ed500] hover:text-[#141414] border border-[#333] hover:border-[#8ed500] text-xs font-mono text-[#8ed500] transition-all cursor-pointer shadow-[2px_2px_0px_#000]"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{authorEmail}</span>
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3 h-3 text-[#777]" />}
              </button>
            </div>
          </div>

          {/* CTA Group */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#preorder"
              className="px-6 py-4 bg-[#8ed500] text-[#141414] font-black font-mono text-sm uppercase border-2 border-[#141414] shadow-brutal-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>PRE-ORDER BATCH 001</span>
            </a>

            <a
              href="#features"
              className="px-6 py-4 bg-[#141414] text-[#f3f3f3] font-black font-mono text-sm uppercase border-2 border-[#333] hover:border-[#8ed500] hover:text-[#8ed500] transition-colors flex items-center gap-2"
            >
              <span>BIDIRECTIONAL PARALLAX</span>
              <CornerDownRight className="w-4 h-4" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 pt-8 border-t border-[#262626] grid grid-cols-3 gap-4">
            <div className="hero-stat-item border-l-2 border-[#8ed500] pl-3">
              <div className="font-mono text-2xl font-black text-[#f3f3f3]">0.02ms</div>
              <div className="font-mono text-[10px] text-[#888] uppercase tracking-wider">
                Haptic Dial Latency
              </div>
            </div>
            <div className="hero-stat-item border-l-2 border-[#8ed500] pl-3">
              <div className="font-mono text-2xl font-black text-[#8ed500]">32 TOPS</div>
              <div className="font-mono text-[10px] text-[#888] uppercase tracking-wider">
                Edge NPU Power
              </div>
            </div>
            <div className="hero-stat-item border-l-2 border-[#8ed500] pl-3">
              <div className="font-mono text-2xl font-black text-[#f3f3f3]">48 HRS</div>
              <div className="font-mono text-[10px] text-[#888] uppercase tracking-wider">
                Continuous Battery
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：原汁原味还原并具备 3D 互动的硬件核心展示卡 */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[340px]">
            {/* 提示光标悬停与 3D 响应指示 */}
            <div className="mb-3 flex items-center justify-between text-[11px] font-mono text-[#888]">
              <span className="flex items-center gap-1.5 text-[#8ed500]">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                3D HARDWARE CAD VIEW
              </span>
              <span>HOVER & SCROLL TEST</span>
            </div>

            {/* 包装层 */}
            <div ref={cardContainerRef} className="w-full will-change-transform">
              <Card3D
                title="K-01 TERMINAL"
                content="Precision titanium frame, magnetic tactile stepper dial, transparent acid polycarbonate housing & local spatial AI core."
                month="JUNE"
                date="29"
                tag="GLOBAL DROP"
                ctaText="FULL SPEC SHEET"
                variant="classic"
                enableMouseTilt={true}
              />
            </div>

            {/* 底部参数悬浮注释 */}
            <div className="mt-4 p-3 bg-[#141414] border border-[#262626] flex items-center justify-between font-mono text-[10px] text-[#777]">
              <div>
                <span className="text-[#8ed500]">CHASSIS:</span> CNC TITANIUM
              </div>
              <div>
                <span className="text-[#8ed500]">DESIGNER:</span> JJ
              </div>
              <div>
                <span className="text-[#8ed500]">STATUS:</span> BATCH 001
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部滚动引导 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none opacity-60">
        <span className="font-mono text-[10px] tracking-widest text-[#8ed500] uppercase">
          SCROLL UP & DOWN TO TEST DUAL PARALLAX
        </span>
        <div className="w-4 h-7 border-2 border-[#8ed500] rounded-none p-0.5 flex justify-center">
          <div className="w-1 h-2 bg-[#8ed500] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
