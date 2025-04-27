
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ArrowUpRight, BoxIcon, DollarSign, TruckIcon, Users, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { mockData } from "@/utils/mockData";

const AdminOverview = () => {
  const [data, setData] = useState({
    recentShipments: [],
    recentPayments: [],
    userCount: 0,
    shipmentCount: 0,
    revenue: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock shipments
        const mockShipments = mockData.generateMockShipments(5);
        
        // Mock payments data
        const mockPayments = mockShipments.map(shipment => ({
          id: `pay_${Math.random().toString(36).substring(2, 9)}`,
          amount: Math.floor(Math.random() * 5000) + 500,
          status: Math.random() > 0.2 ? 'completed' : 'pending',
          created_at: shipment.created_at,
          shipment_id: shipment.id,
          customer_name: shipment.sender_name
        }));
        
        setData({
          recentShipments: mockShipments,
          recentPayments: mockPayments,
          userCount: 347,
          shipmentCount: 1243,
          revenue: mockPayments.reduce((total, payment) => total + payment.amount, 0)
        });
      } catch (error) {
        console.error("Error fetching admin overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const revenueData = [
    { month: 'Jan', revenue: 25000 },
    { month: 'Feb', revenue: 32000 },
    { month: 'Mar', revenue: 28000 },
    { month: 'Apr', revenue: 42000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 62000 },
    { month: 'Jul', revenue: 68000 },
  ];

  const shipmentTypeData = [
    { id: 'Air Freight', value: 35 },
    { id: 'Ocean Freight', value: 40 },
    { id: 'Road Freight', value: 15 },
    { id: 'Rail Freight', value: 10 }
  ];

  const userGrowthData = [
    {
      id: "User Growth",
      data: [
        { x: 'Jan', y: 120 },
        { x: 'Feb', y: 170 },
        { x: 'Mar', y: 210 },
        { x: 'Apr', y: 250 },
        { x: 'May', y: 290 },
        { x: 'Jun', y: 320 },
        { x: 'Jul', y: 347 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <Button>Download Report</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{data.userCount}</p>
              </div>
              <div className="p-2 bg-primary-50 rounded-full text-primary-500">
                <Users size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <ArrowUp size={14} />
              <span className="ml-1">12% increase this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                <p className="text-2xl font-bold">{data.shipmentCount}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-full text-blue-500">
                <TruckIcon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <ArrowUp size={14} />
              <span className="ml-1">8% increase this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${(data.revenue / 1000).toFixed(1)}k</p>
              </div>
              <div className="p-2 bg-green-50 rounded-full text-green-500">
                <DollarSign size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-600">
              <ArrowUp size={14} />
              <span className="ml-1">23% increase this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivery Success Rate</p>
                <p className="text-2xl font-bold">98.7%</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-full text-purple-500">
                <BoxIcon size={20} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-red-600">
              <ArrowDown size={14} />
              <span className="ml-1">0.3% decrease this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveBar
              data={revenueData}
              keys={['revenue']}
              indexBy="month"
              margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
              padding={0.3}
              colors={{ scheme: 'nivo' }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Revenue ($)',
                legendPosition: 'middle',
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly active users</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveLine
              data={userGrowthData}
              margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Month',
                legendOffset: 36,
                legendPosition: 'middle'
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Users',
                legendOffset: -40,
                legendPosition: 'middle'
              }}
              colors={{ scheme: 'category10' }}
              pointSize={10}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle>Shipment Types</CardTitle>
            <CardDescription>Distribution by service type</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsivePie
              data={shipmentTypeData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: 'nivo' }}
              borderWidth={1}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
              enableRadialLabels={false}
              sliceLabel={d => `${d.value}%`}
              sliceLabelsSkipAngle={10}
              sliceLabelsTextColor="#fff"
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 30,
                  translateX: 0,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: '#999',
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [{ on: 'hover', style: { itemTextColor: '#000' } }]
                }
              ]}
            />
          </CardContent>
        </Card>
        
        <Card className="col-span-3 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>Latest shipment activity</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              View All <ArrowUpRight size={14} />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentShipments.map(shipment => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.tracking_number}</TableCell>
                    <TableCell>{shipment.sender_name}</TableCell>
                    <TableCell>{shipment.origin}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        shipment.status === 'Delayed' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {shipment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
