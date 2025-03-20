'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { FormData, ApiResponse } from '@/types';

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
  { name: 'Essar Steel', selected: false },
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
      
      // Set response data
      setApiResponse(data);
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-apple-gray-50">
      {/* Header */}
      <header className="border-b border-apple-gray-200 bg-white py-6 shadow-sm">
        <div className="mx-auto max-w-5xl px-8">
          <h1 className="text-3xl font-medium tracking-tight text-apple-gray-500">Company Intelligence</h1>
          <p className="mt-1 text-sm text-apple-gray-300">Gather comprehensive insights about your target company</p>
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
                      <h3 className="font-medium text-apple-gray-500">
                        {apiResponse.linkedInData.results[0].profileData?.data?.[0]?.fullName || 
                         apiResponse.linkedInData.results[0].input?.name || 
                         'Name not available'}
                      </h3>
                      <p className="text-xs text-apple-gray-300">
                        {apiResponse.linkedInData.results[0].profileData?.data?.[0]?.headline || 'Title not available'}
                      </p>
                      <a 
                        href={apiResponse.linkedInData.results[0].link || 
                             apiResponse.linkedInData.results[0].profileData?.data?.[0]?.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-1 block text-xs text-blue-500 hover:underline"
                      >
                        View LinkedIn Profile
                      </a>
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
                                  <p className="text-sm font-medium text-apple-gray-500 whitespace-nowrap">{director.Name}</p>
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
                        JSW Steel vs {engagement?.competitor}
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
                            <p className="text-base">{engagement.marketPosition.marketShare}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Regional Strengths</p>
                            <p className="text-base">{engagement.marketPosition.regionalStrengths}</p>
                          </div>
                        </div>
                      </div>

                      {/* Product Quality */}
                      <div className="p-6">
                        <h4 className="mb-4 text-lg font-medium">Product Quality</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Quality Certifications</p>
                            <p className="text-base">{engagement.productQuality.qualityCertifications}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Product Range</p>
                            <p className="text-base">{engagement.productQuality.productRangeAvailability}</p>
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
                              <p className="text-base">{engagement.deliveryLogistics.deliveryTimeframes}</p>
                            </div>
                            <div className="border rounded-lg p-4">
                              <p className="text-sm font-medium mb-2">Geographic Coverage</p>
                              <p className="text-base">{engagement.deliveryLogistics.geographicCoverage}</p>
                            </div>
                          </div>
                        </div>

                        {/* Financial Stability */}
                        <div className="p-6">
                          <h4 className="mb-4 text-lg font-medium">Financial Stability</h4>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4">
                              <p className="text-sm font-medium mb-2">Credit Terms</p>
                              <p className="text-base">{engagement.financialStability.creditTermsComparison}</p>
                            </div>
                            <div className="border rounded-lg p-4">
                              <p className="text-sm font-medium mb-2">Risk Assessment</p>
                              <p className="text-base">{engagement.financialStability.riskAssessment}</p>
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
                            <p className="text-base">{engagement.strategicRecommendations.keyDifferentiators}</p>
                          </div>
                          <div className="border rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Negotiation Leverage Points</p>
                            <p className="text-base">{engagement.strategicRecommendations.negotiationLeveragePoints}</p>
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
            {(apiResponse.linkedInData && apiResponse.linkedInData.results.length > 1) || 
             (apiResponse.procurementExecutives && apiResponse.procurementExecutives.executivesFound > 0) ? (
            <section>
              <div className="mb-6 flex items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Additional Decision Makers</h2>
                <div className="ml-3 h-px flex-1 bg-gray-200"></div>
              </div>
              {/* <div className="grid gap-6">
                {apiResponse.procurementExecutives && apiResponse.procurementExecutives.results
                  .filter(exec => !exec.error && exec.profileData?.data?.[0])
                  // Filter out duplicates based on profile URL
                  .filter((exec, index, self) => 
                    index === self.findIndex((e) => e.profileUrl === exec.profileUrl)
                  )
                  .map((executive, index) => {
                    const profileData = executive.profileData?.data?.[0];
                    if (!profileData) return null;
                    
                    return (
                      <div key={executive.profileUrl} className="rounded-xl border border-gray-200 bg-white">
                        <div className="border-b border-gray-100 p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium">{profileData.fullName}</h3>
                              <p className="mt-1 text-sm text-gray-600">{profileData.headline}</p>
                              <span className="mt-2 inline-block rounded-full border border-gray-200 px-3 py-1 text-sm">
                                Procurement Executive
                              </span>
                            </div>
                            <a 
                              href={executive.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                            >
                              View Profile
                            </a>
                          </div>
                    </div>
                        {profileData.experiences && profileData.experiences.length > 0 && (
                          <div className="p-6">
                            <h4 className="text-sm font-medium mb-2">Current Role</h4>
                            <p className="text-base">
                              {profileData.experiences[0].title}
                              {profileData.experiences[0].subtitle && (
                                <span className="text-gray-600"> at {profileData.experiences[0].subtitle}</span>
                              )}
                            </p>
                      </div>
                        )}
                      </div>
                    );
                  })}
                
                {(!apiResponse.linkedInData || apiResponse.linkedInData.results.length <= 1) && 
                 (!apiResponse.procurementExecutives || apiResponse.procurementExecutives.results.filter(exec => !exec.error && exec.profileData?.data?.[0]).length === 0) && (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center">
                    <p className="text-lg text-gray-500">No additional decision makers identified</p>
                    </div>
                )}
              </div> */}
            </section>
            ) : null}

            {/* Procurement Executives */}
            {apiResponse.procurementExecutives && apiResponse.procurementExecutives.results && (
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-medium text-apple-gray-500">Procurement Executives</h2>
                  <div className="ml-3 h-px flex-1 bg-apple-gray-200"></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {apiResponse.procurementExecutives.results
                    .filter(exec => !exec.error && exec.profileData?.data?.[0])
                    // Filter out duplicates based on profile URL
                    .filter((exec, index, self) => 
                      index === self.findIndex((e) => e.profileUrl === exec.profileUrl)
                    )
                    .map((executive, index) => {
                      const profileData = executive.profileData?.data?.[0];
                      if (!profileData) return null;
                      
                      return (
                        <motion.div
                          key={executive.profileUrl} // Use profile URL as key instead of index
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="overflow-hidden rounded-lg border border-apple-gray-200 bg-white shadow-sm hover:shadow-md"
                        >
                          <div className="border-b border-apple-gray-100 bg-apple-gray-50 px-4 py-3">
                            <h3 className="font-medium text-apple-gray-500">
                              {profileData.fullName}
                            </h3>
                            <p className="text-xs text-apple-gray-300">
                              {profileData.headline}
                            </p>
                            <a 
                              href={executive.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 block text-xs text-blue-500 hover:underline"
                            >
                              View Profile
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </section>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
} 