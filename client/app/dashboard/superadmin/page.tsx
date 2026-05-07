"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PageTemplate from "@/app/components/PageTemplate/PageTemplate";

/**
 * Superadmin dashboard page
 */
export default function SuperadminDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'superadmin') {
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
      <PageTemplate buttons={[{text: "12", icon: "home"}]}>
          <p>123</p>
      </PageTemplate>
  );
}