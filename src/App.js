import React from 'react';
import './App.css';
import PdfGeneratorForm from './components/PdfGeneratorForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF Generator</h1>
      </header>
      <main>
        <PdfGeneratorForm />
      </main>
    </div>
  );
}

export default App;
