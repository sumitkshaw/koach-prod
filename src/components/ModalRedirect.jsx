// ModalRedirect.jsx
// Used by old page routes (/login, /signup, /mentor-signup, /mentor-login)
// to redirect the user to the homepage and open the correct modal.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';

export default function ModalRedirect({ modalName }) {
  const navigate = useNavigate();
  const { openModal } = useModal();

  useEffect(() => {
    // Just open the modal, leave the URL exactly as is.
    // The App.jsx routing will ensure the Home page is rendered in the background.
    setTimeout(() => openModal(modalName), 10);
  }, [modalName, openModal]);

  return null;
}
