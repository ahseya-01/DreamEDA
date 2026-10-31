import Image from 'next/image'
import logoImage from './logo.jpeg'

interface LogoProps {
  brand?: {
    name?: string;
  };
  dark?: boolean;
}

export default function Logo({ brand, dark = false }: LogoProps) {
  const brandName = brand?.name || 'DreamEDA';

  return (
    <div className="flex items-center gap-2">
      <Image
        src={logoImage}
        alt={`${brandName} Logo`}
        width={36}
        height={36}
        className="h-9 w-auto object-contain"
      />

      <span className={`font-bold text-xl ${dark ? 'text-white' : 'text-black'}`}>
        {brandName}
      </span>
    </div>
  )
}
