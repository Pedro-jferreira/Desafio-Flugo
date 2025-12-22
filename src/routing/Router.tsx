import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './MainLayout';
import { EmployeesPage } from '../pages/EmployeesPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import Login from '../pages/Login';
import { PrivateRoute } from './PrivateRoute';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import { UpdateEmployeePage } from '../pages/UpdateEmployeePage';
import { DepartmentsPage } from '../pages/DepartmentsPage';
import { AddDepartmentPage } from '../pages/AddDepartmentPage';
import { UpdateDepartmentPage } from '../pages/UpdateDepartmentPage';



export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<EmployeesPage />} />
            <Route path="/adicionar" element={<AddEmployeePage />} />
            <Route path="/editar/:id" element={<UpdateEmployeePage />} />

            <Route path="/departamentos" element={<DepartmentsPage />} />
            <Route path="/departamentos/adicionar" element={<AddDepartmentPage />} />
             <Route path="/departamentos/editar/:id" element={<UpdateDepartmentPage />} />

          </Route>
        </Route>
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};