import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Editoras from './pages/Editoras';
import EditoraCadastro from './pages/EditoraCadastro';
import EditoraAlteracao from './pages/EditoraAlteracao';
import Personagens from './pages/Personagens'; 
import PersonagemCadastro from './pages/PersonagemCadastro';
import PersonagemAlteracao from './pages/PersonagemAlteracao';
import HQs from './pages/HQs';
import HQCadastro from './pages/HQCadastro';
import HQAlteracao from './pages/HQAlteracao';

function App() {
    return (
        <Router>
            <div>
                <Menu />
                <main>
                    <Routes>
                      {/* EDITORA */}
                        <Route path="/editoras" element={<Editoras />} />
                        <Route path="/editora-cadastro" element={<EditoraCadastro />} />
                        <Route path="/editora-alteracao/:id" element={<EditoraAlteracao />} />
                      {/* PERSONAGEM */} 
                        <Route path="/personagens" element={<Personagens />} />
                        <Route path="/personagem-cadastro" element={<PersonagemCadastro />} />
                        <Route path="/personagem-alteracao/:id" element={<PersonagemAlteracao />} />
                      {/* HQ */}
                        <Route path="/hqs" element={<HQs />} />
                        <Route path="/hq-cadastro" element={<HQCadastro />} />
                        <Route path="/hq-alteracao/:id" element={<HQAlteracao />} />
                    </Routes>
                </main>
                
                <Footer />
            </div>
        </Router>
    );
}

export default App;
