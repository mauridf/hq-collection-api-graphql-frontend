import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import { GET_EDITORAS } from '../graphql/queries';
import { CREATE_EDITORA } from '../graphql/mutations';

const EditoraCadastro = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [logotipo, setLogotipo] = useState('');
    const [createEditora] = useMutation(CREATE_EDITORA, {
        refetchQueries: [{ query: GET_EDITORAS }], // Atualiza a consulta GET_EDITORAS após a mutação
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await createEditora({
                variables: { nome, logotipo },
            });
            navigate('/editoras'); // Redireciona para a lista de editoras
        } catch (error) {
            console.error('Erro ao criar editora', error);
            // Opcional: Adicione lógica para exibir uma mensagem de erro para o usuário
        }
    };

    const handleBack = () => {
        navigate('/editoras'); // Redireciona para a lista de editoras
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
                <Typography variant="h5">Cadastro de Editora</Typography>
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="logotipo"
                        label="Logotipo"
                        name="logotipo"
                        autoComplete="logotipo"
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

export default EditoraCadastro;