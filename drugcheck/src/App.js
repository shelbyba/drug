import React from 'react';
import Header from './components/Header.js';
import InputFields from './components/InputFields.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <InputFields /> {/**/}
      {/* Footer */}
      <footer>
        <p className="footer-name">
          © {new Date().getFullYear()} <span className="symbol">⚕️</span>SheblBader<span className="symbol">⚕️</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
