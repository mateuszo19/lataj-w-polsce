/**
 * Direct import of training centers to SQLite database
 * This script creates the table and imports data without using Strapi
 */

import Database from 'better-sqlite3';

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
 * Create training centers table
 */
function createTable(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS training_centers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('ATO', 'CTO', 'DTO')),
      certificate_number TEXT,
      address TEXT,
      phone TEXT,
      fax TEXT,
      email TEXT,
      city TEXT,
      training_courses TEXT,
      simulators TEXT,
      website TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_training_centers_type ON training_centers(type);
    CREATE INDEX IF NOT EXISTS idx_training_centers_city ON training_centers(city);
    CREATE INDEX IF NOT EXISTS idx_training_centers_certificate ON training_centers(certificate_number);
  `);

  console.log('✓ Table training_centers created successfully');
}

/**
 * Insert training center into database
 */
function insertTrainingCenter(db: Database.Database, center: TrainingCenter): void {
  const stmt = db.prepare(`
    INSERT INTO training_centers (
      name, type, certificate_number, address, phone, fax, email, city,
      training_courses, simulators
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    center.name,
    center.type,
    center.certificateNumber || null,
    center.address || null,
    center.phone || null,
    center.fax || null,
    center.email || null,
    center.city || null,
    JSON.stringify(center.trainingCourses),
    center.simulators ? JSON.stringify(center.simulators) : null
  );
}

/**
 * Parse and import all data
 */
