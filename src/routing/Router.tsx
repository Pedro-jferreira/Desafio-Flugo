import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { EmployeesPage } from '../pages/EmployeesPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';




export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/adicionar" element={<AddEmployeePage />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};