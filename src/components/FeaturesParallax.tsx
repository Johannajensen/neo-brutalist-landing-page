import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card3D } from './Card3D';
import { Compass, Cpu, Crosshair, ArrowUpDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesParallax: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const bgStripeRef = useRef<HTMLDivElement>(null);
  const floatMarkerRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 卡片各自的 3D 复合视差（Y 轴超大差动 + X 轴微摆 + 旋转扭角）
      // Card 1
      gsap.to(card1Ref.current, {
        y: -140,
        x: -20,
        rotateZ: -4,
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Card 2
      gsap.to(card2Ref.current, {
        y: -280,
        x: 25,
        rotateZ: 5,
        scale: 0.98,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Card 3
      gsap.to(card3Ref.current, {
        y: -180,
        x: -15,
        rotateZ: -3,
        scale: 1.03,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // Card 4
      gsap.to(card4Ref.current, {
        y: -340,
        x: 30,
        rotateZ: 4,
        scale: 0.97,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.8,
        },
      });

      // 2. 背景斜纹带超大跨度双向擦除
      if (bgStripeRef.current) {
        gsap.to(bgStripeRef.current, {
          y: -200,
          backgroundPosition: '300px 450px, 300px 450px',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 3. 悬浮浮标视差
      if (floatMarkerRef.current) {
        gsap.to(floatMarkerRef.current, {
          y: 400,
          rotation: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // 4. 滚动侦测实时联动左侧激活层级（上下滚动双向更新，离开时重置）
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 40%',
        end: 'bottom 60%',
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.25) setActiveTier(1);
          else if (p < 0.5) setActiveTier(2);
          else if (p < 0.75) setActiveTier(3);
          else setActiveTier(4);
        },
        onLeaveBack: () => {
          setActiveTier(1); // 向上滑回顶部时彻底重置
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8 border-b-2 border-[#262626] bg-[#141414] overflow-hidden"
    >
      {/* 滚动视差背景几何条纹带 */}
      <div
        ref={bgStripeRef}
        className="absolute top-1/4 -right-20 w-[550px] h-[800px] pattern-hazard-original opacity-25 pointer-events-none -z-0 rotate-12"
      />

      {/* 独立逆向视差浮标 */}
      <div
        ref={floatMarkerRef}
        className="absolute top-20 left-10 text-[#8ed500]/20 pointer-events-none hidden lg:block"
      >
        <Crosshair className="w-24 h-24 stroke-1" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-6 border-b-2 border-[#262626]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-[#8ed500]" />
              <span className="font-mono text-xs font-black text-[#8ed500] uppercase tracking-widest flex items-center gap-2">
                [SECTION 02 // BIDIRECTIONAL PARALLAX TEARDOWN]
                <ArrowUpDown className="w-3.5 h-3.5" />
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#f3f3f3] tracking-tight">
              CONTINUOUS <span className="text-[#8ed500]">PARALLAX STACK</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-mono text-xs text-[#888] max-w-sm">
            随着滚轮上下往复，4 个独立模组将以多级阻尼展开或闭合，无论反复滚动多少次，动画均精准保持物理重置。
          </p>
        </div>

        {/* 视差瀑布流网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 左侧说明面板 (Sticky Info HUD) */}
          <div ref={leftColRef} className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="p-6 bg-[#1a1a1a] border-2 border-[#333] shadow-brutal-acid">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2e2e2e]">
                <span className="font-mono text-xs font-black text-[#8ed500] flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  KINETIC-01 BOM DYNAMICS
                </span>
                <span className="font-mono text-[10px] text-[#8ed500] border border-[#8ed500] px-1.5 py-0.5">
                  ACTIVE TIER: 0{activeTier}
                </span>
              </div>

              <h3 className="text-xl font-black uppercase text-white mb-3">
                物理触觉与空间硬件解构
              </h3>
              <p className="text-xs text-[#aaa] leading-relaxed mb-4">
                打破传统智能外设廉价塑料的平庸。K-01 专为追求极致工效和机械手感的创作者定制：
              </p>

              <div className="space-y-2.5 font-mono text-xs">
                <div
                  className={`flex items-center justify-between p-2.5 border transition-all duration-300 ${
                    activeTier === 4
                      ? 'bg-[#8ed500] text-[#141414] border-[#8ed500] font-black'
                      : 'bg-[#141414] text-[#888] border-[#2e2e2e]'
                  }`}
                >
                  <span>LEVEL 04 [TOP]</span>
                  <span>MAGNETIC DIAL (可调阻尼旋钮)</span>
                </div>

                <div
                  className={`flex items-center justify-between p-2.5 border transition-all duration-300 ${
                    activeTier === 3
                      ? 'bg-[#8ed500] text-[#141414] border-[#8ed500] font-black'
                      : 'bg-[#141414] text-[#888] border-[#2e2e2e]'
                  }`}
                >
                  <span>LEVEL 03</span>
                  <span>ACID POLYCARBONATE (散热护罩)</span>
                </div>

                <div
                  className={`flex items-center justify-between p-2.5 border transition-all duration-300 ${
                    activeTier === 2
                      ? 'bg-[#8ed500] text-[#141414] border-[#8ed500] font-black'
                      : 'bg-[#141414] text-[#888] border-[#2e2e2e]'
                  }`}
                >
                  <span>LEVEL 02</span>
                  <span>EDGE NPU CORE (32TOPS 神经核心)</span>
                </div>

                <div
                  className={`flex items-center justify-between p-2.5 border transition-all duration-300 ${
                    activeTier === 1
                      ? 'bg-[#8ed500] text-[#141414] border-[#8ed500] font-black'
                      : 'bg-[#141414] text-[#888] border-[#2e2e2e]'
                  }`}
                >
                  <span>LEVEL 01 [BASE]</span>
                  <span>CNC TITANIUM UNIBODY (钛金骨架)</span>
                </div>
              </div>
            </div>

            <div className="p-5 border border-[#333] bg-[#141414] text-[#888] font-mono text-[11px] space-y-2">
              <div className="flex items-center gap-2 text-[#8ed500] font-bold">
                <Compass className="w-3.5 h-3.5" />
                BIDIRECTIONAL SCRUB SYNC
              </div>
              <p>
                向上反滚时，动画平滑倒退归零；向下滚动时即时重发展开，绝不停止响应。
              </p>
            </div>
          </div>

          {/* 右侧：多张具有速度差的 3D 卡片瀑布流 */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
            {/* 卡片 1 */}
            <div ref={card1Ref} className="w-full will-change-transform">
              <Card3D
                title="HAPTIC DIAL"
                content="无级磁阻尼触觉飞梭。内置高分辨率磁编码器，支持从 60 档段落刻度感到完全无摩擦滑动的软件实时切换。"
                month="MOD"
                date="01"
                tag="INPUT SENSOR"
                ctaText="VIEW ROTARY TECH"
                variant="classic"
              />
            </div>

            {/* 卡片 2 - 带有酸性变体 */}
            <div ref={card2Ref} className="w-full sm:mt-16 will-change-transform">
              <Card3D
                title="ACID HOUSING"
                content="高透光聚碳酸酯顶盖，配合 45 度经典几何斜纹散热风道，无螺丝磁吸易拆卸结构，可随心替换客制化外壳。"
                month="MOD"
                date="02"
                tag="HOUSING // 8ED500"
                ctaText="INSPECT POLYCARB"
                variant="acid"
              />
            </div>

            {/* 卡片 3 */}
            <div ref={card3Ref} className="w-full will-change-transform">
              <Card3D
                title="EDGE NPU 32T"
                content="超低功耗微神经处理单元。本地离线执行空间手势识别与多模态语音交互，毫秒响应，零数据上传风险。"
                month="MOD"
                date="03"
                tag="CORE SILICON"
                ctaText="CHECK NPU ARCH"
                variant="classic"
              />
            </div>

            {/* 卡片 4 */}
            <div ref={card4Ref} className="w-full sm:mt-16 will-change-transform">
              <Card3D
                title="TITAN CHASSIS"
                content="五轴高精 CNC 一体成型航空级钛合金机身。沉稳纯黑阳极氧化，3px 硬朗直角边框，彻底告别廉价塑料感。"
                month="MOD"
                date="04"
                tag="UNIBODY FRAME"
                ctaText="EXPLORE ALLOY"
                variant="acid"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
