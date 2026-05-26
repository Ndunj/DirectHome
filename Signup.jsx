import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TermsOfAgreement from './TermsOfAgreement';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [hasReadTerms, setHasReadTerms] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!hasReadTerms) {
            setError('You must read and agree to the Terms of Agreement before proceeding.');
            setShowTermsModal(true);
            return;
        }
        const res = signup(formData);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ padding: '3rem', width: '100%', maxWidth: '450px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        background: 'var(--primary)',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <UserPlus color="white" size={30} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Join DirectHome today and find your next home</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && (
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#ef4444',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1.5rem',
                            fontSize: '0.875rem',
                            textAlign: 'center',
                            border: '1px solid #ef444433'
                        }}>
                            {error}
                        </div>
                    )}
                    <div className="input-group">
                        <label>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="John Doe"
                                style={{ paddingLeft: '3rem' }}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="name@company.com"
                                style={{ paddingLeft: '3rem' }}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="••••••••"
                                style={{ paddingLeft: '3rem' }}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            required
                            checked={hasReadTerms}
                            onChange={(e) => {
                                if (!hasReadTerms) {
                                    setShowTermsModal(true);
                                    e.preventDefault();
                                }
                            }}
                            style={{ marginTop: '0.3rem', width: '16px', height: '16px', accentColor: 'var(--primary)', flexShrink: 0 }}
                        />
                        <label htmlFor="agreeTerms" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0, cursor: 'pointer' }}>
                            I agree to the <span onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }} style={{ color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Agreement</span> and <Link to="/privacy" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Privacy Policy</Link>.
                            <br /><br /><span style={{ color: '#ef4444', fontWeight: 'bold' }}>Warning:</span> Any payment transaction carried out outside the app's prescribed Flutterwave system is strictly at your own risk. DirectHome will not be liable or responsible for any damages done or fraud committed in the process.
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                        Get Started
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
                </p>
            </motion.div>

            <AnimatePresence>
                {showTermsModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.85)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2000,
                            padding: '2rem'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="glass-card"
                            style={{ width: '100%', maxWidth: '900px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Please Read The Terms of Agreement</h3>
                                <button onClick={() => setShowTermsModal(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: '#000' }}>
                                <TermsOfAgreement />
                            </div>

                            <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', background: 'rgba(0,0,0,0.2)' }}>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>By clicking Accept, you confirm that you have read and agree to all terms stated above.</p>
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
                                    onClick={() => {
                                        setHasReadTerms(true);
                                        setShowTermsModal(false);
                                        setError('');
                                    }}
                                >
                                    I Have Read & Accept
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Signup;
