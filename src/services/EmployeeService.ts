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
  serverTimestamp,
  doc,
  deleteDoc,
  writeBatch,
  updateDoc,
  getDoc
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
  delete: async (id: string): Promise<void> => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Erro ao deletar colaborador:", error);
      throw error;
    }
  },
  deleteBatch: async (ids: string[]): Promise<void> => {
    try {
      const batch = writeBatch(db);
      ids.forEach((id) => {
        const docRef = doc(db, COLLECTION_NAME, id);
        batch.delete(docRef);
      });
      await batch.commit();
    } catch (error) {
      console.error("Erro ao deletar em massa:", error);
      throw error;
    }
  },

getById: async (id: string): Promise<Employee | null> => {
  try {
    const docRef = doc(db, "employees", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Employee;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar colaborador por ID:", error);
    throw error;
  }
},

update: async (id: string, employee: Partial<Employee>): Promise<void> => {
  try {
    const docRef = doc(db, "employees", id);
    const cleanData = JSON.parse(JSON.stringify(employee)); 
    await updateDoc(docRef, cleanData);
  } catch (error) {
    console.error("Erro ao atualizar colaborador:", error);
    throw error;
  }
}
};