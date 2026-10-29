import Image from 'next/image'
import logoImage from './logo.jpeg'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src={logoImage.src} alt="DreamEDA Logo" className="h-9 w-auto object-contain" />
      <span className="font-bold text-xl text-black">DreamEDA</span>
    </div>
  )
}

