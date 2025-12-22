import { useState, useEffect, useCallback } from 'react';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { EmployeeService } from '../services/EmployeeService';
import type { Employee } from '../types';

export type SortField = keyof Employee;
export type OrderDirection = 'asc' | 'desc';

export const useEmployees = () => {
 const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true); 
  
  // MUDANÇA 1: Começa como NULL (sem setinha na tabela)
  const [orderByField, setOrderByField] = useState<SortField | null>(null);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc');

  const fetchEmployees = useCallback(async (isLoadMore = false) => {
    setLoading(true);
    setError(null);

    try {
      const cursor = isLoadMore ? lastDoc : null;
      const actualSortField = orderByField || 'createdAt';
      const actualOrderDirection = orderByField ? orderDirection : 'desc';

      const result = await EmployeeService.getAll({
        pageSize: 10,
        lastVisible: cursor,
        sortField: actualSortField,
        order: actualOrderDirection
      });

      setLastDoc(result.lastVisible);
      
      if (result.data.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setEmployees((prev) => {
        if (isLoadMore) {
          return [...prev, ...result.data];
        } else {
          return result.data;
        }
      });

    } catch (err) {
      setError('Erro ao carregar colaboradores.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [lastDoc, orderByField, orderDirection]);

  useEffect(() => {
    fetchEmployees(false); 
  }, [orderByField, orderDirection]); 

  const handleSort = (field: SortField) => {
    const isAsc = orderByField === field && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderByField(field);
    setLastDoc(null); 
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchEmployees(true);
    }
  };

  const refresh = () => {
    setLastDoc(null);
    fetchEmployees(false);
  };
  const removeEmployees = async (ids: string[]) => {
    try {
        if (ids.length === 1) {
            await EmployeeService.delete(ids[0]);
        } else {
            await EmployeeService.deleteBatch(ids);
        }
        
        setEmployees(current => current.filter(emp => !ids.includes(emp.id)));
        
    } catch (err) {
        console.error(err);
        throw err;
    }
  };

  return {
    employees, 
    loading,
    error,
    hasMore,
    orderByField, 
    orderDirection,
    handleSort,
    loadMore,
    refresh,
    removeEmployees
  };
};

export const useAddEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addColaborador = async (colaborador: Omit<Employee, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const id = await EmployeeService.create(colaborador);
      return id;
    } catch (err) {
      setError('Erro ao criar colaborador.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    addColaborador,
    loading,
    error
  };
};

export const useUpdateEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getColaborador = async (id: string) => {
    setLoading(true);
    try {
      return await EmployeeService.getById(id);
    } catch (err) {
      setError('Erro ao buscar dados.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateColaborador = async (id: string, data: Partial<Employee>) => {
    setLoading(true);
    setError(null);
    try {
      await EmployeeService.update(id, data);
    } catch (err) {
      setError('Erro ao atualizar.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getColaborador, updateColaborador, loading, error };
};