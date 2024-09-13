import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Accordion, // Importando o Accordion
    AccordionSummary, // Importando o AccordionSummary
    AccordionDetails, // Importando o AccordionDetails
    TableContainer, // Importando o TableContainer
    Paper, // Importando o Paper
    Table, // Importando o Table
    TableHead, // Importando o TableHead
    TableRow, // Importando o TableRow
    TableCell, // Importando o TableCell
    TableBody // Importando o TableBody
} from '@mui/material';import { useMutation, useQuery } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GET_HQS, GET_EDITORAS, GET_PERSONAGENS, GET_EDICOES_BY_HQ } from '../apollo/queries';
import { CREATE_HQ, ADD_EDITORA_TO_HQ, ADD_PERSONAGEM_TO_HQ, DELETE_EDICAO, UPDATE_EDICAO, CREATE_EDICAO } from '../apollo/mutations';

// Enum de Status
const STATUS = [
    { value: 'EM_ANDAMENTO', label: 'Em Andamento' },
    { value: 'CANCELADO', label: 'Cancelado' },
    { value: 'CONCLUIDO', label: 'Concluido' },
    { value: 'OUTRO', label: 'Outro' },
];

// Enum de Categoria
const CATEGORIA = [
    { value: 'SERIE_REGULAR', label: 'Série Regular' },
    { value: 'MINI_SERIE', label: 'Mini-Série' },
    { value: 'ESPECIAL', label: 'Especial' },
    { value: 'OMNIBUS', label: 'Omnibus' },
    { value: 'ENCADERNADO', label: 'Encadernado' },
    { value: 'ONESHOT', label: 'OneShot' },
    { value: 'OUTRO', label: 'Outro' }
];

// Enum de Idioma
const IDIOMA = [
    { value: 'PORTUGUES', label: 'Português' },
    { value: 'INGLES', label: 'Inglês' },
    { value: 'ESPANHOL', label: 'Espanhol' },
    { value: 'OUTRO', label: 'Outro' }
];

const theme = createTheme({
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginBottom: '16px',
            width: '100%', // Define uma largura fixa ou percentual
            '&:before': { display: 'none' }, // Remove a linha entre acordeons
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
            padding: '16px', // Ajusta o padding para garantir um tamanho uniforme
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: '16px',
            backgroundColor: '#fff',
          },
        },
      },
    },
});  

