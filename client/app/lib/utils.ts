import { Location, PriceLevel, Language, Training } from "./types";

/**
 * Color configuration for different location types
 */
export const typeColors = {
  aeroklub: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    icon: "✈"
  },
  ato: {
    primary: "#10B981",
    secondary: "#34D399",
    icon: "🎓"
  },
  dto: {
    primary: "#F59E0B",
    secondary: "#FBBF24",
    icon: "📋"
  },
};

/**
 * Generate dollar icons representing price level
 * @param priceLevel - Price level from 1 to 3
 * @returns String of dollar signs
 */
export function getPriceIcons(priceLevel: PriceLevel): string {
  return "$".repeat(priceLevel);
}

/**
 * Get summary of available training types at a location
 * @param location - Training location object
 * @returns Comma-separated list of training types
 */
export function getTrainingTypesSummary(location: Location): string {
  const types = location.trainings.map(t => t.type);
  const uniqueTypes = [...new Set(types)];
  return uniqueTypes.slice(0, 3).join(", ") + (uniqueTypes.length > 3 ? "..." : "");
}

/**
 * Get summary of languages available at a location
 * @param location - Training location object
 * @returns Flag emojis representing available languages
 */
export function getLanguagesSummary(location: Location): string {
  const allLanguages = location.trainings.flatMap(t => t.languages);
  const uniqueLanguages = [...new Set(allLanguages)];
  const flags: Record<Language, string> = {
    polski: "🇵🇱",
    angielski: "🇬🇧",
    niemiecki: "🇩🇪",
    rosyjski: "🇷🇺"
  };
  return uniqueLanguages.map(lang => flags[lang]).join(" ");
}

/**
 * Create HTML string for price badge component
 * @param priceLevel - Price level from 1 to 3
 * @returns HTML string for price badge
 */
export function createPriceBadge(priceLevel: PriceLevel): string {
  const colors = {
    1: "#10B981",
    2: "#F59E0B",
    3: "#EF4444"
  };

  return `
    <div style="
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      background: ${colors[priceLevel]}15;
      color: ${colors[priceLevel]};
    ">
      <span style="font-size: 16px;">${getPriceIcons(priceLevel)}</span>
      <span>${priceLevel === 1 ? 'Niskie' : priceLevel === 2 ? 'Średnie' : 'Wysokie'}</span>
    </div>
  `;
}

/**
 * Create HTML string for training tag component
 * @param training - Training object
 * @returns HTML string for training tag
 */
export function createTrainingTag(training: Training): string {
  const modeColors = {
    theory: "#3B82F6",
    practice: "#8B5CF6",
    both: "#10B981"
  };

  const modeLabels = {
    theory: "Teoria",
    practice: "Praktyka",
    both: "Teoria+Praktyka"
  };

  return `
    <div style="
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      background: #F3F4F6;
      margin: 4px;
      border: 1px solid #E5E7EB;
    ">
      <span style="
        font-weight: 600;
        color: #1F2937;
      ">${training.type}</span>
      <span style="
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 500;
        background: ${modeColors[training.mode]}20;
        color: ${modeColors[training.mode]};
      ">${modeLabels[training.mode]}</span>
      <span style="font-size: 11px; color: #6B7280;">${training.languages.map(l => l === 'angielski' ? 'EN' : 'PL').join('/')}</span>
    </div>
  `;
}

/**
 * Create custom marker element for map
 * @param location - Training location object
 * @returns HTML element for map marker
 */
export function createCustomMarker(location: Location): HTMLElement {
  const colors = typeColors[location.type];

  const marker = document.createElement("div");
  marker.className = "custom-marker";
  marker.style.cssText = `
    cursor: pointer;
    transition: transform 0.2s ease;
  `;

  const pulseRing = document.createElement("div");
  pulseRing.style.cssText = `
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${colors.primary}20;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    pointer-events: none;
  `;

  const markerBody = document.createElement("div");
  markerBody.style.cssText = `
    position: relative;
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, ${colors.secondary}, ${colors.primary});
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px ${colors.primary}40, 0 4px 8px rgba(0,0,0,0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 3px solid white;
  `;

  const icon = document.createElement("div");
  icon.textContent = colors.icon;
  icon.style.cssText = `
    font-size: 18px;
    transform: rotate(45deg);
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
  `;

  markerBody.appendChild(icon);
  marker.appendChild(pulseRing);
  marker.appendChild(markerBody);

  marker.addEventListener("mouseenter", () => {
    markerBody.style.transform = "rotate(-45deg) scale(1.15)";
    markerBody.style.boxShadow = `0 12px 28px ${colors.primary}60, 0 6px 12px rgba(0,0,0,0.15)`;
  });

  marker.addEventListener("mouseleave", () => {
    markerBody.style.transform = "rotate(-45deg) scale(1)";
    markerBody.style.boxShadow = `0 8px 20px ${colors.primary}40, 0 4px 8px rgba(0,0,0,0.1)`;
  });

  return marker;
}