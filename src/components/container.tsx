import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn('container mx-auto flex flex-col px-4', className)}>{children}</div>;
}
