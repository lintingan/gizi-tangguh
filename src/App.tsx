/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { MapPage } from './pages/MapPage';
import { PanganSiagaPage } from './pages/PanganSiagaPage';
import { PiringPetualangPage } from './pages/PiringPetualangPage';
import { DataMetodologiPage } from './pages/DataMetodologiPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/peta" element={<MapPage />} />
          <Route path="/pangan-siaga" element={<PanganSiagaPage />} />
          <Route path="/piring-petualang" element={<PiringPetualangPage />} />
          <Route path="/data-metodologi" element={<DataMetodologiPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
