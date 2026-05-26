import React from 'react';
import { useAuth } from '../context/AuthContext';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import { Heart, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const { user } = useAuth();

    // Filter properties to find favorites
    const favoriteProperties = properties.filter(p => user?.favorites?.includes(p.id));

    if (!user) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1rem' }}>Please log in to view favorites</h2>
                <Link to="/login" className="btn btn-primary">Sign In</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{
                    display: 'inline-flex',
                    background: 'rgba(236, 72, 153, 0.1)',
                    padding: '1rem',
                    borderRadius: '50%',
                    marginBottom: '1rem',
                    color: 'var(--secondary)'
                }}>
                    <Heart size={32} fill="var(--secondary)" />
                </div>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>My <span style={{ color: 'var(--secondary)' }}>Favorites</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>
                    All the properties you love, in one place.
                </p>
            </header>

            {favoriteProperties.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {favoriteProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}
                >
                    <div style={{ marginBottom: '2rem' }}>
                        <Search size={64} style={{ opacity: 0.2 }} />
                    </div>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>You haven't added any properties to your favorites yet.</p>
                    <Link to="/" className="btn btn-primary">Browse Properties</Link>
                </motion.div>
            )}
        </div>
    );
};

export default Favorites;
