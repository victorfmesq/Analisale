# Sistema de Análise de Vendas

O Sistema de Análise de Vendas é uma aplicação que permite o cadastro de produtos, encargos e fornece dashboards para análise de vendas. Este README fornece as instruções necessárias para usar e configurar o sistema.

## Índice

- [Sistema de Análise de Vendas](#sistema-de-análise-de-vendas)
  - [Índice](#índice)
  - [Requisitos](#requisitos)
  - [Configuração](#configuração)
  - [Funcionalidades](#funcionalidades)
    - [Cadastro de Produtos](#cadastro-de-produtos)
    - [Cadastro de Encargos](#cadastro-de-encargos)
    - [Dashboards](#dashboards)
  - [Como Usar](#como-usar)
    - [Back](#back)
    - [Front](#front)

## Requisitos

Antes de começar, certifique-se de ter instalado os seguintes requisitos:

- Node.js
- npm (gerenciador de pacotes do Node.js)
- Banco de dados (mySql)

## Configuração

1. **Clone o repositório (back):**

   ```bash
   git clone https://github.com/levifernands/analisale-backend.git
   ```

   **Importe as dependências do projeto:**

   ```bash
   cd analisale-backend; npm i
   ou
   cd analisale-backend && npm i
   ou
   cd analisale-backend
   npm i
   ```

   **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias, como a URL do banco de dados.

   ```.env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=<DB_PASSWORD>
   DB_NAME=analisale
   SECRET_KEY=analisalesecretkey
   ```

2. **Clone o repositório (front):**

   ```bash
   git clone https://github.com/victorfmesq/Analisale.git
   ```

   **Importe as dependências do projeto:**

   ```bash
   cd Analisale; npm i
   ou
   cd Analisale && npm i
   ou
   cd Analisale
   npm i
   ```

   ## Funcionalidades

### Cadastro de Produtos

- **Descrição:** Permite cadastrar produtos com informações como nome, quantidade, valor de compra e valor de venda.
- **Como acessar:** Navegue até a página de produtos no painel administrativo no lado esquerdo da tela.

### Cadastro de Encargos

- **Descrição:** Permite cadastrar encargos que podem ser aplicados nas vendas. Os encargos podem ter diferentes tipos, como taxa ou desconto, e um percentual em cima do valor total da venda.

- **Como acessar:** Acesse a seção de encargos no painel administrativo no lado esquerdo da tela.

### Dashboards

- **Descrição:** Fornece dashboards visuais para análise das vendas. Atualemtne apenas 1 dashboard implementado que mostra a relação de produtos e suas respectivas vendas, assim como a quantidade em estoque.

- **Como acessar:** Vá para a seção de dashboards no painel localizado do lado esquerdo da tela.

## Como Usar

### Back

```bash
  cd local_repository_dir/analisale-backend; npm run dev (Win)
  ou
  cd local_repository_dir/analisale-backend && npm run dev (Liux)
  ou
  cd local_repository_dir/analisale-backend
  npm run dev
```

1. Abra o navegador no endereço `"http://localhost:3000/api-docs"`

2. Crie um usuário pelo Crud de usuário

### Front

```bash
  cd local_repository_dir/Analisale; npm run dev (Win)
  ou
  cd local_repository_dir/Analisale && npm run dev (Linux)
  ou
  cd local_repository_dir/Analisale
  npm run dev
```

1. Abra o navegador no endereço `http://localhost:5173/`

2. Faça o Login.
3. Divirta-se
