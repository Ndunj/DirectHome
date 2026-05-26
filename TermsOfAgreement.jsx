import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Users, CreditCard, AlertCircle, ChevronRight, Lock, FileText } from 'lucide-react';

const TermsOfAgreement = () => {
    return (
        <div style={{ padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{
                        background: 'rgba(236, 72, 153, 0.1)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        border: '1px solid rgba(236, 72, 153, 0.2)'
                    }}>
                        <Scale size={40} color="#ec4899" />
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff 0%, #f9a8d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Terms of Agreement
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Last updated: January 2026. Please read these terms carefully before using DirectHome.
                    </p>
                </div>

                <div className="glass-card" style={{ padding: '3rem', marginBottom: '2rem' }}>
                    <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h2>
                            <p>By accessing or using DirectHome ("the Platform", "we", "us", or "our"), you agree to be bound by these Terms of Agreement ("Terms"). If you do not agree to these Terms, you may not use our services. We reserve the right to modify these Terms at any time, and continued use of the Platform constitutes acceptance of updated Terms.</p>
                        </section>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2. Role of DirectHome</h2>
                            <p>DirectHome provides a peer-to-peer online marketplace for buyers, sellers, landlords, and tenants to connect. <strong>DirectHome is not a real estate broker, agent, or property manager.</strong> We do not represent any party in a transaction, nor do we guarantee the condition, legality, or title of any properties listed.</p>
                        </section>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>3. Eligibility and Account Registration</h2>
                            <p>You must be at least 18 years old and capable of forming a binding contract to use DirectHome. You agree to provide accurate, current, and complete information during registration. You are responsible for all activities that occur under your account.</p>
                        </section>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>4. Property Listings and Content</h2>
                            <p>Sellers and landlords are solely responsible for the accuracy of their listings. By listing a property, you declare that you have the legal right and authority to sell or lease it.</p>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                                <li><strong>Title Verification:</strong> Users are responsible for verifying property titles via the relevant State Land Registry (e.g., AGIS for Abuja, Lagos State Land Registry). A valid Certificate of Occupancy (C of O) or equivalent legal title is strictly required for listings.</li>
                                <li><strong>Compliance:</strong> All transactions are governed by the Land Use Act of 1978 and require mandatory state consent for legal transfer.</li>
                            </ul>
                        </section>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>5. Fees, Subscriptions, and Payments</h2>
                            <p>DirectHome may charge subscription fees for additional listings or feature access, as well as a success-based closing commission (e.g., 1% of final sale price) for transactions facilitated by the platform.</p>
                            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', marginBottom: '0.5rem' }}>
                                    <AlertCircle size={20} />
                                    <strong>CRITICAL PAYMENT WARNING</strong>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>DirectHome utilizes <strong>Flutterwave</strong> as its prescribed and only secure payment processing partner. <strong>Any payment transaction carried out outside the app's prescribed Flutterwave system is strictly at your own risk.</strong> DirectHome will not be liable or responsible for any damages done, financial losses, or fraud committed in the process.</p>
                            </div>
                        </section>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>6. Prohibited Activities</h2>
                            <p>Users may not use DirectHome to:</p>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                                <li>Post false, misleading, or fraudulent property listings.</li>
                                <li>Conduct scams, money laundering, or any illegal activities.</li>
                                <li>Attempt to bypass the platform's messaging or payment systems.</li>
                                <li>Scrape or copy data from the platform without authorization.</li>
                            </ul>
                        </section>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>7. Disclaimers and Limitations of Liability</h2>
                            <p>THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. DirectHome disclaims all warranties, express or implied, including fitness for a particular purpose. In no event shall DirectHome be liable for any direct, indirect, incidental, or consequential damages arising from property transactions, interactions between users, or use of the platform. Your interactions with other users are solely at your own risk.</p>
                        </section>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>8. Indemnification</h2>
                            <p>You agree to indemnify and hold DirectHome, its affiliates, and employees harmless from any claims, losses, or damages, including legal fees, resulting from your use of the platform, your violation of these Terms, or your transactions with other users.</p>
                        </section>

                        <section style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>9. Dispute Resolution and Governing Law</h2>
                            <p>These Terms shall be governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms or use of the Platform must be resolved through amicable negotiation or, failing that, binding arbitration in Nigeria, in accordance with the Arbitration and Conciliation Act.</p>
                        </section>

                        <section>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>10. Termination</h2>
                            <p>DirectHome reserves the right to suspend or terminate your account at any time, without notice, if we suspect you have violated these Terms, engaged in fraudulent behavior, or for any other reason deemed necessary to protect the platform and its users.</p>
                        </section>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Questions about our terms? Reach out to <a href="mailto:legal@directhome.com" style={{ color: '#ec4899', textDecoration: 'none' }}>legal@directhome.com</a>
                    </p>
                </div>
            </motion.div >
        </div >
    );
};

export default TermsOfAgreement;
