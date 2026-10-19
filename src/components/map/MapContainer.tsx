import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { Map as MapLibreMap } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  FOOD_SOURCES_DATA,
  FoodSourcePoint,
  getFoodSourcesGeoJSON,
  getRiskAreasGeoJSON,
} from '../../data/foodSourcesData';
import { MapLayerControls } from './MapLayerControls';
import { MapLegend } from './MapLegend';
import { FoodDetailModal } from './FoodDetailModal';
import { AlertCircle, RefreshCw, ZoomIn, ZoomOut, Compass } from 'lucide-react';

interface MapContainerProps {
  heightClass?: string;
  initialCenter?: [number, number];
  initialZoom?: number;
  interactive?: boolean;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  heightClass = 'h-[620px]',
  initialCenter = [117, -2],
  initialZoom = 4,
  interactive = true,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodSourcePoint | null>(null);
  const [showFoodPoints, setShowFoodPoints] = useState(true);
  const [showRiskAreas, setShowRiskAreas] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = useMemo(() => {
    return Array.from(new Set(FOOD_SOURCES_DATA.map((item) => item.category)));
  }, []);

  const initMap = () => {
    if (!mapContainerRef.current) return;

    setIsLoading(true);
    setLoadError(null);

    // Clean up old map if exists
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    try {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: 'https://tiles.openfreemap.org/styles/liberty',
        center: initialCenter,
        zoom: initialZoom,
        maxZoom: 16,
        minZoom: 3,
        attributionControl: false, // Custom attribution rendered cleanly
      });

      // Add navigation controls
      if (interactive) {
        map.addControl(
          new maplibregl.NavigationControl({
            showCompass: true,
            showZoom: true,
          }),
          'top-right'
        );
      }

      // Add custom attribution
      map.addControl(
        new maplibregl.AttributionControl({
          customAttribution:
            '© <a href="https://openfreemap.org" target="_blank" rel="noopener">OpenFreeMap</a>, © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a> | <span class="text-amber-700 font-semibold">GiziTangguh Play (Simulasi)</span>',
          compact: true,
        }),
        'bottom-right'
      );

