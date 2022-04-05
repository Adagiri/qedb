import dynamic from 'next/dynamic';
import MainLoader from '../../components/Loader/MainLoader';

const Content = dynamic(() => import('../../components/Content'), {
  ssr: false,
  loading: () => <MainLoader loader={true} />,
});

export default function ContentPage() {
  return <Content />;
}
