// AuthModals.jsx — renders login + signup modals, handles confirm-before-close
import React, { useState, useCallback } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import Modal from './Modal';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';

export default function AuthModals() {
    const { activeModal, closeModal, openModal, silentClose } = useModal();

    const isLoginNode = activeModal === 'login' || activeModal === 'mentor-login';
    const isSignupNode = activeModal === 'signup' || activeModal === 'mentor-signup';
    const initialUserType = (activeModal === 'mentor-login' || activeModal === 'mentor-signup') ? 'mentor' : 'mentee';

    // Track whether the user has verified their phone (but not yet created account)
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [showExitWarning, setShowExitWarning] = useState(false);

    const handleSignupClose = () => {
        if (phoneVerified) {
            setShowExitWarning(true);
        } else {
            // X button — navigate away (user is abandoning)
            setPhoneVerified(false);
            setShowExitWarning(false);
            closeModal();
        }
    };

    // Called when user clicks "Exit anyway" from the warning — also navigates away
    const handleSignupForceClose = () => {
        setPhoneVerified(false);
        setShowExitWarning(false);
        closeModal();
    };

    // Called after a SUCCESSFUL signup — modal clears silently, navigation to
    // /mentor-onboarding or /dashboard is already triggered by SignUpForm
    const handleSignupSuccessClose = () => {
        setPhoneVerified(false);
        setShowExitWarning(false);
        silentClose();
    };

    const handlePhoneVerified = useCallback(() => {
        setPhoneVerified(true);
    }, []);

    // When signup modal closes or switches, reset state
    const handleSwitchToLogin = () => {
        setPhoneVerified(false);
        setShowExitWarning(false);
        openModal('login');
    };

    return (
        <>
            {/* Login Modal */}
            <Modal isOpen={isLoginNode} onClose={closeModal}>
                <LoginForm
                    initialUserType={initialUserType}
                    onSwitchToSignup={() => openModal('signup')}
                    onClose={closeModal}
                />
            </Modal>

            {/* Signup Modal */}
            <Modal isOpen={isSignupNode} onClose={handleSignupClose}>
                <>
                    {/* Exit confirmation overlay — shown over the signup form */}
                    {showExitWarning && (
                        <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-8 text-center">
                            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                                <AlertTriangle className="w-7 h-7 text-amber-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Leave sign-up?</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Your phone number is verified but your account hasn't been created yet. You'll need to verify again next time.
                            </p>
                            <div className="flex flex-col gap-2 w-full">
                                <button
                                    onClick={() => setShowExitWarning(false)}
                                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Continue Sign Up
                                </button>
                                <button
                                    onClick={handleSignupForceClose}
                                    className="w-full text-gray-500 hover:text-gray-700 py-2 text-sm font-medium"
                                >
                                    Exit anyway
                                </button>
                            </div>
                        </div>
                    )}

                    <SignUpForm
                        initialUserType={initialUserType}
                        onSwitchToLogin={handleSwitchToLogin}
                        onClose={handleSignupSuccessClose}
                        onPhoneVerified={handlePhoneVerified}
                    />
                </>
            </Modal>
        </>
    );
}
