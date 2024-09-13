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

// Mutation para deletar um personagem
export const DELETE_HQ = gql`
    mutation DeleteHQ($id: UUID!) {
        deleteHQ(id: $id)
    }
`;

// Mutation para atualizar um personagem (caso precise em outro lugar)
export const UPDATE_HQ = gql`
    mutation UpdateHQ($id: UUID!, $titulo: String!, $tituloOriginal: String, $totalEdicoes: String, $status: StatusHQ!, $observacao: String, $categoria: CategoriaHQ!, $anoLancamento: String) {
        updateHQ(id: $id, titulo: $titulo, tituloOriginal: $tituloOriginal, totalEdicoes: $totalEdicoes, status: $status, observacao: $observacao, categoria: $categoria, anoLancamento: $anoLancamento) {
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

// Mutation para criar um novo personagem (caso precise)
export const CREATE_HQ = gql`
    mutation CreateHQ($titulo: String!, $tituloOriginal: String, $totalEdicoes: String, $status: StatusHQ!, $observacao: String, $categoria: CategoriaHQ!, $anoLancamento: String) {
        createHQ(titulo: $titulo, tituloOriginal: $tituloOriginal, totalEdicoes: $totalEdicoes, status: $status, observacao: $observacao, categoria: $categoria, anoLancamento: $anoLancamento) {
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

// Mutation para deletar uma edição
export const DELETE_EDICAO = gql`
    mutation DeleteEdicao($id: UUID!) {
        deleteEdicao(id: $id)
    }
`;

// Mutation para atualizar uma edição (caso precise em outro lugar)
export const UPDATE_EDICAO = gql`
    mutation UpdateEdicao($id: UUID!, $numero: String!, $titulo: String, $tituloOriginal: String, $idioma: Idioma!, $sinopse: String, $capa: String) {
        updateEdicao(id: $id, numero: $numero, titulo: $titulo, tituloOriginal: $tituloOriginal, idioma: $idioma, sinopse: $sinopse, capa: $capa) {
            id
            numero
            titulo
            tituloOriginal
            idioma
            sinopse
            capa
        }
}
`;

// Mutation para criar uma nova edicao (caso precise)
export const CREATE_EDICAO = gql`
    mutation CreateEdicao($numero: String!, $titulo: String!, $tituloOriginal: String, $idioma: Idioma!, $sinopse: String, $capa: String, $hqId: UUID!) {
        createEdicao(numero: $numero, titulo: $titulo, tituloOriginal: $tituloOriginal, idioma: $idioma, sinopse: $sinopse, capa: $capa, hqId: $hqId) {
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

// Mutation para incluir a editora na HQ
export const ADD_EDITORA_TO_HQ = gql`
    mutation AddEditoraToHQ($hqId: UUID!, $editorasIds: [UUID!]!) {
        addEditoraToHQ(hqId: $hqId, editorasIds: $editorasIds) {
            id
            titulo
            hqEditoras {
                editora {
                id
                nome
                }
            }
        }
    }
`;

// Mutation para incluir o personagem na HQ
export const ADD_PERSONAGEM_TO_HQ = gql`
    mutation AddPersonagemToHQ($hqId: UUID!, $personagemId: [UUID!]!) {
        addPersonagemToHQ(hqId: $hqId, personagemId: $personagemId) {
            id
            titulo
            hqPersonagens {
                personagem {
                id
                nome
                }
            }
        }
    }
`;