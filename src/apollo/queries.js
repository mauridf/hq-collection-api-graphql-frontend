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

// Query para obter todas as hqs
export const GET_HQS = gql`
    query {
        allHQs {
            id
            titulo
            tituloOriginal
            totalEdicoes
            status: status
            observacao
            categoria
            anoLancamento
        }
    }
`;

// Query para obter a hq pelo ID
export const GET_HQ_BY_ID = gql`
    query GetEditoraById($id: UUID!) {
        hqById(id: $id) {
            id
            titulo
            tituloOriginal
            totalEdicoes
            status: status
            observacao
            categoria
            anoLancamento
        }
    }
`;

// Query para obter todas as edicoes
export const GET_EDICOES = gql`
    query {
        allEdicoes {
            id
            numero
            titulo
            tituloOriginal
            idioma
            sinopse
            capa
            hqId
        }
    }
`;

// Query para obter a hq pelo ID
export const GET_EDICAO_BY_ID = gql`
    query GetEdicaoById($id: UUID!) {
        edicaoById(id: $id) {
            id
            numero
            titulo
            tituloOriginal
            idioma
            sinopse
            capa
            hqId
        }
    }
`;

// Query para obter as edições por HQ
export const GET_EDICOES_BY_HQ = gql`
    query GetEdicoesPorHQ($hqId: UUID!) {
        edicoesPorHQ(hqId: $hqId) {
            id
            numero
            titulo
            tituloOriginal
            idioma
            sinopse
            capa
            hqId
        }
    }
`;