import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>    
    </main>
  );
}

