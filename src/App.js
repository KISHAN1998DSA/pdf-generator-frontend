import React from 'react';
import './App.css';
import PdfGeneratorForm from './components/PdfGeneratorForm';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF Generator</h1>
      </header>
      <main>
        <PdfGeneratorForm />
      </main>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
