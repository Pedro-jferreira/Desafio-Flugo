import {
    collection,
    getDocs,
    doc,
    updateDoc,
    query,
    where,
    writeBatch,
    serverTimestamp,
    getDoc,
    deleteDoc
} from "firebase/firestore";
import type { Department } from "../types";
import { db } from "../../firebase-config";


const COLLECTION_NAME = "departments";
const EMPLOYEES_COLLECTION = "employees";

// Interface para os dados de entrada da criação
interface CreateDepartmentData {
    name: string;
    managerId?: string;
}

export const DepartmentService = {

    getAll: async (): Promise<Department[]> => {
        try {
            const colRef = collection(db, COLLECTION_NAME);
            const snapshot = await getDocs(colRef);
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Department));
        } catch (error) {
            console.error("Erro ao buscar departamentos:", error);
            throw error;
        }
    },

    /**
     * Cria um departamento e atualiza os colaboradores selecionados para pertencerem a ele.
     * @param data Dados básicos do departamento (nome, gestor)
     * @param memberIds Array de IDs dos colaboradores que serão movidos para este departamento
     */
    create: async (data: CreateDepartmentData, memberIds: string[] = []): Promise<string> => {
        try {
            const batch = writeBatch(db);

            // 1. Criar referência para o novo departamento (gera o ID sem salvar ainda)
            const newDeptRef = doc(collection(db, COLLECTION_NAME));

            // 2. Adicionar a operação de criação do departamento no Batch
            batch.set(newDeptRef, {
                name: data.name,
                managerId: data.managerId || null,
                createdAt: serverTimestamp()
            });

            const newDeptId = newDeptRef.id;

            // 3. Atualizar o Gestor (se houver)
            if (data.managerId) {
                const managerRef = doc(db, EMPLOYEES_COLLECTION, data.managerId);
                batch.update(managerRef, { departmentId: newDeptId });
            }

            // 4. Atualizar os Membros selecionados
            memberIds.forEach((empId) => {
                // Evita atualizar o gestor duas vezes se ele estiver nas duas listas
                if (empId !== data.managerId) {
                    const empRef = doc(db, EMPLOYEES_COLLECTION, empId);
                    batch.update(empRef, { departmentId: newDeptId });
                }
            });

            // 5. Executar tudo atomicamente
            await batch.commit();

            return newDeptId;
        } catch (error) {
            console.error("Erro ao criar departamento e mover membros:", error);
            throw error;
        }
    },

    update: async (id: string, data: Partial<Department>): Promise<void> => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await updateDoc(docRef, data);
        } catch (error) {
            console.error("Erro ao atualizar departamento:", error);
            throw error;
        }
    }, delete: async (id: string): Promise<void> => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error("Erro ao deletar departamento vazio:", error);
            throw error;
        }
    },

    deleteWithMigration: async (departmentIdToDelete: string, targetDepartmentId: string): Promise<void> => {
        try {
            // (Lógica que já estava pronta mantida aqui...)
            if (!targetDepartmentId) {
                throw new Error("É necessário informar um departamento de destino.");
            }
            if (departmentIdToDelete === targetDepartmentId) {
                throw new Error("O departamento de destino não pode ser o mesmo a ser excluído.");
            }

            const batch = writeBatch(db);
            const employeesRef = collection(db, EMPLOYEES_COLLECTION);
            const q = query(employeesRef, where("departmentId", "==", departmentIdToDelete));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach((employeeDoc) => {
                const docRef = doc(db, EMPLOYEES_COLLECTION, employeeDoc.id);
                batch.update(docRef, { departmentId: targetDepartmentId });
            });

            const deptRef = doc(db, COLLECTION_NAME, departmentIdToDelete);
            batch.delete(deptRef);

            await batch.commit();
            console.log(`Departamento ${departmentIdToDelete} excluído com migração.`);
        } catch (error) {
            console.error("Erro ao excluir departamento com migração:", error);
            throw error;
        }
    },
    getById: async (id: string): Promise<Department | null> => {
        try {
            const docRef = doc(db, COLLECTION_NAME, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Department;
            }
            return null;
        } catch (error) {
            console.error("Erro ao buscar departamento:", error);
            throw error;
        }
    },

    /**
     * Busca os IDs dos colaboradores que pertencem a um departamento
     */
    getDepartmentMemberIds: async (departmentId: string): Promise<string[]> => {
        try {
            const q = query(collection(db, EMPLOYEES_COLLECTION), where("departmentId", "==", departmentId));
            const snapshot = await getDocs(q);
            return snapshot.docs.map(doc => doc.id);
        } catch (error) {
            console.error("Erro ao buscar membros:", error);
            return [];
        }
    },

    /**
     * Atualiza o departamento e gerencia movimentações de membros (Entradas e Saídas)
     */
    updateWithMemberManagement: async (
        deptId: string,
        data: { name: string; managerId?: string },
        addedMemberIds: string[],
        removedMemberIds: string[],
        targetDeptForRemoved?: string // Obrigatório se removedMemberIds.length > 0
    ): Promise<void> => {
        try {
            const batch = writeBatch(db);

            // 1. Atualizar dados básicos do departamento
            const deptRef = doc(db, COLLECTION_NAME, deptId);
            batch.update(deptRef, {
                name: data.name,
                managerId: data.managerId || null
            });

            // 2. Atualizar membros ADICIONADOS (move para este departamento)
            addedMemberIds.forEach(empId => {
                const empRef = doc(db, EMPLOYEES_COLLECTION, empId);
                batch.update(empRef, { departmentId: deptId });
            });

            // 3. Atualizar membros REMOVIDOS (move para o departamento de destino)
            if (removedMemberIds.length > 0) {
                if (!targetDeptForRemoved) {
                    throw new Error("Departamento de destino obrigatório para membros removidos.");
                }
                removedMemberIds.forEach(empId => {
                    const empRef = doc(db, EMPLOYEES_COLLECTION, empId);
                    batch.update(empRef, { departmentId: targetDeptForRemoved });
                });
            }

            await batch.commit();
        } catch (error) {
            console.error("Erro ao atualizar departamento e mover membros:", error);
            throw error;
        }
    }
};