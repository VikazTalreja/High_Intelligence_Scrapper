'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { FormData, ApiResponse } from '@/types';
import { useRouter } from 'next/navigation';

// Type definitions for API response
interface Director {
  Name: string;
  DIN: string;
}

interface ContactDetails {
  Phone: string;
  Email: string;
  Website: string;
}

interface BasicCompanyDetails {
  "Legal Name": string;
  "CIN": string;
  "Registration Date": string;
  "Company Type": string;
  "Registered Office": string;
  "Contact Details": ContactDetails;
}

interface LegalComplianceDetails {
  "ROC Office": string;
  "Active_Compliance_Status_MCA21": string;
  "List of Directors": Director[];
}

interface FinancialHealthStatus {
  [key: string]: string | number | object | null;
}

interface CompanyData {
  data: {
    Basic_Company_Details: BasicCompanyDetails;
    "Legal & Compliance Details": LegalComplianceDetails;
    "Financial_Health_&_Cash_Rich_Status": FinancialHealthStatus;
  };
}

interface Experience {
  title: string;
  subtitle: string;
  caption: string;
}

interface Education {
  title: string;
  subtitle?: string;
}

interface ProfileData {
  fullName: string;
  headline: string;
  linkedinUrl?: string;
  experiences: Experience[];
  educations: Education[];
  isProcurementExecutive?: boolean;
}

interface LinkedInProfile {
  profileData: {
    data: ProfileData[];
  };
  input: {
    name: string;
  };
  link: string;
}

interface ProcurementExecutive {
  title: string;
  profileUrl: string;
  error?: boolean;
  profileData?: {
    data: ProfileData[];
  };
}

interface CompetitorAnalysis {
  competitor: string;
  priceComparison: {
    jswSteelPrice: string;
    competitorPrice: string;
    percentageDifference: string;
  };
  marketPosition: {
    marketShare: string;
    regionalStrengths: string;
  };
  productQuality: {
    qualityCertifications: string;
    productRangeAvailability: string;
  };
  deliveryLogistics: {
    deliveryTimeframes: string;
    geographicCoverage: string;
  };
  financialStability: {
    creditTermsComparison: string;
    riskAssessment: string;
  };
  strategicRecommendations: {
    keyDifferentiators: string;
    negotiationLeveragePoints: string;
  };
}

interface ApiResponseType {
  success: boolean;
  timestamp: string;
  formData: {
    companyName: string;
    industry: string;
  };
  linkedInData: {
    results: LinkedInProfile[];
    count: number;
  };
  companyData: CompanyData;
  procurementExecutives: {
    results: ProcurementExecutive[];
    executivesFound: number;
  };
  errors: Array<{ source: string; message: string; }>;
  marketData?: {
    synthesizedData: string;
  };
  aiInsights?: {
    synthesizedData: string;
  };
  CompetitorsEngagement?: CompetitorAnalysis[];
}

// Initial list
const initialCompetitors = [
  { name: 'TATA Steel', selected: false },
  { name: 'JSPL', selected: false },
  { name: 'SAIL', selected: false },
  { name: 'Arcelor Mittal/Nippon Steel (AM/NS)', selected: false },
];

const mockApiResponse = {
  formData: {
    companyName: "Example Corp",
    industry: "Technology",
    competitors: [
      { name: "Competitor A", selected: true },
      { name: "Competitor B", selected: true },
      { name: "Competitor C", selected: false },
    ],
  },
};

