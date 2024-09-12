import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Query para obter o personagem pelo ID
const GET_PERSONAGEM = gql`
    query GetPersonagemById($id: UUID!) {
        personagemById(id: $id) {
            id
            nome
            tipo
        }
    }
`;

// Mutation para atualizar o personagem
const UPDATE_PERSONAGEM = gql`
    mutation UpdatePersonagem($id: UUID!, $nome: String!, $tipo: TipoPersonagem!) {
        updatePersonagem(id: $id, nome: $nome, tipo: $tipo) {
            id
            nome
            tipo
        }
    }
`;

// Query para obter a lista de personagens
const GET_PERSONAGENS = gql`
    query {
        allPersonagens {
            id
            nome
            tipo
        }
    }
`;

// Enum de tipos de personagens
const TIPOS_PERSONAGEM = [
    { value: 'HEROI', label: 'Herói' },
    { value: 'ANTI_HEROI', label: 'Anti-Herói' },
    { value: 'VILAO', label: 'Vilão' },
    { value: 'EQUIPE', label: 'Equipe' },
    { value: 'HISTORICO', label: 'Histórico' },
    { value: 'FABULA', label: 'Fábula' },
    { value: 'ANIMACAO', label: 'Animação' },
    { value: 'REAL', label: 'Real' },
    { value: 'OUTRO', label: 'Outro' },
];

const PersonagemAlteracao = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_PERSONAGEM, { variables: { id } });
    const [updatePersonagem] = useMutation(UPDATE_PERSONAGEM, {
        refetchQueries: [{ query: GET_PERSONAGENS }],
    });
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');

    useEffect(() => {
        if (data && data.personagemById) {
            setNome(data.personagemById.nome);
            setTipo(data.personagemById.tipo || '');
        }
    }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updatePersonagem({
                variables: { id, nome, tipo },
            });
            navigate('/personagens'); // Redireciona de volta para a lista de personagens
        } catch (err) {
            console.error('Error updating personagem:', err);
        }
    };

    const handleBack = () => {
        navigate('/personagens');
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
                <Typography variant="h5">Editar Personagem</Typography>
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="tipo-label">Tipo</InputLabel>
                        <Select
                            labelId="tipo-label"
                            id="tipo"
                            value={tipo}
                            label="Tipo"
                            onChange={(e) => setTipo(e.target.value)}
                            required
                        >
                            {TIPOS_PERSONAGEM.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

export default PersonagemAlteracao;
