# Frontend Project

## Descrição

Este é o frontend de uma aplicação que utiliza React com Apollo Client para interagir com uma API GraphQL. O projeto inclui funcionalidades para cadastrar, editar e listar personagens, utilizando Material-UI para estilização.

## Estrutura do Projeto

- **src/**
  - **components/**: Componentes reutilizáveis como `Table`, `PersonagemCadastro`, `PersonagemAlteracao`, etc.
  - **pages/**: Páginas principais da aplicação, como `Personagens`, `PersonagemCadastro`, `PersonagemAlteracao`, etc.
  - **App.js**: Configuração das rotas e componente principal da aplicação.
  - **index.js**: Ponto de entrada da aplicação React.
  - **apollo/**: Definições e Configurações de queries e mutations GraphQL.

## Dependências

- React
- @apollo/client
- graphql
- @mui/material
- @emotion/react
- @emotion/styled
- react-router-dom

## Configuração

1. **Instalação das Dependências**

   Execute o seguinte comando para instalar todas as dependências do projeto:

   ```bash
   npm install

2. **Configuração do Apollo Client**

    Certifique-se de configurar o Apollo Client corretamente com a URL da API GraphQL.

    Execução da Aplicação

    Para iniciar o servidor de desenvolvimento, execute:

    ```bash
    npm start

    A aplicação será aberta em http://localhost:3000.

## Funcionalidades

    Cadastro de Editoras, Personagens e HQs.
    Edição de Editoras, Personagens e HQs.
    Exclusão de Editoras, Personagens e HQs.

## Observações

    Certifique-se de que a API GraphQL está funcionando e acessível no endpoint configurado.
    A aplicação foi testada em ambiente de desenvolvimento, podendo haver ajustes necessários para produção.

## Contribuição

    Se você deseja contribuir para este projeto, por favor, envie um pull request ou abra uma issue com sugestões ou correções.