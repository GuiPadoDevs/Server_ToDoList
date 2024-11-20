
# ToDo List API

A API permite o gerenciamento de tarefas e usuários. Ela possui rotas para registrar e autenticar usuários, além de criar, listar, atualizar e deletar tarefas.

## Tecnologias

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Token (JWT)

---

## **Rotas de Autenticação**

### **1. Register - Criar usuário**

**POST** `/api/auth/register`

Registra um novo usuário no sistema.

**Requisição:**

```json
{
  "user": "nome_de_usuario",
  "password": "senha_do_usuario"
}
```

**Resposta:**

- **Sucesso:**
  - Status: `201 Created`
  - Corpo da resposta:

    ```json
    {
      "user": "nome_de_usuario",
      "password": "senha_do_usuario",
      "_id": "id_do_usuario"
    }
    ```

- **Erro:**
  - Caso falhe, você receberá uma mensagem de erro indicando o que deu errado (ex: usuário já existe).

  ```json
  {
    "erro": "Register user error"
  }
  ```

---

### **2. Login - Autenticar usuário**

**POST** `/api/auth/login`

Autentica o usuário e gera um token JWT.

**Requisição:**

```json
{
  "user": "nome_de_usuario",
  "password": "senha_do_usuario"
}
```

**Resposta:**

- **Sucesso:**
  - Status: `200 OK`
  - Corpo da resposta:

    ```json
    {
      "token": "seu_token_jwt"
    }
    ```

- **Erro:**
  - Caso falhe, você receberá uma mensagem de erro indicando o que deu errado (ex: usuário ou senha inválidos).

    ```json
    {
      "erro": "Invalid password"
    }
    ```

---

## **Rotas de Tarefas**

### **1. Listar tarefas**

**GET** `/api/tasks/task`

Lista todas as tarefas do usuário autenticado.

**Cabeçalhos:**

- **Authorization**: `Bearer seu_token_jwt`

**Resposta:**

- **Sucesso:**
  - Status: `200 OK`
  - Corpo da resposta:

    ```json
    [
      {
        "_id": "id_da_tarefa",
        "name": "Nome da Tarefa",
        "description": "Descrição da tarefa",
        "priority": "Alta",
        "type": "personal",
        "term": "2024-12-31T00:00:00.000Z"
      },
      ...
    ]
    ```

- **Erro:**
  - Caso falhe (ex: token inválido ou não autorizado):

    ```json
    {
      "erro": "Unauthorized"
    }
    ```

---

### **2. Criar tarefa**

**POST** `/api/tasks/task`

Cria uma nova tarefa para o usuário autenticado.

**Requisição:**

```json
{
  "name": "Nova Tarefa",
  "description": "Descrição da tarefa",
  "priority": "Alta",
  "type": "personal",
  "term": "2024-12-31"
}
```

**Cabeçalhos:**

- **Authorization**: `Bearer seu_token_jwt`

**Resposta:**

- **Sucesso:**
  - Status: `201 Created`
  - Corpo da resposta:

    ```json
    {
      "_id": "id_da_tarefa",
      "name": "Nova Tarefa",
      "description": "Descrição da tarefa",
      "priority": "Alta",
      "type": "personal",
      "term": "2024-12-31T00:00:00.000Z"
    }
    ```

- **Erro:**
  - Caso falhe (ex: campos obrigatórios ausentes ou token inválido):

    ```json
    {
      "erro": "Create task error"
    }
    ```

---

### **3. Atualizar tarefa**

**PUT** `/api/tasks/task`

Atualiza uma tarefa existente.

**Requisição:**

```json
{
  "id": "id_da_tarefa",
  "name": "Tarefa Atualizada",
  "description": "Descrição atualizada",
  "priority": "Média",
  "type": "work",
  "term": "2024-12-31"
}
```

**Cabeçalhos:**

- **Authorization**: `Bearer seu_token_jwt`

**Resposta:**

- **Sucesso:**
  - Status: `200 OK`
  - Corpo da resposta:

    ```json
    {
      "_id": "id_da_tarefa",
      "name": "Tarefa Atualizada",
      "description": "Descrição atualizada",
      "priority": "Média",
      "type": "work",
      "term": "2024-12-31T00:00:00.000Z"
    }
    ```

- **Erro:**
  - Caso falhe (ex: ID não encontrado ou token inválido):

    ```json
    {
      "erro": "Update task error"
    }
    ```

---

### **4. Deletar tarefa**

**DELETE** `/api/tasks/task`

Deleta uma tarefa existente.

**Requisição:**

```json
{
  "id": "id_da_tarefa"
}
```

**Cabeçalhos:**

- **Authorization**: `Bearer seu_token_jwt`

**Resposta:**

- **Sucesso:**
  - Status: `200 OK`
  - Corpo da resposta:

    ```json
    {
      "message": "Task deleted successfully"
    }
    ```

- **Erro:**
  - Caso falhe (ex: ID não encontrado ou token inválido):

    ```json
    {
      "erro": "Delete task error"
    }
    ```

---

## **Considerações Finais**

- Todas as rotas de tarefas exigem autenticação via JWT, e o token deve ser enviado no cabeçalho **Authorization** como um **Bearer token**.
- Certifique-se de que as chaves de entrada (`user`, `password`, `name`, `description`, etc.) estejam corretamente formatadas conforme o esperado pelo servidor.

---
