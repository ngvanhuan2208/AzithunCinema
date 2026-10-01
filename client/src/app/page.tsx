import Link from 'next/link';
export default function Page() {
  return (
    <main className="container page-stack">
      <h1>Azithun</h1>
      <p>Nền tảng giao diện đang được xây dựng.</p>
      {process.env.NODE_ENV === 'development' && (
        <Link href="/design-system">Mở hệ thống thiết kế</Link>
      )}
    </main>
  );
}
