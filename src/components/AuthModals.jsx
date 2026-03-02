import React from 'react';
import { useModal } from '../context/ModalContext';
import Modal from './Modal';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';

export default function AuthModals() {
    const { activeModal, closeModal, openModal } = useModal();

    // Helper to determine props based on the active modal
    const isLoginNode = activeModal === 'login' || activeModal === 'mentor-login';
    const isSignupNode = activeModal === 'signup' || activeModal === 'mentor-signup';

    // Determine if we should start in mentor mode
    const initialUserType = (activeModal === 'mentor-login' || activeModal === 'mentor-signup') ? 'mentor' : 'mentee';

    return (
        <>
            {/* Login Modal */}
            <Modal
                isOpen={isLoginNode}
                onClose={closeModal}
            >
                <LoginForm
                    initialUserType={initialUserType}
                    onSwitchToSignup={() => openModal('signup')}
                    onClose={closeModal}
                />
            </Modal>

            {/* Signup Modal */}
            <Modal
                isOpen={isSignupNode}
                onClose={closeModal}
            >
                <SignUpForm
                    initialUserType={initialUserType}
                    enableToggle={false}
                    onSwitchToLogin={() => openModal('login')}
                    onClose={closeModal}
                />
            </Modal>
        </>
    );
}