const Contactresponse={
  "status_code": 200,
  "profile": {
      "url": "https://www.linkedin.com/in/pavan-meragu",
      "email": [
          "pavanvm456@gmail.com"
      ],
      "work_email": [],
      "personal_email": [
          "pavanvm456@gmail.com"
      ],
      "phone": [
          "6825607161"
      ],
      "github": [],
      "twitter": [],
      "full_name": "Pavan Meragu",
      "headline": "Software Development Engineer 2 at Expedia Group | MS CS at UTA",
      "industry": "Computer Software",
      "company": {
          "name": "Expedia Group",
          "url": "https://www.linkedin.com/company/expedia",
          "linkedin_company_id": 2751,
          "domain": "expediagroup.com",
          "email_domain": "expediagroup.com",
          "overview": "At Expedia Group (NASDAQ: EXPE), we believe travel is a force for good – it opens minds, builds connections, and bridges divides. We create transformative tech that enables unforgettable experiences for all travelers, everywhere. Our trusted family of brands are known and loved by millions, and we power more trips than ​anyone else.​ To learn more about our vision of a more open world through travel, visit www.expediagroup.com. \n\nWe're committed to providing an inclusive and accessible recruiting experience for candidates with disabilities, or other physical or mental health conditions. If you require an accommodation or adjustment for any part of the application or recruitment process, please let us know by completing our Accommodation Request Form or contacting your recruiter.\n\nEmployment opportunities and job offers at Expedia Group will always come from Expedia Group's Talent Acquisition and hiring teams. Never provide sensitive, personal information to someone unless you're confident about who they are. We do not send job offers via email, or any other messaging tools, to individuals we have not had prior contact with. Our email domain is @expediagroup.com. Our official careers website, where you can to find and apply for job openings, is careers.expediagroup.com/jobs. \n\nIf you require customer service support to cancel, change or ask about a refund for your trip, you can connect with our 24/7 Virtual Agent through the following links:\nExpedia: https://www.expedia.com/helpcenter\nHotels.com: https://service.hotels.com/en-us/\nVrbo: https://help.vrbo.com/\nFor additional assistance, direct message us on Twitter @ExpediaHelp with your itinerary number and email address: https://twitter.com/ExpediaHelp",
          "type": "Public Company",
          "size": 10001,
          "country": "United States",
          "revenue": 9600000000,
          "founded_at": 0,
          "industry": "Computer Software",
          "headquarter": "1111 Expedia Group Way W., Seattle, WA, 98119, US",
          "website": "https://careers.expediagroup.com/",
          "logo_url": "https://images.contactout.com/companies/829885ab83226d804fabb39b12b22c2c",
          "specialties": [
              "Technology",
              "Travel",
              "Ecommerce",
              "Sales",
              "Hotels",
              "Big Data",
              "Mobile",
              "Business Development",
              "SEO",
              "SEM",
              "Hospitality",
              "Airfare"
          ],
          "locations": [
              "65 Rue de la Victoire, Paris, IdF, 75009, FR",
              "407 St John Street, London, England, EC1V 4RW, GB",
              "38 Beach Rd, Singapore, Singapore, 189767, SG",
              "701 Brickell Ave, Miami, FL, 33131, US",
              "1111 Expedia Group Way W., Seattle, WA, 98119, US",
              "63 Rue de Bresoles, Montreal, QC, H2Y 1V7, CA",
              "1 Martin Pl, Sydney, New South Wales, 2000, AU",
              "480 Queen St, Brisbane City, Queensland, 4000, AU",
              "DLF City Phase 1 Road, Gurgaon, Haryana, 122002, IN"
          ]
      },
      "location": "Greater Chicago Area",
      "country": "United States",
      "summary": "Actively looking for a full-time opportunity with having around 1+ years of professional experience in Software Development and 6 years of academic experience.",
      "experience": [
          {
              "start_date": "20223",
              "end_date": "00",
              "title": "Software Development Engineer 2",
              "summary": "",
              "locality": "Greater Chicago Area",
              "company_name": "Expedia Group",
              "start_date_year": 2022,
              "start_date_month": 3,
              "end_date_year": 0,
              "end_date_month": 0,
              "is_current": true
          },
          {
              "start_date": "20213",
              "end_date": "20223",
              "title": "Software Engineer",
              "summary": "•\tGained hands-on experience in Java full-stack training with technologies like Java, J2EE, Angular.js, Node.js, and MongoDB.\n•\tLed the team to develop a Java web Banking application with checking and savings account functionalities of Cashier and Customer, implemented Agile methodologies in the J2EE environment by following MVC architecture.\n•\tDeveloped a food ordering website with Angular.js in Visual Studio and integrated with RESTful APIs of 100+ datasets.\n•\tCollaborated with a team to work on a News reporting website based on user's current location using MEAN stack.",
              "locality": "United States",
              "company_name": "Tata Consultancy Services",
              "start_date_year": 2021,
              "start_date_month": 3,
              "end_date_year": 2022,
              "end_date_month": 3,
              "is_current": false
          },
          {
              "start_date": "20199",
              "end_date": "20205",
              "title": "Graduate Research Associate",
              "summary": "•\tAdvanced the UTA website and fixed bugs, implemented UI enhancements via Dreamweaver.\n•\tUpdated the template and page elements on UTA web application using HTML, CSS, JavaScript, and PHP.\n•\tGenerating and validating forms on the website using Adobe Acrobat forms.\n•\tAnalyzed 500+ datasets of university students using Excel tools and preparing SQL reports monthly.\n•\tProvided Technical and Desktop support to office colleagues, 1 – 2 hours per day.",
              "locality": "Arlington",
              "company_name": "The University of Texas at Arlington",
              "start_date_year": 2019,
              "start_date_month": 9,
              "end_date_year": 2020,
              "end_date_month": 5,
              "is_current": false
          },
          {
              "start_date": "20171",
              "end_date": "20177",
              "title": "Full-Stack Developer",
              "summary": "•\tDesigned brand-new pharmacy online market mockups using Adobe Illustrator which structured the website template.\n•\tBuilt the website from the ground up in WordPress using mainly Angular.js, PHP, CSS, Firebase, and RESTful web service which helped in automating the process of registering patients and distributing medicines.",
              "locality": "Surat, India",
              "company_name": "Indian Institute of Management Ahmedabad",
              "start_date_year": 2017,
              "start_date_month": 1,
              "end_date_year": 2017,
              "end_date_month": 7,
              "is_current": false
          }
      ],
      "education": [
          {
              "field_of_study": "Computer Science",
              "description": null,
              "start_date_year": "2018",
              "end_date_year": "2020",
              "degree": "Master's degree",
              "school_name": "The University of Texas at Arlington"
          },
          {
              "field_of_study": "Computer Engineering",
              "description": null,
              "start_date_year": "2014",
              "end_date_year": "2018",
              "degree": "Bachelor of Technology (BTech)",
              "school_name": "National Institute of Technology Surat"
          }
      ],
      "skills": [
          "Python (Programming Language)",
          "React.js",
          "Django",
          "Software Development",
          "Web Development",
          "Research",
          "Graphic Design",
          "Project Management",
          "Strategic Planning",
          "Sales",
          "Social Media",
          "Front-end Development",
          "User Interface Design",
          "Android Development",
          "User Experience (UX)",
          "Artificial Intelligence (AI)",
          "Application Development",
          "Object-Oriented Programming (OOP)",
          "Algorithms",
          "Responsive Web Design",
          "Bootstrap",
          "AngularJS",
          "Node.js",
          "HTML",
          "PHP",
          "MySQL",
          "CSS",
          "JavaScript",
          "jQuery",
          "C",
          "C++",
          "Java",
          "Android",
          "Photoshop",
          "Matlab",
          "Microsoft Excel",
          "Cascading Style Sheets (CSS)",
          "Microsoft Office",
          "SQL",
          "HTML5",
          "REST API",
          "Leadership",
          "Public Speaking",
          "Training",
          "Back-End Web Development",
          "Web Application Development",
          "NoSQL",
          "Full-Stack Development",
          "Agile Methodologies",
          "Linux"
      ],
      "profile_picture_url": "https://images.contactout.com/profiles/8daa4fbfdf7eb5055857cc0c680aad2e",
      "updated_at": "2025-02-14 00:00:00",
      "followers": 720
  }
}

