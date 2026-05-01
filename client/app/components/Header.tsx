/**
 * Header component displaying branding and statistics
 */
interface HeaderProps {
  locationCount: number;
}

export default function Header({ locationCount }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gray-900">Lataj w Polsce</h1>
        <p className="text-sm text-gray-600">Odkryj szkolenia lotnicze</p>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-900">
            LOKALIZACJE {locationCount}
          </div>
        </div>

        <button className="bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors flex items-center gap-2">
          <span>O platformie</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <button className="text-gray-600 hover:text-gray-900 transition-colors p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}