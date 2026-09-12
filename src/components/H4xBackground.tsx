import React from 'react';

interface Watermark {
  id: number;
  text: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: number;
  sizeClass: string;
  opacityClass: string;
  outline?: boolean;
}

const WATERMARKS: Watermark[] = [
  // Top region
  {
    id: 1,
    text: 'H4X',
    top: '-2%',
    left: '-2%',
    rotate: -18,
    sizeClass: 'text-8xl sm:text-[10rem] lg:text-[13rem]',
    opacityClass: 'opacity-[0.04] dark:opacity-[0.06]',
    outline: false,
  },
  {
    id: 2,
    text: 'H4X',
    top: '4%',
    right: '2%',
    rotate: 24,
    sizeClass: 'text-7xl sm:text-9xl lg:text-[11rem]',
    opacityClass: 'opacity-[0.04] dark:opacity-[0.06]',
    outline: true,
  },
  {
    id: 3,
    text: 'H4X',
    top: '16%',
    left: '26%',
    rotate: -12,
    sizeClass: 'text-6xl sm:text-7xl lg:text-8xl',
    opacityClass: 'opacity-[0.05] dark:opacity-[0.07]',
    outline: false,
  },
  {
    id: 4,
    text: 'H4X',
    top: '10%',
    right: '28%',
    rotate: -34,
    sizeClass: 'text-5xl sm:text-6xl lg:text-7xl',
    opacityClass: 'opacity-[0.03] dark:opacity-[0.05]',
    outline: true,
  },

  // Mid-upper region
  {
    id: 5,
    text: 'H4X',
    top: '30%',
    left: '-5%',
    rotate: 36,
    sizeClass: 'text-8xl sm:text-[11rem] lg:text-[14rem]',
    opacityClass: 'opacity-[0.03] dark:opacity-[0.05]',
    outline: false,
  },
  {
    id: 6,
    text: 'H4X',
    top: '35%',
    right: '8%',
    rotate: -20,
    sizeClass: 'text-7xl sm:text-9xl lg:text-[10rem]',
    opacityClass: 'opacity-[0.05] dark:opacity-[0.07]',
    outline: true,
  },
  {
    id: 7,
    text: 'H4X',
    top: '45%',
    left: '42%',
    rotate: 15,
    sizeClass: 'text-9xl sm:text-[12rem] lg:text-[15rem]',
    opacityClass: 'opacity-[0.03] dark:opacity-[0.04]',
    outline: false,
  },

  // Mid-lower region
  {
    id: 8,
    text: 'H4X',
    top: '58%',
    left: '6%',
    rotate: -26,
    sizeClass: 'text-7xl sm:text-8xl lg:text-9xl',
    opacityClass: 'opacity-[0.04] dark:opacity-[0.06]',
    outline: false,
  },
  {
    id: 9,
    text: 'H4X',
    top: '64%',
    right: '-4%',
    rotate: 32,
    sizeClass: 'text-8xl sm:text-[10rem] lg:text-[13rem]',
    opacityClass: 'opacity-[0.03] dark:opacity-[0.05]',
    outline: true,
  },

  // Lower region
  {
    id: 10,
    text: 'H4X',
    bottom: '18%',
    left: '28%',
    rotate: -15,
    sizeClass: 'text-6xl sm:text-8xl lg:text-9xl',
    opacityClass: 'opacity-[0.05] dark:opacity-[0.07]',
    outline: false,
  },
  {
    id: 11,
    text: 'H4X',
    bottom: '6%',
    left: '-2%',
    rotate: 22,
    sizeClass: 'text-7xl sm:text-9xl lg:text-[11rem]',
    opacityClass: 'opacity-[0.04] dark:opacity-[0.06]',
    outline: true,
  },
  {
    id: 12,
    text: 'H4X',
    bottom: '-3%',
    right: '12%',
    rotate: -28,
    sizeClass: 'text-9xl sm:text-[12rem] lg:text-[15rem]',
    opacityClass: 'opacity-[0.03] dark:opacity-[0.05]',
    outline: false,
  },
];

const H4xBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden text-zinc-900 dark:text-zinc-100"
    >
      {WATERMARKS.map((item) => (
        <span
          key={item.id}
          className={`absolute font-mono font-black tracking-widest uppercase leading-none transition-opacity duration-300 ${item.sizeClass} ${item.opacityClass}`}
          style={{
            top: item.top,
            bottom: item.bottom,
            left: item.left,
            right: item.right,
            transform: `rotate(${item.rotate}deg)`,
            transformOrigin: 'center center',
            WebkitTextStroke: item.outline ? '1.5px currentColor' : 'none',
            color: item.outline ? 'transparent' : 'currentColor',
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
};

export default H4xBackground;
