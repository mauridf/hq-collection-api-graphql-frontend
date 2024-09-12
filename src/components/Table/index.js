import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Paper, IconButton, Tooltip, Typography, TextField, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TableComponent = ({ columns, data = [], onEdit, onDelete }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchText, setSearchText] = useState('');

    // Função para manipular a mudança da página
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Função para manipular a mudança da quantidade de registros por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Função para filtrar os dados com base no texto de pesquisa
    const filteredData = data.filter((row) =>
        columns.some((column) =>
            String(row[column.id]).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <Box sx={{ maxWidth: '100%', margin: 'auto' }}>
            {/* Campo de pesquisa */}
            <TextField
                label="Pesquisar"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                                    <Typography variant="subtitle2">{column.label}</Typography>
                                </TableCell>
                            ))}
                            <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow key={row.id}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>{row[column.id] || '-'}</TableCell>
                                    ))}
                                    <TableCell>
                                        <Tooltip title="Editar">
                                            <IconButton color="primary" onClick={() => onEdit(row.id)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Deletar">
                                            <IconButton color="error" onClick={() => onDelete(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center">
                                    <Typography variant="body2" color="textSecondary">Nenhum dado encontrado</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};

export default TableComponent;
