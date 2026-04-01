/**
 * Import training centers from ULC PDF data
 */

interface TrainingCourse {
  code: string;
  name: string;
  theory: boolean;
  practical: boolean;
  simulator?: string;
}

interface TrainingCenter {
  name: string;
  type: 'ATO' | 'CTO' | 'DTO';
  certificateNumber?: string;
  address?: string;
  phone?: string;
  fax?: string;
  email?: string;
  city?: string;
  trainingCourses: TrainingCourse[];
  simulators?: string[];
}

/**
 * Map Polish training names to professional codes
 */
const TRAINING_CODE_MAP: Record<string, string> = {
  'Pilot turystyczny samolotowy': 'PPL(A)',
  'Pilot turystyczny śmigłowcowy': 'PPL(H)',
  'Pilot samolotowy rekreacyjny': 'LAPL(A)',
  'Pilot śmigłowcowy rekreacyjny': 'LAPL(H)',
  'Pilot zawodowy samolotowy': 'CPL(A)',
  'Pilot zawodowy śmigłowcowy': 'CPL(H)',
  'Pilot liniowy samolotowy': 'ATPL(A)',
  'Pilot liniowy śmigłowcowy': 'ATPL(H)',
  'Instruktor samolotowy': 'FI(A)',
  'Instruktor szkolenia śmigłowcowego': 'FI(H)',
  'Instruktor szybowcowy': 'FI(S)',
  'Instruktor szkolenia balonowego': 'FI(B)',
  'Instruktor balonowy': 'FI(B)',
  'Uprawnienie instruktora na klasę': 'CRI',
  'Uprawnienie instruktora szkolenia w lotach według wskazań przyrządów': 'IRI',
  'Instruktor na motoszybowiec turystyczny': 'FI(TMG)',
  'Instruktor szkolenia na urządzeniach syntetycznych': 'STI',
  'Uprawnienia instruktora do szkolenie w zakresie współpracy w załodze': 'MCCI',
  'Instruktor szkolenia pilotów doświadczalnych': 'FTI',
  'Licencja dyspozytora lotniczego': 'FDL',
  'Mechanik pokładowy': 'FEL',
  'Samoloty jednosilnikowe tłokowe lądowe': 'SEP(L)',
  'Samoloty wielosilnikowe tłokowe lądowe': 'MEP(L)',
  'Samoloty jednosilnikowe turbośmigłowe lądowe': 'SETP(L)',
  'Uprawnienie do lotów wg wskazań przyrządów/jednosilnikowe': 'IR/SE',
  'Uprawnienie do lotów wg wskazań przyrządów/wielosilnikowe': 'IR/ME',
  'Uprawnienie do lotów według wskazań przyrządów- samoloty': 'IR(A)',
  'Uprawnienie do lotów według wskazań przyrządów - śmigłowce': 'IR(H)',
  'Uprawnienie do lotów wg wskazań przyrządów na trasie': 'EIR',
  'Pilot szybowcowy': 'SPL',
  'Pilot szyb.': 'SPL',
  'Pilot balonowy': 'BPL',
  'Szkolenie zaawansowane UPRT (FCL 745A)': 'UPRT',
  'Szkolenie w zakresie współpracy w załodze wieloosobowej': 'MCC',
  'Motoszybowiec turystyczny do licencji samolotowych': 'TMG A',
  'Motoszybowiec turystyczny do licencji szybowcowych': 'TMG S',
  'uprawnienie samolotowe do wyk. lotów nocnych': 'night (A)',
  'uprawnienie śmigłowcowe do wyk. lotów nocnych': 'night (H)',
  'uprawnienia do wykonywania akrobacji (samoloty)': 'aerobatics A',
  'uprawnienia do wykonywania akrobacji (szybowce)': 'aerobatics S',
  'uprawnienia do holowania szybowców': 'towing gliders',
  'uprawnienia do holowania banerów': 'banner towing',
  'Inny typ w klasie SEP(L)': 'SEP (L)',
  'Inny typ w klasie MEP(L)': 'MEP (L)',
  'Uprawnienie na klasę': 'class rating',
  'Szkolenie oparte na posiadanych kompetancjach do IR': 'CB-IR',
};

