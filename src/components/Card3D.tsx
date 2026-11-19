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

  // 鼠标移动计算倾斜
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMouseTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    setRotateY(deltaX * 18);
    setRotateX(-deltaY * 18);
  };

  // 移动端触摸手势计算倾斜 (Touch Support)
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!enableMouseTilt || !cardRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    setRotateY(deltaX * 16);
    setRotateX(-deltaY * 16);
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

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
    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    : undefined;

  return (
    <div
      className={`group relative perspective-1000 select-none w-full max-w-[340px] mx-auto ${className}`}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        className={`relative w-full pt-[45px] sm:pt-[50px] border-[3px] border-[#141414] preserve-3d shadow-card-floating transition-all duration-300 ease-out cursor-pointer ${getPatternClass()}`}
        style={{
          transform: dynamicTransform,
          backgroundPosition: isHovered ? '-100px 100px, -100px 100px' : '0 0, 0 0',
        }}
      >
        {/* 顶部标签 */}
        {tag && (
          <div 
            className="absolute top-2.5 left-3 sm:top-3 sm:left-4 px-2 py-0.5 bg-[#141414] border border-[#8ed500] text-[8px] sm:text-[9px] font-mono tracking-widest text-[#8ed500] font-bold uppercase"
            style={{ transform: 'translate3d(0, 0, 60px)' }}
          >
            {tag}
          </div>
        )}

        {/* 右上角悬浮 Date Box - 完全忠实还原 */}
        <div
          className="absolute top-[24px] right-[20px] sm:top-[30px] sm:right-[30px] h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] bg-[#141414] border border-[#8ed500] p-1.5 sm:p-2 flex flex-col items-center justify-center transition-transform duration-300 ease-out shadow-[0px_17px_10px_-10px_rgba(100,100,111,0.2)]"
          style={{
            transform: isHovered
              ? 'translate3d(0px, 0px, 95px) scale(1.08)'
              : 'translate3d(0px, 0px, 80px)',
          }}
        >
          <span className="block text-center text-[#8ed500] text-[8px] sm:text-[9px] font-bold font-mono tracking-wider leading-none mb-1">
            {month}
          </span>
          <span className="block text-center text-[#8ed500] text-[18px] sm:text-[20px] font-black font-mono leading-none">
            {date}
          </span>
        </div>

        {/* 下方荧光绿实体内容盒 Content Box */}
        <div
          className="bg-[#8ed500] p-[40px_20px_20px_20px] sm:p-[50px_25px_25px_25px] transition-all duration-300 ease-out preserve-3d"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Card Title */}
          <div
            className="inline-block text-[#141414] text-[20px] sm:text-[24px] font-black tracking-tight transition-transform duration-300 ease-out"
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
            className="mt-2 text-[11px] sm:text-[12px] font-bold text-[#141414] leading-relaxed transition-transform duration-300 ease-out line-clamp-3"
            style={{
              transform: isHovered
                ? 'translate3d(0px, 0px, 55px)'
                : 'translate3d(0px, 0px, 30px)',
            }}
          >
            {content}
          </p>

          {/* See More Button */}
          <div className="mt-3.5 sm:mt-4">
            <span
              className="inline-block cursor-pointer font-black text-[8px] sm:text-[9px] uppercase text-[#8ed500] bg-[#141414] px-2.5 py-1.5 sm:px-3 sm:py-2 transition-all duration-300 ease-out hover:bg-[#262626]"
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
