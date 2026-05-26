import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { userProperties } = useAuth();
    const [search, setSearch] = React.useState('');
    const [filterType, setFilterType] = React.useState('All');

    // Combine static properties with dynamic user properties
    const allProperties = [...properties, ...userProperties];

    const filteredProperties = allProperties.filter(p => {
        // Expiration Logic: Static properties from 'properties' don't have expiryDate
        // Dynamic properties from userProperties have expiryDate
        const isExpired = p.expiryDate && p.expiryDate < Date.now();
        if (isExpired) return false;

        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.address.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'All' || p.type === filterType;
        return matchesSearch && matchesType;
    });

    const types = ['All', 'House', 'Condo', 'Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Land', 'Commercial'];

    return (
        <div style={{ padding: '2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: '3.5rem', marginBottom: '1rem' }}
                >
                    Find Your <span style={{ color: 'var(--primary)' }}>Dream Home</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}
                >
                    Connect directly with sellers. No agents. No commissions. Just transparency.
                </motion.p>
            </header>

            <div className="glass-card" style={{
                padding: '2rem',
                marginBottom: '4rem',
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
                    <Search color="var(--text-secondary)" size={18} style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }} />
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Search by title or location..."
                        style={{ paddingLeft: '3rem' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`btn ${filterType === type ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {filteredProperties.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    <p fontSize="1.25rem">No properties found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
