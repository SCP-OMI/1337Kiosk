'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface Props {
  name: string;
  image: string;
  onClick: () => void;
}

export default function Door({ name, image, onClick }: Props) {
  return (
    <motion.div
  className="bg-white rounded-2xl overflow-hidden cursor-pointer touch-none w-full h-[200px] sm:h-[250px] relative"      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <Image
        src={image}
        alt={name}
        fill
        style={{ objectFit: 'cover' }}
        className="opacity-60"
        />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-xl font-semibold">
        Tap to Meet {name}
      </div>
    </motion.div>
  );
}