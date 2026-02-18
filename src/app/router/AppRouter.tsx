import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage/HomePage';
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
