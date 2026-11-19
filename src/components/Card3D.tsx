import React, { useRef, useState } from 'react';

interface Card3DProps {
  title?: string;
  content?: string;
  month?: string;
  date?: string | number;
  tag?: string;
  ctaText?: string;
  variant?: 'classic' | 'acid' | 'dark';
  enableMouseTilt?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  title = '3D Card',
  content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  month = 'JUNE',
  date = '29',
  tag,
  ctaText = 'See More',
  variant = 'classic',
  enableMouseTilt = true,
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMouseTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 计算中心相对偏移量 (-1 到 1)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    // 旋转限制在约 20 度
    setRotateY(deltaX * 18);
    setRotateX(-deltaY * 18);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // 根据变体决定背景纹理样式
  const getPatternClass = () => {
    switch (variant) {
      case 'acid':
        return 'pattern-hazard-acid';
      case 'dark':
        return 'bg-[#1a1a1a] border-[#333]';
      case 'classic':
      default:
        return 'pattern-hazard-original';
    }
  };

  const dynamicTransform = isHovered && enableMouseTilt
    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    : undefined;

  return (
    <div
      className={`group relative perspective-1000 select-none ${className}`}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        className={`relative w-full pt-[50px] border-[3px] border-[#141414] preserve-3d shadow-card-floating transition-all duration-500 ease-out cursor-pointer ${getPatternClass()}`}
        style={{
          transform: dynamicTransform,
          backgroundPosition: isHovered ? '-100px 100px, -100px 100px' : '0 0, 0 0',
        }}
      >
        {/* 顶部标签如果存在 */}
        {tag && (
          <div 
            className="absolute top-3 left-4 px-2 py-0.5 bg-[#141414] border border-[#8ed500] text-[9px] font-mono tracking-widest text-[#8ed500] font-bold uppercase"
            style={{ transform: 'translate3d(0, 0, 60px)' }}
          >
            {tag}
          </div>
        )}

        {/* 右上角悬浮 Date Box - 完全忠实还原 */}
        <div
          className="absolute top-[30px] right-[30px] h-[60px] w-[60px] bg-[#141414] border border-[#8ed500] p-2 flex flex-col items-center justify-center transition-transform duration-500 ease-out shadow-[0px_17px_10px_-10px_rgba(100,100,111,0.2)]"
          style={{
            transform: isHovered
              ? 'translate3d(0px, 0px, 95px) scale(1.08)'
              : 'translate3d(0px, 0px, 80px)',
          }}
        >
          <span className="block text-center text-[#8ed500] text-[9px] font-bold font-mono tracking-wider leading-none mb-1">
            {month}
          </span>
          <span className="block text-center text-[#8ed500] text-[20px] font-black font-mono leading-none">
            {date}
          </span>
        </div>

        {/* 下方荧光绿实体内容盒 Content Box - 完全忠实还原 */}
        <div
          className="bg-[#8ed500] p-[50px_25px_25px_25px] transition-all duration-500 ease-out preserve-3d"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Card Title */}
          <div
            className="inline-block text-[#141414] text-[24px] font-black tracking-tight transition-transform duration-500 ease-out"
            style={{
              transform: isHovered
                ? 'translate3d(0px, 0px, 65px)'
                : 'translate3d(0px, 0px, 50px)',
            }}
          >
            {title}
          </div>

          {/* Card Content */}
          <p
            className="mt-2.5 text-[12px] font-bold text-[#141414] leading-relaxed transition-transform duration-500 ease-out line-clamp-3"
            style={{
              transform: isHovered
                ? 'translate3d(0px, 0px, 55px)'
                : 'translate3d(0px, 0px, 30px)',
            }}
          >
            {content}
          </p>

          {/* See More Button */}
          <div className="mt-4">
            <span
              className="inline-block cursor-pointer font-black text-[9px] uppercase text-[#8ed500] bg-[#141414] px-3 py-2 transition-all duration-500 ease-out hover:bg-[#262626]"
              style={{
                transform: isHovered
                  ? 'translate3d(0px, 0px, 70px)'
                  : 'translate3d(0px, 0px, 20px)',
              }}
            >
              {ctaText} →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
