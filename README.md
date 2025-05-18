# 🧠 TaskFlow API

A **TaskFlow API** é a espinha dorsal do sistema de gerenciamento de tarefas da TaskFlow. Com ela, usuários podem se registrar, fazer login, editar seus perfis e realizar operações completas de CRUD em tarefas — incluindo o envio para lixeira e a exclusão permanente.

---

## 🚀 Tecnologias utilizadas

- **Node.js + Express** – Roteamento de requisições
- **MongoDB + Prisma** – Armazenamento e manipulação de dados
- **JWT (JSON Web Token)** – Autenticação por token
- **Bcrypt** – Criptografia de senhas
- **Joi** – Validação de dados
- **dotenv** – Gerenciamento de variáveis de ambiente

---

## 📦 Instalação local

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/TaskFlow-api.git
   cd TaskFlow-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DATABASE_URL=seu_link_do_mongo
   JWT_SECRET=sua_chave_secreta
   PORT=3000
   ```

4. Rode o servidor localmente:
   ```bash
   npm start
   ```

---

## 🔐 Rotas principais

### 📌 Autenticação

| Método | Rota        | Descrição                        |
|--------|-------------|----------------------------------|
| POST   | /registrar  | Registra um novo usuário         |
| POST   | /login      | Faz login e retorna um JWT       |

---

### 👤 Perfil do usuário

| Método | Rota            | Descrição                               |
|--------|------------------|-------------------------------------------|
| GET    | /profile/:id     | Retorna dados do usuário logado (name, email) |
| PUT    | /profile/:id     | Edita dados do usuário (name, email)     |

> 🔒 Essas rotas requerem autenticação com JWT (middleware `authMiddleware`)

---

### 🗂️ Tarefas

| Método  | Rota                                | Descrição                                      |
|---------|-------------------------------------|------------------------------------------------|
| GET     | /tarefas                            | Retorna todas as tarefas do usuário            |
| GET     | /tarefas-deletadas                  | Retorna apenas tarefas deletadas               |
| POST    | /tarefas                            | Cria uma nova tarefa                           |
| PUT     | /tarefas/:id                        | Edita uma tarefa existente                     |
| PATCH   | /tarefas/soft-delete/:id            | Move tarefa para a lixeira (`isDelete: true`)  |
| PATCH   | /tarefas/restaurar/:id              | Restaura tarefa da lixeira (`isDelete: false`) |
| DELETE  | /tarefas/deletar/:id                | Apaga a tarefa permanentemente do banco        |

---

## 📁 Estrutura resumida

```
TaskFlow-api/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── prisma/
├── .env.example
├── server.js
└── README.md
```

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT** — veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## ✅ Status do projeto

💥 **Finalizado e em produção!**  
Deploy feito, API no ar e funcionando como prometido. Bora pra próxima! 😎🔥

---

## 💡 Ideia bônus

Você pode adicionar uma seção `📬 Exemplo de uso` com comandos curl, ou até incluir uma collection do Postman exportada pra facilitar a vida de quem for testar a API.
