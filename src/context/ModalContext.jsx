// ModalContext.jsx — syncs modal state with URL
// /signup → signup modal, /login → login modal, /mentor-signup → mentor-signup modal
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ModalContext = createContext();

// Map modal name → URL path, and vice versa
const MODAL_TO_PATH = {
  'login': '/login',
  'signup': '/signup',
  'mentor-login': '/mentor-login',
  'mentor-signup': '/mentor-signup',
};
const PATH_TO_MODAL = Object.fromEntries(
  Object.entries(MODAL_TO_PATH).map(([k, v]) => [v, k])
);

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // When URL changes (e.g. user navigates directly to /login), open the right modal
  useEffect(() => {
    const modal = PATH_TO_MODAL[location.pathname];
    if (modal) {
      setActiveModal(modal);
    }
  }, [location.pathname]);

  const openModal = (modalName) => {
    setActiveModal(modalName);
    const path = MODAL_TO_PATH[modalName];
    if (path && location.pathname !== path) {
      navigate(path, { replace: false });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    // Only navigate home if we're still on an auth modal URL
    if (PATH_TO_MODAL[location.pathname]) {
      navigate('/', { replace: true });
    }
  };

  // Silent version — closes modal state WITHOUT navigating.
  // Use this after a successful form submission that already called navigate().
  const silentClose = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal, silentClose }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
}
