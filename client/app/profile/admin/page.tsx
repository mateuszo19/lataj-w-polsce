"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Admin profile page
 */
export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'admin') {
      router.push('/');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ADMIN</h1>
          <p className="text-lg text-gray-600 mb-6">
            Witaj w panelu administratora
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              Email: {user?.primaryEmailAddress?.emailAddress}
            </p>
            <p className="text-sm text-green-800 mt-2">
              Rola: {(user?.publicMetadata?.role as string) || 'admin'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}