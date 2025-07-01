'use client';

import AutoCarouselRow from './components/AutoCarouselRow';
import students from './data/students.json';

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Home() {
  return (
    <main className="relative h-full w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden">
      
      {/* 🌌 Background Decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-fuchsia-500 rounded-full blur-[100px] opacity-30 animate-pulse" />
        <div className="absolute top-[50%] right-[-150px] w-[250px] h-[250px] bg-cyan-400 rounded-full blur-[120px] opacity-25 animate-pulse" />
        <div className="absolute bottom-[-120px] left-[30%] w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[140px] opacity-20 animate-pulse" />
      </div>

      {/* 🎞️ Foreground Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        <div className="flex w-full h-screen flex-col justify-center gap-5 px-4">
          <div className="flex-1">
            <AutoCarouselRow students={shuffle(students)} speed={30} direction="left" />
          </div>
          <div className="flex-1">
            <AutoCarouselRow students={shuffle(students)} speed={80} direction="right" />
          </div>
          <div className="flex-1">
            <AutoCarouselRow students={shuffle(students)} speed={70} direction="left" />
          </div>
        </div>
      </div>
    </main>
  );
}