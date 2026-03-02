import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Contact from "./components/Contact";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import FAQ from "./pages/Faq";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import MentorLoginPage from "./pages/MentorLogin";
import MentorSignupPage from "./pages/MentorSignup";

import MentorOnboardingPage from "./pages/MentorOnboardingPage";
import MenteeOnboardingPage from "./pages/MenteeOnboardingPage";

import DemoCircle from "./components/circles/DemoCircle.jsx";

import BioStep from "./pages/MenteeOnboard/BioStep";
import BioStep1 from "./pages/MentorOnboarding/Bio-Step1.jsx"

import AboutMe from "./pages/AboutMe";
import WelcomeStep from "./pages/Welcome";
import MentorExperience from "./pages/MentorOnboarding/MentorExperience";
import Skills from "./pages/MentorOnboarding/Skills";
import MentorExpert from "./pages/MentorOnboarding/MentorExpert";
import Certifications from "./pages/MentorOnboarding/Certifications";
import Planning from "./pages/MentorOnboarding/Plans";
import Clients from "./pages/MentorOnboarding/Clients";
import GoalsStep from "./pages/MentorOnboarding/Goals";
import WelcomeAboard from "./pages/MentorOnboarding/WelcomeAboard.jsx";
import WelcomeUser from "./pages/MenteeOnboard/WelcomeUser.jsx";

import NotFound from "./pages/NotFound";

import Listing from "./pages/listing-booking/Listing.jsx";
import Demo from "./pages/listing-booking/Demo.jsx";

//Mentee Onboard
import PastExp from "./pages/MenteeOnboard/PastExp";
import Qualities from "./pages/MenteeOnboard/Qualities";
import Reasons from "./pages/MenteeOnboard/Reasons";
import MenteeSessions from "./pages/MenteeOnboard/Sessions";
import Timeline from "./pages/MenteeOnboard/Timeline";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CirclesPage from "./pages/CirclesPage";
import Dashboard from "./components/dashboard/Dashboard";
import Goals from "./components/dashboard/Goals";
import Sessions from "./components/dashboard/Sessions";
import Messages from "./components/dashboard/Messages";
import Mentors from "./components/dashboard/Mentors";

import Welcome from "./Dashboard/Welcome";
import { AuthProvider } from "./utils/AuthContext";
import Dashmentor from "./components/dashboard-mentor/Dashmentor";
import Earnings from "./components/dashboard-mentor/Earnings"
import Mentees from "./components/dashboard-mentor/Mentees"
import Calen from "./components/dashboard-mentor/Calendar"

import Message from "./components/dashboard-mentor/Message";
import Settings1 from "./components/dashboard-mentor/Settings2";
import Settings2 from "./components/dashboard/Settings1";

import OAuthCallback from './pages/OAuthCallback';
import { ModalProvider } from "./context/ModalContext";
import AuthModals from "./components/AuthModals";

import AddPasswordPage from './pages/AddPasswordPage';

import VerifyRequiredPage from './pages/VerifyRequiredPage';
import VerifySuccessPage from './pages/VerifySuccessPage';


function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/signup", "/bio-step", "/mentor-expert", "/about-me",
    "/welcome-step", "/mentor-experience", "/skills", "/forgot-password", "/reset-password", "/welcome", "/dashboard",
    "/dashboard/goals", "/dashboard/sessions", "/dashboard/settings", "/welcome-aboard", "/dashboard/mentors",
    "/past-experience", "/qualities", "/reasons", "/sessions", "/timeline", "/dashboard/mentees", "/certifications", "/mentor-onboarding",
    "/planning", "/clients", "/goals", "/welcome-user", "/bio-step1", "/mentor-signup", "/mentor-login", "/mentor-onboarding",
    "/mentee-onboarding"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      {!shouldHideNavbar && <Navigation />}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/mentor-signup" element={<MentorSignupPage />} />
        <Route path="/mentor-login" element={<MentorLoginPage />} />

        <Route path="/circles/research" element={<DemoCircle />} />

        <Route path="/mentor-onboarding" element={<MentorOnboardingPage />} />
        <Route path="/mentee-onboarding" element={<MenteeOnboardingPage />} />

        <Route path="/bio-step" element={<BioStep />} />
        <Route path="/bio-step1" element={<BioStep1 />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/welcome-step" element={<WelcomeStep />} />
        <Route path="/mentor-experience" element={<MentorExperience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/mentor-expert" element={<MentorExpert />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/goals" element={<GoalsStep />} />
        <Route path="/welcome-aboard" element={<WelcomeAboard />} />
        <Route path="/welcome-user" element={<WelcomeUser />} />
        <Route path="/past-experience" element={<PastExp />} />
        <Route path="/qualities" element={<Qualities />} />
        <Route path="/reasons" element={<Reasons />} />
        <Route path="/sessions" element={<MenteeSessions />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/circles" element={<CirclesPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/goals" element={<Goals />} />
        <Route path="/dashboard/sessions" element={<Sessions />} />
        <Route path="/dashboard/messages" element={<Messages />} />
        <Route path="/dashboard/mentors" element={<Mentors />} />
        <Route path="/dashboard/settings" element={<Settings2 />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/dashboard_mentor" element={<Dashmentor />} />
        <Route path="/dashboard_mentor/earnings" element={<Earnings />} />
        <Route path="/dashboard_mentor/calendar" element={<Calen />} />
        <Route path="/dashboard_mentor/messages" element={<Message />} />
        <Route path="/dashboard_mentor/mentees" element={<Mentees />} />
        <Route path="/dashboard_mentor/settings" element={<Settings1 />} />

        <Route path="/listing" element={<Listing />} />
        <Route path="/listing/:mentorId" element={<Demo />} />

        <Route path="/oauth-callback" element={<OAuthCallback />} />

        <Route path="/add-password" element={<AddPasswordPage />} />

        <Route path="/verify-required" element={<VerifyRequiredPage />} />
        <Route path="/verify-success" element={<VerifySuccessPage />} />

        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ModalProvider>
          <ToastProvider>
            <AppContent />
            <AuthModals />
          </ToastProvider>
        </ModalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
