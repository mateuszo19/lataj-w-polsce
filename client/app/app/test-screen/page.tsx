"use client";

import { useUser } from "@clerk/nextjs";
import { useAuthContext } from "@/app/components/Auth/AuthContext";
import Link from "next/link";

/**
 * Test screen to verify authentication and permissions
 */
export default function TestScreen() {
  const { isSignedIn, user } = useUser();
  const { userInfo, hasRole } = useAuthContext();

  const getUserEmail = () => {
    const email = user?.primaryEmailAddress;
    if (typeof email === "string") {
      return email;
    }
    if (email && "emailAddress" in email) {
      return email.emailAddress;
    }
    return "";
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Test ekranu autoryzacji</h1>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Status logowania</h2>
            <p className="text-sm">
              <span className="font-medium">Zalogowany:</span>{" "}
              <span className={isSignedIn ? "text-green-600" : "text-red-600"}>
                {isSignedIn ? "Tak" : "Nie"}
              </span>
            </p>
          </div>

          {isSignedIn && (
            <>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Dane użytkownika</h2>
                <p className="text-sm">
                  <span className="font-medium">ID:</span> {user?.id}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {getUserEmail()}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Rola użytkownika</h2>
                <p className="text-sm">
                  <span className="font-medium">Aktualna rola:</span>{" "}
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    {userInfo?.role || "Nie przypisano"}
                  </span>
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Sprawdzanie uprawnień</h2>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Admin:</span>{" "}
                    {hasRole("admin") ? <span className="text-green-600">✓ Dostęp</span> : <span className="text-red-600">✗ Brak dostępu</span>}
                  </p>
                  <p>
                    <span className="font-medium">Superadmin:</span>{" "}
                    {hasRole("superadmin") ? <span className="text-green-600">✓ Dostęp</span> : <span className="text-red-600">✗ Brak dostępu</span>}
                  </p>
                  <p>
                    <span className="font-medium">Klient:</span>{" "}
                    {hasRole("klient") ? <span className="text-green-600">✓ Dostęp</span> : <span className="text-red-600">✗ Brak dostępu</span>}
                  </p>
                  <p>
                    <span className="font-medium">Tenant:</span>{" "}
                    {hasRole("tenant") ? <span className="text-green-600">✓ Dostęp</span> : <span className="text-red-600">✗ Brak dostępu</span>}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">Zmień rolę</h2>
                <div className="flex gap-2 flex-wrap">
                  {["admin", "superadmin", "klient", "tenant"].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        if (userInfo) {
                          // TODO: Call API to update role in database
                          console.log("Changing role to:", role);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                        userInfo?.role === role
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Powrót do mapy
          </Link>
        </div>
      </div>
    </div>
  );
}