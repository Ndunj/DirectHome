import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, FileText, ChevronRight, Fingerprint, RefreshCw, Trash2, Database, Info } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                        <Shield size={40} color="var(--primary)" />
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Privacy Policy
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Last updated: January 2026. This policy is GDPR and CCPA compliant.
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                                <Eye size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>1. Information We Collect</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1rem' }}>
                            In compliance with GDPR and CCPA, we collect information that you provides directly to us:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <ChevronRight size={18} style={{ marginTop: '0.2rem', color: 'var(--primary)' }} />
                                <span><strong>Identifiers:</strong> Name, email address, phone number, and account credentials.</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <ChevronRight size={18} style={{ marginTop: '0.2rem', color: 'var(--primary)' }} />
                                <span><strong>Commercial Information:</strong> Property listings, pricing, and transaction history.</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <ChevronRight size={18} style={{ marginTop: '0.2rem', color: 'var(--primary)' }} />
                                <span><strong>Internet Activity:</strong> IP address, browser type, and interaction with our platform via cookies.</span>
                            </li>
                        </ul>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                                <Fingerprint size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>2. Your Data Rights</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                            <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><RefreshCw size={16} /> GDPR Rights</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>European residents have the right to access, rectify, or erase their personal data, and the right to data portability.</p>
                            </div>
                            <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} /> CCPA Rights</h4>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>California residents have the right to know what personal information is collected and to opt-out of its sale (DirectHome does not sell your data).</p>
                            </div>
                        </div>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                                <Database size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>3. Data Retention & Storage</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            We retain your personal information only for as long as necessary to provide our services and comply with legal obligations. Financial transaction data is kept for a minimum of 7 years as required by tax law. Account information is deleted within 30 days of a verified account closure request.
                        </p>
                    </section>

                    <section style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                                <Info size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>4. Cookies & Tracking</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            We use essential cookies for authentication and performance. Third-party analytics cookies are only used if you consent via our cookie banner. You can manage your preferences in your browser settings or via our dedicated Cookie Settings portal.
                        </p>
                    </section>

                    <section>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                                <Trash2 size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>5. Children's Privacy</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            Our services are not intended for children under 18. We do not knowingly collect information from minors. If we discover a child's data has been collected, it will be immediately purged from our systems.
                        </p>
                    </section>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        To exercise your data rights or for further inquiries, please email <a href="mailto:privacy@directhome.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>privacy@directhome.com</a>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default PrivacyPolicy;
