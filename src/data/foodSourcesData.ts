export interface FoodSourcePoint {
  id: string;
  name: string;
  category: 'Lumbung Karbohidrat' | 'Depo Logistik Darurat' | 'Sentra Protein & Sayur' | 'Gudang Penyangga Regional';
  longitude: number;
  latitude: number;
  capacity: number;
  unit: string;
  dataStatus: 'DATA SIMULASI — DEMO';
  region: string;
  description: string;
  operationalStatus: 'Siaga Penuh' | 'Operasional Terbatas' | 'Kapasitas Kritis';
}

export interface RiskSimulationArea {
  id: string;
  name: string;
  riskLevel: 'Tinggi' | 'Sedang' | 'Rendah';
  hazardType: string;
  populationEstimate: number;
  dataStatus: 'AREA RISIKO SIMULASI';
  description: string;
  coordinates: [number, number][][]; // Polygon GeoJSON coordinates [lng, lat]
}

export const FOOD_SOURCES_DATA: FoodSourcePoint[] = [
  {
    id: 'FS-01',
    name: 'Gudang Penyangga Simulasi Jawa Barat',
    category: 'Gudang Penyangga Regional',
    longitude: 107.6191,
    latitude: -6.9175,
    capacity: 1200,
    unit: 'Ton',
    dataStatus: 'DATA SIMULASI — DEMO',
    region: 'Jawa Barat (Simulasi)',
    description: 'Fasilitas simulasi logistik beras, biskuit gizi, dan minyak goreng untuk penyangga wilayah barat pulau Jawa.',
    operationalStatus: 'Siaga Penuh'
  },
  {
    id: 'FS-02',
    name: 'Lumbung Padi Komunitas Simulasi Sleman',
    category: 'Lumbung Karbohidrat',
    longitude: 110.3695,
    latitude: -7.7956,
    capacity: 450,
    unit: 'Ton',
    dataStatus: 'DATA SIMULASI — DEMO',
    region: 'D.I. Yogyakarta (Simulasi)',
    description: 'Cadangan pangan simulasi berbasis kelompok tani untuk mitigasi erupsi dan gempa tektonik.',
    operationalStatus: 'Siaga Penuh'
  },
  {
    id: 'FS-03',
    name: 'Sentra Distribusi Pangan Simulasi Surabaya',
    category: 'Depo Logistik Darurat',
    longitude: 112.7521,
    latitude: -7.2575,
    capacity: 980,
    unit: 'Ton',
    dataStatus: 'DATA SIMULASI — DEMO',
    region: 'Jawa Timur (Simulasi)',
    description: 'Hub intermoda pelabuhan simulasi untuk distribusi sembako cepat ke kepulauan timur.',
    operationalStatus: 'Siaga Penuh'
  },
  {
    id: 'FS-04',
    name: 'Depo Pangan Darurat Simulasi Padang',
    category: 'Depo Logistik Darurat',
    longitude: 100.3543,
    latitude: -0.9492,
    capacity: 620,
    unit: 'Ton',
    dataStatus: 'DATA SIMULASI — DEMO',
    region: 'Sumatera Barat (Simulasi)',
    description: 'Fasilitas simulasi stok tanggap darurat pesisir pantai barat Sumatera.',
    operationalStatus: 'Operasional Terbatas'
  },
  {
    id: 'FS-05',
    name: 'Lumbung Pangan Komunitas Simulasi Banjarmasin',
    category: 'Lumbung Karbohidrat',
    longitude: 114.5901,
    latitude: -3.3167,
    capacity: 380,
    unit: 'Ton',
    dataStatus: 'DATA SIMULASI — DEMO',
    region: 'Kalimantan Selatan (Simulasi)',
    description: 'Pusat cadangan beras rawa dan makanan kaleng simulasi jalur sungai.',
    operationalStatus: 'Siaga Penuh'
  },
  {
    id: 'FS-06',
    name: 'Pusat Logistik Simulasi Makassar',
    category: 'Gudang Penyangga Regional',
    longitude: 119.4327,
    latitude: -5.1477,
    capacity: 1100,
    unit: 'Ton',
    dataStatus: 'DATA SIMULASI — DEMO',
    region: 'Sulawesi Selatan (Simulasi)',
    description: 'Gerbang logistik simulasi Indonesia Timur untuk protein ikan beku dan beras.',
    operationalStatus: 'Siaga Penuh'
  },
  {
    id: 'FS-07',
    name: 'Sentra Protein & Pangan Lokal Simulasi Kupang',
    category: 'Sentra Protein & Sayur',
    longitude: 123.607,
    latitude: -10.1772,
    capacity: 290,
    unit: 'Ton',
    dataStatus: 'DATA SIMULASI — DEMO',
    region: 'Nusa Tenggara Timur (Simulasi)',
    description: 'Cadangan jagung titi, kacang-kacangan, dan daging olahan untuk antisipasi kekeringan musiman.',
    operationalStatus: 'Kapasitas Kritis'
  },
  {
    id: 'FS-08',
    name: 'Pangkalan Pangan Lokal Simulasi Jayapura',
    category: 'Lumbung Karbohidrat',
    longitude: 140.7181,
    latitude: -2.5337,
    capacity: 340,
    unit: 'Ton',
    dataStatus: 'DATA SIMULASI — DEMO',
    region: 'Papua (Simulasi)',
    description: 'Sentra penyimpan sagu, umbi-umbian, dan lauk kaleng darurat simulasi.',
    operationalStatus: 'Siaga Penuh'
  }
];

