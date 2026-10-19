export interface AppProjectConfig {
  appName: string;
  version: string;
  researchArea: string;
  disasterType: string;
  datasetStatus: string;
  dataSource: string;
  dataDisclaimer: string;
  lastUpdated: string;
}

export const APP_CONFIG: AppProjectConfig = {
  appName: 'GiziTangguh Play',
  version: '1.0.0-mvp',
  researchArea: 'BELUM DITETAPKAN',
  disasterType: 'SIMULASI, BELUM DITETAPKAN',
  datasetStatus: 'DATA DEMO',
  dataSource: 'DATA LOKAL SIMULASI',
  dataDisclaimer: 'DATA SIMULASI — BUKAN DATA RESMI. Aplikasi ini ditujukan untuk kebutuhan edukasi dan demonstrasi prototipe WebGIS.',
  lastUpdated: 'Oktober 2026',
};
