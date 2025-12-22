import { useState, useEffect, useCallback } from 'react';
import type { Department } from '../types';
import { DepartmentService } from '../services/DepartamentService';

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await DepartmentService.getAll();
      setDepartments(data);
    } catch (err) {
      setError('Erro ao carregar departamentos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return {
    departments,
    loading,
    error,
    refresh: fetchDepartments
  };
};