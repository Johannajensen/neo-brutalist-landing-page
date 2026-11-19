import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { FeaturesParallax } from './components/FeaturesParallax';
import { HorizontalShowcase } from './components/HorizontalShowcase';
import { InteractivePlayground } from './components/InteractivePlayground';
import { MetricsCounter } from './components/MetricsCounter';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  useEffect(() => {
    // 页面加载完成后刷新 ScrollTrigger 锚点，确保视差计算无偏差
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#141414] text-[#f3f3f3] selection:bg-[#8ed500] selection:text-[#141414]">
      {/* 极客准星光标 */}
      <CustomCursor />

      {/* 顶部 HUD 导航栏 */}
      <Navbar />

      {/* 主体内容 */}
      <main>
        {/* 01. 首屏视差与核心 3D 卡片呈现 */}
        <Hero />

        {/* 跑马灯加速带 */}
        <MarqueeTicker />

        {/* 02. 多层景深交错滚动视差瀑布流 */}
        <FeaturesParallax />

        {/* 03. 横向滑轨视差展厅 */}
        <HorizontalShowcase />

        {/* 04. 3D 参数与卡片调控实验室 */}
        <InteractivePlayground />

        {/* 05. 滚动触发动态度量看板 */}
        <MetricsCounter />

        {/* 06. 酸性野兽派行动呼吁 */}
        <CallToAction />
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}

export default App;
