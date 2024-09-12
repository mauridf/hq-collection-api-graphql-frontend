import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useMutation } from '@apollo/client';
import { GET_PERSONAGENS } from '../graphql/queries';
import { CREATE_PERSONAGEM } from '../graphql/mutations';

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

const PersonagemCadastro = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [createPersonagem] = useMutation(CREATE_PERSONAGEM, {
        refetchQueries: [{ query: GET_PERSONAGENS }], // Atualiza a lista de personagens após a mutação
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Nome:", nome, "Tipo:", tipo); // Debug
        
        try {
            await createPersonagem({
                variables: { nome, tipo },
            });
            navigate('/personagens');
        } catch (error) {
            console.error('Erro ao criar personagem', error);
        }
    };        

    const handleBack = () => {
        navigate('/personagens'); // Redireciona para a lista de personagens
    };

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
                <Typography variant="h5">Cadastro de Personagem</Typography>
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
                        autoFocus
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    {/* Select (Combobox) para Tipo */}
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

export default PersonagemCadastro;
