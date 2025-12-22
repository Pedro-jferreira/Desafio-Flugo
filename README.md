# 🚀 Flugo Dashboard - Desafio Front-end

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Uma aplicação profissional de gestão de colaboradores desenvolvida como solução para o desafio técnico Front-end da Flugo. O projeto implementa um sistema de listagem com performance otimizada e um formulário de cadastro multi-etapa (Wizard), focando em UX, Clean Code e fidelidade ao design system.

🔗 **[Acessar Demonstração Online (Live Demo)](https://desafio-funcionarios.web.app/)**

---

## 📋 Sobre o Desafio

O objetivo foi desenvolver uma aplicação Single Page Application (SPA) seguindo um protótipo Figma rigoroso, contendo:
* **Formulário Multi-step:** Cadastro dividido em etapas lógicas.
* **UI/UX:** Fidelidade visual ao [Protótipo Figma](https://www.figma.com/proto/r7xOsboMOQlMpEx8D5kH3a/Desafio-Flugo).
* **Stack:** ReactJS + TypeScript + Material UI.
* **Backend:** Persistência de dados via Firebase.
* **Deploy:** Hospedagem em servidor remoto.

## ✨ Funcionalidades Implementadas

### 🔐 1. Autenticação e Segurança
* **Login & Registro:** Sistema completo de autenticação via Firebase Auth (Email/Senha).
* **Rotas Protegidas:** Implementação de `PrivateRoute` para impedir acesso não autorizado às áreas internas.
* **Gestão de Sessão:** Persistência automática de login e Logout seguro.

### 👥 2. Gestão de Colaboradores (CRUD Completo)
* **Listagem Otimizada:**
    * **Infinite Scroll:** Carregamento sob demanda via Intersection Observer.
    * **Sorter Backend-side:** Ordenação por Nome, Email ou Status.
    * **Ações Rápidas:** Menu de contexto para Editar ou Excluir.
    * **Seleção em Massa:** Checkboxes para exclusão de múltiplos registros via Batch Transaction.
* **Cadastro e Edição (Wizard):**
    * Formulário multi-etapa para UX fluida.
    * **Novos Campos Profissionais:** Cargo, Salário (com máscara), Data de Admissão, Senioridade e Vínculo com Gestor.
    * Validação em tempo real de e-mails duplicados no banco.

### 🏢 3. Gestão de Departamentos (Regra de Negócio Avançada)
* **Estrutura Organizacional:** Criação de departamentos com definição de Gestor Responsável.
* **Inclusão Inteligente:** Ao criar um departamento, é possível selecionar múltiplos colaboradores existentes para movê-los automaticamente para a nova área.
* **Migração Obrigatória (Safe Delete):**
    * O sistema impede que colaboradores fiquem "órfãos" (sem departamento).
    * Ao tentar excluir um departamento com membros ativos, um **Modal de Migração** é acionado, forçando o usuário a escolher um novo destino para a equipe antes de concluir a exclusão.

## 🛠️ Tecnologias Utilizadas

O projeto utiliza uma stack moderna (2025 ready):

| Categoria | Tecnologia | Uso no Projeto |
| :--- | :--- | :--- |
| **Core** | [React 19](https://react.dev/) | Biblioteca UI com Hooks personalizados. |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) | Tipagem estrita para maior segurança e DX. |
| **UI Kit** | [Material UI (MUI)](https://mui.com/) | Design System completo e customizado. |
| **Forms** | [React Hook Form](https://react-hook-form.com/) | Gerenciamento de estado de formulários complexos. |
| **Validação** | [Zod](https://zod.dev/) | Schemas de validação robustos e tipados. |
| **Backend** | [Firebase](https://firebase.google.com/) | Auth, Firestore (NoSQL) e Hosting. |
| **Routing** | [React Router v6](https://reactrouter.com/) | Navegação SPA e proteção de rotas. |
| **Feedback** | [Notistack](https://notistack.com/) | Sistema de notificações (Toasts/Snackbars). |

## 🚀 Como rodar o projeto localmente

Siga os passos abaixo para clonar e executar a aplicação na sua máquina.

### Pré-requisitos
* [Node.js](https://nodejs.org/) (Versão 18+ recomendada).
* Git instalado.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Pedro-jferreira/Desafio-Flugo.git
   ```

2. **Acesse a pasta do projeto:**

   ```bash
   cd desafio-funcionarios
    ```
3. **Instale as dependências:**

   ```bash
   npm install
   ```
4. **Execute o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

5. **Acesse no navegador:** O terminal irá mostrar o link local, geralmente: http://localhost:5173

### Build para Produção
Para gerar a versão otimizada para deploy na pasta dist:

 ```bash
npm run build
```

## 📂 Estrutura do Projeto
A arquitetura foi pensada para escalabilidade, separando responsabilidades e utilizando termos em inglês (padrão de mercado):

```Plaintext
src/
├── assets/             # Recursos estáticos
├── components/         
│   ├── add_department/ # Wizard e Dialogs de Departamento
│   ├── add_employee/   # Wizard de Colaboradores
│   ├── core/           # Componentes genéricos (FormHeader, Loaders)
│   ├── departments/    # Tabelas e linhas de departamentos
│   ├── employees/      # Tabelas e linhas de colaboradores
│   └── layout/         # Sidebar e MainLayout
├── contexts/           # AuthContext (Gestão de usuário logado)
├── hooks/              # Custom Hooks (useEmployees, useDepartments, etc.)
├── pages/              # Telas da aplicação (Login, Lists, Adds, Updates)
├── routing/            # Configuração de Rotas e PrivateRoute
├── schema/             # Schemas Zod (DepartmentSchema, EmployeeSchema)
├── services/           # Camada de API (Firebase Service Pattern)
├── theme/              # Customização do MUI
└── types/              # Interfaces Globais (TS)
```

Desenvolvido por Pedro Ferreira 👨‍🍳💻