export default function Home() {
  // State management
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    keyDecisionMakers: [{ name: '' }],
    projectDetails: '',
    competitors: initialCompetitors,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponseType | null>(null);
  const [contactStates, setContactStates] = useState<{
    [key: string]: {
      showOptions: boolean;
      contactInfo: { email: string[]; phone: string[]; } | null;
    };
  }>({});

  // Form handlers
  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, companyName: e.target.value });
  };

  const handleKDMChange = (index: number, value: string) => {
    const newKDMs = [...formData.keyDecisionMakers];
    newKDMs[index] = { name: value };
    setFormData({ ...formData, keyDecisionMakers: newKDMs });
  };

  const addKDM = () => {
    setFormData({
      ...formData,
      keyDecisionMakers: [...formData.keyDecisionMakers, { name: '' }],
    });
  };

  const removeKDM = (index: number) => {
    const newKDMs = formData.keyDecisionMakers.filter((_, i) => i !== index);
    setFormData({ ...formData, keyDecisionMakers: newKDMs });
  };

  const handleProjectDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, projectDetails: e.target.value });
  };

  const handleCompetitorChange = (index: number) => {
    const newCompetitors = [...formData.competitors];
    newCompetitors[index] = {
      ...newCompetitors[index],
      selected: !newCompetitors[index].selected,
    };
    setFormData({ ...formData, competitors: newCompetitors });
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Format form data to include industry from project details
      const analysisData = {
        ...formData,
        industry: formData.projectDetails.includes('industry') 
          ? formData.projectDetails.split('industry')[1].trim().split(' ')[0] 
          : 'Technology', // Default to Technology if no industry specified
        keyDecisionMakers: formData.keyDecisionMakers.map(kdm => kdm.name).filter(name => name.trim() !== '')
      };

      console.log('SENDING DATA TO BACKEND:', JSON.stringify(analysisData, null, 2));

      // Call the analysis API endpoint
      const response = await fetch('https://high-intelligence-backend.onrender.com/api/analysis/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData),
      });

      const data = await response.json();
      
      // Process selected competitors for otherCompetitor analysis
      const selectedCompetitors = formData.competitors.filter(comp => comp.selected);
      
      if (selectedCompetitors.length > 0) {
        const otherCompetitorAnalyses = await Promise.all(
          selectedCompetitors.map(async (competitor) => {
            try {
              const otherCompResponse = await fetch('https://high-intelligence-backend.onrender.com/api/othercompetitor/analyze', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  companyName: formData.companyName,
                  competitorName: competitor.name,
                  dataType: 'TMT' // You can modify this based on your needs
                }),
              });

              const otherCompData = await otherCompResponse.json();
              if (otherCompData.success) {
                return {
                  competitor: competitor.name,
                  ...otherCompData.analysis
                };
              }
              return null;
            } catch (error) {
              console.error(`Error analyzing competitor ${competitor.name}:`, error);
              return null;
            }
          })
        );

        // Filter out null values and combine with existing CompetitorsEngagement
        const validAnalyses = otherCompetitorAnalyses.filter(analysis => analysis !== null);
        if (validAnalyses.length > 0) {
          data.CompetitorsEngagement = [
            ...(data.CompetitorsEngagement || []),
            ...validAnalyses
          ];
        }
      }

      
      // Detailed logging of the response
      console.log('RECEIVED DATA FROM BACKEND:', JSON.stringify(data, null, 2));
      console.log('DATA STRUCTURE:');
      console.log('- success:', data.success);
      console.log('- timestamp:', data.timestamp);
      console.log('- linkedInData:', data.linkedInData ? 'Present' : 'Not present');
      console.log('- companyData:', data.companyData ? 'Present' : 'Not present');
      console.log('- marketData:', data.marketData ? 'Present' : 'Not present');
      console.log('- aiInsights:', data.aiInsights ? 'Present' : 'Not present');
      console.log('- errors:', data.errors ? `${data.errors.length} errors` : 'No errors');
      console.log('- CompetitorsEngagement:', data.CompetitorsEngagement ? `${data.CompetitorsEngagement.length} competitors` : 'No competitors');
      
      // Set response data
      setApiResponse(data);
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
      
