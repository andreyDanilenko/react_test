import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage/HomePage';
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage';
import { PublicLayout, MainLayout } from '@/app/layouts';
import { RequireAuthGuard } from './guards';
import { ROUTES } from './routes';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.ROOT} element={<RegistrationPage />} />
      </Route>

      <Route element={<RequireAuthGuard><MainLayout /></RequireAuthGuard>}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
