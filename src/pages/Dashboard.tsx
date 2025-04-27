
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import DashboardSidebar from "@/components/DashboardSidebar";
import OverviewPage from "./dashboard/Overview";
import ShipmentsPage from "./dashboard/Shipments";
import SettingsPage from "./dashboard/Settings";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import { api } from "@/api/core"; // Use our api utility instead of direct supabase calls

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, profile } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    shipments: [],
    notifications: []
  });
  const [loading, setLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set a timeout to show a message if loading takes too long
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, 5000);

    const fetchDashboardData = async () => {
      if (!user) return;
      
      setLoading(true);
      
      try {
        // Use our api utility instead of direct supabase calls
        const shipmentsResult = await api.fetch("shipments", { 
          filters: { user_id: user.id } 
        });
          
        // Use our api utility for notifications too
        const notificationsResult = await api.fetch("notifications", { 
          filters: { user_id: user.id },
          order: { column: "created_at", ascending: false }
        });
        
        // Process shipments result
        if (!shipmentsResult.error) {
          setDashboardData(prev => ({ ...prev, shipments: shipmentsResult.data || [] }));
        } else {
          throw shipmentsResult.error;
        }
        
        // Process notifications result
        if (!notificationsResult.error) {
          setDashboardData(prev => ({ ...prev, notifications: notificationsResult.data || [] }));
        } else {
          throw notificationsResult.error;
        }
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: error.message,
        });
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    };
    
    fetchDashboardData();
    
    // Set up mock real-time updates to simulate Supabase realtime functionality
    const mockShipmentUpdates = setInterval(() => {
      // For demonstration purposes only - in a real app, you would use Supabase realtime
      console.log('Checking for shipment updates...');
    }, 10000);
    
    const mockNotificationUpdates = setInterval(() => {
      // For demonstration purposes only
      console.log('Checking for notification updates...');
    }, 15000);
    
    return () => {
      clearInterval(mockShipmentUpdates);
      clearInterval(mockNotificationUpdates);
      clearTimeout(timeoutId);
    };
  }, [user, toast]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <DashboardSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            profile={profile}
          />
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && 
              <OverviewPage 
                loading={loading}
                data={dashboardData} 
                setActiveTab={setActiveTab} 
              />
            }
            {activeTab === "shipments" && 
              <ShipmentsPage 
                loading={loading}
                shipments={dashboardData.shipments} 
              />
            }
            {activeTab === "settings" && 
              <SettingsPage 
                loading={loading}
                profile={profile} 
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
