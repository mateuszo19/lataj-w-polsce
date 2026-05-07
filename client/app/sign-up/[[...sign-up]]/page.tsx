import { SignUp } from '@clerk/nextjs';

/**
 * Sign up page component
 */
export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp />
    </div>
  );
}

export function generateStaticParams() {
  return [];
}