function importAllData(db: Database.Database): void {
  const allCenters: TrainingCenter[] = [];

  // ATO/CTO data from first PDF
  const atoCtoCenters: TrainingCenter[] = [
    {
      name: 'ACSL LOTNICZEJ AKADEMII WOJSKOWEJ',
      type: 'ATO',
      certificateNumber: 'PL.ATO.00108-521',
      address: 'ul. Dywizjonu 303 nr 35',
      city: 'Dęblin',
      phone: '(81) 551 94 27',
      email: 'zsergiel@wp.pl',
      trainingCourses: [
        { code: 'PPL(A)', name: 'Pilot turystyczny samolotowy', theory: true, practical: true },
        { code: 'PPL(H)', name: 'Pilot turystyczny śmigłowcowy', theory: true, practical: true },
        { code: 'CPL(A)', name: 'Pilot zawodowy samolotowy', theory: true, practical: true },
        { code: 'CPL(H)', name: 'Pilot zawodowy śmigłowcowy', theory: true, practical: true },
        { code: 'ATPL(A)', name: 'Pilot liniowy samolotowy', theory: true, practical: true },
        { code: 'MEP(L)', name: 'Samoloty wielosilnikowe tłokowe lądowe', theory: true, practical: true },
        { code: 'FI(A)', name: 'Instruktor samolotowy', theory: true, practical: true },
        { code: 'FI(H)', name: 'Instruktor szkolenia śmigłowcowego', theory: true, practical: true },
        { code: 'IR/SE', name: 'Uprawnienie do lotów wg wskazań przyrządów/jednosilnikowe', theory: true, practical: true },
        { code: 'IR/ME', name: 'Uprawnienie do lotów wg wskazań przyrządów/wielosilnikowe', theory: true, practical: true },
        { code: 'IRI', name: 'Uprawnienie instruktora szkolenia w lotach według wskazań przyrządów', theory: true, practical: true },
        { code: 'CRI/ME', name: 'Uprawnienie instruktora na klasę samolotów wielosilnikowych', theory: true, practical: true },
        { code: 'night (A)', name: 'uprawnienie samolotowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'night (H)', name: 'uprawnienie śmigłowcowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'STI(A)', name: 'Instruktor szkolenia na urządzeniach syntetycznych', theory: true, practical: true },
        { code: 'aerobatics A', name: 'uprawnienia do wykonywania akrobacji (samoloty)', theory: true, practical: true },
        { code: 'banner towing', name: 'uprawnienia do holowania banerów', theory: true, practical: true },
      ],
      simulators: ['FNPT II PL-17-01', 'FNPT II PL-17-01/02'],
    },
    {
      name: 'TECHNIKA /AEROTECHNIKA',
      type: 'ATO',
      certificateNumber: 'PL.ATO.00261-315',
      address: 'ul. Pokrzywno 8',
      city: 'Poznań',
      phone: '(61) 879 82 50',
      fax: '(61) 879 89 33',
      email: 'office@domicz.com.pl',
      trainingCourses: [
        { code: 'PPL(A)', name: 'Pilot turystyczny samolotowy', theory: true, practical: true },
        { code: 'CPL(A)', name: 'Pilot zawodowy samolotowy', theory: true, practical: true },
        { code: 'LAPL(A)', name: 'Pilot samolotowy rekreacyjny', theory: true, practical: true },
        { code: 'IR(A)', name: 'Uprawnienie do lotów według wskazań przyrządów- samoloty', theory: true, practical: true },
        { code: 'IRI', name: 'Uprawnienie instruktora szkolenia w lotach według wskazań przyrządów', theory: true, practical: true },
        { code: 'CRI(A)', name: 'Instruktor szkolenia na klasę', theory: true, practical: true },
        { code: 'MEP(L)', name: 'Samoloty wielosilnikowe tłokowe lądowe', theory: true, practical: true },
        { code: 'night (A)', name: 'uprawnienie samolotowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'FI(A)', name: 'Instruktor samolotowy', theory: true, practical: true },
      ],
      simulators: ['FNTP II PL-51-01', 'FNTP II PL-51-01/03'],
    },
    {
      name: 'OKL POLITECHNIKI RZESZOWSKA',
      type: 'ATO',
      certificateNumber: 'PL.ATO.00336-001',
      address: 'Jasionka 915',
      city: 'Trzebownisko',
      phone: '(17) 771 33 00',
      fax: '(17) 772 21 20',
      email: 'oklprz@prz.edu.pl',
      trainingCourses: [
        { code: 'PPL(A)', name: 'Pilot turystyczny samolotowy', theory: true, practical: true },
        { code: 'CPL(A)', name: 'Pilot zawodowy samolotowy', theory: true, practical: true },
        { code: 'ATPL(A)', name: 'Pilot liniowy samolotowy', theory: true, practical: true },
        { code: 'FI(A)', name: 'Instruktor samolotowy', theory: true, practical: true },
        { code: 'IR(A)', name: 'Uprawnienie do lotów według wskazań przyrządów- samoloty', theory: true, practical: true },
        { code: 'IRI', name: 'Uprawnienie instruktora szkolenia w lotach według wskazań przyrządów', theory: true, practical: true },
        { code: 'MCC(A)', name: 'Szkolenie w zakresie współpracy w załodze wieloosobowej', theory: true, practical: true },
        { code: 'MCCI(A)', name: 'Uprawnienia instruktora do szkolenie w zakresie współpracy w załodze', theory: true, practical: true },
        { code: 'CRI/ME', name: 'Uprawnienie instruktora na klasę samolotów wielosilnikowych', theory: true, practical: true },
        { code: 'MEP(L)', name: 'Samoloty wielosilnikowe tłokowe lądowe', theory: true, practical: true },
        { code: 'night (A)', name: 'uprawnienie samolotowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'aerobatics A', name: 'uprawnienia do wykonywania akrobacji (samoloty)', theory: true, practical: true },
      ],
      simulators: ['FNPT II MCC PL-04-01/02/03/04', 'FNPT II MCC PL-05-01/02/03/04'],
    },
    {
      name: 'DIRECT DISPATCH',
      type: 'CTO',
      certificateNumber: 'PL.CTO.00402-822',
      address: 'ul. Poleczki 23',
      city: 'Warszawa',
      phone: '+48 (22) 462 40 11; 270 26 85',
      email: 'training@dct.aero',
      trainingCourses: [
        { code: 'FDL', name: 'Licencja dyspozytora lotniczego', theory: true, practical: false },
      ],
    },
    {
      name: '"NORMAL" PIOTR JAFERNIK',
      type: 'ATO',
      certificateNumber: 'PL.ATO.00543-300',
      address: 'ul. Cieszyńska 319',
      city: 'Bielsko-Biała',
      phone: '(33) 811 37 50',
      fax: '(33) 815 77 73',
      email: 'biuro@normal-jafernik.com.pl',
      trainingCourses: [
        { code: 'PPL(A)', name: 'Pilot turystyczny samolotowy', theory: true, practical: true },
        { code: 'PPL(H)', name: 'Pilot turystyczny śmigłowcowy', theory: true, practical: true },
        { code: 'CPL(A)', name: 'Pilot zawodowy samolotowy', theory: true, practical: true },
        { code: 'CPL(H)', name: 'Pilot zawodowy śmigłowcowy', theory: true, practical: true },
        { code: 'night (A)', name: 'uprawnienie samolotowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'night (H)', name: 'uprawnienie śmigłowcowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'SETP(L)', name: 'Samoloty jednosilnikowe turbośmigłowe lądowe: Cessna SET', theory: true, practical: true },
        { code: 'TR', name: 'Type Rating - ENF 28, EC120, AS350/EC130, BELL206/206L', theory: true, practical: true },
        { code: 'CRI/SE', name: 'Uprawnienie instruktora na klasę samolotów jednosilnikowych', theory: true, practical: true },
        { code: 'CRI/ME', name: 'Uprawnienie instruktora na klasę samolotów wielosilnikowych', theory: true, practical: true },
      ],
    },
    {
      name: 'IBEX - U.L. SP. Z O.O.',
      type: 'ATO',
      certificateNumber: 'PL.ATO.00601-248',
      address: 'ul. Jana Kazimierza 11 lok. 4',
      city: 'Warszawa',
      phone: '(22) 620 40 31',
      fax: '(22) 652 34 02',
      email: 'szkolenie@ibex.aero',
      trainingCourses: [
        { code: 'PPL(A)', name: 'Pilot turystyczny samolotowy', theory: true, practical: true },
        { code: 'LAPL(A)', name: 'Pilot samolotowy rekreacyjny', theory: true, practical: true },
        { code: 'PPL(H)', name: 'Pilot turystyczny śmigłowcowy', theory: true, practical: true },
        { code: 'CPL(A)', name: 'Pilot zawodowy samolotowy', theory: true, practical: true },
        { code: 'ATPL(A)', name: 'Pilot liniowy samolotowy', theory: true, practical: true },
        { code: 'ATPL(H)', name: 'Pilot liniowy śmigłowcowy', theory: true, practical: true },
        { code: 'UPRT', name: 'Szkolenie zaawansowane UPRT (FCL 745A)', theory: true, practical: true },
        { code: 'IR/SE', name: 'Uprawnienie do lotów wg wskazań przyrządów/jednosilnikowe', theory: true, practical: true },
        { code: 'IR/ME', name: 'Uprawnienie do lotów wg wskazań przyrządów/wielosilnikowe', theory: true, practical: true },
        { code: 'night (A)', name: 'uprawnienie samolotowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'night (H)', name: 'uprawnienie śmigłowcowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'FI(A)', name: 'Instruktor samolotowy', theory: true, practical: true },
        { code: 'FI(H)', name: 'Instruktor szkolenia śmigłowcowego', theory: true, practical: true },
        { code: 'MEP(L)', name: 'Samoloty wielosilnikowe tłokowe lądowe', theory: true, practical: true },
      ],
      simulators: ['FNPT II PL-60-01', 'FNPT II PL-60-02'],
    },
    {
      name: 'CTO PILEUS',
      type: 'CTO',
      certificateNumber: 'PL.CTO.00705-807',
      address: 'ul. Brzozowa 11',
      city: 'Podkowa Leśna',
      phone: '(22) 393 11 40',
      fax: '(22) 393 11 41',
      email: 'szkolenia@pileus.eu',
      trainingCourses: [
        { code: 'FDL', name: 'Licencja dyspozytora lotniczego', theory: true, practical: false },
      ],
    },
    {
      name: 'AEROKLUB RZESZOWSKI',
      type: 'ATO',
      certificateNumber: 'PL.ATO.00836-002',
      address: 'Jasionka - Lotnisko',
      city: 'Rzeszów',
      phone: '(17) 853 62 16',
      fax: '(17) 853 62 16',
      email: 'biuro@aeroklub-rzeszowski.pl',
      trainingCourses: [
        { code: 'PPL(A)', name: 'Pilot turystyczny samolotowy', theory: true, practical: true },
        { code: 'LAPL(A)', name: 'Pilot samolotowy rekreacyjny', theory: true, practical: true },
        { code: 'night (A)', name: 'uprawnienie samolotowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'SPL', name: 'Pilot szyb. (start za sam. holującym, za wyciągarką)', theory: true, practical: true },
        { code: 'towing gliders', name: 'uprawnienia do holowania szybowców', theory: true, practical: true },
        { code: 'banner towing', name: 'uprawnienia do holowania banerów', theory: true, practical: true },
      ],
    },
    {
      name: 'AEROKLUB ZIEMI LUBUSKIEJ',
      type: 'ATO',
      certificateNumber: 'PL.ATO.00966-015',
      address: 'ul. Skokowa 18',
      city: 'Przylep',
      phone: '(68) 321 30 10',
      fax: '(68) 321 30 11',
      email: 'azl@azl.pl',
      trainingCourses: [
        { code: 'PPL(A)', name: 'Pilot turystyczny samolotowy', theory: true, practical: true },
        { code: 'LAPL(A)', name: 'Pilot samolotowy rekreacyjny', theory: true, practical: true },
        { code: 'CPL(A)', name: 'Pilot zawodowy samolotowy', theory: true, practical: true },
        { code: 'PPL(H)', name: 'Pilot turystyczny śmigłowcowy', theory: true, practical: true },
        { code: 'LAPL(H)', name: 'Pilot śmigłowcowy rekreacyjny', theory: true, practical: true },
        { code: 'CPL(H)', name: 'Pilot zawodowy śmigłowcowy', theory: true, practical: true },
        { code: 'IR/SE', name: 'Uprawnienie do lotów wg wskazań przyrządów/jednosilnikowe', theory: true, practical: true },
        { code: 'IR/ME', name: 'Uprawnienie do lotów wg wskazań przyrządów/wielosilnikowe', theory: true, practical: true },
        { code: 'MEP(L)', name: 'Samoloty wielosilnikowe tłokowe lądowe', theory: true, practical: true },
        { code: 'SEP(L)', name: 'Samoloty jednosilnikowe tłokowe lądowe', theory: true, practical: true },
        { code: 'FI(A)', name: 'Instruktor samolotowy', theory: true, practical: true },
        { code: 'FI(H)', name: 'Instruktor szkolenia śmigłowcowego', theory: true, practical: true },
        { code: 'FI(S)', name: 'Instruktor szybowcowy', theory: true, practical: true },
        { code: 'FI(B)', name: 'Instruktor szkolenia balonowego', theory: true, practical: true },
        { code: 'night (A)', name: 'uprawnienie samolotowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'night (H)', name: 'uprawnienie śmigłowcowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'BPL', name: 'Pilot balonowy (balon na ogrzane powietrze Grupa A)', theory: true, practical: true },
        { code: 'SPL', name: 'Pilot szyb. (start za sam. holującym, za wyciągarką)', theory: true, practical: true },
        { code: 'aerobatics A', name: 'uprawnienia do wykonywania akrobacji (samoloty)', theory: true, practical: true },
        { code: 'towing gliders', name: 'uprawnienia do holowania szybowców', theory: true, practical: true },
        { code: 'banner towing', name: 'uprawnienia do holowania banerów', theory: true, practical: true },
        { code: 'CRI/SE', name: 'Uprawnienie instruktora na klasę samolotów jednosilnikowych', theory: true, practical: true },
        { code: 'CRI/ME', name: 'Uprawnienie instruktora na klasę samolotów wielosilnikowych', theory: true, practical: true },
      ],
    },
    {
      name: 'AEROKLUB ZIEMI PIOTRKOWSKIEJ IM. GEN. PIL. STANISŁAWA KARPIŃSKIEGO',
      type: 'ATO',
      certificateNumber: 'PL.ATO.01197-300',
      address: 'ul. Przemysłowa 48',
      city: 'Piotrków Trybunalski',
      phone: '(44) 647 74 73',
      fax: '(44) 649 55 71',
      email: 'dyrektor@azp.com.pl',
      trainingCourses: [
        { code: 'PPL(A)', name: 'Pilot turystyczny samolotowy', theory: true, practical: true },
        { code: 'LAPL(A)', name: 'Pilot samolotowy rekreacyjny', theory: true, practical: true },
        { code: 'FI(A)', name: 'Instruktor samolotowy', theory: true, practical: true },
        { code: 'night (A)', name: 'uprawnienie samolotowe do wyk. lotów nocnych', theory: true, practical: true },
        { code: 'SPL', name: 'Pilot szyb. (start za sam. holującym, za wyciągarką)', theory: true, practical: true },
        { code: 'FI(S)', name: 'Instruktor szybowcowy', theory: true, practical: true },
        { code: 'TMG A', name: 'Motoszybowiec turystyczny do licencji samolotowych', theory: true, practical: true },
        { code: 'TMG S', name: 'Motoszybowiec turystyczny do licencji szybowcowych', theory: true, practical: true },
        { code: 'towing gliders', name: 'uprawnienia do holowania szybowców', theory: true, practical: true },
        { code: 'banner towing', name: 'uprawnienia do holowania banerów', theory: true, practical: true },
      ],
    },
  ];

  // DTO data from second PDF (sample - will add more)
  const dtoCenters: TrainingCenter[] = [
    {
      name: 'Szybowcowy Szczecin',
      type: 'DTO',
      certificateNumber: 'PL.DTO-1',
      address: 'ul. Chmielewskiego 22a',
      city: '70-028 Szczecin',
      phone: '+48 666 079 624',
      email: 'szybowcowy.szczecin@gmail.com',
      trainingCourses: [
        { code: 'SPL', name: 'Szkolenie teoretyczne i praktyczne do SPL', theory: true, practical: true },
        { code: 'FI(S)', name: 'Szkolenie na dodatkowe uprawnienia instruktora szkolenia praktycznego FI(S)', theory: true, practical: true },
        { code: 'aerobatics S', name: 'uprawnienie dodatkowe: podstawowe i zaawansowane uprawnienia akrobacyjne na szybowcach', theory: true, practical: true },
        { code: 'towing gliders', name: 'uprawnienie do holowania szybowców', theory: true, practical: true },
        { code: 'PPL(A)', name: 'Szkolenie teoretyczne i praktyczne do LAPL(A) i PPL(A)', theory: true, practical: true },
        { code: 'SEP(L)', name: 'Szkolenie na uprawnienie na klasę SEP(lądowych) i TMG', theory: true, practical: true },
        { code: 'night (A)', name: 'Szkolenie samolotowe do uprawnienia dodatkowego: do wykonywania lotów nocnych', theory: true, practical: true },
      ],
    },
    {
      name: 'Firebirds Flight Academy Sp. z o.o.',
      type: 'DTO',
      certificateNumber: 'PL.DTO-2',
      address: 'ul. Lotnisko Muchowiec',
      city: '40-271 Katowice',
      phone: '',
      email: 'marcel.kotas@gmail.com',
      trainingCourses: [
        { code: 'aerobatics A', name: 'Szkolenie do uprawnienia dodatkowego: akrobacja na samolotach', theory: true, practical: true },
      ],
    },
    {
      name: 'Aeroklub Ziemi Jarosławskiej',
      type: 'DTO',
      certificateNumber: 'PL.DTO-3',
      address: 'Lądowisko Laszki',
      city: '37-543 Laszki',
      phone: '+48 79 374 47 84',
      email: 'biuro@aeroklubjaroslaw.pl',
      trainingCourses: [
        { code: 'SPL', name: 'Szkolenie teoretyczne i praktyczne do SPL', theory: true, practical: true },
      ],
    },
    {
      name: 'Aeroklub Koszaliński',
      type: 'DTO',
      certificateNumber: 'PL.DTO-4',
      address: 'Lubiechowo 34/1',
      city: '78-230 Karlin',
      phone: '+48 503 770 933',
      email: 'aeroklubkoszalin@wp.pl',
      trainingCourses: [
        { code: 'SPL', name: 'Szkolenie teoretyczne i praktyczne do SPL', theory: true, practical: true },
      ],
    },
    {
      name: 'DragonFly',
      type: 'DTO',
      certificateNumber: 'PL.DTO-5',
      address: 'ul. Palowicka 48',
      city: '44-246 Szczejkowice',
      phone: '501 974 746',
      email: 'imra2@o2.pl',
      trainingCourses: [
        { code: 'PPL(H)', name: 'Szkolenie teoretyczne i praktyczne do PPL(H)', theory: true, practical: true },
        { code: 'night (H)', name: 'Szkolenie śmigłowcowe na uprawnienie do wykonywania lotów nocnych', theory: true, practical: true },
      ],
    },
  ];

  allCenters.push(...atoCtoCenters, ...dtoCenters);

  // Insert all centers
  const insertStmt = db.prepare(`
    INSERT INTO training_centers (
      name, type, certificate_number, address, phone, fax, email, city,
      training_courses, simulators
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertMany = db.transaction((centers: TrainingCenter[]) => {
    for (const center of centers) {
      insertStmt.run(
        center.name,
        center.type,
        center.certificateNumber || null,
        center.address || null,
        center.phone || null,
        center.fax || null,
        center.email || null,
        center.city || null,
        JSON.stringify(center.trainingCourses),
        center.simulators ? JSON.stringify(center.simulators) : null
      );
    }
  });

  insertMany(allCenters);

  console.log(`✓ Imported ${allCenters.length} training centers`);
  console.log(`  - ATO/CTO: ${atoCtoCenters.length}`);
  console.log(`  - DTO: ${dtoCenters.length}`);
}

/**
 * Main function
 */
function main(): void {
  const dbPath = '/home/mateusz-palanis/Dokumenty/Projekty/latajwpolsce/server/.tmp/data.db';
  const db = new Database(dbPath);

  try {
    console.log('Connecting to database:', dbPath);
    console.log('\nCreating table...');
    createTable(db);

    console.log('\nImporting data...');
    importAllData(db);

    console.log('\n✓ Import completed successfully!');

    // Display some stats
    const stats = db.prepare(`
      SELECT type, COUNT(*) as count
      FROM training_centers
      GROUP BY type
    `).all();

    console.log('\nStatistics:');
    for (const stat of stats as any[]) {
      console.log(`  ${stat.type}: ${stat.count}`);
    }

  } catch (error) {
    console.error('Error during import:', error);
    throw error;
  } finally {
    db.close();
  }
}

main();