import { gql } from '@apollo/client';

// Query para obter todas as editoras
export const GET_EDITORAS = gql`
    query {
        allEditoras {
            id
            nome
            logotipo
        }
    }
`;

// Query para obter a editora pelo ID
export const GET_EDITORA_BY_ID = gql`
    query GetEditoraById($id: UUID!) {
        editoraById(id: $id) {
            id
            nome
            logotipo
        }
    }
`;

// Query para obter todos os personagens
export const GET_PERSONAGENS = gql`
    query {
        allPersonagens {
            id
            nome
            tipo
        }
    }
`;

// Query para obter um personagem pelo ID (caso precise em outro lugar)
export const GET_PERSONAGEM_BY_ID = gql`
    query GetPersonagemById($id: UUID!) {
        personagemById(id: $id) {
            id
            nome
            tipo
        }
    }
`;
