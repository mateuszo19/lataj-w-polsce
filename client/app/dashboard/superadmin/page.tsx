"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PageTemplate from "@/app/components/PageTemplate/PageTemplate";
import {Backpack, GraduationCap, Inbox, LayoutDashboard, Plane, School} from "lucide-react";
import {ButtonInterface} from "@/app/interface/button.interface";

const navButtons: ButtonInterface[] = [
    {text: "Dashboard", icon: <LayoutDashboard size={20}/>},
    {text: "Ośrodki", icon: <School size={20}/>},
    {text: "Kursy", icon: <GraduationCap size={20}/>},
    {text: "Samoloty", icon: <Plane size={20}/>},
    {text: "Skrzynka", icon: <Inbox size={20}/>},
]

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
      <PageTemplate buttons={navButtons}>
          <p>DTO</p>
      </PageTemplate>
  );
}