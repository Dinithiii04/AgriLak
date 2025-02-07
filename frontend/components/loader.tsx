import type React from "react"
import Image from "next/image"

const GifLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#d4efbf] flex flex-col items-center justify-center z-50">
      <div className="w-64 h-64 relative">
        <Image
          src="https://cdn.dribbble.com/users/4186719/screenshots/19183859/media/b2988bfec30accd24733e32f640d23ad.gif"
          alt="Loading animation"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="mt-4 text-2xl font-bold text-green-900 animate-pulse">LOADING</div>
    </div>
  )
}

export default GifLoader