      map.on('load', () => {
        setIsLoading(false);

        // 1. Add Risk Simulation Area Source & Layers
        const riskGeoJSON = getRiskAreasGeoJSON();
        map.addSource('area-risiko-source', {
          type: 'geojson',
          data: riskGeoJSON as any,
        });

        // Fill layer
        map.addLayer({
          id: 'area-risiko-fill',
          type: 'fill',
          source: 'area-risiko-source',
          paint: {
            'fill-color': [
              'match',
              ['get', 'riskLevel'],
              'Tinggi',
              'rgba(239, 68, 68, 0.28)',
              'Sedang',
              'rgba(245, 158, 11, 0.25)',
              'rgba(59, 130, 246, 0.25)',
            ],
            'fill-outline-color': [
              'match',
              ['get', 'riskLevel'],
              'Tinggi',
              '#dc2626',
              'Sedang',
              '#d97706',
              '#2563eb',
            ],
          },
        });

        // Outline layer
        map.addLayer({
          id: 'area-risiko-line',
          type: 'line',
          source: 'area-risiko-source',
          paint: {
            'line-color': [
              'match',
              ['get', 'riskLevel'],
              'Tinggi',
              '#dc2626',
              'Sedang',
              '#d97706',
              '#2563eb',
            ],
            'line-width': 2.5,
            'line-dasharray': [2, 1],
          },
        });

        // Label layer for risk areas
        map.addLayer({
          id: 'area-risiko-label',
          type: 'symbol',
          source: 'area-risiko-source',
          layout: {
            'text-field': ['concat', '⚠️ AREA RISIKO SIMULASI:\n', ['get', 'name']],
            'text-size': 11,
            'text-offset': [0, 0],
            'text-anchor': 'center',
            'text-max-width': 18,
          },
          paint: {
            'text-color': '#7f1d1d',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        });

        // 2. Add Food Sources Source & Layers
        const foodGeoJSON = getFoodSourcesGeoJSON();
        map.addSource('sumber-pangan-source', {
          type: 'geojson',
          data: foodGeoJSON as any,
        });

        // Circle layer
        map.addLayer({
          id: 'sumber-pangan-circles',
          type: 'circle',
          source: 'sumber-pangan-source',
          paint: {
            'circle-radius': 9,
            'circle-color': [
              'match',
              ['get', 'category'],
              'Lumbung Karbohidrat',
              '#059669', // Emerald
              'Gudang Penyangga Regional',
              '#2563eb', // Blue
              'Depo Logistik Darurat',
              '#d97706', // Amber
              'Sentra Protein & Sayur',
              '#9333ea', // Purple
              '#059669',
            ],
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#ffffff',
          },
        });

        // Circle halo animation / shadow
        map.addLayer(
          {
            id: 'sumber-pangan-halo',
            type: 'circle',
            source: 'sumber-pangan-source',
            paint: {
              'circle-radius': 13,
              'circle-color': 'rgba(16, 185, 129, 0.2)',
              'circle-opacity': 0.8,
            },
          },
          'sumber-pangan-circles'
        );

        // Text label layer
        map.addLayer({
          id: 'sumber-pangan-labels',
          type: 'symbol',
          source: 'sumber-pangan-source',
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-offset': [0, 1.4],
            'text-anchor': 'top',
            'text-max-width': 14,
          },
          paint: {
            'text-color': '#0f172a',
            'text-halo-color': '#ffffff',
            'text-halo-width': 2,
          },
        });

        // Click on food marker
        map.on('click', 'sumber-pangan-circles', (e) => {
          if (!e.features || !e.features[0]) return;
          const props = e.features[0].properties as unknown as FoodSourcePoint;
          const matched = FOOD_SOURCES_DATA.find((item) => item.id === props.id);
          if (matched) {
            setSelectedFood(matched);

            // Also show mini popup on map
            new maplibregl.Popup({ offset: 12, closeButton: false })
              .setLngLat([matched.longitude, matched.latitude])
              .setHTML(
                `<div style="font-family: inherit; font-size: 12px; padding: 2px;">
                  <strong style="color: #065f46; display: block;">${matched.name}</strong>
                  <span style="font-size: 10px; color: #4b5563;">Kapasitas: ${matched.capacity} ${matched.unit}</span>
                  <div style="margin-top: 4px; font-size: 9px; color: #92400e; font-weight: bold;">DATA SIMULASI — BUKAN RESMI</div>
                </div>`
              )
              .addTo(map);
          }
        });

        // Click on risk area
        map.on('click', 'area-risiko-fill', (e) => {
          if (!e.features || !e.features[0]) return;
          const props = e.features[0].properties as any;
          new maplibregl.Popup({ offset: 10 })
            .setLngLat(e.lngLat)
            .setHTML(
              `<div style="font-family: inherit; font-size: 12px; max-width: 220px;">
                <span style="background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 9px;">AREA RISIKO SIMULASI</span>
                <h4 style="font-weight: bold; margin-top: 4px; color: #1f2937;">${props.name}</h4>
                <p style="font-size: 11px; color: #4b5563; margin-top: 2px;">Bahaya: ${props.hazardType}</p>
                <p style="font-size: 10px; color: #6b7280; margin-top: 2px;">${props.description}</p>
              </div>`
            )
            .addTo(map);
        });

        // Cursor style
        map.on('mouseenter', 'sumber-pangan-circles', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'sumber-pangan-circles', () => {
          map.getCanvas().style.cursor = '';
        });
        map.on('mouseenter', 'area-risiko-fill', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'area-risiko-fill', () => {
          map.getCanvas().style.cursor = '';
        });
      });

      map.on('error', (e) => {
        // Only trigger fatal load error if style or root tiles fail completely
        if (e?.error?.message && e.error.message.includes('style')) {
          setLoadError(
            'Gagal memuat gaya peta dasar OpenFreeMap. Periksa koneksi jaringan atau coba beberapa saat lagi.'
          );
          setIsLoading(false);
        }
      });

