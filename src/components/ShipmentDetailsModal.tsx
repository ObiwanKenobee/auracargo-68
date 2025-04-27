
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Clock, MapPin, Truck, FileText, User, Mail, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { mockData } from "@/utils/mockData";

// Just for typing purposes, these are simplified from what you'd use in a real app
interface TrackingEvent {
  id: string;
  shipment_id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

interface ShipmentDetailsModalProps {
  shipmentId: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShipmentDetailsModal = ({ shipmentId, isOpen, onClose }: ShipmentDetailsModalProps) => {
  const [shipment, setShipment] = useState<any>(null);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen && shipmentId) {
      // Fetch shipment details
      setLoading(true);
      
      // Instead of querying Supabase directly, use mock data
      const mockShipment = mockData.generateMockShipment({ id: shipmentId });
      const mockEvents = mockData.generateMockTrackingEvents(shipmentId, 5);
      
      // Simulate API call delay
      setTimeout(() => {
        setShipment(mockShipment);
        setTrackingEvents(mockEvents);
        setLoading(false);
      }, 500);
    }
  }, [isOpen, shipmentId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Package className="text-primary" size={20} />
            {loading ? 'Loading shipment details...' : `Shipment Details: ${shipment?.tracking_number}`}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : shipment ? (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <Badge variant={
                shipment.status === 'Delivered' ? 'success' :
                shipment.status === 'In Transit' ? 'warning' :
                'default'
              }>
                {shipment.status}
              </Badge>
              <div className="text-sm text-muted-foreground">
                <Clock size={14} className="inline mr-1" />
                Created: {formatDate(shipment.created_at)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Origin</h3>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-primary mt-1" />
                  <span>{shipment.origin}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Destination</h3>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-primary mt-1" />
                  <span>{shipment.destination}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Weight</h3>
                <div className="flex items-start gap-2">
                  <Truck size={16} className="text-primary mt-1" />
                  <span>{shipment.weight} kg</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Shipping Term</h3>
                <div className="flex items-start gap-2">
                  <FileText size={16} className="text-primary mt-1" />
                  <span>{shipment.term}</span>
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Sender</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-primary" />
                    <span>{shipment.sender_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <span>{shipment.sender_email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Receiver</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-primary" />
                    <span>{shipment.receiver_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <span>{shipment.receiver_email}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Tracking History</h3>
              <div className="space-y-4">
                {trackingEvents.map((event, index) => (
                  <div key={event.id} className="relative pl-6 pb-4">
                    {index < trackingEvents.length - 1 && (
                      <div className="absolute left-[9px] top-[18px] bottom-0 w-0.5 bg-gray-200"></div>
                    )}
                    <div className="absolute left-0 top-1.5 w-[18px] h-[18px] rounded-full bg-primary"></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{event.status}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(event.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm mt-1">
                        <span className="text-muted-foreground">{event.location}</span>
                        <p>{event.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p>Shipment not found.</p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShipmentDetailsModal;
