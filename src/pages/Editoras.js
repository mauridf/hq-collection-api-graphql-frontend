import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import TableComponent from '../components/Table';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GET_EDITORAS } from '../apollo/queries';
import { DELETE_EDITORA } from '../apollo/mutations';

const Editoras = () => {
    const { loading, error, data, refetch } = useQuery(GET_EDITORAS);
    const [deleteEditora] = useMutation(DELETE_EDITORA);
    const [editoras, setEditoras] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setEditoras(data.allEditoras);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error('GraphQL Error:', error);
        return <p>Error: {error.message}</p>;
    }

    const columns = [
        { id: 'nome', label: 'Nome' },
        { id: 'logotipo', label: 'Logotipo' }
    ];

    const handleEdit = (id) => {
        navigate(`/editora-alteracao/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Deseja deletar o registro?");
        if (confirmed) {
            try {
                const { data } = await deleteEditora({ variables: { id } });
                if (data.deleteEditora) {
                    alert('Registro deletado com sucesso!');
                    refetch(); // Atualiza a lista de editoras
                } else {
                    alert('Erro ao deletar o registro.');
                }
            } catch (error) {
                console.error('Error deleting editora:', error);
                alert('Ocorreu um erro ao tentar deletar o registro.');
            }
        }
    };

    const handleNew = () => {
        navigate('/editora-cadastro');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Editoras
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
                data={editoras}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Container>
    );
};

export default Editoras;
