import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Qedb.net</h2>
      <Link href='/signin'>
        <a>Login</a>
      </Link>
    </div>
  );
}
