import { SignIn } from '@clerk/nextjs';

/**
 * Sign in page component
 */
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn />
    </div>
  );
}

export function generateStaticParams() {
  return [];
}
