// CSS:
import './app.css';
// React:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout:
import Layout from './pages/Layout/Layout';
// Components:
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// Pages:
import Home from './pages/Home/Home';
import ProviderGames from './pages/Casino/ProviderGames';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Play from './pages/Play/Play';


function App() {


  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          
          <Route path="/" element={<Home />} />
          <Route path="/casino/provider/:providerCode" element={<ProviderGames />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>} />
        </Route>

        <Route path="/play/*" element={
          <ProtectedRoute>
            <Play />
          </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;