/**
 * Parse ATO/CTO data from PDF text
 */
function parseAtoCtoData(text: string): TrainingCenter[] {
  const centers: TrainingCenter[] = [];
  const lines = text.split('\n');

  let currentCenter: Partial<TrainingCenter> | null = null;
  let currentCourses: TrainingCourse[] = [];
  let currentSimulators: string[] = [];
  let inCoursesSection = false;
  let currentSimulatorLine = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    // Detect new training center by looking for certificate number pattern
    const certMatch = line.match(/PL\.(ATO|CTO)\.(\d+-\d+)/);
    if (certMatch) {
      if (currentCenter && currentCenter.name) {
        currentCenter.trainingCourses = currentCourses;
        if (currentSimulators.length > 0) {
          currentCenter.simulators = currentSimulators;
        }
        centers.push(currentCenter as TrainingCenter);
      }

      currentCourses = [];
      currentSimulators = [];
      currentCenter = {
        type: certMatch[1] as 'ATO' | 'CTO',
        certificateNumber: `PL.${certMatch[1]}.${certMatch[2]}`,
        trainingCourses: [],
      };

      // Name is usually on the previous line
      if (i > 0) {
        const nameLine = lines[i - 1].trim();
        if (nameLine && !nameLine.match(/Strona|z\s*\d+/)) {
          currentCenter.name = nameLine;
        }
      }

      inCoursesSection = false;
      continue;
    }

    // Detect address/phone/email lines (before certificate)
    if (currentCenter && !currentCenter.city && line.includes('ul.') && !line.includes('tel.')) {
      currentCenter.address = line;
      const cityMatch = line.match(/(\d{2}-\d{3}\s+[A-ZŻŹĆĄŚĘŁÓŃa-zżźćąśęłóń]+(?:\s+[A-ZŻŹĆĄŚĘŁÓŃa-zżźćąśęłóń]+)*)/);
      if (cityMatch) {
        currentCenter.city = cityMatch[1].split(/\s+/).slice(1).join(' ');
      }
      continue;
    }

    // Phone/fax
    if (line.includes('tel.') || line.includes('fax')) {
      const phoneMatch = line.match(/tel\.?\s*:?\s*([\d\s\(\)+\/-]+)/);
      const faxMatch = line.match(/fax\.?\s*:?\s*([\d\s\(\)+\/-]+)/);
      if (phoneMatch && currentCenter) currentCenter.phone = phoneMatch[1].trim();
      if (faxMatch && currentCenter) currentCenter.fax = faxMatch[1].trim();
      continue;
    }

    // Email
    if (line.includes('@') && currentCenter) {
      const emailMatch = line.match(/([\w.-]+@[\w.-]+\.\w+)/);
      if (emailMatch) {
        currentCenter.email = emailMatch[1];
      }
      continue;
    }

    // Training course codes
    const courseMatch = line.match(/^([A-Z][A-Z]\/?[A-Z]?\(?[A-Z]\)?(?:\s?\([^)]+\))?(?:\s*-\s*[A-Z][A-Z]\/?[A-Z]?\(?[A-Z]\)?)*)-\s*(.+)$/);
    if (courseMatch && currentCenter) {
      const code = courseMatch[1].trim();
      const polishName = courseMatch[2].trim();

      const professionalCode = TRAINING_CODE_MAP[polishName] || polishName;

      // Check if theory/practical/simulator is enabled
      const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
      const theory = nextLine !== '' && !nextLine.match(/^FNPT|FFS|FTD/);
      const practical = true;
      const simulator = nextLine.match(/^(FNPT|FFS|FTD)\s+/) ? nextLine : undefined;

      if (simulator && !currentSimulators.includes(simulator)) {
        currentSimulators.push(simulator);
      }

      currentCourses.push({
        code: professionalCode,
        name: polishName,
        theory,
        practical,
        simulator,
      });
    }
  }

  // Add last center
  if (currentCenter && currentCenter.name) {
    currentCenter.trainingCourses = currentCourses;
    if (currentSimulators.length > 0) {
      currentCenter.simulators = currentSimulators;
    }
    centers.push(currentCenter as TrainingCenter);
  }

  return centers;
}

