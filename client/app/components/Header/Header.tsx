"use client";

import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

/**
 * User location coordinates
 */
interface UserLocation {
  lat: number;
  lng: number;
}

/**
 * Props for the Header component
 */
interface HeaderProps {
  locationCount: number;
  onGetCurrentLocation?: () => void;
  userLocation?: UserLocation | null;
}

/**
 * Header component displaying branding, statistics and authentication
 */
export default function Header({ locationCount, onGetCurrentLocation, userLocation }: HeaderProps) {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const handleDashboardClick = () => {
    const role = user?.publicMetadata?.role as string || 'uczen';
    router.push(`/profile/${role}/dashboard`);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-900">Lataj w Polsce</h1>
        <p className="text-sm text-gray-600">Odkryj szkolenia lotnicze</p>
      </div>

      <div className="flex items-center gap-6">
        {onGetCurrentLocation && (
          <button
            onClick={onGetCurrentLocation}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2 ${
              userLocation
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{userLocation ? "Lokalizacja ustawiona" : "Ustaw swoją lokalizację"}</span>
          </button>
        )}

        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            LOKALIZACJE {locationCount}
          </div>
        </div>

        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <button
              onClick={handleDashboardClick}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <span>Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <UserButton />
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors flex items-center gap-2">
              <span>Zaloguj</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </button>
          </SignInButton>
        )}
      </div>
    </header>
  );
}