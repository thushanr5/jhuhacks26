import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f7fafc;
`;

export default function App() {
  return (
    <Router>
      <AppContainer>
        <Sidebar />
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          {/* Add more routes as needed */}
        </Routes>
      </AppContainer>
    </Router>
  )
}