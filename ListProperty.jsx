import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Shield, CreditCard, Info, CheckCircle } from 'lucide-react';

const ListProperty = () => {
    const { user, addProperty } = useAuth();
    const navigate = useNavigate();
    const [showPayModal, setShowPayModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        address: '',
        type: 'House',
        beds: '',
        baths: '',
        sqft: '',
        hasCofO: false,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' // Default image
    });

    const [region, setRegion] = useState('Global');
    const [locationData, setLocationData] = useState({ country: '', continent: '' });

    React.useEffect(() => {
        fetch('https://ipwho.is/')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setLocationData({
                        country: data.country,
                        continent: data.continent
                    });
                }
            })
            .catch(err => console.error("Could not fetch location API", err));
    }, []);
    const listingCount = user?.propertyCount || 0;
    const isPremium = user?.isPremium || false;
    const isFree = isPremium || listingCount < 2;

    const getFees = (reg) => {
        if (reg === 'Nigeria') return { amount: 10000, currency: 'NGN' };
        if (reg === 'Other Africa') return { amount: 7.50, currency: 'USD', subtext: '(Approx. NGN 10,000 equivalent)' };
        return { amount: 20, currency: 'USD' };
    };

    const fees = getFees(region);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFree) {
            handleCompleteListing();
        } else {
            setShowPayModal(true);
        }
    };

    const handleCompleteListing = () => {
        addProperty({
            ...formData,
            price: parseFloat(formData.price),
            beds: parseInt(formData.beds),
            baths: parseInt(formData.baths),
            sqft: parseInt(formData.sqft),
            region
        });
        alert('Listing Published Successfully! It will be active for 30 days.');
        navigate('/dashboard');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>List Your <span style={{ color: 'var(--primary)' }}>Property</span></h1>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: isFree ? 'rgba(16, 185, 129, 0.1)' : 'rgba(30, 144, 255, 0.1)',
                    borderRadius: 'var(--radius-md)',
                    color: isFree ? '#10b981' : 'var(--primary)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                }}>
                    {isPremium ? (
                        <><CheckCircle size={18} /> Premium Unlimited Listing Mode</>
                    ) : isFree ? (
                        <><CheckCircle size={18} /> You have {2 - listingCount} free listings left</>
                    ) : (
                        <><Info size={18} /> Standard subscription fee applies for this listing</>
                    )}
                </div>
            </header>

            <div className="glass-card" style={{ padding: '3rem' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>Property Title</label>
                            <input type="text" name="title" className="form-input" placeholder="e.g. Luxury Beachfront Villa" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Property Region</span>
                                {locationData.country && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                                        Detected: {locationData.country} ({locationData.continent})
                                    </span>
                                )}
                            </label>
                            <select
                                className="form-input"
                                value={region}
                                onChange={(e) => {
                                    const newRegion = e.target.value;

                                    if ((newRegion === 'Nigeria' || newRegion === 'Other Africa') && locationData.continent && locationData.continent !== 'Africa') {
                                        alert(`Security Check: We detected your location as ${locationData.country} (${locationData.continent}). You must be located within Africa to use African region pricing. Global pricing applies.`);
                                        setRegion('Global');
                                        setFormData(prev => ({ ...prev, currency: 'USD' }));
                                        return;
                                    }

                                    setRegion(newRegion);
                                    setFormData(prev => ({
                                        ...prev,
                                        currency: newRegion === 'Nigeria' ? 'NGN' : 'USD'
                                    }));
                                }}
                            >
                                <option value="Global">Global (America, Asia, Europe)</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Other Africa">Other African Countries</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>Price ({formData.currency})</label>
                            <input type="number" name="price" className="form-input" placeholder={formData.currency === 'NGN' ? "150000000" : "850000"} required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Property Type</label>
                            <select name="type" className="form-input" onChange={handleChange}>
                                <option>House</option>
                                <option>Condo</option>
                                <option>Apartment</option>
                                <option>Villa</option>
                                <option>Penthouse</option>
                                <option>Townhouse</option>
                                <option>Land</option>
                                <option>Commercial</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Address</label>
                        <input type="text" name="address" className="form-input" placeholder="Full street address" required onChange={handleChange} />
                    </div>

                    <div className="input-group" style={{ marginBottom: '2rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem',
                            padding: '1.25rem',
                            background: 'rgba(30, 144, 255, 0.05)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(30, 144, 255, 0.2)',
                            marginBottom: '1rem'
                        }}>
                            <input
                                type="checkbox"
                                name="hasCofO"
                                id="hasCofO"
                                required
                                style={{ marginTop: '0.3rem', transform: 'scale(1.2)' }}
                                onChange={(e) => setFormData({ ...formData, hasCofO: e.target.checked })}
                            />
                            <label htmlFor="hasCofO" style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                                <strong>Declaration of Ownership:</strong> I certify that I possess a valid **Certificate of Occupancy (C of O)** for this property. I understand that listing a property without a valid title is a violation of our Terms of Service and may lead to immediate account suspension.
                            </label>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem',
                            padding: '1.25rem',
                            background: 'rgba(239, 68, 68, 0.05)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(239, 68, 68, 0.2)'
                        }}>
                            <input
                                type="checkbox"
                                name="agreeTermsList"
                                id="agreeTermsList"
                                required
                                style={{ marginTop: '0.3rem', transform: 'scale(1.2)', flexShrink: 0 }}
                            />
                            <label htmlFor="agreeTermsList" style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer', lineHeight: '1.6' }}>
                                <strong>Terms of Agreement:</strong> I agree to the platform's Terms of Service. <br /><span style={{ color: '#ef4444', fontWeight: 'bold' }}>Warning:</span> Any payment transaction carried out outside the app's prescribed Flutterwave system is strictly at your own risk. DirectHome will not be liable or responsible for any damages done or fraud committed in the process.
                            </label>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                        <div className="input-group">
                            <label>Beds</label>
                            <input type="number" name="beds" className="form-input" placeholder="3" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Baths</label>
                            <input type="number" name="baths" className="form-input" placeholder="2" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Sqft</label>
                            <input type="number" name="sqft" className="form-input" placeholder="2000" required onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem' }}>
                        {isFree ? 'Publish Listing (Free)' : `Pay Subscription & Publish (${fees.currency === 'NGN' ? 'NGN ' : '$'}${fees.amount} / month)`}
                    </button>
                </form>
            </div>

            <AnimatePresence>
                {showPayModal && (
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
                            style={{ padding: '3rem', maxWidth: '500px', width: '100%' }}
                        >
                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ background: 'var(--primary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                    <Shield color="white" size={30} />
                                </div>
                                <h2>Monthly Listing Subscription</h2>
                                <p style={{ color: 'var(--text-secondary)' }}>You've used your 2 free listings. For the <strong>{region}</strong> region, a recurring monthly subscription is required for additional listings.</p>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span>Monthly Fee</span>
                                    <span style={{ fontWeight: 'bold' }}>{fees.currency === 'NGN' ? 'NGN ' : '$'}{fees.amount.toLocaleString()} / month</span>
                                </div>
                                {fees.subtext && (
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textAlign: 'right' }}>
                                        {fees.subtext}
                                    </div>
                                )}
                            </div>

                            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                                <label>Card Number</label>
                                <div style={{ position: 'relative' }}>
                                    <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input type="text" className="form-input" placeholder="•••• •••• •••• ••••" style={{ paddingLeft: '3rem' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                <input
                                    type="checkbox"
                                    id="agreePaymentTerms"
                                    required
                                    style={{ marginTop: '0.3rem', width: '16px', height: '16px', accentColor: 'var(--primary)', flexShrink: 0 }}
                                />
                                <label htmlFor="agreePaymentTerms" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0, cursor: 'pointer' }}>
                                    I agree to the <Link to="/terms-of-agreement" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Terms of Agreement</Link>.
                                    <br /><span style={{ color: '#ef4444', fontWeight: 'bold' }}>Warning:</span> Any payment transaction carried out outside the app's prescribed Flutterwave system is strictly at your own risk. DirectHome will not be liable or responsible for any damages done or fraud committed in the process.
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowPayModal(false)}>Cancel</button>
                                <button
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                    onClick={handleCompleteListing}
                                >
                                    Pay & List
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ListProperty;
