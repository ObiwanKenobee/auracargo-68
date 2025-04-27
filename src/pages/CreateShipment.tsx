import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Loader2, Package, ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockData } from "@/utils/mockData";

const shipmentFormSchema = z.object({
  origin: z.string().min(5, { message: "Origin address is required" }),
  destination: z.string().min(5, { message: "Destination address is required" }),
  weight: z.coerce.number().min(0.1, { message: "Weight must be greater than 0" }),
  sender_name: z.string().min(3, { message: "Sender name is required" }),
  sender_email: z.string().email({ message: "Valid sender email is required" }),
  receiver_name: z.string().min(3, { message: "Receiver name is required" }),
  receiver_email: z.string().email({ message: "Valid receiver email is required" }),
  term: z.string().min(1, { message: "Please select a shipping term" }),
  physical_weight: z.coerce.number().optional(),
  quantity: z.coerce.number().int().optional()
});

type ShipmentFormValues = z.infer<typeof shipmentFormSchema>;

const CreateShipment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<ShipmentFormValues>({
    resolver: zodResolver(shipmentFormSchema),
    defaultValues: {
      origin: "",
      destination: "",
      weight: undefined,
      sender_name: "",
      sender_email: "",
      receiver_name: "",
      receiver_email: "",
      term: "",
      physical_weight: undefined,
      quantity: undefined
    },
  });
  
  const handleFormSubmit = async (data: ShipmentFormValues) => {
    if (!user) return;
    
    setIsProcessing(true);
    
    try {
      // Generate tracking number
      const trackingNumber = `AUR${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Create a mock shipment instead of going to Supabase
      const mockShipment = mockData.generateMockShipment({
        ...data,
        tracking_number: trackingNumber,
        user_id: user.id,
        status: 'In Transit'
      });
      
      console.log("Created mock shipment:", mockShipment);
      
      toast({
        title: "Shipment Created!",
        description: "Your shipment has been created and is in transit.",
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error("Error creating shipment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create shipment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-24">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Package className="h-6 w-6 text-primary" />
                <CardTitle>Create New Shipment</CardTitle>
              </div>
              <CardDescription>
                Enter shipment details to create a new shipment.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Sender Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="sender_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sender's Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sender_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sender's Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="origin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Origin Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Receiver Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="receiver_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Receiver's Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="receiver_email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Receiver's Email</FormLabel>
                            <FormControl>
                              <Input placeholder="jane@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destination Address</FormLabel>
                            <FormControl>
                              <Input placeholder="456 Elm St, City, Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01" 
                              min="0.1" 
                              placeholder="10.5"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="physical_weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Physical Weight (kg)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01" 
                              min="0" 
                              placeholder="9.8"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              placeholder="1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="term"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipping Term</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select shipping term" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Express">Express (1-2 days)</SelectItem>
                              <SelectItem value="Standard">Standard (3-5 days)</SelectItem>
                              <SelectItem value="Economy">Economy (5-7 days)</SelectItem>
                              <SelectItem value="Ground">Ground (7-10 days)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the shipping speed for your package
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                      type="button"
                      disabled={isProcessing}
                    >
                      Cancel
                    </Button>
                    
                    <Button type="submit" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Package className="mr-2 h-4 w-4" />
                          Create Shipment
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateShipment;
