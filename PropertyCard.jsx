import React from 'react';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PropertyCard = ({ property }) => {
    const { user, toggleFavorite } = useAuth();
    const isFavorited = user?.favorites?.includes(property.id);

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glass-card"
            style={{ overflow: 'hidden', textAlign: 'left', position: 'relative' }}
        >
            <div style={{ height: '200px', width: '100%', position: 'relative' }}>
                <img
                    src={property.image}
                    alt={property.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--primary)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                }}>
                    {property.type}
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(property.id);
                    }}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: isFavorited ? 'var(--secondary)' : 'rgba(0,0,0,0.5)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        color: 'white',
                        zIndex: 10
                    }}
                >
                    <Heart size={20} fill={isFavorited ? 'white' : 'transparent'} />
                </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{property.title}</h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    <MapPin size={16} /> {property.address}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Bed size={18} /> {property.beds} Beds</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Bath size={18} /> {property.baths} Baths</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Maximize size={18} /> {property.sqft} sqft</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {property.currency === 'NGN' ? '₦' : '$'}{property.price.toLocaleString()}
                    </span>
                    <Link to={`/property/${property.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
