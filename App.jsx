import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PropertyDetail from './pages/PropertyDetail';
import Pricing from './pages/Pricing';
import ListProperty from './pages/ListProperty';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import ForgotPassword from './pages/ForgotPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfAgreement from './pages/TermsOfAgreement';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-main">
                    <Navbar />
                    <main style={{ minHeight: 'calc(100vh - 100px)' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/list-property" element={<ListProperty />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms-of-agreement" element={<TermsOfAgreement />} />
                            <Route path="/property/:id" element={<PropertyDetail />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                    <footer style={{
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        borderTop: '1px solid var(--border-color)',
                        marginTop: '4rem',
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem'
                    }}>
                        <p>&copy; 2026 DirectHome. All rights reserved.</p>
                        <p style={{ marginTop: '0.5rem' }}>
                            <Link to="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', marginRight: '1rem' }}>Privacy Policy</Link>
                            <span style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>|</span>
                            <Link to="/terms-of-agreement" style={{ color: 'var(--text-secondary)', textDecoration: 'none', margin: '0 1rem' }}>Terms of Agreement</Link>
                            <span style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>|</span>
                            <span style={{ marginLeft: '1rem' }}>Peer-to-Peer Real Estate Marketplace</span>
                        </p>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
