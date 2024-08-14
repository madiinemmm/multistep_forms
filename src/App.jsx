import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Personal from './pages/Personal';
import Select from './pages/Select';
import PickAdd from './pages/PickAdd';
import Finish from './pages/Finish';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/personal" />} /> 
        <Route path="/personal" element={<Personal />} />
        <Route path="/select" element={<Select />} />
        <Route path="/pick-add" element={<PickAdd />} />
        <Route path="/finish" element={<Finish />} />
        <Route path="*" element={<Navigate to="/personal" />} /> 
      </Routes>
    </Router>
  );
}

export default App;
