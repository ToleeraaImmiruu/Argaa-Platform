import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Import the role-specific dashboards
import TouristDashboard from './TouristDashboard';
import GuideDashboard from './GuideDashboard';
import AdminDashboard from './AdminDashboard';
import HeroSection from '../components/landing/HeroSection';
import ServicesSection from '../components/landing/ServicesSection';
import FeaturedToursSection from '../components/landing/FeaturedTourSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';

// A simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

const PublicLandingPage = () => (
  <div>
    <HeroSection />
    <ServicesSection />
    <HowItWorksSection />
    <FeaturedToursSection />
  </div>
);

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate()

  // While we are checking for a token, show a loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // If not loading and there is a user, render dashboard based on role
  if (user) {
    switch (user.role) {
      case 'tourist':
        return <TouristDashboard />;
      case 'guide':
        return <GuideDashboard />;
      case 'hotel-manager': 
        return <GuideDashboard />; 
      case 'admin':
        navigate('/admin/tours');
        break
      default:
        // Fallback for any unknown roles
        return <div>Unknown user role. Please contact support.</div>;
    }
  }

  // If not loading and no user, show the public landing page
  return <PublicLandingPage />;
};

export default HomePage;