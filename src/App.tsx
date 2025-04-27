
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from './components/ui/toaster';

// Pages
import Index from './pages/Index';
import Home from './pages/Home';
import Service from './pages/Service';
import LocationService from './pages/LocationService';
import Locations from './pages/Locations';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import Services from './pages/Services';
import TrackingPage from './pages/TrackingPage';
import SupportChat from './pages/SupportChat';
import NotFound from './pages/NotFound';

// Layout Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Dashboard Pages
import Overview from './pages/dashboard/Overview';
import Shipments from './pages/dashboard/Shipments';
import Documents from './pages/dashboard/Documents';
import Settings from './pages/dashboard/Settings';

// Admin Pages
import AdminOverview from './pages/admin/Overview';
import AdminUsers from './pages/admin/Users';
import AdminShipmentsManagement from './pages/admin/ShipmentsManagement';
import AdminSupportManagement from './pages/admin/SupportManagement';
import AdminSystemSettings from './pages/admin/SystemSettings';

// Auth Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:service" element={<Service />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:location/:service" element={<LocationService />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<Overview />} />
              <Route path="shipments" element={<Shipments />} />
              <Route path="documents" element={<Documents />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            <Route path="/support" element={
              <ProtectedRoute>
                <SupportChat />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="shipments" element={<AdminShipmentsManagement />} />
              <Route path="support" element={<AdminSupportManagement />} />
              <Route path="settings" element={<AdminSystemSettings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </Router>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
