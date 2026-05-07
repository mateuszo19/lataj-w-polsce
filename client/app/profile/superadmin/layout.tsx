"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PageTemplate from "@/app/components/PageTemplate/PageTemplate";
import {GraduationCap, Inbox, LayoutDashboard, Plane, School} from "lucide-react";
import {NavButtonInterface} from "@/app/interface/navButton.interface";
import createLink from "@/util/createLink";

/**
 * Superadmin profile page
 */
export default function SuperadminDashboard({
                                                children,
                                            }: Readonly<{
    children: React.ReactNode;
}>) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role !== 'superadmin') {
      router.push('/');
    }
  }, [isLoaded, user, router]);

    const navButtons: NavButtonInterface[] = [
        {text: "Dashboard", link: createLink("dashboard", user?.publicMetadata?.role), icon: <LayoutDashboard size={20}/>},
        {text: "Ośrodki", link: createLink("flying-schools", user?.publicMetadata?.role), icon: <School size={20}/>},
    ]

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Ładowanie...</div>
      </div>
    );
  }

  return (
      <PageTemplate buttons={navButtons}>
          {children}
      </PageTemplate>
  );
}