      mapRef.current = map;
    } catch (err: any) {
      setLoadError(
        `Terjadi kendala saat menginisialisasi MapLibre GL: ${err?.message || 'Error tidak dikenal'}`
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initMap();
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Handle layer toggles
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const foodVisibility = showFoodPoints ? 'visible' : 'none';
    if (map.getLayer('sumber-pangan-circles')) {
      map.setLayoutProperty('sumber-pangan-circles', 'visibility', foodVisibility);
    }
    if (map.getLayer('sumber-pangan-halo')) {
      map.setLayoutProperty('sumber-pangan-halo', 'visibility', foodVisibility);
    }
    if (map.getLayer('sumber-pangan-labels')) {
      map.setLayoutProperty('sumber-pangan-labels', 'visibility', foodVisibility);
    }

    const riskVisibility = showRiskAreas ? 'visible' : 'none';
    if (map.getLayer('area-risiko-fill')) {
      map.setLayoutProperty('area-risiko-fill', 'visibility', riskVisibility);
    }
    if (map.getLayer('area-risiko-line')) {
      map.setLayoutProperty('area-risiko-line', 'visibility', riskVisibility);
    }
    if (map.getLayer('area-risiko-label')) {
      map.setLayoutProperty('area-risiko-label', 'visibility', riskVisibility);
    }
  }, [showFoodPoints, showRiskAreas]);

  // Handle category filter
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded() || !map.getLayer('sumber-pangan-circles')) return;

    if (selectedCategory === 'ALL') {
      map.setFilter('sumber-pangan-circles', null);
      map.setFilter('sumber-pangan-halo', null);
      map.setFilter('sumber-pangan-labels', null);
    } else {
      const filterExpr: any = ['==', ['get', 'category'], selectedCategory];
      map.setFilter('sumber-pangan-circles', filterExpr);
      map.setFilter('sumber-pangan-halo', filterExpr);
      map.setFilter('sumber-pangan-labels', filterExpr);
    }
  }, [selectedCategory]);

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: initialCenter,
        zoom: initialZoom,
        essential: true,
      });
    }
  };

  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-100`}>
      {/* Simulation Watermark Badge on Top-Left of Map */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        <div className="bg-amber-500/90 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-bold tracking-wide shadow-md pointer-events-auto flex items-center gap-1.5 border border-amber-600">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>DATA SIMULASI — BUKAN DATA RESMI</span>
        </div>
      </div>

      {/* Layer Controls on Bottom-Left or Top-Left on desktop */}
      {interactive && !loadError && (
        <div className="absolute top-16 left-4 z-10 hidden sm:block">
          <MapLayerControls
            showFoodPoints={showFoodPoints}
            setShowFoodPoints={setShowFoodPoints}
            showRiskAreas={showRiskAreas}
            setShowRiskAreas={setShowRiskAreas}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            onResetView={handleResetView}
          />
        </div>
      )}

      {/* Legend on Bottom-Left */}
      {interactive && !loadError && (
        <div className="absolute bottom-6 left-4 z-10 hidden md:block">
          <MapLegend />
        </div>
      )}

      {/* Detail Modal / Side Panel when marker clicked */}
      <FoodDetailModal foodSource={selectedFood} onClose={() => setSelectedFood(null)} />

      {/* Error state with retry button */}
      {loadError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-center space-y-4 border border-rose-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Kendala Pemuatan Peta</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{loadError}</p>
            <div className="pt-2">
              <button
                onClick={initMap}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Coba Muat Ulang Peta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && !loadError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-xs">
          <div className="w-9 h-9 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-xs font-medium text-slate-700">Memuat MapLibre GL & Data GeoJSON...</p>
          <span className="text-[10px] text-slate-400">OpenFreeMap Liberty Style</span>
        </div>
      )}

      {/* Actual Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
