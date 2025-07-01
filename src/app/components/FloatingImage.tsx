'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface FloatingImageProps {
  src: string;
  width: number;
  height: number;
  opacity?: number;
  speed?: number; // pixels per second
  rotate?: boolean;
  className?: string;
}

export default function FloatingImage({
  src,
  width,
  height,
  opacity = 0.2,
  speed = 50,
  rotate = false,
  className = '',
}: FloatingImageProps) {
  const [position, setPosition] = useState(() => ({
    x: Math.random() * (window.innerWidth - width),
    y: Math.random() * (window.innerHeight - height),
  }));

  const [velocity, setVelocity] = useState(() => ({
    dx: (Math.random() < 0.5 ? -1 : 1) * (speed / 60),
    dy: (Math.random() < 0.5 ? -1 : 1) * (speed / 60),
  }));

const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => {
        let newX = prev.x + velocity.dx;
        let newY = prev.y + velocity.dy;

        let newDx = velocity.dx;
        let newDy = velocity.dy;

        if (newX < 0 || newX + width > window.innerWidth) {
          newDx = -newDx;
          newX = Math.max(0, Math.min(window.innerWidth - width, newX));
        }
        if (newY < 0 || newY + height > window.innerHeight) {
          newDy = -newDy;
          newY = Math.max(0, Math.min(window.innerHeight - height, newY));
        }

        setVelocity({ dx: newDx, dy: newDy });
        return { x: newX, y: newY };
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [velocity.dx, velocity.dy, width, height]);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity,
      }}
    >
      <Image
        src={src}
        alt="Floating Icon"
        width={width}
        height={height}
        className={className}
        style={{
          animation: rotate ? 'spin 12s linear infinite' : undefined,
        }}
      />
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}