"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FadeAnimationProps {
  words: string[]
  className?: string
}

export function FadeAnimation({ words, className = "" }: FadeAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 4000) // Total duration for each word

    return () => clearInterval(timer)
  }, [words.length])

  return (
    <div className={`relative h-[1.5em] ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            opacity: { duration: 0.8, ease: "easeInOut" },
            y: { duration: 0.8, ease: "easeInOut" },
          }}
          className="absolute w-full"
        >
          {words[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

