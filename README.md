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

### 1. Listagem de Colaboradores (Employees List)
* **🔄 Infinite Scroll:** Carregamento de dados sob demanda ao rolar a página (substituindo a paginação tradicional para melhor experiência mobile).
* **Sorter Interativo:** Ordenação dinâmica (Backend-side) por Nome, Email ou Departamento.
* **Feedback Visual:** Uso de *Skeletons* durante o carregamento e tratamento de erros amigável.
* **Avatares Dinâmicos:** Geração visual sequencial de avatares na listagem.

### 2. Cadastro (Wizard Form)
* **📍 Navegação por Etapas:** Separação clara entre "Informações Básicas" e "Informações Profissionais".
* **🛡️ Validação Robusta:** Uso de **Zod** + **React Hook Form**.
  * Validação de formato de e-mail.
  * Campos obrigatórios.
  * Verificação em tempo real.
* **🚫 Prevenção de Duplicidade:** O sistema verifica automaticamente no Firebase se o e-mail já existe antes de salvar, retornando feedback visual e levando o usuário ao campo com erro.
* **💾 Persistência:** Dados salvos em tempo real no **Firebase Firestore**.

## 🛠️ Tecnologias Utilizadas

O projeto utiliza uma stack moderna (2025 ready):

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Core** | [React 19](https://react.dev/) | Biblioteca UI moderna. |
| **Build Tool** | [Vite](https://vitejs.dev/) | Ambiente de desenvolvimento ultra-rápido. |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) | Superset JS para tipagem estática e segurança. |
| **UI Framework** | [Material UI](https://mui.com/) | Componentes de interface baseados no Material Design. |
| **Gerência de Estado** | [React Hook Form](https://react-hook-form.com/) | Controle de formulários performático e sem re-renders desnecessários. |
| **Validação** | [Zod](https://zod.dev/) | Schema Validation integrado ao TypeScript. |
| **Backend/DB** | [Firebase](https://firebase.google.com/) | Firestore (NoSQL) e Hosting. |
| **Notificações** | [Notistack](https://notistack.com/) | Sistema de Toasts (Snackbars) empilháveis. |
| **Roteamento** | [React Router v7](https://reactrouter.com/) | Navegação SPA. |

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
├── assets/             # Imagens e ícones estáticos
├── components/         # Componentes React reutilizáveis
│   ├── add_employees/  # Componentes específicos do Wizard de cadastro
│   ├── core/           # Componentes base (ex: IOSSwitch customizado)
│   └── employees/      # Componentes da listagem (Tabela, Linhas)
├── hooks/              # Custom Hooks (useEmployees, useAddEmployee)
├── pages/              # Páginas da aplicação (EmployeesPage, AddEmployeePage)
├── services/           # Camada de comunicação com Firebase
├── theme/              # Customização do tema Material UI
├── types.ts            # Interfaces e Tipos TypeScript globais
└── main.tsx            # Ponto de entrada da aplicação
```

Desenvolvido por Pedro Ferreira 👨‍🍳💻