/**
 * Parse DTO data from PDF text
 */
function parseDtoData(text: string): TrainingCenter[] {
  const centers: TrainingCenter[] = [];
  const lines = text.split('\n');

  let currentCenter: Partial<TrainingCenter> | null = null;
  let currentCourses: string[] = [];
  let inContactSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    // DTO number pattern
    const dtoMatch = line.match(/PL\.DTO\s*-\s*(\d+)/);
    if (dtoMatch) {
      if (currentCenter && currentCenter.name) {
        (currentCenter as any).trainingCourses = currentCourses.map(c => ({ code: c, name: c }));
        centers.push(currentCenter as TrainingCenter);
      }

      currentCourses = [];
      currentCenter = {
        type: 'DTO',
        certificateNumber: `PL.DTO-${dtoMatch[1]}`,
        trainingCourses: [],
      };
      inContactSection = false;
      continue;
    }

    // Name is usually on the next line
    if (currentCenter && !currentCenter.name && !line.match(/tel\.|@|ul\.|Lotnisko/)) {
      currentCenter.name = line;
      continue;
    }

    // Contact info
    if (line.includes('ul.') || line.includes('Lotnisko')) {
      if (currentCenter) {
        currentCenter.address = line;
        const cityMatch = line.match(/(\d{2}-\d{3}\s+[A-ZŻŹĆĄŚĘŁÓŃa-zżźćąśęłóń]+)/);
        if (cityMatch) currentCenter.city = cityMatch[1];
      }
      inContactSection = true;
      continue;
    }

    if (line.includes('tel.') && currentCenter) {
      const phoneMatch = line.match(/tel\.?\s*([\d\s\(\)+\/-]+)/);
      if (phoneMatch) currentCenter.phone = phoneMatch[1].trim();
      continue;
    }

    if (line.includes('@') && currentCenter) {
      const emailMatch = line.match(/([\w.-]+@[\w.-]+\.\w+)/);
      if (emailMatch) currentCenter.email = emailMatch[1];
      inContactSection = false;
      continue;
    }

    // Training courses (bullet points)
    if (line.startsWith('•') || line.startsWith('')) {
      const course = line.replace(/^[•]\s*/, '').trim();
      if (course && !course.includes('Stan na:')) {
        // Map to professional code if possible
        const professionalCode = TRAINING_CODE_MAP[course] || course;
        currentCourses.push(professionalCode);
      }
    }
  }

  // Add last center
  if (currentCenter && currentCenter.name) {
    (currentCenter as any).trainingCourses = currentCourses.map(c => ({ code: c, name: c }));
    centers.push(currentCenter as TrainingCenter);
  }

  return centers;
}

/**
 * Main import function
 */
async function importTrainingCenters(atoCtoText: string, dtoText: string) {
  console.log('Parsing ATO/CTO data...');
  const atoCtoCenters = parseAtoCtoData(atoCtoText);
  console.log(`Found ${atoCtoCenters.length} ATO/CTO centers`);

  console.log('Parsing DTO data...');
  const dtoCenters = parseDtoData(dtoText);
  console.log(`Found ${dtoCenters.length} DTO centers`);

  const allCenters = [...atoCtoCenters, ...dtoCenters];
  console.log(`Total centers to import: ${allCenters.length}`);

  // Save to JSON file for now
  const fs = require('fs');
  const path = require('path');
  const outputPath = path.join(__dirname, '../data/training-centers.json');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(allCenters, null, 2));

  console.log(`\nData saved to: ${outputPath}`);
  console.log('\nSample data:');
  console.log(JSON.stringify(allCenters[0], null, 2));

  return allCenters;
}

// Export for use in other scripts
export {
  importTrainingCenters,
  parseAtoCtoData,
  parseDtoData,
  TRAINING_CODE_MAP,
};

export type { TrainingCenter, TrainingCourse };