const HQCadastro = () => {
    // Estados para controlar a expansão de cada acordeon
    const [expandedHQ, setExpandedHQ] = useState(true);
    const [expandedEditora, setExpandedEditora] = useState(false);
    const [expandedPersonagem, setExpandedPersonagem] = useState(false);
    const [expandedEdicoes, setExpandedEdicoes] = useState(false);

    const navigate = useNavigate();
    const [titulo, setTitulo] = useState('');
    const [tituloOriginal, setTituloOriginal] = useState('');
    const [totalEdicoes, setTotalEdicoes] = useState('');
    const [status, setStatus] = useState('');
    const [observacao, setObservacao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [anoLancamento, setAnoLancamento] = useState('');
    const [hqId, setHqId] = useState(null);  // Estado para armazenar o ID da HQ criada
    const [createHQ] = useMutation(CREATE_HQ, {
        refetchQueries: [{ query: GET_HQS }], // Atualiza a lista de HQS após a mutação
    });

    // Editoras
    const [selectedEditora, setSelectedEditora] = useState('');
    const [editorasTemp, setEditorasTemp] = useState([]);  // Armazenar editoras temporariamente
    const [editorasAssociadas, setEditorasAssociadas] = useState([]);
    const { data: editorasData } = useQuery(GET_EDITORAS); // Obter editoras disponíveis
    const [addEditoraToHQ] = useMutation(ADD_EDITORA_TO_HQ);

    // Personagens
    const [selectedPersonagem, setSelectedPersonagem] = useState('');
    const [personagensTemp, setPersonagensTemp] = useState([]);  // Armazenar personagens temporariamente
    const [personagensAssociados, setPersonagensAssociados] = useState([]);
    const { data: personagensData } = useQuery(GET_PERSONAGENS); // Obter personagens disponíveis
    const [addPersonagemToHQ] = useMutation(ADD_PERSONAGEM_TO_HQ);

    // Edições
    const [edicoes, setEdicoes] = useState([]);
    const [numero, setNumero] = useState('');
    const [tituloEdicao, setTituloEdicao] = useState('');
    const [tituloOriginalEdicao, setTituloOriginalEdicao] = useState('');
    const [idioma, setIdioma] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [capa, setCapa] = useState('');
    const [selectedEdicao, setSelectedEdicao] = useState(null);
    const { data: edicoesData } = useQuery(GET_EDICOES_BY_HQ, { variables: { hqId }, skip: !hqId });
    const [createEdicao] = useMutation(CREATE_EDICAO);
    const [updateEdicao] = useMutation(UPDATE_EDICAO);
    const [deleteEdicao] = useMutation(DELETE_EDICAO);

    useEffect(() => {
        if (edicoesData) {
            setEdicoes(edicoesData.edicoesByHQ);
        }
    }, [edicoesData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createHQ({
                variables: { titulo, tituloOriginal, totalEdicoes, status, observacao, categoria, anoLancamento },
            });
            setHqId(data.createHQ.id); // Salva o ID da HQ criada
            // Fecha o acordeon de HQ e abre o de Editoras
            setExpandedHQ(false);
            setExpandedEditora(true);
        } catch (error) {
            console.error('Erro ao criar HQ', error);
        }
    };
    
    const handleAddEditoraTemp = () => {
        if (selectedEditora) {
            const editora = editorasData.allEditoras.find((e) => e.id === selectedEditora);
            if (editora && !editorasTemp.some((e) => e.id === editora.id)) {
                setEditorasTemp([...editorasTemp, editora]); // Adiciona editora temporariamente
                setSelectedEditora('');
            }
        }
    };

    const handleSaveEditoras = async () => {
        if (hqId && editorasTemp.length > 0) {
            try {
                const editorasIds = editorasTemp.map(editora => editora.id);
                await addEditoraToHQ({
                    variables: { hqId, editorasIds }
                });
                setEditorasAssociadas([...editorasAssociadas, ...editorasTemp]);
                setEditorasTemp([]); // Limpa as editoras temporárias após salvar
                // Fecha o acordeon de Editoras e abre o de Personagens
                setExpandedEditora(false);
                setExpandedPersonagem(true);
            } catch (error) {
                console.error('Erro ao salvar editoras da HQ', error);
            }
        }
    };

    const handleAddPersonagemTemp = () => {
        if (selectedPersonagem) {
            const personagem = personagensData.allPersonagens.find((p) => p.id === selectedPersonagem);
            if (personagem && !personagensTemp.some((p) => p.id === personagem.id)) {
                setPersonagensTemp([...personagensTemp, personagem]); // Adiciona personagem temporariamente
                setSelectedPersonagem('');
            }
        }
    };

    const handleSavePersonagens = async () => {
        if (hqId && personagensTemp.length > 0) {
            try {
                const personagemId = personagensTemp.map(personagem => personagem.id);
                await addPersonagemToHQ({
                    variables: { hqId, personagemId }
                });
                setPersonagensAssociados([...personagensAssociados, ...personagensTemp]);
                setPersonagensTemp([]); // Limpa os personagens temporárias após salvar
                // Fecha o acordeon de Personagens e abre o de Edições
                setExpandedPersonagem(false);
                setExpandedEdicoes(true);
            } catch (error) {
                console.error('Erro ao salvar personagens da HQ', error);
            }
        }
    };

    const handleAddEdicao = async () => {
        if (hqId) {
            try {
                if (selectedEdicao) {
                    // Atualizando uma edição existente
                    const { data } = await updateEdicao({
                        variables: { id: selectedEdicao, numero, titulo: tituloEdicao, tituloOriginal: tituloOriginalEdicao, idioma, sinopse, capa }
                    });
    
                    // Atualiza o estado local com a edição atualizada
                    setEdicoes((prevEdicoes = []) =>
                        prevEdicoes.map((edicao) =>
                            edicao.id === selectedEdicao ? data.updateEdicao : edicao
                        )
                    );
                } else {
                    // Criando uma nova edição
                    const { data } = await createEdicao({
                        variables: { hqId, numero, titulo: tituloEdicao, tituloOriginal: tituloOriginalEdicao, idioma, sinopse, capa }
                    });
    
                    // Atualiza o estado local com a nova edição
                    setEdicoes((prevEdicoes = []) => [...prevEdicoes, data.createEdicao]);
                }
    
                // Limpa o formulário após adicionar/atualizar a edição
                setNumero('');
                setTituloEdicao('');
                setTituloOriginalEdicao('');
                setIdioma('');
                setSinopse('');
                setCapa('');
                setSelectedEdicao(null);
    
            } catch (error) {
                console.error('Erro ao salvar edição', error);
            }
        }
    };    

    const handleEditEdicao = (edicao) => {
        setNumero(edicao.numero);
        setTituloEdicao(edicao.titulo);
        setTituloOriginalEdicao(edicao.tituloOriginal);
        setIdioma(edicao.idioma);
        setSinopse(edicao.sinopse);
        setCapa(edicao.capa);
        setSelectedEdicao(edicao.id);
    };

    const handleDeleteEdicao = async (id) => {
        if (window.confirm('Deseja excluir esta edição?')) {
            try {
                await deleteEdicao({ variables: { id } });
                setEdicoes(edicoes.filter(edicao => edicao.id !== id));
            } catch (error) {
                console.error('Erro ao excluir edição', error);
            }
        }
    };

    const handleBack = () => {
        navigate('/hqs'); // Redireciona para a lista de hqs
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
                <ThemeProvider theme={theme}>
                    {/* Acordeon para cadastro de HQ */}
                    <Accordion expanded={expandedHQ} onChange={() => setExpandedHQ(!expandedHQ)}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h5">Cadastro de HQ</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                    id="titulo"
                                    label="Título"
                                    name="titulo"
                                    autoComplete="titulo"
                                    autoFocus
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="tituloOriginal"
                                    label="Título Original"
                                    name="tituloOriginal"
                                    autoComplete="tituloOriginal"
                                    autoFocus
                                    value={tituloOriginal}
                                    onChange={(e) => setTituloOriginal(e.target.value)}
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="totalEdicoes"
                                    label="Total de Edições"
                                    name="totalEdicoes"
                                    autoComplete="totalEdicoes"
                                    autoFocus
                                    value={totalEdicoes}
                                    onChange={(e) => setTotalEdicoes(e.target.value)}
                                />

                                {/* Select (Combobox) para Status */}
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="tipo-label">Status</InputLabel>
                                    <Select
                                        labelId="tipo-label"
                                        id="status"
                                        value={status}
                                        label="Status"
                                        onChange={(e) => setStatus(e.target.value)}
                                        required
                                    >
                                        {STATUS.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="observacao"
                                    label="Observação"
                                    name="observacao"
                                    autoComplete="observacao"
                                    autoFocus
                                    value={observacao}
                                    onChange={(e) => setObservacao(e.target.value)}
                                />

                                {/* Select (Combobox) para Categoria */}
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="tipo-label">Categoria</InputLabel>
                                    <Select
                                        labelId="tipo-label"
                                        id="categoria"
                                        value={categoria}
                                        label="Categoria"
                                        onChange={(e) => setCategoria(e.target.value)}
                                        required
                                    >
                                        {CATEGORIA.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="anoLancamento"
                                    label="Ano de Lançamento"
                                    name="anoLancamento"
                                    autoComplete="anoLancamento"
                                    autoFocus
                                    value={anoLancamento}
                                    onChange={(e) => setAnoLancamento(e.target.value)}
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
                        </AccordionDetails>
                    </Accordion>

                    {/* Accordion de Editoras */}
                    {hqId && (
                        <Accordion expanded={expandedEditora} onChange={() => setExpandedEditora(!expandedEditora)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Associar Editoras</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Editora</InputLabel>
                                    <Select value={selectedEditora} onChange={(e) => setSelectedEditora(e.target.value)}>
                                        {editorasData?.allEditoras.map((editora) => (
                                            <MenuItem key={editora.id} value={editora.id}>
                                                {editora.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button variant="contained" onClick={handleAddEditoraTemp} sx={{ mb: 2 }}>
                                    Incluir Editora
                                </Button>

                                {/* Tabela de editoras temporárias */}
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Editora</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {editorasTemp.map((editora) => (
                                                <TableRow key={editora.id}>
                                                    <TableCell>{editora.nome}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {/* Botão para salvar editoras da HQ */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveEditoras}
                                    sx={{ mt: 2 }}
                                    fullWidth
                                >
                                    Salvar Editoras da HQ
                                </Button>
                                
                            </AccordionDetails>
                        </Accordion>
                    )}

                    {/* Accordion de Personagens */}
                    {hqId && (
                        <Accordion expanded={expandedPersonagem} onChange={() => setExpandedPersonagem(!expandedPersonagem)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Associar Personagens</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Personagem</InputLabel>
                                    <Select value={selectedPersonagem} onChange={(e) => setSelectedPersonagem(e.target.value)}>
                                        {personagensData?.allPersonagens.map((personagem) => (
                                            <MenuItem key={personagem.id} value={personagem.id}>
                                                {personagem.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button variant="contained" onClick={handleAddPersonagemTemp} sx={{ mb: 2 }}>
                                    Incluir Personagem
                                </Button>

                                {/* Tabela de personagens temporários */}
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Personagem</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {personagensTemp.map((personagem) => (
                                                <TableRow key={personagem.id}>
                                                    <TableCell>{personagem.nome}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {/* Botão para salvar personagens da HQ */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSavePersonagens}
                                    sx={{ mt: 2 }}
                                    fullWidth
                                >
                                    Salvar Personagens da HQ
                                </Button>
                                
                            </AccordionDetails>
                        </Accordion>
                    )}

                    {/* Accordion de Edições */}
                    {hqId && (
                        <Accordion expanded={expandedEdicoes} onChange={() => setExpandedEdicoes(!expandedEdicoes)}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>Cadastrar as Edições</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box
                                    component="form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddEdicao();
                                    }}
                                    noValidate
                                    sx={{ mb: 2 }}
                                >
                                    <TextField
                                        label="Número"
                                        variant="outlined"
                                        fullWidth
                                        value={numero}
                                        onChange={(e) => setNumero(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="Título"
                                        variant="outlined"
                                        fullWidth
                                        value={tituloEdicao}
                                        onChange={(e) => setTituloEdicao(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="Título Original"
                                        variant="outlined"
                                        fullWidth
                                        value={tituloOriginalEdicao}
                                        onChange={(e) => setTituloOriginalEdicao(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel>Idioma</InputLabel>
                                        <Select
                                            value={idioma}
                                            onChange={(e) => setIdioma(e.target.value)}
                                            label="Idioma"
                                        >
                                            {IDIOMA.map((idioma) => (
                                                <MenuItem key={idioma.value} value={idioma.value}>
                                                    {idioma.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        label="Sinopse"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={sinopse}
                                        onChange={(e) => setSinopse(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="Capa (Base64)"
                                        variant="outlined"
                                        fullWidth
                                        value={capa}
                                        onChange={(e) => setCapa(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        {selectedEdicao ? 'Atualizar Edição' : 'Adicionar Edição'}
                                    </Button>
                                </Box>
                                {/* Tabela de Edições */}
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Número</TableCell>
                                                <TableCell>Título</TableCell>
                                                <TableCell>Título Original</TableCell>
                                                <TableCell>Idioma</TableCell>
                                                <TableCell>Sinopse</TableCell>
                                                <TableCell>Capa</TableCell>
                                                <TableCell>Ação</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {(Array.isArray(edicoes) ? edicoes : []).map((edicao) => (
                                                <TableRow key={edicao.id}>
                                                    <TableCell>{edicao.numero}</TableCell>
                                                    <TableCell>{edicao.titulo}</TableCell>
                                                    <TableCell>{edicao.tituloOriginal}</TableCell>
                                                    <TableCell>{edicao.idioma}</TableCell>
                                                    <TableCell>{edicao.sinopse}</TableCell>
                                                    <TableCell>
                                                        <img src={`data:image/png;base64,${edicao.capa}`} alt="Capa" style={{ maxWidth: 100 }} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleEditEdicao(edicao)}
                                                            sx={{ mr: 1 }}
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleDeleteEdicao(edicao.id)}
                                                        >
                                                            Excluir
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </AccordionDetails>
                        </Accordion>
                    )}
                </ThemeProvider>
            </Box>
        </Container>
    );
};

export default HQCadastro;