const router = useRouter();

  // Contact button functionality
  const fetchContactDetails = async (profileUrl: string) => {
    if (!profileUrl) {
      console.error('Profile URL is undefined');
      return;
    }
    
    try {
      // Make the actual API call to ContactOut
      const response = await fetch(`https://api.contactout.com/v2/contacts/profile-url?profile_url=${encodeURIComponent(profileUrl)}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 6e4a9c7f-3a2e-4a0c-a1b2-0f8c2f6e4d3b',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Contact response:', data); // Debug log
      
      if (data.email && data.phone) {
        setContactStates(prev => ({
          ...prev,
          [profileUrl]: {
            showOptions: true,
            contactInfo: {
              email: Array.isArray(data.email) ? data.email : [data.email],
              phone: Array.isArray(data.phone) ? data.phone : [data.phone]
            }
          }
        }));
        console.log('Contact info set for:', profileUrl); // Debug log
      } else {
        console.error('No email or phone in response');
      }

      return data;
    } catch (error) {
      console.error('Error fetching contact details:', error);
      // Fallback to mock data for testing
      const mockResponse = Contactresponse.profile;
      setContactStates(prev => ({
        ...prev,
        [profileUrl]: {
          showOptions: true,
          contactInfo: {
            email: mockResponse.email,
            phone: mockResponse.phone
          }
        }
      }));
      return null;
    }
  };

  // Contact Button Component
  const ContactButton = ({ profileUrl }: { profileUrl: string }) => {
    const contactState = contactStates[profileUrl];
    
    return (
      <div className="relative">
        {!contactState?.showOptions ? (
          <button 
            onClick={async () => {
              console.log('Profile URL:', profileUrl); // Debug log
              await fetchContactDetails(profileUrl);
            }}
            className='px-4 py-2 bg-blue-600 rounded-lg text-white text-sm font-medium hover:bg-blue-700 transition-all duration-300'
          >
            Connect
          </button>
        ) : (
          <div className="flex space-x-2 animate-fade-in">
            {contactState.contactInfo?.email?.[0] && (
              <a
                href={`mailto:${contactState.contactInfo.email[0]}`}
                className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white text-sm font-medium transition-all duration-300 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email</span>
              </a>
            )}
            {contactState.contactInfo?.phone?.[0] && (
              <a
                href={`tel:${contactState.contactInfo.phone[0]}`}
                className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white text-sm font-medium transition-all duration-300 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call</span>
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-apple-gray-50">
      {/* Header */}
      <header className="border-b border-apple-gray-200 bg-white py-6 shadow-sm">
        <div className="mx-auto max-w-5xl flex px-8">
          <div className='w-full'>
            <h1 className="text-3xl font-medium tracking-tight text-apple-gray-500">Company Intelligence</h1>
            <p className="mt-1 text-sm text-apple-gray-300">Gather comprehensive insights about your target company</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={()=>{window.open("https://meresu-jsw-backend.onrender.com/", "_blank", "noopener,noreferrer")}}
              className="inline-flex items-center gap-2 rounded-md bg-apple-gray-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-apple-gray-400 focus:outline-none focus:ring-2 focus:ring-apple-gray-300 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300"
            >
              <svg 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              Lead Discovery System
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-8 py-10">
        {/* Form Section */}
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="border-b border-apple-gray-100 px-6 py-4">
            <h2 className="text-xl font-medium text-apple-gray-500">Analysis Parameters</h2>
            <p className="text-xs text-apple-gray-300">Fields marked with an asterisk (*) are required</p>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              {/* Company Name */}
              <div className="md:col-span-1">
                <label className="block text-xs font-medium uppercase tracking-wide text-apple-gray-400">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleCompanyNameChange}
                  className="mt-1 block w-full rounded-md border-apple-gray-200 bg-apple-gray-50 px-3 py-2 text-sm shadow-sm focus:border-apple-gray-300 focus:bg-white focus:ring focus:ring-apple-gray-300 focus:ring-opacity-50"
                  placeholder="Enter company name"
                />
              </div>

              {/* Competitors */}
              <div className="md:col-span-1">
                <label className="block text-xs font-medium uppercase tracking-wide text-apple-gray-400">Competitor Evaluation</label>
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                  {formData.competitors.map((competitor, index) => (
                    <label key={index} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={competitor.selected}
                        onChange={() => handleCompetitorChange(index)}
                        className="h-4 w-4 rounded border-apple-gray-300 text-apple-gray-500 focus:ring-apple-gray-300 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-apple-gray-500">{competitor.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium uppercase tracking-wide text-apple-gray-400">Project Details</label>
                <textarea
                  value={formData.projectDetails}
                  onChange={handleProjectDetailsChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-apple-gray-200 bg-apple-gray-50 px-3 py-2 text-sm shadow-sm focus:border-apple-gray-300 focus:bg-white focus:ring focus:ring-apple-gray-300 focus:ring-opacity-50"
                  placeholder="Enter project details"
                />
              </div>

              {/* Key Decision Makers */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-medium uppercase tracking-wide text-apple-gray-400">Key Decision Makers</label>
                  <button
                    type="button"
                    onClick={addKDM}
                    className="inline-flex items-center rounded-md bg-apple-gray-50 px-2.5 py-1.5 text-xs font-medium text-apple-gray-500 hover:bg-apple-gray-100"
                  >
                    <PlusIcon className="mr-1 h-3.5 w-3.5" />
                    Add Person
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {formData.keyDecisionMakers.map((kdm, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={kdm.name}
                        onChange={(e) => handleKDMChange(index, e.target.value)}
                        className="block w-full rounded-md border-apple-gray-200 bg-apple-gray-50 px-3 py-2 text-sm shadow-sm focus:border-apple-gray-300 focus:bg-white focus:ring focus:ring-apple-gray-300 focus:ring-opacity-50"
                        placeholder="Enter decision maker name"
                      />
                      {formData.keyDecisionMakers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeKDM(index)}
                          className="rounded-md p-1.5 text-apple-gray-300 hover:bg-apple-gray-50 hover:text-apple-gray-400"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end border-t border-apple-gray-100 pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-md bg-apple-gray-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-apple-gray-400 focus:outline-none focus:ring-2 focus:ring-apple-gray-300 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span className="ml-2">Processing...</span>
                  </div>
                ) : (
                  'Run Analysis'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {apiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-8"
          >
            {/* Status and Overview */}
            <section>
              <div className="mb-4 flex items-center">
                <h2 className="text-xl font-medium text-apple-gray-500">Analysis Results</h2>
                <div className="ml-3 h-px flex-1 bg-apple-gray-200"></div>
              </div>
              <div className="rounded-lg border border-apple-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-apple-gray-400">Status: {apiResponse.success ? 'Success' : 'Partial Success'}</p>
                    <p className="text-sm text-apple-gray-400">Timestamp: {new Date(apiResponse.timestamp).toLocaleString()}</p>
                    <p className="text-sm text-apple-gray-400">Company: {apiResponse.formData.companyName}</p>
                    <p className="text-sm text-apple-gray-400">Industry: {apiResponse.formData.industry}</p>
                  </div>
                  {apiResponse.errors.length > 0 && (
                    <div className="rounded-md bg-red-50 p-2 text-sm text-red-500">
                      <p className="font-medium">Some errors occurred:</p>
                      <ul className="mt-1 list-inside list-disc">
                        {apiResponse.errors.map((err, i) => (
                          <li key={i}>{err.source}: {err.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-3 border-t border-apple-gray-100 pt-3">
                  <p className="text-xs font-medium uppercase text-apple-gray-400">Data Retrieved</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${apiResponse.linkedInData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      LinkedIn Profiles ({apiResponse.linkedInData ? apiResponse.linkedInData.count : 0})
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${apiResponse.companyData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      Company Data
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${apiResponse.marketData ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      Market Insights
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${apiResponse.aiInsights ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      AI Analysis
                    </span>
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${apiResponse.procurementExecutives ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                      Procurement Executives
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* LinkedIn Data (Primary Key Decision Maker) */}
            {apiResponse.linkedInData && apiResponse.linkedInData.results.length > 0 && (
              <section>
                <div className="mb-4 flex items-center">
                  <h2 className="text-xl font-medium text-apple-gray-500">Key Decision Maker</h2>
                <div className="ml-3 h-px flex-1 bg-apple-gray-200"></div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Show only the first LinkedIn profile (primary decision maker) */}
                  <motion.div
                    key="primary-kdm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="overflow-hidden rounded-lg border border-apple-gray-200 bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="border-b border-apple-gray-100 bg-apple-gray-50 px-4 py-3">
                     <div className='w-full flex justify-between items-center'>
                      <h3 className="font-medium text-apple-gray-500">
                        {apiResponse.linkedInData.results[0].profileData?.data?.[0]?.fullName || 
                         apiResponse.linkedInData.results[0].input?.name || 
                         'Name not available'}
                      </h3>
                      <ContactButton 
                        profileUrl={apiResponse.linkedInData.results[0].link || 
                                   apiResponse.linkedInData.results[0].profileData?.data?.[0]?.linkedinUrl || ''} 
                      />
                    </div>
                    </div>
                    <div className="divide-y divide-apple-gray-100">
                      {apiResponse.linkedInData.results[0].profileData?.data?.[0]?.experiences && 
                       apiResponse.linkedInData.results[0].profileData.data[0].experiences.length > 0 && (
                        <div className="px-4 py-3">
                          <p className="text-xs font-medium uppercase text-apple-gray-400">Current Position</p>
                          <p className="mt-1 text-sm font-medium text-apple-gray-500">
                            {apiResponse.linkedInData.results[0].profileData.data[0].experiences[0].title}
                          </p>
                          <p className="text-sm text-apple-gray-400">
                            {apiResponse.linkedInData.results[0].profileData.data[0].experiences[0].subtitle}
                          </p>
                          <p className="text-xs text-apple-gray-300">
                            {apiResponse.linkedInData.results[0].profileData.data[0].experiences[0].caption}
                          </p>
                        </div>
                      )}
                      {apiResponse.linkedInData.results[0].profileData?.data?.[0]?.experiences && 
                       apiResponse.linkedInData.results[0].profileData.data[0].experiences.length > 1 && (
                      <div className="px-4 py-3">
                          <p className="text-xs font-medium uppercase text-apple-gray-400">Previous Experience</p>
                          <ul className="mt-1 space-y-2">
                            {apiResponse.linkedInData.results[0].profileData.data[0].experiences.slice(1, 3).map((exp, i) => (
                              <li key={i} className="text-sm text-apple-gray-500">
                                <p className="font-medium">{exp.title}</p>
                                <p className="text-xs text-apple-gray-400">{exp.subtitle}</p>
                                <p className="text-xs text-apple-gray-300">{exp.caption}</p>
                              </li>
                            ))}
                          </ul>
                      </div>
                      )}
                      {apiResponse.linkedInData.results[0].profileData?.data?.[0]?.educations && 
                       apiResponse.linkedInData.results[0].profileData.data[0].educations.length > 0 && (
                      <div className="px-4 py-3">
                        <p className="text-xs font-medium uppercase text-apple-gray-400">Education</p>
                          <p className="mt-1 text-sm text-apple-gray-500">
                            {apiResponse.linkedInData.results[0].profileData.data[0].educations[0].title}
                            {apiResponse.linkedInData.results[0].profileData.data[0].educations[0].subtitle && 
                              `, ${apiResponse.linkedInData.results[0].profileData.data[0].educations[0].subtitle}`}
                          </p>
                      </div>
                      )}
                    </div>
                  </motion.div>
              </div>
            </section>
            )}

            {/* Company Data */}
            {apiResponse?.companyData && (
            <section>
              <div className="mb-4 flex items-center">
                <h2 className="text-xl font-medium text-apple-gray-500">Company Information</h2>
                <div className="ml-3 h-px flex-1 bg-apple-gray-200"></div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-lg border border-apple-gray-200 bg-white shadow-sm"
              >
                {/* Basic Company Details */}
                <div className="border-b border-apple-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-apple-gray-500 uppercase tracking-wider mb-4">Basic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apiResponse.companyData.data.Basic_Company_Details["Legal Name"] !== "0" && (
                      <div>
                        <p className="text-xs font-medium uppercase text-apple-gray-400">Legal Name</p>
                        <p className="mt-1 text-sm font-medium text-apple-gray-500">
                          {apiResponse.companyData.data.Basic_Company_Details["Legal Name"]}
                        </p>
                      </div>
                    )}
                    {apiResponse.companyData.data.Basic_Company_Details["CIN"] !== "0" && (
                      <div>
                        <p className="text-xs font-medium uppercase text-apple-gray-400">CIN</p>
                        <p className="mt-1 text-sm font-medium text-apple-gray-500">
                          {apiResponse.companyData.data.Basic_Company_Details["CIN"]}
                        </p>
                      </div>
                    )}
                    {apiResponse.companyData.data.Basic_Company_Details["Registration Date"] !== "0" && (
                      <div>
                        <p className="text-xs font-medium uppercase text-apple-gray-400">Registration Year</p>
                        <p className="mt-1 text-sm font-medium text-apple-gray-500">
                          {apiResponse.companyData.data.Basic_Company_Details["Registration Date"]}
                        </p>
                      </div>
                    )}
                    {apiResponse.companyData.data.Basic_Company_Details["Company Type"] !== "0" && (
                      <div>
                        <p className="text-xs font-medium uppercase text-apple-gray-400">Company Type</p>
                        <p className="mt-1 text-sm font-medium text-apple-gray-500">
                          {apiResponse.companyData.data.Basic_Company_Details["Company Type"]}
                        </p>
                      </div>
                    )}
                    {apiResponse.companyData.data.Basic_Company_Details["Registered Office"] !== "0" && (
                      <div>
                        <p className="text-xs font-medium uppercase text-apple-gray-400">Registered Office</p>
                        <p className="mt-1 text-sm font-medium text-apple-gray-500">
                          {apiResponse.companyData.data.Basic_Company_Details["Registered Office"]}
                        </p>
                      </div>
                    )}
                    {apiResponse.companyData.data.Basic_Company_Details["Contact Details"] && (
                      <div className="col-span-full">
                        <h4 className="text-sm font-medium mb-4">Contact Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {apiResponse.companyData.data.Basic_Company_Details["Contact Details"].Phone !== "0" && (
                            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-100 bg-gray-50">
                              <div className="flex-shrink-0 mt-1">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Phone</p>
                                <p className="mt-1 text-sm text-gray-600">
                                  {apiResponse.companyData.data.Basic_Company_Details["Contact Details"].Phone}
                                </p>
                              </div>
                            </div>
                          )}

                          {apiResponse.companyData.data.Basic_Company_Details["Contact Details"].Email !== "0" && (
                            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-100 bg-gray-50">
                              <div className="flex-shrink-0 mt-1">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Email</p>
                                <p className="mt-1 text-sm text-gray-600">
                                  {apiResponse.companyData.data.Basic_Company_Details["Contact Details"].Email}
                                </p>
                              </div>
                            </div>
                          )}

                          {apiResponse.companyData.data.Basic_Company_Details["Contact Details"].Website !== "0" && (
                            <div className="flex items-start space-x-3 p-4 rounded-lg border border-gray-100 bg-gray-50">
                              <div className="flex-shrink-0 mt-1">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">Website</p>
                                <a 
                                  href={`https://${apiResponse.companyData.data.Basic_Company_Details["Contact Details"].Website}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                  {apiResponse.companyData.data.Basic_Company_Details["Contact Details"].Website}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                     {apiResponse.companyData.data["Legal & Compliance Details"]["List of Directors"].length > 0 && (
                        <div className="md:col-span-2">
                          <p className="text-xs font-medium uppercase text-apple-gray-400">Directors</p>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {apiResponse.companyData.data["Legal & Compliance Details"]["List of Directors"].map((director: Director, index: number) => (
                              <div key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 mt-2 rounded-full bg-gray-300"></div>
                                <div>
                                  <span className="text-sm font-medium text-apple-gray-500">{director.Name}</span>
                                  
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
            

                {/* Legal & Compliance Details */}
                {/* {(apiResponse.companyData.data["Legal_&_Compliance_Details"].ROC_Office !== "0" ||
                  apiResponse.companyData.data["Legal_&_Compliance_Details"].Active_Compliance_Status_MCA21 !== "0" ||
                  apiResponse.companyData.data["Legal_&_Compliance_Details"].List_of_Directors.length > 0) && (
                  <div className="border-b border-apple-gray-100 p-6">
                    <h3 className="text-sm font-semibold text-apple-gray-500 uppercase tracking-wider mb-4">Legal & Compliance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {apiResponse.companyData.data["Legal_&_Compliance_Details"].ROC_Office !== "0" && (
                        <div>
                          <p className="text-xs font-medium uppercase text-apple-gray-400">ROC Office</p>
                          <p className="mt-1 text-sm font-medium text-apple-gray-500">
                            {apiResponse.companyData.data["Legal_&_Compliance_Details"].ROC_Office}
                          </p>
                        </div>
                      )}
                      {apiResponse.companyData.data["Legal_&_Compliance_Details"].Active_Compliance_Status_MCA21 !== "0" && (
                        <div>
                          <p className="text-xs font-medium uppercase text-apple-gray-400">Compliance Status</p>
                          <p className="mt-1 text-sm font-medium text-apple-gray-500">
                            {apiResponse.companyData.data["Legal_&_Compliance_Details"].Active_Compliance_Status_MCA21}
                          </p>
                        </div>
                      )}
                      {apiResponse.companyData.data["Legal_&_Compliance_Details"].List_of_Directors.length > 0 && (
                        <div className="md:col-span-2">
                          <p className="text-xs font-medium uppercase text-apple-gray-400">Directors</p>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {apiResponse.companyData.data["Legal_&_Compliance_Details"].List_of_Directors.map((director: Director, index: number) => (
                              <div key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-400"></div>
                                <div>
                                  <p className="text-sm font-medium text-apple-gray-500">{director.Name}</p>
                                  {director.DIN !== "0" && (
                                    <p className="text-xs text-apple-gray-400">DIN: {director.DIN}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )} */}

                {/* Financial Health Section */}
                {/* {Object.entries(apiResponse.companyData.data["Financial_Health_&_Cash_Rich_Status"]).some(([_, value]) => 
                  typeof value === "object" ? Object.values(value as object).some(v => v !== "0") : value !== "0"
                ) && (
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-apple-gray-500 uppercase tracking-wider mb-4">Financial Health</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(apiResponse.companyData.data["Financial_Health_&_Cash_Rich_Status"]).map(([key, value]) => {
                        if (value !== "0" && typeof value !== "object") {
                          return (
                            <div key={key}>
                              <p className="text-xs font-medium uppercase text-apple-gray-400">{key.replace(/_/g, ' ')}</p>
                              <p className="mt-1 text-sm font-medium text-apple-gray-500">{value as string}</p>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )} */}
              </motion.div>
            </section>
            )}

            {/* Market Data */}
            {apiResponse.marketData && (
              <section>
                <div className="mb-4 flex items-center">
                  <h2 className="text-xl font-medium text-apple-gray-500">Market Insights</h2>
                  <div className="ml-3 h-px flex-1 bg-apple-gray-200"></div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-lg border border-apple-gray-200 bg-white p-4 shadow-sm"
                >
                  {apiResponse.marketData.synthesizedData && (
                    <div className="prose prose-sm max-w-none text-apple-gray-500">
                      <h3 className="text-lg font-medium text-apple-gray-500">Key Market Insights</h3>
                      <div dangerouslySetInnerHTML={{ __html: apiResponse.marketData.synthesizedData.replace(/\n/g, '<br/>') }} />
                    </div>
                  )}
                </motion.div>
              </section>
            )}

            {/* AI Insights */}
            {apiResponse.aiInsights && (
            <section>
              <div className="mb-4 flex items-center">
                  <h2 className="text-xl font-medium text-apple-gray-500">AI Analysis and Recommendations</h2>
                <div className="ml-3 h-px flex-1 bg-apple-gray-200"></div>
              </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-lg border border-apple-gray-200 bg-white p-4 shadow-sm"
                >
                  {apiResponse.aiInsights.synthesizedData && (
                    <div className="prose prose-sm max-w-none text-apple-gray-500">
                      <h3 className="text-lg font-medium text-apple-gray-500">Strategic Insights</h3>
                      <div dangerouslySetInnerHTML={{ __html: apiResponse.aiInsights.synthesizedData.replace(/\n/g, '<br/>') }} />
                    </div>
                  )}
              </motion.div>
            </section>
            )}

            {/* Competitor Analysis */}
            <section className="mt-8">
              <div className="mb-6 flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Competitor Analysis</h2>
                <div className="ml-3 h-px flex-1 bg-gray-200"></div>
              </div>
              <div className="grid gap-8">
                {apiResponse?.CompetitorsEngagement?.map((engagement, index) => (
                  <div key={index} className="rounded-xl border border-gray-200 bg-white">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-4">
                      <h3 className="text-xl font-semibold">
                        {index === 0 ? `JSW Steel vs ${apiResponse.companyData?.data?.Basic_Company_Details?.["Legal Name"]}` : `JSW Steel vs ${engagement?.competitor}`}
                      </h3>
                    </div>
                    
                    {/* Content */}
                    <div className="divide-y divide-gray-100">
                      {/* Price Comparison */}
                      <div className="p-6">
                        <h4 className="mb-4 text-lg font-medium">Price Analysis</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">JSW Steel Price</p>
                            <p className="text-base">{engagement?.priceComparison?.jswSteelPrice ?? "N/A"}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Competitor Price</p>
                            <p className="text-base">{engagement?.priceComparison?.competitorPrice  ?? "N/A"}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Price Difference</p>
                            <p className="text-base">{engagement?.priceComparison?.percentageDifference  ?? "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Market Position */}
                      <div className="p-6">
                        <h4 className="mb-4 text-lg font-medium">Market Position</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Market Share</p>
                            <p className="text-base">{engagement.marketPosition.marketShare   ?? "N/A"}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Regional Strengths</p>
                            <p className="text-base">{engagement.marketPosition.regionalStrengths   ?? "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Product Quality */}
                      <div className="p-6">
                        <h4 className="mb-4 text-lg font-medium">Product Quality</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Quality Certifications</p>
                            <p className="text-base">{engagement.productQuality.qualityCertifications   ?? "N/A"}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Product Range</p>
                            <p className="text-base">{engagement.productQuality.productRangeAvailability  ?? "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Two Column Layout for Delivery & Financial */}
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {/* Delivery Logistics */}
                        <div className="p-6">
                          <h4 className="mb-4 text-lg font-medium">Delivery Logistics</h4>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <p className="text-sm font-medium mb-2">Delivery Timeframes</p>
                              <p className="text-base">{engagement.deliveryLogistics.deliveryTimeframes   ?? "N/A"}</p>
                            </div>
                            <div className="border rounded-lg p-4">
                              <p className="text-sm font-medium mb-2">Geographic Coverage</p>
                              <p className="text-base">{engagement.deliveryLogistics.geographicCoverage   ?? "N/A"}</p>
                            </div>
                          </div>
                        </div>

                        {/* Financial Stability */}
                        <div className="p-6">
                          <h4 className="mb-4 text-lg font-medium">Financial Stability</h4>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <p className="text-sm font-medium mb-2">Credit Terms</p>
                              <p className="text-base">{engagement.financialStability.creditTermsComparison   ?? "N/A"}</p>
                            </div>
                            <div className="border rounded-lg p-4">
                              <p className="text-sm font-medium mb-2">Risk Assessment</p>
                              <p className="text-base">{engagement.financialStability.riskAssessment   ?? "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Strategic Recommendations */}
                      <div className="p-6">
                        <h4 className="mb-4 text-lg font-medium">Strategic Recommendations</h4>
                        <div className="space-y-4">
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Key Differentiators</p>
                            <p className="text-base">{engagement.strategicRecommendations.keyDifferentiators   ?? "N/A"}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Negotiation Leverage Points</p>
                            <p className="text-base">{engagement.strategicRecommendations.negotiationLeveragePoints   ?? "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                ))}
                {(!apiResponse?.CompetitorsEngagement || apiResponse.CompetitorsEngagement.length === 0) && (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                    <p className="text-lg text-gray-500">No competitor analysis available</p>
                  </div>
                )}
              </div>
            </section>

            {/* Alternate Decision Makers */}
            <section>
              <div className="mb-6 flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Additional Decision Makers</h2>
                <div className="ml-3 h-px flex-1 bg-gray-200"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {apiResponse.procurementExecutives && apiResponse.procurementExecutives.results
                  .filter(exec => !exec.error && exec.profileData?.data?.[0])
                  .filter((exec, index, self) => 
                    index === self.findIndex((e) => e.profileUrl === exec.profileUrl)
                  )
                  .map((executive, index) => {
                    const profileData = executive.profileData?.data?.[0];
                    if (!profileData) return null;
                    
                    return (
                      <div key={executive.profileUrl} className="bg-white rounded-lg p-6">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <h3 className="text-lg font-medium text-gray-900">{profileData.fullName}</h3>
                           
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                Procurement Executive
                              </span>
                            </div>
                          </div>
                          <ContactButton profileUrl={executive.profileUrl} />
                        </div>

                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">RELEVANCE</h4>
                            <p className="mt-1 text-sm text-gray-700">
                              Procurement decision maker at {profileData.experiences?.[0]?.subtitle || 'Company'}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">CONTACT</h4>
                            <a 
                              href={executive.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Connect on LinkedIn
                            </a>
                    </div>
                      </div>
                      </div>
                    );
                  })}
                
                {(!apiResponse.linkedInData || apiResponse.linkedInData.results.length <= 1) && 
                 (!apiResponse.procurementExecutives || apiResponse.procurementExecutives.results.filter(exec => !exec.error && exec.profileData?.data?.[0]).length === 0) && (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                    <p className="text-lg text-gray-500">No additional decision makers identified</p>
                    </div>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </div>
    </main>
  );
} 


function setContactInfo(arg0: { email: string[]; phone: string[]; }) {
  throw new Error('Function not implemented.');
}

function setShowContactOptions(arg0: boolean) {
  throw new Error('Function not implemented.');
}

