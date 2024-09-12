import { gql } from '@apollo/client';

// Mutation para deletar uma editora
export const DELETE_EDITORA = gql`
    mutation DeleteEditora($id: UUID!) {
        deleteEditora(id: $id)
    }
`;

// Defina a mutação GraphQL
export const CREATE_EDITORA = gql`
    mutation CreateEditora($nome: String!, $logotipo: String) {
        createEditora(nome: $nome, logotipo: $logotipo) {
            id
            nome
            logotipo
        }
    }
`;

// Mutation para atualizar a editora
export const UPDATE_EDITORA = gql`
    mutation UpdateEditora($id: UUID!, $nome: String!, $logotipo: String) {
        updateEditora(id: $id, nome: $nome, logotipo: $logotipo) {
            id
            nome
            logotipo
        }
    }
`;

// Mutation para deletar um personagem
export const DELETE_PERSONAGEM = gql`
    mutation DeletePersonagem($id: UUID!) {
        deletePersonagem(id: $id)
    }
`;

// Mutation para atualizar um personagem (caso precise em outro lugar)
export const UPDATE_PERSONAGEM = gql`
mutation UpdatePersonagem($id: UUID!, $nome: String!, $tipo: TipoPersonagem!) {
    updatePersonagem(id: $id, nome: $nome, tipo: $tipo) {
        id
        nome
        tipo
    }
}
`;

// Mutation para criar um novo personagem (caso precise)
export const CREATE_PERSONAGEM = gql`
    mutation CreatePersonagem($nome: String!, $tipo: TipoPersonagem!) {
        createPersonagem(nome: $nome, tipo: $tipo) {
            id
            nome
            tipo
        }
    }
`;
