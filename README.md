# Frontend Project

## Descrição

Este é o frontend de uma aplicação que utiliza React com Apollo Client para interagir com uma API GraphQL. O projeto inclui funcionalidades para cadastrar, editar e listar personagens, utilizando Material-UI para estilização.

## Estrutura do Projeto

- **src/**
  - **components/**: Componentes reutilizáveis como `Table`, `PersonagemCadastro`, `PersonagemAlteracao`, etc.
  - **pages/**: Páginas principais da aplicação, como `Personagens`, `PersonagemCadastro`, `PersonagemAlteracao`, etc.
  - **App.js**: Configuração das rotas e componente principal da aplicação.
  - **index.js**: Ponto de entrada da aplicação React.
  - **graphql/**: Definições de queries e mutations GraphQL.
  - **styles/**: Arquivos de estilos globais.

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

## Rotas

    /personagens: Lista todos os personagens.
    /personagem/cadastro: Página para cadastrar um novo personagem.
    /personagem/alteracao/:id: Página para editar um personagem existente, baseado no id fornecido.

## Funcionalidades

    Cadastro de Personagem: Permite adicionar novos personagens com nome e tipo.
    Edição de Personagem: Permite editar os detalhes de um personagem existente.
    Listagem de Personagens: Exibe uma tabela com todos os personagens cadastrados.
    Exclusão de Personagem: Permite excluir um personagem com confirmação.

## Observações

    Certifique-se de que a API GraphQL está funcionando e acessível no endpoint configurado.
    A aplicação foi testada em ambiente de desenvolvimento, podendo haver ajustes necessários para produção.

## Contribuição

    Se você deseja contribuir para este projeto, por favor, envie um pull request ou abra uma issue com sugestões ou correções.