export const RISK_SIMULATION_AREAS: RiskSimulationArea[] = [
  {
    id: 'RISK-01',
    name: 'Area Simulasi Risiko Banjir Pesisir Utara Jawa',
    riskLevel: 'Tinggi',
    hazardType: 'Banjir Rob & Luapan Sungai (Simulasi)',
    populationEstimate: 45000,
    dataStatus: 'AREA RISIKO SIMULASI',
    description: 'Poligon simulasi genangan pasang air laut dan potensi terputusnya jalur logistik darat.',
    coordinates: [[
      [106.8, -6.0],
      [108.5, -6.1],
      [109.8, -6.7],
      [110.8, -6.7],
      [110.8, -7.0],
      [109.5, -7.0],
      [108.0, -6.5],
      [106.8, -6.3],
      [106.8, -6.0]
    ]]
  },
  {
    id: 'RISK-02',
    name: 'Area Simulasi Kerentanan Gempa Bumi Tektonik',
    riskLevel: 'Sedang',
    hazardType: 'Sesar Aktif Darat (Simulasi)',
    populationEstimate: 28000,
    dataStatus: 'AREA RISIKO SIMULASI',
    description: 'Zona simulasi patahan lempeng aktif dengan kebutuhan siaga lumbung bergerak.',
    coordinates: [[
      [100.0, -1.5],
      [101.8, -1.0],
      [102.5, -2.5],
      [101.2, -3.2],
      [99.8, -2.2],
      [100.0, -1.5]
    ]]
  },
  {
    id: 'RISK-03',
    name: 'Area Simulasi Kerawanan Pangan Musim Kering',
    riskLevel: 'Sedang',
    hazardType: 'Anomali Iklim & Kekeringan (Simulasi)',
    populationEstimate: 19500,
    dataStatus: 'AREA RISIKO SIMULASI',
    description: 'Zona simulasi penurunan curah hujan tajam yang memicu perlunya percepatan pasokan kacang dan karbohidrat lokal.',
    coordinates: [[
      [122.5, -9.5],
      [125.0, -9.0],
      [125.5, -10.5],
      [123.0, -10.8],
      [122.5, -9.5]
    ]]
  }
];

export const getFoodSourcesGeoJSON = () => {
  return {
    type: 'FeatureCollection',
    features: FOOD_SOURCES_DATA.map(item => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.longitude, item.latitude]
      },
      properties: { ...item }
    }))
  };
};

export const getRiskAreasGeoJSON = () => {
  return {
    type: 'FeatureCollection',
    features: RISK_SIMULATION_AREAS.map(area => ({
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: area.coordinates
      },
      properties: {
        id: area.id,
        name: area.name,
        riskLevel: area.riskLevel,
        hazardType: area.hazardType,
        populationEstimate: area.populationEstimate,
        dataStatus: area.dataStatus,
        description: area.description
      }
    }))
  };
};
