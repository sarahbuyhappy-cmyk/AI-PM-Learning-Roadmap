import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Assessment from './pages/Assessment';
import Toolbox from './pages/Toolbox';
import Mentor from './pages/Mentor';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/toolbox" element={<Toolbox />} />
            <Route path="/mentor" element={<Mentor />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
};

export default App;