//pages/index.tsx
import dynamic from 'next/dynamic';

const ReactAdmin = dynamic(() => import('../components/ReactAdmin'), {
  ssr: false,
});

export default function HomePage() {
  return <ReactAdmin />;
}
