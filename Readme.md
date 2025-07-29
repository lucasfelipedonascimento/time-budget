# TimeBudget

TimeBudget é uma aplicação para gerenciamento de orçamentos de serviços e peças automotivas. O projeto utiliza uma arquitetura modular e orientada a domínio, com foco em boas práticas de design e organização de código.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

### Principais Diretórios

- **`src/app.ts`**: Configuração inicial do servidor Express.
- **`src/contexts/`**: Contém os contextos delimitados do domínio, como `basic` e `support`.
- **`src/infrastructure/`**: Contém a infraestrutura, como conexão com o banco de dados e migrações.
- **`src/value-objects/`**: Implementação de objetos de valor, como `CPF` e `Plate`.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para criação de APIs.
- **Drizzle ORM**: ORM para manipulação do banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Docker**: Para containerização do banco de dados.

## Configuração do Ambiente

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>
   cd timebudget
   ```

2. Instale as dependências:

```shell
npm install
```

Configure o arquivo .env:

```.env
PORT=
DATABASE_URL=
```

4. Suba o banco de dados com Docker:

```shell
docker-compose up -d
```

5. Execute as migrações:

```shell
npx drizzle-kit generate
```

6. Inicie o servidor:

```shell
npm run dev
```

### Funcionalidades

- Gerenciamento de Orçamentos:

  - Criação, edição e exclusão de orçamentos.
  - Adição de serviços e peças aos orçamentos.
  - Cálculo automático do valor total.

- Gerenciamento de Clientes:

  - Cadastro e atualização de informações de clientes.

- Gerenciamento de Veículos:

  - Cadastro e atualização de informações de veículos.

### Estrutura de Domínio

O projeto segue os princípios de DDD (Domain-Driven Design), com os seguintes conceitos principais:

**Aggregates**: Representam entidades principais, como Budget.

**Entities**: Representam objetos com identidade, como Client e Vehicle.

**Value Objects**: Representam objetos imutáveis, como CPF e Plate.

Licença

Este projeto está licenciado sob a licença MIT.
