import { useState, useEffect, useCallback } from 'react';
import type { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { EmployeeService } from '../services/EmployeeService';
import type { Employee } from '../types';

export type SortField = keyof Employee;
export type OrderDirection = 'asc' | 'desc';

export const useEmployees = () => {
  const [colaboradores, setColaboradores] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true); 
  const [orderByField, setOrderByField] = useState<SortField>('status');
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc');

  const fetchEmployees = useCallback(async (isLoadMore = false) => {
    setLoading(true);
    setError(null);

    try {
      const cursor = isLoadMore ? lastDoc : null;

      const result = await EmployeeService.getAll({
        pageSize: 10,
        lastVisible: cursor,
        sortField: orderByField,
        order: orderDirection
      });

      setLastDoc(result.lastVisible);
      
      if (result.data.length < 10) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setColaboradores((prev) => {
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

  return {
    colaboradores,
    loading,
    error,
    hasMore,
    orderByField,
    orderDirection,
    handleSort,
    loadMore,
    refresh
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