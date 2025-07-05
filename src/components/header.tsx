import Logo from '@/components/logo';
import Container from './container';

type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return (
    <header className="border-b bg-white py-4">
      <Container className="space-y-4">
        <div className="flex justify-between">
          <Logo src="atask.png" alt="Atask" className="aspect-[91/30] !h-[24px]" />
          <span className="text-xs font-bold">GRE v1.0</span>
        </div>
        {children}
      </Container>
    </header>
  );
}
