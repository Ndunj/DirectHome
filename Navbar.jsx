import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User, LogOut, PlusCircle, Search, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-card" style={{
            margin: '1rem',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: '1rem',
            zIndex: 1000
        }}>
            <Link to="/" style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                textDecoration: 'none',
                fontFamily: 'Outfit'
            }}>
                DirectHome
            </Link>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" className="nav-link" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Home size={20} /> Home
                </Link>
                <Link to="/pricing" className="nav-link" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Search size={20} /> Pricing
                </Link>

                {user ? (
                    <>
                        <Link to="/favorites" className="nav-link" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Heart size={20} /> Favorites
                        </Link>
                        <Link to="/list-property" className="nav-link" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <PlusCircle size={20} /> Sell
                        </Link>
                        <Link to="/dashboard" className="nav-link" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={20} /> Dashboard
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Hi, {user.name}</span>
                            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" className="btn btn-secondary" style={{ textDecoration: 'none' }}>Login</Link>
                        <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
