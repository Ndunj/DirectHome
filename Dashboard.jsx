import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, TrendingUp, Users, ShieldCheck, Plus, ExternalLink, Settings, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { properties } from '../data/properties';

const Dashboard = () => {
    const { user, userProperties, renewProperty } = useAuth();
    const navigate = useNavigate();
    const [showRenewModal, setShowRenewModal] = React.useState(null);

    // Filter properties to find those belonging to the current user
    const myProperties = userProperties.filter(p => p.ownerEmail === user?.email);

    const stats = [
        { label: "Active Listings", value: myProperties.filter(p => !p.expiryDate || p.expiryDate > Date.now()).length, icon: <Building2 />, color: "var(--primary)" },
        { label: "Total Views", value: "1,284", icon: <TrendingUp />, color: "#10b981" },
        { label: "Inquiries", value: "12", icon: <Users />, color: "#f59e0b" },
    ];

    const handleRenew = (propertyId) => {
        renewProperty(propertyId);
        setShowRenewModal(null);
        alert('Listing Renewed for another 30 days!');
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome, {user?.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                            background: user?.isPremium ? 'rgba(30, 144, 255, 0.1)' : 'rgba(255,255,255,0.05)',
                            color: user?.isPremium ? 'var(--primary)' : 'var(--text-secondary)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '100px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}>
                            {user?.isPremium && <ShieldCheck size={14} />}
                            {user?.isPremium ? 'PREMIUM SELLER' : 'STANDARD SELLER'}
                        </span>
                        {!user?.isPremium && (
                            <Link to="/pricing" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                                Upgrade Plan
                            </Link>
                        )}
                    </div>
                </div>
                <button onClick={() => navigate('/list-property')} className="btn btn-primary">
                    <Plus size={20} /> List New Property
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="glass-card"
                        style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                    >
                        <div style={{
                            background: `${stat.color}20`,
                            color: stat.color,
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>My Listings</h2>
                        <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none' }}>View All Properties</Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {myProperties.length > 0 ? myProperties.map((prop, i) => {
                            const isExpired = prop.expiryDate && prop.expiryDate < Date.now();
                            return (
                                <div key={i} className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center', opacity: isExpired ? 0.7 : 1 }}>
                                    <img src={prop.image} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                            <h4 style={{ margin: 0 }}>{prop.title}</h4>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '100px',
                                                background: isExpired ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                color: isExpired ? '#ef4444' : '#10b981',
                                                fontWeight: 'bold'
                                            }}>
                                                {isExpired ? 'EXPIRED (HIDDEN)' : 'ACTIVE'}
                                            </span>
                                        </div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{prop.address}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                            Expiry: {new Date(prop.expiryDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{prop.currency === 'NGN' ? '₦' : '$'}{prop.price.toLocaleString()}</div>
                                        {!isExpired && (
                                            <Link to={`/property/${prop.id}`} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                View <ExternalLink size={12} />
                                            </Link>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {isExpired ? (
                                            <button
                                                className="btn btn-primary"
                                                style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                                                onClick={() => setShowRenewModal(prop)}
                                            >
                                                Renew
                                            </button>
                                        ) : (
                                            <button className="btn btn-secondary" style={{ padding: '0.5rem' }}><Settings size={18} /></button>
                                        )}
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                <p>You haven't listed any properties yet.</p>
                                <button onClick={() => navigate('/list-property')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Create First Listing</button>
                            </div>
                        )}
                    </div>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Activity</h2>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ background: 'rgba(30, 144, 255, 0.1)', padding: '0.5rem', borderRadius: '50%', height: 'fit-content' }}>
                                    <Clock size={16} color="var(--primary)" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem' }}>Account fully setup</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Just now</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <AnimatePresence>
                {showRenewModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '2rem' }}
                    >
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="glass-card" style={{ padding: '3rem', maxWidth: '500px', width: '100%' }}>
                            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Renew Listing</h2>
                            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                                Renew "**{showRenewModal.title}**" for another 30 days.
                            </p>

                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Renewal Fee</span>
                                    <span style={{ fontWeight: 'bold' }}>$20.00</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowRenewModal(null)}>Cancel</button>
                                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => handleRenew(showRenewModal.id)}>Pay & Renew</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
