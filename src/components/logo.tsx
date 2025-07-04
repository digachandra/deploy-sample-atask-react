import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function Logo({ src, alt, className }: LogoProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image src={`/logo/${src}`} alt={`${alt} logo`} fill className="object-contain" priority />
    </div>
  );
}
