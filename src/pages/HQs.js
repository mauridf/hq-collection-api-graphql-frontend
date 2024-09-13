import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import TableComponent from '../components/Table';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GET_HQS } from '../apollo/queries';
import { DELETE_HQ } from '../apollo/mutations';

const Hqs = () => {
    const { loading, error, data, refetch } = useQuery(GET_HQS);
    const [deleteHq] = useMutation(DELETE_HQ);
    const [hqs, setHqs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setHqs(data.allHQs);
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error('GraphQL Error:', error);
        return <p>Error: {error.message}</p>;
    }

    const columns = [
        { id: 'titulo', label: 'Titulo' },
        { id: 'tituloOriginal', label: 'Titulo Original' },
        { id: 'totalEdicoes', label: 'Total de Edições' },
        { id: 'status: status', label: 'Status' },
        { id: 'observacao', label: 'Observação' },
        { id: 'categoria', label: 'Categoria' },
        { id: 'anoLancamento', label: 'Ano de Lançamento' }
    ];

    const handleEdit = (id) => {
        navigate(`/hq-alteracao/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Deseja deletar o registro?");
        if (confirmed) {
            try {
                const { data } = await deleteHq({ variables: { id } });
                if (data.deleteHq) {
                    alert('Registro deletado com sucesso!');
                    
                    // Atualiza a tabela manualmente removendo o registro deletado
                    setHqs((prevHqs) => prevHqs.filter(hq => hq.id !== id));
                } else {
                    alert('Erro ao deletar o registro.');
                }
            } catch (error) {
                console.error('Error deleting hq:', error);
                alert('Ocorreu um erro ao tentar deletar o registro.');
            }
        }
    };    

    const handleNew = () => {
        navigate('/hq-cadastro');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                HQs
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
                data={hqs}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Container>
    );
};

export default Hqs;
