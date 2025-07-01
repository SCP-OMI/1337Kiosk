'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingImage from './FloatingImage'; // Make sure this file exists!

interface Student {
  name: string;
  quote: string;
  image: string;
  imageB?: string;
}

interface Props {
  students: Student[];
  speed: number;
  direction?: 'left' | 'right';
  cardHeight?: number;
}

export default function AutoCarouselRow({
  students,
  speed,
  direction = 'left',
  cardHeight = 300,
}: Props) {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const duplicated = [...students, ...students];
  const animClass = direction === 'left' ? 'infinite-scroll-left' : 'infinite-scroll-right';

  const handleCardClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (selectedStudent) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedStudent]);

  return (
    <div className="relative overflow-hiddenw-full" style={{ height: cardHeight }}>
      {/* Carousel */}
      <div
        className={`flex w-fit gap-6 ${selectedStudent ? '' : animClass}`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicated.map((student, idx) => (
          <motion.div
            key={idx}
            onClick={() => handleCardClick(student)}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black rounded-xl w-[250px] min-w-[250px] flex-shrink-0 shadow-lg overflow-hidden cursor-pointer"
            style={{ height: cardHeight }}
          >
            <div className="relative w-full" style={{ height: cardHeight }}>
              <Image
                src={student.image}
                alt={student.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal & Background */}
      <AnimatePresence>
        {selectedStudent && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Floating Images */}
            <div className="fixed h-[full] w-full inset-0 z-50 pointer-events-none">
              <FloatingImage
              src="/students/crt.png"
              width={400}
              height={80}
              opacity={0.6}
              rotate
              />
              <FloatingImage
              src="/students/handphone.png"
              width={400}
              height={80}
              opacity={0.8}
              rotate
              />
              <FloatingImage
              src="/students/retroCrt.png"
              width={400}
              height={100}
              opacity={0.85}
              rotate
              />
              <FloatingImage
              src="/students/radio.png"
              width={400}
              height={70}
              opacity={0.85}
              rotate
              />
              <FloatingImage
                  src="/students/phone.png"
                  width={400}
                  height={200}
                  opacity={0.9}
                  rotate
                  className="invert"
              />
            <FloatingImage
                  src="/students/casette.png"
                  width={400}
                  height={90}
                  opacity={0.8}
                  rotate
                  className="invert"
>
                </FloatingImage>
            </div>

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-60"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div
                ref={modalRef}
                className="bg-white rounded-xl shadow-xl w-[90%] max-w-4xl mx-auto overflow-hidden"
              >
                <div className="relative w-full h-[900px]">
                  <Image
                    src={selectedStudent.imageB || selectedStudent.image}
                    alt={selectedStudent.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="bg-black"
                  />
                </div>
          
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}