import React, { useState } from 'react';
import { Check, Info, Shield, Zap, CreditCard, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const { user, subscribe } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubscribe = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setShowModal(true);
    };

    const processPayment = () => {
        if (!user) {
            navigate('/login');
            return;
        }

        const amount = 10000; // NGN 10,000 for Premium

        window.FlutterwaveCheckout({
            public_key: "FLWPUBK_TEST-SANDBOX-X", // Replace with your actual public key
            tx_ref: "DRH-" + Date.now(),
            amount: amount,
            currency: "NGN",
            payment_options: "card, banktransfer, ussd",
            customer: {
                email: user.email,
                name: user.name || user.email.split('@')[0],
            },
            customizations: {
                title: "DirectHome Premium",
                description: "Subscription for Premium Seller features",
                logo: "https://vignette.wikia.nocookie.net/logopedia/images/a/a2/Google_Antigravity_1999.png",
            },
            callback: (data) => {
                console.log("Payment successful", data);
                setIsProcessing(true);
                // In a real app, you would verify the transaction on the backend here
                // For this demo, we'll proceed after the callback
                setTimeout(() => {
                    subscribe();
                    setIsProcessing(false);
                    setShowModal(false);
                    alert('Congratulations! You are now a Premium Seller.');
                    navigate('/list-property');
                }, 1500);
            },
            onclose: () => {
                console.log("Payment modal closed");
            },
        });
    };

    const plans = [
        {
            name: "Standard Seller",
            price: "Free",
            description: "Perfect for individual sellers listing their primary residence.",
            features: [
                "Up to 2 listings for free",
                "Direct buyer communication",
                "Verified seller badge",
                "Property analytics"
            ],
            button: "Get Started",
            action: () => navigate('/list-property'),
            highlight: false
        },
        {
            name: "Premium Seller",
            price: "$20",
            subtext: "Global (Americas, Europe, Asia) / month",
            regions: [
                { name: "Nigeria", price: "NGN 10,000 / month" },
                { name: "Other Africa", price: "Approx. $7.50 / month" },
                { name: "Global", price: "$20 / month" }
            ],
            description: "For professional sellers or individuals with multiple properties.",
            features: [
                "Unlimited property listings",
                "Priority support",
                "Featured listings placement",
                "Advanced marketing tools"
            ],
            button: user?.isPremium ? "Active Plan" : "Subscribe Now",
            action: handleSubscribe,
            disabled: user?.isPremium,
            highlight: true
        }
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple, <span style={{ color: 'var(--primary)' }}>Transparent</span> Pricing</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>No hidden agent fees. No surprises.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -10 }}
                        className="glass-card"
                        style={{
                            padding: '3rem',
                            border: plan.highlight ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                            position: 'relative',
                            overflow: 'hidden',
                            opacity: plan.disabled ? 0.7 : 1
                        }}
                    >
                        {plan.highlight && (
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '-2rem',
                                background: 'var(--primary)',
                                color: 'white',
                                padding: '0.25rem 3rem',
                                transform: 'rotate(45deg)',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                MOST POPULAR
                            </div>
                        )}
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{plan.name}</h2>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{plan.price}</span>
                            {plan.subtext && <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{plan.subtext}</div>}
                            {plan.regions && (
                                <div style={{ marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                                    {plan.regions.map((reg, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>{reg.name}</span>
                                            <span style={{ fontWeight: 'bold' }}>{reg.price}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {plan.price !== "Free" && !plan.regions && <span style={{ color: 'var(--text-secondary)' }}> per user</span>}
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{plan.description}</p>

                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                            {plan.features.map((feature, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                    <div style={{
                                        background: plan.highlight ? 'rgba(30, 144, 255, 0.2)' : 'rgba(255,255,255,0.05)',
                                        borderRadius: '50%',
                                        padding: '0.25rem'
                                    }}>
                                        <Check size={16} color={plan.highlight ? 'var(--primary)' : '#10b981'} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={plan.action}
                            disabled={plan.disabled}
                        >
                            {plan.button}
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', background: 'rgba(30, 144, 255, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
                    <Zap color="var(--primary)" size={32} />
                </div>
                <h2 style={{ marginBottom: '1rem' }}>Platform Transaction Fee</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: '1.6' }}>
                    We charge a flat <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '1.25rem' }}>1% service fee</span> on every successful transaction.
                    This fee covers secure escrow, identity verification, and legal documentation support to ensure your peer-to-peer
                    transaction is safe and professional.
                    <br /><br />
                    <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>* Subscription fees are billed monthly as long as your properties are active on the platform.</span>
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <Shield size={18} color="#10b981" /> No hidden commissions
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <Info size={18} color="var(--primary)" /> Secure escrows included
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showModal && (
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
                            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Upgrade to Premium</h2>
                            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>
                                Unlock unlimited listings and featured status for only $20 / NGN 10,000.
                            </p>

                            <div className="input-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <label style={{ marginBottom: 0 }}>Card Details</label>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        {/* Visa Logo */}
                                        <svg width="30" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.156 31.068l2.676-13.626h4.356l-2.676 13.626h-4.356zm17.928-13.212c-.816-.312-2.1-.648-3.696-.648-3.624 0-6.192 1.836-6.216 4.488-.024 1.956 1.836 3.036 3.252 3.696 1.464.672 1.956 1.104 1.956 1.704 0 .912-1.152 1.344-2.208 1.344-1.488 0-2.28-.216-3.48-.72l-.48-.228-.528 3.12c.888.384 2.52.72 4.224.744 3.864 0 6.36-1.824 6.384-4.656.024-1.548-.96-2.724-3.072-3.672-1.272-.612-2.064-1.02-2.064-1.644 0-.576.672-1.176 2.136-1.176.816-.024 1.416.168 1.872.348l.216.096.504-2.976zm8.184 0h-3.36c-1.032 0-1.824.288-2.256 1.284l-6.432 12.336h4.56l.912-2.4h5.568c.132.576.516 2.4.516 2.4h4.032l-3.54-13.62zm-5.496 8.352c.312-1.344 1.512-4.152 1.512-4.152l.864 4.152h-2.376zm-26.664-8.352l-4.104 10.992-1.08-5.388c-.288-1.548-1.464-3.096-2.904-3.816l-7.008-2.316-.096.396c2.088.48 4.464 1.248 5.856 2.76 1.416 1.512 1.8 2.424 2.136 4.38h4.632l6.816-13.626h-4.248z" fill="#1A1F71" />
                                        </svg>
                                        {/* Mastercard Logo */}
                                        <svg width="30" height="20" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="7" cy="8" r="7" fill="#EB001B" />
                                            <circle cx="17" cy="8" r="7" fill="#F79E1B" />
                                            <path d="M12 1.474A7.001 7.001 0 0 1 12 14.526 7.001 7.001 0 0 1 12 1.474z" fill="#FF5F00" />
                                        </svg>
                                        {/* Verve Logo Placeholder (V) */}
                                        <div style={{
                                            width: '30px',
                                            height: '20px',
                                            background: '#ef4444',
                                            borderRadius: '2px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: '10px',
                                            fontWeight: 'bold'
                                        }}>
                                            VERVE
                                        </div>
                                    </div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input type="text" className="form-input" placeholder="•••• •••• •••• ••••" style={{ paddingLeft: '3rem' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowModal(false)} disabled={isProcessing}>
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                    onClick={processPayment}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" size={20} /> : 'Pay Now'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Pricing;
