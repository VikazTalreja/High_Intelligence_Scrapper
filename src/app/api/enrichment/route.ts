// import { NextResponse } from 'next/server';
// import type { ApiResponse, FormData } from '@/types';

// export async function POST(request: Request) {
//   // Parse the request body
//   const formData: FormData = await request.json();
  
//   // Log for debugging
//   console.log('Received form data:', formData);
  
//   // Create a mock response based on the form data
//   const mockResponse: ApiResponse = {
//     keyDecisionMakerIntelligence: formData.keyDecisionMakers.map(kdm => ({
//       name: kdm.name || 'Unknown',
//       position: `Chief Executive Officer at ${formData.companyName}`,
//       experience: '15+ years in the industry',
//       education: 'MBA from Harvard Business School',
//       achievements: ['Increased company revenue by 30%', 'Led successful merger with competitor'],
//       interests: ['Technology', 'Sustainability'],
//     })),
//     companyTechnicalDetails: {
//       registeredAddress: '123 Corporate Drive, Mumbai, India 400001',
//       directors: ['John Smith', 'Jane Doe', 'Amit Patel'],
//       listingStatus: 'Public - Listed on NSE and BSE',
//       incorporationDate: '15th June 1995',
//       industry: 'Steel Manufacturing',
//     },
//     competitorEngagements: formData.competitors
//       .filter(comp => comp.selected)
//       .map(comp => ({
//         competitorName: comp.name,
//         engagementType: 'Joint Venture',
//         description: `${formData.companyName} partnered with ${comp.name} on a major infrastructure project in 2022.`,
//         date: 'March 15, 2022',
//       })),
//     alternateDecisionMakers: [
//       {
//         name: 'Rajesh Kumar',
//         position: 'Chief Technology Officer',
//         relevance: 'Technical decision maker for IT and digital transformation projects',
//         contactInfo: 'rajesh.kumar@example.com',
//       },
//       {
//         name: 'Priya Sharma',
//         position: 'Chief Financial Officer',
//         relevance: 'Key decision maker for financial aspects and budgeting',
//         contactInfo: 'priya.sharma@example.com',
//       },
//       {
//         name: 'Michael Chen',
//         position: 'VP of Operations',
//         relevance: 'Oversees daily operations and implementation strategies',
//         contactInfo: 'michael.chen@example.com',
//       },
//     ],
//   };
  
//   // Simulate network delay
//   await new Promise(resolve => setTimeout(resolve, 1500));
  
//   // Return the mock response
//   return NextResponse.json(mockResponse);
// } 