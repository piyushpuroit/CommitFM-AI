import React, { useState } from "react";

const Footer = () => {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    return (
        <footer className="py-6 text-slate-500 text-xs border-t border-indigo-700/20 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
            <div>
                © {new Date().getFullYear()} CommitFM. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <button 
                    onClick={() => setActiveModal("privacy")}
                    className="hover:text-brand-primary transition duration-150 cursor-pointer"
                >
                    Privacy Policy
                </button>
                <button 
                    onClick={() => setActiveModal("terms")}
                    className="hover:text-brand-primary transition duration-150 cursor-pointer"
                >
                    Terms of Service
                </button>
                <button 
                    onClick={() => setActiveModal("permissions")}
                    className="hover:text-brand-primary transition duration-150 cursor-pointer"
                >
                    GitHub Data & Permissions
                </button>
                <button 
                    onClick={() => setActiveModal("support")}
                    className="hover:text-brand-primary transition duration-150 cursor-pointer"
                >
                    Contact & Support
                </button>
            </div>

            {/* Modal Overlay */}
            {activeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-left">
                    <div className="bg-brand-surface border border-white/10 rounded-premium max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                {activeModal === "privacy" && "Privacy Policy"}
                                {activeModal === "terms" && "Terms of Service"}
                                {activeModal === "permissions" && "GitHub Data & Permissions"}
                                {activeModal === "support" && "Contact & Support"}
                            </h3>
                            <button 
                                onClick={closeModal}
                                className="text-brand-muted hover:text-white transition cursor-pointer text-base font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 overflow-y-auto text-xs text-brand-muted space-y-4 leading-relaxed max-h-[60vh]">
                            {activeModal === "privacy" && (
                                <>
                                    <p>
                                        At CommitFM, we respect your privacy and are committed to protecting it. This Privacy Policy explains our data practices.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">1. GitHub Data Accessed</h4>
                                    <p>
                                        We access your GitHub profile (username, avatar, bio) and details about your repositories (languages, branch list, commit dates, PR/Issue metadata) via the official GitHub API.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">2. Why It Is Accessed</h4>
                                    <p>
                                        The data is used solely to generate developer intelligence profiles, codebase health insights, and career telemetry diagnostics dynamically.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">3. What is Stored</h4>
                                    <p>
                                        <strong>We do not store your repository source code or credentials on our servers.</strong> Only temporary analysis results and basic session metrics are retained to provide cached analytics.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">4. Session & Disconnection</h4>
                                    <p>
                                        Session handling is cookie-based. Disconnecting or logging out immediately invalidates your session token and clears all temporary cache.
                                    </p>
                                </>
                            )}

                            {activeModal === "terms" && (
                                <>
                                    <p>
                                        By using CommitFM, you agree to these Terms of Service. Please read them carefully.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">1. Acceptable Use</h4>
                                    <p>
                                        You may use the services only for lawful analysis of repositories you own or have explicit authorization to inspect.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">2. Service Limitations</h4>
                                    <p>
                                        CommitFM is subject to GitHub API availability and rate limitations. We do not guarantee continuous uptime or analysis accuracy.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">3. Limitation of Liability</h4>
                                    <p>
                                        In no event shall CommitFM be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.
                                    </p>
                                </>
                            )}

                            {activeModal === "permissions" && (
                                <>
                                    <p>
                                        CommitFM connects securely to your GitHub account using OAuth 2.0.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Requested Scopes:</h4>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>
                                            <strong className="text-white">read:user</strong>: To read your public profile information, avatar, bio, and repository counts.
                                        </li>
                                        <li>
                                            <strong className="text-white">repo</strong>: Required to analyze commit history, pull requests, issues, and languages of your repositories.
                                        </li>
                                    </ul>
                                    <p className="mt-3">
                                        You can revoke access to CommitFM at any time through your GitHub account applications settings.
                                    </p>
                                </>
                            )}

                            {activeModal === "support" && (
                                <>
                                    <p>
                                        Have questions, feedback, or need support? We are here to help.
                                    </p>
                                    <h4 className="font-bold text-white uppercase text-[10px] tracking-wider">Get in Touch</h4>
                                    <p>
                                        Email us at: <span className="text-brand-accent font-semibold">support@commitfm.io</span>
                                    </p>
                                    <p>
                                        Our engineering and product support team will respond to inquiries within 2 business days.
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-white/5 flex justify-end">
                            <button 
                                onClick={closeModal}
                                className="btn-premium-secondary"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
