import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sliders, Copy, Check, RotateCcw, Box } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const InteractivePlayground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardViewerRef = useRef<HTMLDivElement>(null);
  const [perspective, setPerspective] = useState(1000);
  const [rotateX, setRotateX] = useState(15);
  const [rotateY, setRotateY] = useState(20);
  const [zDate, setZDate] = useState(80);
  const [zTitle, setZTitle] = useState(50);
  const [zContent, setZContent] = useState(30);
  const [zBtn, setZBtn] = useState(20);
  const [variant, setVariant] = useState<'classic' | 'acid'>('classic');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 滚入时触发 3D 机械检视动画，滑走时反向，再次滑入再次重置触发 (restart reverse restart reverse)
      gsap.from(cardViewerRef.current, {
        scale: 0.85,
        rotationY: -45,
        opacity: 0,
        duration: 1.2,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'restart reverse restart reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const resetParams = () => {
    setPerspective(1000);
    setRotateX(15);
    setRotateY(20);
    setZDate(80);
    setZTitle(50);
    setZContent(30);
    setZBtn(20);
    setVariant('classic');
  };

  const copyCAD = () => {
    const configSnippet = `// KINETIC-01 CAD EXPLODED VIEW CONFIGURATION
// Architect: Johannajensen (Johannajensen1@gmail.com)
const k01Spec = {
  perspective_field: "${perspective}px",
  pitch_angle: "${rotateX}deg",
  yaw_angle: "${rotateY}deg",
  explosion_layers: {
    stepper_dial_top: "${zDate}px",
    acid_housing: "${zTitle}px",
    npu_silicon_substrate: "${zContent}px",
    titanium_cnc_unibody: "${zBtn}px"
  },
  housing_edition: "${variant === 'classic' ? 'STEALTH_TITANIUM' : 'ACID_VOLT_LIMITED'}"
};`;
    navigator.clipboard.writeText(configSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="playground"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#141414] border-b-2 border-[#262626] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 pb-6 border-b-2 border-[#262626]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-[#8ed500]" />
            <span className="font-mono text-xs font-black text-[#8ed500] uppercase tracking-widest flex items-center gap-2">
              [SECTION 04 // 3D CAD EXPLODED VIEW LAB]
              <Box className="w-3.5 h-3.5" />
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            HARDWARE <span className="text-[#8ed500]">CAD EXPLODER</span>
          </h2>
          <p className="font-mono text-xs text-[#888] mt-2">
            自由操控 K-01 工业设计三维视距，拉伸拆解爆炸图层级，观察各机械模块的空间堆叠架构。
          </p>
        </div>

        {/* 主控制台网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* 左侧控制滑块仪表盘 */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-[#181818] border-2 border-[#333] shadow-brutal-acid space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#2a2a2a]">
              <span className="font-mono text-xs font-black text-[#8ed500] flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                CAD CALIBRATION MATRIX
              </span>
              <button
                onClick={resetParams}
                className="font-mono text-[10px] text-[#aaa] hover:text-[#8ed500] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                RESET CAD POSE
              </button>
            </div>

            {/* 材质限定版切换 */}
            <div>
              <label className="font-mono text-xs font-bold text-white block mb-2 uppercase">
                HOUSING FINISH (外壳定制材质)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setVariant('classic')}
                  className={`py-2 px-3 font-mono text-xs font-bold border transition-all cursor-pointer ${
                    variant === 'classic'
                      ? 'bg-[#8ed500] text-[#141414] border-[#8ed500] shadow-[2px_2px_0px_#fff]'
                      : 'bg-[#141414] text-[#888] border-[#333]'
                  }`}
                >
                  TITANIUM STEALTH (黑灰警戒纹)
                </button>
                <button
                  onClick={() => setVariant('acid')}
                  className={`py-2 px-3 font-mono text-xs font-bold border transition-all cursor-pointer ${
                    variant === 'acid'
                      ? 'bg-[#8ed500] text-[#141414] border-[#8ed500] shadow-[2px_2px_0px_#fff]'
                      : 'bg-[#141414] text-[#888] border-[#333]'
                  }`}
                >
                  ACID VOLT DROP (限定荧光电光)
                </button>
              </div>
            </div>

            {/* 滑块：Perspective */}
            <div>
              <div className="flex justify-between font-mono text-xs text-white mb-1.5">
                <span>CAMERA PERSPECTIVE (视距广角)</span>
                <span className="text-[#8ed500] font-bold">{perspective}px</span>
              </div>
              <input
                type="range"
                min="400"
                max="2000"
                step="50"
                value={perspective}
                onChange={(e) => setPerspective(Number(e.target.value))}
                className="w-full accent-[#8ed500] bg-[#222] h-2 cursor-pointer"
              />
            </div>

            {/* 滑块：Rotate X & Y */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between font-mono text-xs text-white mb-1.5">
                  <span>PITCH (俯仰角 X)</span>
                  <span className="text-[#8ed500] font-bold">{rotateX}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={rotateX}
                  onChange={(e) => setRotateX(Number(e.target.value))}
                  className="w-full accent-[#8ed500] bg-[#222] h-2 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs text-white mb-1.5">
                  <span>YAW (偏航角 Y)</span>
                  <span className="text-[#8ed500] font-bold">{rotateY}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={rotateY}
                  onChange={(e) => setRotateY(Number(e.target.value))}
                  className="w-full accent-[#8ed500] bg-[#222] h-2 cursor-pointer"
                />
              </div>
            </div>

            {/* 滑块：Z 轴零件间距 (爆炸图) */}
            <div className="space-y-3 pt-2 border-t border-[#2a2a2a]">
              <span className="font-mono text-[11px] text-[#888] block uppercase">
                EXPLODED VIEW GAP (零件空间分离厚度)
              </span>

              <div>
                <div className="flex justify-between font-mono text-[11px] text-white mb-1">
                  <span>STEPPER DIAL CAP (磁旋钮顶盖)</span>
                  <span className="text-[#8ed500] font-bold">+{zDate}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="140"
                  value={zDate}
                  onChange={(e) => setZDate(Number(e.target.value))}
                  className="w-full accent-[#8ed500] bg-[#222] h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] text-white mb-1">
                  <span>HOUSING BADGE (外壳铭牌)</span>
                  <span className="text-[#8ed500] font-bold">+{zTitle}px</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={zTitle}
                  onChange={(e) => setZTitle(Number(e.target.value))}
                  className="w-full accent-[#8ed500] bg-[#222] h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] text-white mb-1">
                  <span>NPU SILICON SUBSTRATE (板载主板)</span>
                  <span className="text-[#8ed500] font-bold">+{zContent}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={zContent}
                  onChange={(e) => setZContent(Number(e.target.value))}
                  className="w-full accent-[#8ed500] bg-[#222] h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-[11px] text-white mb-1">
                  <span>HOT-SWAP KEYS (触觉微动底座)</span>
                  <span className="text-[#8ed500] font-bold">+{zBtn}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={zBtn}
                  onChange={(e) => setZBtn(Number(e.target.value))}
                  className="w-full accent-[#8ed500] bg-[#222] h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* 复制配置代码 */}
            <div className="pt-2">
              <button
                onClick={copyCAD}
                className="w-full py-3 bg-[#141414] hover:bg-[#8ed500] hover:text-[#141414] text-[#8ed500] font-mono text-xs font-black uppercase border-2 border-[#8ed500] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'CAD SPEC COPIED TO CLIPBOARD' : 'EXPORT CAD PARAMETERS'}</span>
              </button>
            </div>
          </div>

          {/* 右侧：实时渲染的硬件 CAD 爆炸图展示 */}
          <div
            ref={cardViewerRef}
            className="lg:col-span-6 flex flex-col items-center justify-center min-h-[460px] p-8 bg-[#101010] border-2 border-dashed border-[#333] relative will-change-transform"
          >
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[#666]">
              CAD ENGINE: CSS-PRESERVE-3D // LIVE
            </div>

            <div
              className="w-[300px] select-none"
              style={{
                perspective: `${perspective}px`,
              }}
            >
              {/* 卡片主体 */}
              <div
                className={`w-full pt-[50px] border-[3px] border-[#141414] preserve-3d shadow-card-floating transition-transform duration-200 relative ${
                  variant === 'acid' ? 'pattern-hazard-acid' : 'pattern-hazard-original'
                }`}
                style={{
                  transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 悬浮 Date Box */}
                <div
                  className="absolute top-[30px] right-[30px] h-[60px] w-[60px] bg-[#141414] border border-[#8ed500] p-2 flex flex-col items-center justify-center shadow-[0px_17px_10px_-10px_rgba(100,100,111,0.2)] transition-transform duration-200"
                  style={{
                    transform: `translate3d(0px, 0px, ${zDate}px)`,
                  }}
                >
                  <span className="block text-center text-[#8ed500] text-[9px] font-bold font-mono tracking-wider leading-none mb-1">
                    BATCH
                  </span>
                  <span className="block text-center text-[#8ed500] text-[20px] font-black font-mono leading-none">
                    001
                  </span>
                </div>

                {/* 荧光绿 Content Box */}
                <div
                  className="bg-[#8ed500] p-[50px_25px_25px_25px] preserve-3d"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="inline-block text-[#141414] text-[25px] font-black tracking-tight transition-transform duration-200"
                    style={{
                      transform: `translate3d(0px, 0px, ${zTitle}px)`,
                    }}
                  >
                    K-01 CORE
                  </div>

                  <p
                    className="mt-2.5 text-[12px] font-bold text-[#141414] leading-relaxed transition-transform duration-200"
                    style={{
                      transform: `translate3d(0px, 0px, ${zContent}px)`,
                    }}
                  >
                    CNC Titanium chassis, magnetic haptic dial with 60 steps feedback & local 32TOPS AI neural engine.
                  </p>

                  <div className="mt-4">
                    <span
                      className="inline-block cursor-pointer font-black text-[9px] uppercase text-[#8ed500] bg-[#141414] px-3 py-2 transition-transform duration-200"
                      style={{
                        transform: `translate3d(0px, 0px, ${zBtn}px)`,
                      }}
                    >
                      LOCK SPECIFICATION
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 font-mono text-[10px] text-[#777] text-center">
              DRAG SLIDERS ON THE LEFT TO INSPECT AIR-GAP INTEGRITY BETWEEN LAYERS.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
