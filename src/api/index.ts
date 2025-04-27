
// Export all API modules
export * from './core';
export * from './shipments';
export * from './partners';
export * from './riskAssessments';
export * from './esgMetrics';
export * from './esgReports';
export * from './suppliers';
export * from './chat';

// Example of how to use the APIs in your components:
//
// import { shipmentsApi } from '@/api';
//
// // Get all shipments
// const { data, error } = await shipmentsApi.getAll({ userId: currentUser.id });
//
// // Create a new shipment
// const { data, error } = await shipmentsApi.create({
//   user_id: currentUser.id,
//   origin: '123 Main St, New York, NY',
//   destination: '456 Elm St, Los Angeles, CA',
//   weight: 10.5,
//   sender_name: 'John Doe',
//   sender_email: 'john@example.com',
//   receiver_name: 'Jane Smith',
//   receiver_email: 'jane@example.com',
//   term: 'Express'
// });
