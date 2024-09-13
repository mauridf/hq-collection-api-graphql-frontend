import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import TableComponent from '../components/Table';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GET_PERSONAGENS } from '../apollo/queries';
import { DELETE_PERSONAGEM } from '../apollo/mutations';

const Personagens = () => {
    const { loading, error, data, refetch } = useQuery(GET_PERSONAGENS);
    const [deletePersonagem] = useMutation(DELETE_PERSONAGEM);
    const [personagens, setPersonagens] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setPersonagens(data.allPersonagens);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error('GraphQL Error:', error);
        return <p>Error: {error.message}</p>;
    }

    const columns = [
        { id: 'nome', label: 'Nome' },
        { id: 'tipo', label: 'Tipo', format: (value) => formatTipoPersonagem(value) }
    ];

    // Função para formatar o valor do enum para exibição
    const formatTipoPersonagem = (tipo) => {
        switch (tipo) {
            case 'HEROI':
                return 'Herói';
            case 'ANTI_HEROI':
                return 'Anti-Herói';
            case 'VILAO':
                return 'Vilão';
            case 'EQUIPE':
                return 'Equipe';
            case 'HISTORICO':
                return 'Histórico';
            case 'FABULA':
                return 'Fábula';
            case 'ANIMACAO':
                return 'Animação';
            case 'REAL':
                return 'Real';
            case 'OUTRO':
                return 'Outro';
            default:
                return tipo;
        }
    };

    const handleEdit = (id) => {
        navigate(`/personagem-alteracao/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Deseja deletar o registro?");
        if (confirmed) {
            try {
                const { data } = await deletePersonagem({ variables: { id } });
                if (data.deletePersonagem) {
                    alert('Registro deletado com sucesso!');
                    refetch(); // Atualiza a lista de personagens
                } else {
                    alert('Erro ao deletar o registro.');
                }
            } catch (error) {
                console.error('Error deleting personagem:', error);
                alert('Ocorreu um erro ao tentar deletar o registro.');
            }
        }
    };

    const handleNew = () => {
        navigate('/personagem-cadastro');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Personagens
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleNew}
                sx={{ marginBottom: 2 }}
            >
                Novo
            </Button>
            <TableComponent
                columns={columns}
                data={personagens}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Container>
    );
};

export default Personagens;
