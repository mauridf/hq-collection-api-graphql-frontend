import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField, Typography, Box } from '@mui/material';

// Query para obter a editora pelo ID
const GET_EDITORA = gql`
    query GetEditoraById($id: UUID!) {
        editoraById(id: $id) {
            id
            nome
            logotipo
        }
    }
`;

// Mutation para atualizar a editora
const UPDATE_EDITORA = gql`
    mutation UpdateEditora($id: UUID!, $nome: String!, $logotipo: String) {
        updateEditora(id: $id, nome: $nome, logotipo: $logotipo) {
            id
            nome
            logotipo
        }
    }
`;

const GET_EDITORAS = gql`
    query {
        allEditoras {
            id
            nome
            logotipo
        }
    }
`;

const EditoraAlteracao = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_EDITORA, { variables: { id } });
    const [updateEditora] = useMutation(UPDATE_EDITORA, {
        refetchQueries: [{ query: GET_EDITORAS }],
    });
    const [nome, setNome] = useState('');
    const [logotipo, setLogotipo] = useState('');

    useEffect(() => {
        if (data && data.editoraById) {
            setNome(data.editoraById.nome);
            setLogotipo(data.editoraById.logotipo || '');
        }
    }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateEditora({
                variables: { id, nome, logotipo },
            });
            navigate('/editoras'); // Redireciona de volta para a lista de editoras
        } catch (err) {
            console.error('Error updating editora:', err);
        }
    };

    const handleBack = () => {
        navigate('/editoras');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8,
                    mb: 2,
                }}
            >
                <Typography variant="h5">Editar Editora</Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 3 }}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        autoComplete="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="logotipo"
                        label="Logotipo"
                        name="logotipo"
                        value={logotipo}
                        onChange={(e) => setLogotipo(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Salvar
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={handleBack}
                    >
                        Voltar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditoraAlteracao;
