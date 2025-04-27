
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  Plus, 
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import ShipmentDetailsModal from "@/components/ShipmentDetailsModal";

interface ShipmentsPageProps {
  loading: boolean;
  shipments: any[];
}

const ShipmentsPage: React.FC<ShipmentsPageProps> = ({ loading, shipments }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShipment, setSelectedShipment] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const { toast } = useToast();
  
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "in transit":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "on hold":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "approved":
      case "processing":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "delayed":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesStatus = statusFilter === "all" || shipment.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = 
      searchQuery === "" || 
      shipment.tracking_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (shipment.current_location && shipment.current_location.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your shipments data is being exported to CSV",
    });
  };

  const handleViewDetails = (shipment: any) => {
    setSelectedShipment(shipment);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-kargon-dark">Manage Shipments</h1>
        <Link to="/create-shipment">
          <Button className="bg-kargon-red hover:bg-kargon-red/90">
            <Plus className="mr-2 h-4 w-4" /> New Shipment
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search shipments..."
                  className="pl-8 w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="in transit">In Transit</SelectItem>
                    <SelectItem value="on hold">On Hold</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>

          <div className="rounded-md border">
            {loading ? (
              <div className="p-4 space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : filteredShipments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Current Location</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.tracking_number}</TableCell>
                      <TableCell>{shipment.origin}</TableCell>
                      <TableCell>{shipment.destination}</TableCell>
                      <TableCell>{shipment.current_location || "Not assigned"}</TableCell>
                      <TableCell>{shipment.receiver_name || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeColor(shipment.status)}>
                          {shipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(shipment.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(shipment)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No shipments found matching your filters.
              </div>
            )}
          </div>
          
          {filteredShipments.length > 0 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedShipment && (
        <ShipmentDetailsModal
          shipmentId={selectedShipment.id}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default ShipmentsPage;
