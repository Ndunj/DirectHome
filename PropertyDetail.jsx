import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, Bath, Maximize, MapPin, ShieldCheck, Mail, Phone, ArrowLeft, CreditCard, Heart, MessageCircle, Info } from 'lucide-react';
import { properties } from '../data/properties';
import { useAuth } from '../context/AuthContext';

const PropertyDetail = () => {
    const { id } = useParams();
    const { user, userProperties, toggleFavorite } = useAuth();
    const navigate = useNavigate();
    const [showCheckout, setShowCheckout] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const property = properties.find(p => p.id === parseInt(id)) || userProperties?.find(p => p.id === parseInt(id));
    const isFavorited = user?.favorites?.includes(property?.id);
    const isExpired = property?.expiryDate && property?.expiryDate < Date.now();

    if (!property) return <div style={{ padding: '4rem', textAlign: 'center' }}>Property not found</div>;

    const serviceFee = property.price * 0.01;
    const total = property.price + serviceFee;
    const currencySymbol = property.currency === 'NGN' ? '₦' : '$';

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    <ArrowLeft size={20} /> Back to Listings
                </button>
                <button
                    onClick={() => toggleFavorite(property.id)}
                    className="btn btn-secondary"
                    style={{
                        color: isFavorited ? 'var(--secondary)' : 'var(--text-primary)',
                        borderColor: isFavorited ? 'var(--secondary)' : 'var(--border-color)'
                    }}
                >
                    <Heart size={20} fill={isFavorited ? 'var(--secondary)' : 'transparent'} />
                    {isFavorited ? 'Saved' : 'Save to Favorites'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <img
                        src={property.image}
                        alt={property.title}
                        style={{ width: '100%', borderRadius: 'var(--radius-lg)', height: '500px', objectFit: 'cover', marginBottom: '2rem' }}
                    />
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{property.title}</h1>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                        <MapPin size={20} /> {property.address}
                    </p>

                    <div style={{ display: 'flex', gap: '2rem', padding: '2rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Bedrooms</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bed size={24} /> {property.beds}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Bathrooms</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bath size={24} /> {property.baths}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Area</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Maximize size={24} /> {property.sqft} sqft</div>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '1rem' }}>About this Property</h3>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                        This stunning {property.type} offers a perfect blend of modern luxury and comfort. Located in a prime neighborhood,
                        it features spacious rooms, high-end finishes, and breath-taking views. Direct communication with the seller
                        ensures a transparent and efficient transaction process without the middleman.
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '7rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                            {currencySymbol}{property.price.toLocaleString()}
                        </div>

                        {!user ? (
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(30, 144, 255, 0.05)', borderRadius: 'var(--radius-md)' }}>
                                <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Sign in to contact the seller or start the purchase process</p>
                                <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Sign In to Continue</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Seller Information</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <ShieldCheck size={16} color="#10b981" /> Verified Seller
                                    </div>
                                    <div style={{ fontWeight: '500' }}>{property.seller.name}</div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <button className="btn btn-secondary" style={{ justifyContent: 'center' }} onClick={() => setShowChat(true)}><MessageCircle size={20} /> Chat</button>
                                    <button className="btn btn-secondary" style={{ justifyContent: 'center' }}><Phone size={20} /> Call</button>
                                </div>

                                {isExpired ? (
                                    <div style={{
                                        padding: '1.5rem',
                                        background: 'rgba(239, 68, 68, 0.1)',
                                        borderRadius: 'var(--radius-md)',
                                        color: '#ef4444',
                                        textAlign: 'center',
                                        border: '1px solid #ef444466'
                                    }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0' }}>Listing Expired</h4>
                                        <div style={{ fontSize: '0.85rem' }}>This property is no longer active and cannot be purchased.</div>
                                    </div>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
                                        onClick={() => setShowCheckout(true)}
                                    >
                                        Purchase Now
                                    </button>
                                )}
                                <div style={{
                                    background: 'rgba(30, 144, 255, 0.05)',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.8rem',
                                    color: 'var(--text-secondary)',
                                    display: 'flex',
                                    alignItems: 'start',
                                    gap: '0.5rem',
                                    marginTop: '0.5rem'
                                }}>
                                    <Info size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                                    <p>A transparent <strong>1% platform service fee</strong> applies to this transaction for escrow and legal protection.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {showChat && (
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
                            background: 'rgba(0,0,0,0.8)',
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
                            style={{ padding: '2rem', maxWidth: '400px', width: '100%', height: '500px', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                        {property.seller.name[0]}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{property.seller.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#10b981' }}>Online</div>
                                    </div>
                                </div>
                                <button onClick={() => setShowChat(false)} className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }}>✕</button>
                            </div>

                            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '1rem 1rem 1rem 0', alignSelf: 'flex-start', maxWidth: '80%', fontSize: '0.9rem' }}>
                                    Hello! I'm interested in your property "**{property.title}**". Is it still available?
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Sent by you</div>
                                </div>
                                <div style={{ background: 'var(--primary)', padding: '0.75rem 1rem', borderRadius: '1rem 1rem 0 1rem', alignSelf: 'flex-end', maxWidth: '80%', fontSize: '0.9rem', color: 'white' }}>
                                    Hi! Yes, it is still available. Would you like to schedule a viewing?
                                    <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '0.25rem' }}>Just now</div>
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <input type="text" className="form-input" placeholder="Type a message..." style={{ flex: 1 }} />
                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Send</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCheckout && (
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
                            background: 'rgba(0,0,0,0.8)',
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
                            style={{ padding: '3rem', maxWidth: '500px', width: '100%' }}
                        >
                            <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>Secure Checkout</h2>

                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span>Property Price</span>
                                    <span style={{ fontWeight: 'bold' }}>{currencySymbol}{property.price.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--primary)' }}>
                                    <span>Service Fee (1%)</span>
                                    <span style={{ fontWeight: 'bold' }}>+{currencySymbol}{serviceFee.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                    <span>Total Amount</span>
                                    <span>{currencySymbol}{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Card Number</label>
                                <div style={{ position: 'relative' }}>
                                    <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input type="text" className="form-input" placeholder="•••• •••• •••• ••••" style={{ paddingLeft: '3rem' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowCheckout(false)}>Cancel</button>
                                <button
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                    onClick={() => {
                                        alert(`Transaction Simulation Successful! Total Paid: ${currencySymbol}${total.toLocaleString()}`);
                                        setShowCheckout(false);
                                        navigate('/');
                                    }}
                                >
                                    Pay Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PropertyDetail;
