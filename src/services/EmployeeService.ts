import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  startAfter, 
  type DocumentData, 
  QueryDocumentSnapshot, 
  where,
  serverTimestamp
} from "firebase/firestore";

import type { Employee } from "../types"; 
import { db } from "../../firebase-config";

const COLLECTION_NAME = "employees";

export interface PaginatedResult {
  data: Employee[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
}

export interface FetchOptions {
  pageSize?: number;
  lastVisible?: QueryDocumentSnapshot<DocumentData> | null;
  sortField?: keyof Employee; // Garante que só ordenamos por campos que existem
  order?: 'asc' | 'desc';
}

export const EmployeeService = {
  create: async (employee: Omit<Employee, 'id'>): Promise<string> => {
    try {
      const colRef = collection(db, COLLECTION_NAME);

      const q = query(colRef, where("email", "==", employee.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        throw new Error("EMAIL_DUPLICADO");
      }

      const docRef = await addDoc(colRef, {
        ...employee,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Erro ao criar colaborador:", error);
      throw error; 
    }
  },

  getAll: async ({
    pageSize = 10,
    lastVisible = null,
    sortField = 'createdAt',
    order = 'desc'
  }: FetchOptions): Promise<PaginatedResult> => {
    try {
      const colRef = collection(db, COLLECTION_NAME);
      let q = query(colRef, orderBy(sortField, order), limit(pageSize));

      if (lastVisible) {
        q = query(colRef, orderBy(sortField, order), startAfter(lastVisible), limit(pageSize));
      }

      const querySnapshot = await getDocs(q);
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
      const data: Employee[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];
      return {
        data,
        lastVisible: lastVisibleDoc,
      };
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
      throw error;
    }
  },
};