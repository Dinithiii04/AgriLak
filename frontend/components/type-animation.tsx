"use client"

import { useEffect, useState } from "react"
// import { motion } from "framer-motion"

interface TypeAnimationProps {
  words: string[]
  className?: string
}

export function TypeAnimation({ words, className = "" }: TypeAnimationProps) {
  const [currentWord, setCurrentWord] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWord]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1))
          } else {
            // Wait a bit before starting to delete
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(word.slice(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentWord((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    ) // Faster deletion, slower typing

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWord, words])

  return (
    <div className={`relative ${className}`}>
      {/* <motion.div key={currentText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block">
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="ml-1 inline-block w-[2px] h-[1em] bg-current"
        />
      </motion.div> */}
    </div>
  )
}

