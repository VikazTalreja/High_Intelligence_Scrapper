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

// Add mock responses at the top after imports
const mockCompetitorAnalysis = {
  competitor: "TATA Steel",
  priceComparison: {
    jswSteelPrice: "₹750/ton",
    competitorPrice: "₹780/ton",
    percentageDifference: "-4%"
  },
  marketPosition: {
    marketShare: "28%",
    regionalStrengths: "Strong presence in Eastern and Northern India"
  },
  productQuality: {
    qualityCertifications: "ISO 9001, ISO 14001",
    productRangeAvailability: "Wide range of flat and long products"
  },
  deliveryLogistics: {
    deliveryTimeframes: "3-5 business days",
    geographicCoverage: "Pan-India with strong Eastern presence"
  },
  financialStability: {
    creditTermsComparison: "Net 45 days",
    riskAssessment: "Low Risk"
  },
  strategicRecommendations: {
    keyDifferentiators: "Superior product quality, established brand",
    negotiationLeveragePoints: "Volume-based discounts, long-term contracts"
  }
};

const mockApiResponse = {
  "success": true,
  "timestamp": "2025-03-22T07:49:31.367Z",
  "formData": {
      "companyName": "Afcrons Infrastruture",
      "keyDecisionMakers": [
          "PAVAN GAVADE"
      ],
      "projectDetails": "TMT ",
      "competitors": [
          {
              "name": "TATA Steel",
              "selected": false
          },
          {
              "name": "JSPL",
              "selected": false
          },
          {
              "name": "SAIL",
              "selected": true
          },
          {
              "name": "Arcelor Mittal/Nippon Steel (AM/NS)",
              "selected": false
          }
      ],
      "industry": "Technology"
  },
  "linkedInData": {
      "success": true,
      "count": 1,
      "company": "Afcrons Infrastruture",
      "results": [
          {
              "input": {
                  "name": "PAVAN GAVADE"
              },
              "company": "Afcrons Infrastruture",
              "searchQuery": "PAVAN GAVADE \"Afcrons Infrastruture\" LinkedIn",
              "error": "No search results found"
          }
      ]
  },
  "companyData": {
      "success": true,
      "companyName": "Afcrons Infrastruture",
      "data": {
          "Basic_Company_Details": {
              "Legal Name": "Afcons Infrastructure Limited",
              "Trading Name": "Afcons Infrastructure",
              "CIN": "INE101I01011",
              "Registration Date": "1959",
              "Company Type": "Public Ltd",
              "Industry": "Engineering & Construction",
              "Registered Office": "Mumbai, Maharashtra",
              "Headquarters": "Mumbai, Maharashtra",
              "Contact Details": {
                  "Phone": "91 22 6719 1214",
                  "Email": "Not Available",
                  "Website": "afcons.com"
              },
              "Parent Company": "Goswami Infratech Private Limited",
              "Subsidiaries or Joint Ventures": "Not Available"
          },
          "Legal & Compliance Details": {
              "GSTIN": "Not Available",
              "PAN": "Not Available",
              "TAN": "Not Available",
              "MSME/Startup India Status": "Not Available",
              "ROC Office": "Mumbai",
              "Active Compliance Status": "Active",
              "Pending Litigations/Defaults": "Not Available",
              "List of Directors": [
                  {
                      "Name": "Paramasivan Srinivasan",
                      "DIN": "Not Available"
                  },
                  {
                      "Name": "Subramanian Krishnamurthy",
                      "DIN": "Not Available"
                  },
                  {
                      "Name": "Giridhar Rajagopalan",
                      "DIN": "Not Available"
                  }
              ],
              "Promoters": "Not Available",
              "CEO": "Paramasivan Srinivasan",
              "CFO": "Ramesh Kumar Jha"
          },
          "Financial Health & Cash-Rich Status": {
              "Cash Reserves": 0,
              "Cash Flow": {
                  "Operating": 0,
                  "Investing": 0,
                  "Financing": 0
              },
              "Cash Ratios": {
                  "Cash Ratio": 0,
                  "Free Cash Flow": 0
              },
              "Cash-Rich Status": "Not Available",
              "Revenue": 0,
              "Net Profit": 0,
              "Debt-to-Equity Ratio": 0,
              "Credit Rating": "Not Available",
              "Stock Data": {
                  "BSE/NSE Symbol": "AFCONS",
                  "Market Cap": 0,
                  "Promoter Holdings": 0,
                  "FII Holdings": 0
              }
          },
          "Top 3 Most Recent Big News": [
              {
                  "headline": "0",
                  "date": "00-00-0000",
                  "source": "0",
                  "impact": "0"
              },
              {
                  "headline": "0",
                  "date": "00-00-0000",
                  "source": "0",
                  "impact": "0"
              },
              {
                  "headline": "0",
                  "date": "00-00-0000",
                  "source": "0",
                  "impact": "0"
              }
          ]
      }
  },
  "marketData": null,
  "aiInsights": null,
  "procurementExecutives": {
      "success": true,
      "companyName": "Afcrons Infrastruture",
      "executivesFound": 8,
      "results": [
          {
              "query": "Afcrons Infrastruture Chief Procurement Officer LinkedIn",
              "title": "Pavan Gavade - Procurement Manager - AFCONS Infrastructure ...",
              "profileUrl": "https://in.linkedin.com/in/pavan-gavade-65259156",
              "profileData": {
                  "success": true,
                  "data": [
                      {
                          "firstName": "Pavan",
                          "lastName": "Gavade",
                          "fullName": "Pavan Gavade",
                          "publicIdentifier": "pavan-gavade-65259156",
                          "headline": "Manager- Procurement",
                          "connections": 852,
                          "followers": 873,
                          "openConnection": false,
                          "urn": "ACoAAAvU_14BVWnI83KPrLsDwT1L-XPzDIOnXFo",
                          "addressCountryOnly": "India",
                          "addressWithCountry": "Mumbai, Maharashtra, India",
                          "addressWithoutCountry": "Mumbai, Maharashtra",
                          "profilePic": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730109017284?e=1747872000&v=beta&t=c7fUwWRBylkK6dqzgTFiyjbyFHAA6Z4z4Y9gc6xldmI",
                          "profilePicAllDimensions": [
                              {
                                  "width": 100,
                                  "height": 100,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730109017284?e=1747872000&v=beta&t=c7fUwWRBylkK6dqzgTFiyjbyFHAA6Z4z4Y9gc6xldmI"
                              },
                              {
                                  "width": 200,
                                  "height": 200,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730109017284?e=1747872000&v=beta&t=sAiw8Q6oVVoTBILUSzLj3dr3FXwRfgLYEdd8PlWY_9o"
                              },
                              {
                                  "width": 400,
                                  "height": 400,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730109017284?e=1747872000&v=beta&t=dY_F3H1YKjw5gVu5siofmUGOaglxvY2zJCKd7X2dtPk"
                              },
                              {
                                  "width": 800,
                                  "height": 800,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730109017318?e=1747872000&v=beta&t=YRCaj4_m4xHS7y-JX9mXKBN0EcHTdv6LH5_bRgqyil0"
                              }
                          ],
                          "updates": [],
                          "experiences": [
                              {
                                  "companyId": "220266",
                                  "companyUrn": "urn:li:fsd_company:220266",
                                  "companyLink1": "https://www.linkedin.com/company/220266/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D560BAQGOO03Tjy6Tkw/company-logo_200_200/company-logo_200_200/0/1730973766831/afcons_infrastructure_limited_logo?e=1747872000&v=beta&t=r5QYJ3bjV-_t6zTqRkR80luC7g0D76WBCfCAAkXqDUY",
                                  "title": "AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company",
                                  "subtitle": "5 yrs 7 mos",
                                  "caption": "Mumbai",
                                  "breakdown": true,
                                  "subComponents": [
                                      {
                                          "title": "Procurement Manager",
                                          "subtitle": "Full-time",
                                          "caption": "Apr 2022 - Present · 3 yrs",
                                          "description": []
                                      },
                                      {
                                          "title": "Senior Engineer Procurement",
                                          "caption": "Sep 2019 - Mar 2022 · 2 yrs 7 mos",
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyLink1": "https://www.linkedin.com/search/results/all/?keywords=Leena+Powertech+Engineers+Pvt+Ltd",
                                  "title": "Supply Chain Executive",
                                  "subtitle": "Leena Powertech Engineers Pvt Ltd",
                                  "caption": "Dec 2016 - Aug 2018 · 1 yr 9 mos",
                                  "metadata": "Navi Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "•\tHandling the overall supply chain operations for electrical distribution projects including power distribution, railway distribution, building distribution etc.\n•\tManaging the process flow starting after manufacturing clearance till receipt of material\n•\tCoordinate between supplier, project team and account team for smooth operations.\n•\tMaintain the material track and records at different stages of progress.\n•\tFollow up and provide requisites for keep moving the supply chain activities.\n•\tFollow up for inspection call from vendor and nomination from client.\n•\tArrange the inspection call and follow for reports after inspection.\n•\tFollow up for dispatch clearance from client and provide internal dispatch clearance to supplier.\n•\tKeep tracking of payment status of supplier.\n•\tCoordinate for invoice, Road permit and transport activities till unloading of material at site and Keep tracking of short shipment.\n•\tIdentify and develop potential vendor for better work flow.\n•\tLeading the review meeting with precise track record and general plan with respect to particular project.\n•\tIdentify and coordinate to solve technical queries with supplier and project team.\n•\tUnderstand and decide priority to maintain the continuous customer delight with respect to project."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "673332",
                                  "companyUrn": "urn:li:fsd_company:673332",
                                  "companyLink1": "https://www.linkedin.com/company/673332/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C560BAQEI-p90YR6s5g/company-logo_200_200/company-logo_200_200/0/1631301844703?e=1747872000&v=beta&t=MQFljsfY3l3azIMu3cj9vK5vegz-V9fSKJ19WjkkoNE",
                                  "title": "Executive Engineer- Procurement",
                                  "subtitle": "Petron Engineering Construction Ltd",
                                  "caption": "Jul 2014 - Sep 2016 · 2 yrs 3 mos",
                                  "metadata": "Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsible for commodity purchase of steel,paints,consumables, rate approvals at site and subcontracting, while working of overall ongoing projects like GAIL PATA, IOCL PARADIP, RIL JAMNAGAR,UTCL NAGPUR, NTPC KUDGI and VINDYACHAL etc."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "1802855",
                                  "companyUrn": "urn:li:fsd_company:1802855",
                                  "companyLink1": "https://www.linkedin.com/company/1802855/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQHXWXNnaR7CJw/company-logo_200_200/company-logo_200_200/0/1646051066232/fabtechprojects_logo?e=1747872000&v=beta&t=8B2P5zyCqNjwZFbshk4sUtwFU_EP2W8E5YU575SogVU",
                                  "title": "Procurement Executive",
                                  "subtitle": "Fabtech Projects & Engineers Ltd.",
                                  "caption": "Feb 2012 - Jun 2014 · 2 yrs 5 mos",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsible for overall Purchase Activities related to SRU HPCL VIZAG REFINERY Project, including  all Mechanical,Civil,Electrical, Instrumentation and consumable items."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "educations": [
                              {
                                  "companyId": "13403581",
                                  "companyUrn": "urn:li:fsd_company:13403581",
                                  "companyLink1": "https://www.linkedin.com/company/13403581/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQH5Z1bfjM-2Xg/company-logo_200_200/company-logo_200_200/0/1736415172069/sinhgad_institute_of_business_administration_and_research_logo?e=1747872000&v=beta&t=Trx_wO8ydhGgkG5FPXggSOrKYRdbrue2FKeZ7I9W6JI",
                                  "title": "Sinhgad Institute of Business Administration and Research",
                                  "subtitle": "Master of Business Administration (MBA), Operations",
                                  "caption": "2010 - 2012",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyId": "375731",
                                  "companyUrn": "urn:li:fsd_company:375731",
                                  "companyLink1": "https://www.linkedin.com/company/375731/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQFCDkWlYRRDWQ/company-logo_200_200/company-logo_200_200/0/1667976723013/shivaji_university_logo?e=1747872000&v=beta&t=QUm8JmJ_wN_K8AGrE_wz7Pl6oJItYEFo_bXghyQI7JQ",
                                  "title": "Shivaji University",
                                  "subtitle": "Bachelor of Engineering (BE), Mechanical",
                                  "caption": "2005 - 2009",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "licenseAndCertificates": [],
                          "honorsAndAwards": [],
                          "languages": [],
                          "volunteerAndAwards": [],
                          "verifications": [],
                          "promos": [],
                          "highlights": [],
                          "projects": [
                              {
                                  "title": "HPCL SRU,Visakhapatnam",
                                  "subtitle": "Nov 2012 - Present",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Associated with Fabtech Projects & Engineers Ltd."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "publications": [],
                          "patents": [],
                          "courses": [],
                          "testScores": [],
                          "organizations": [],
                          "volunteerCauses": [],
                          "skills": [
                              {
                                  "title": "Change Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Operations",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Leadership",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Evaluation",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Budgeting",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Dispute Resolution",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Customer Relationship Management (CRM)",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Optimization",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Resolving Issues",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Logistics Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Source to Pay",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Purchase Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Oil and Gas",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences across Petron Engineering Construction Ltd and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "9 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Team Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "10 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Manufacturing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Talent Acquisition",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "1 endorsement"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Project Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730109017318?e=1747872000&v=beta&t=YRCaj4_m4xHS7y-JX9mXKBN0EcHTdv6LH5_bRgqyil0",
                          "linkedinUrl": "https://in.linkedin.com/in/pavan-gavade-65259156",
                          "email": "pavan.gavade@afcons.com",
                          "companyName": "Afcons Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "companyIndustry": "Construction",
                          "companyWebsite": "afcons.com",
                          "companyLinkedin": "linkedin.com/company/afcons-infrastructure-limited",
                          "companyFoundedIn": 1959,
                          "companySize": "1001-5000"
                      }
                  ]
              }
          },
          {
              "query": "Afcrons Infrastruture CPO LinkedIn",
              "title": "Ramesh K Jha - AFCONS Infrastructure Limited - LinkedIn",
              "profileUrl": "https://in.linkedin.com/in/ramesh-k-jha-a3435a6",
              "profileData": {
                  "success": true,
                  "data": [
                      {
                          "firstName": "Ramesh K",
                          "lastName": "Jha",
                          "fullName": "Ramesh K Jha",
                          "publicIdentifier": "ramesh-k-jha-a3435a6",
                          "headline": "CFO || Fellow IIM || MDI || CMA",
                          "connections": 2070,
                          "followers": 2253,
                          "openConnection": false,
                          "urn": "ACoAAAEeokgBvSZ2mNf8LR1XTi7l9_CdG1u3FwU",
                          "addressCountryOnly": "India",
                          "addressWithCountry": "Mumbai, Maharashtra, India",
                          "addressWithoutCountry": "Mumbai, Maharashtra",
                          "profilePic": "https://media.licdn.com/dms/image/v2/D4D03AQE7lizU0_zHdQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1708866919087?e=1747872000&v=beta&t=sGdPeKd6PtZrt6haSDj7uNXUU8-BDEuGrg2QUnziYNU",
                          "profilePicAllDimensions": [
                              {
                                  "width": 100,
                                  "height": 100,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQE7lizU0_zHdQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1708866919087?e=1747872000&v=beta&t=sGdPeKd6PtZrt6haSDj7uNXUU8-BDEuGrg2QUnziYNU"
                              },
                              {
                                  "width": 200,
                                  "height": 200,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQE7lizU0_zHdQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1708866919087?e=1747872000&v=beta&t=FFZphzkf318b5biKIIMKwYlIK0Wt5W273kPQeUkBG34"
                              },
                              {
                                  "width": 400,
                                  "height": 400,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQE7lizU0_zHdQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1708866919087?e=1747872000&v=beta&t=QjF1H-gzyI1SNI1A6gHiMzYyMT83SOLt1uFhsD2KZdA"
                              },
                              {
                                  "width": 800,
                                  "height": 800,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQE7lizU0_zHdQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708866919087?e=1747872000&v=beta&t=VcEHzRyAHBWVIguSx2H6LXuY-0rYchlCqpxF2GlIzIc"
                              }
                          ],
                          "updates": [],
                          "about": "An accomplished Finance Professional with 25 Years' experience in Construction Industry.  Rich experience of working in Accounts, Corporate Finance, Commercials, Budgeting, Treasury, and Insurance in Construction Industry. Has extensively worked on Fund Raising in domestic as well as International markets. Successfully handled almost all the facets of Finance Function of a Construction Company.\n\nSince 2006 has been associated with Afcons in various leadership role. Prior to association with AFCONS, has worked with HCC Ltd for nearly 7 years. \n\nA Certified Management Accountant (CMA) from ICMA, Australia, MBA from MDI, Gurgaon and FPM equivalent to PhD from IIM Indore.",
                          "experiences": [
                              {
                                  "companyId": "220266",
                                  "companyUrn": "urn:li:fsd_company:220266",
                                  "companyLink1": "https://www.linkedin.com/company/220266/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D560BAQGOO03Tjy6Tkw/company-logo_200_200/company-logo_200_200/0/1730973766831/afcons_infrastructure_limited_logo?e=1747872000&v=beta&t=r5QYJ3bjV-_t6zTqRkR80luC7g0D76WBCfCAAkXqDUY",
                                  "title": "AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company",
                                  "subtitle": "19 yrs 2 mos",
                                  "breakdown": true,
                                  "subComponents": [
                                      {
                                          "title": "Chief Financial Officer",
                                          "subtitle": "Full-time",
                                          "caption": "Feb 2006 - Present · 19 yrs 2 mos",
                                          "metadata": "Mumbai, Maharashtra, India",
                                          "description": []
                                      },
                                      {
                                          "title": "Vice President",
                                          "subtitle": "Full-time",
                                          "caption": "Feb 2006 - Mar 2023 · 17 yrs 2 mos",
                                          "metadata": "Mumbai, Maharashtra, India",
                                          "description": []
                                      },
                                      {
                                          "title": "General Manager Finance",
                                          "caption": "Feb 2006 - Mar 2020 · 14 yrs 2 mos",
                                          "metadata": "Mumbai, Maharashtra, India",
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyId": "51846",
                                  "companyUrn": "urn:li:fsd_company:51846",
                                  "companyLink1": "https://www.linkedin.com/company/51846/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C560BAQGxz_ZEz8T0eQ/company-logo_200_200/company-logo_200_200/0/1631314721762?e=1747872000&v=beta&t=0Kiy1gYf-uXh1nNZxk49ynX02CYagJzFdjjhAGvUcQ8",
                                  "title": "Finance Manager",
                                  "subtitle": "Hindustan Construction Company",
                                  "caption": "Aug 1998 - Jan 2006 · 7 yrs 6 mos",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "educations": [
                              {
                                  "companyId": "157277",
                                  "companyUrn": "urn:li:fsd_company:157277/",
                                  "companyLink1": "https://www.linkedin.com/company/157277/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQGdKJfc9yaUFw/company-logo_200_200/company-logo_200_200/0/1664770910003/iimindore_logo?e=1747872000&v=beta&t=PYw-6lKyM2G2F5IL_VXK0t0CN1YCF2794-H-w3PZ8IU",
                                  "title": "Indian Institute of Management, Indore",
                                  "subtitle": "Doctor of Philosophy (Ph.D.), Finance - FPM (Industry)",
                                  "caption": "2014 - 2019",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyId": "9265606",
                                  "companyUrn": "urn:li:fsd_company:9265606/",
                                  "companyLink1": "https://www.linkedin.com/company/9265606/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C560BAQE7dyP7LuVSAw/company-logo_200_200/company-logo_200_200/0/1658198321192/cma_australia_logo?e=1747872000&v=beta&t=MC5rLcdtsiIDAmuQuKvwTNSYrFJjrlCBTlt990BBWyo",
                                  "title": "Institute of Certified Management Accountants, Australia",
                                  "subtitle": "Certified Management Accountant (CMA), Accounting and Finance",
                                  "caption": "2017 - 2018",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Grade: 1"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "licenseAndCertificates": [],
                          "honorsAndAwards": [],
                          "languages": [],
                          "volunteerAndAwards": [],
                          "verifications": [],
                          "promos": [],
                          "highlights": [],
                          "projects": [],
                          "publications": [],
                          "patents": [],
                          "courses": [],
                          "testScores": [],
                          "organizations": [],
                          "volunteerCauses": [],
                          "interests": [
                              {
                                  "section_name": "Top Voices",
                                  "section_components": [
                                      {
                                          "titleV2": "Narendra Modi",
                                          "caption": "4,658,579 followers",
                                          "subtitle": "Prime Minister of India",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/in/narendramodi",
                                          "subComponents": []
                                      }
                                  ]
                              },
                              {
                                  "section_name": "Companies",
                                  "section_components": [
                                      {
                                          "titleV2": "Hewlett Packard Enterprise",
                                          "caption": "3,665,366 followers",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/company/1025/",
                                          "subComponents": []
                                      },
                                      {
                                          "titleV2": "Microsoft",
                                          "caption": "25,083,980 followers",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/company/1035/",
                                          "subComponents": []
                                      }
                                  ]
                              },
                              {
                                  "section_name": "Groups",
                                  "section_components": [
                                      {
                                          "titleV2": "Jha/Maithils-Global Professional Community",
                                          "caption": "8,508 members",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/groups/2742325",
                                          "subComponents": []
                                      },
                                      {
                                          "titleV2": "Indian Institute of Management Indore Alumni Association",
                                          "caption": "1,696 members",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/groups/13860903",
                                          "subComponents": []
                                      }
                                  ]
                              },
                              {
                                  "section_name": "Schools",
                                  "section_components": [
                                      {
                                          "titleV2": "Heramba Chandra College",
                                          "caption": "3,757 followers",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/school/15112854/",
                                          "subComponents": []
                                      },
                                      {
                                          "titleV2": "Management Development Institute, Gurgaon",
                                          "caption": "55,218 followers",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/school/397797/",
                                          "subComponents": []
                                      }
                                  ]
                              }
                          ],
                          "recommendations": [
                              {
                                  "section_name": "Received",
                                  "section_components": []
                              },
                              {
                                  "section_name": "Given",
                                  "section_components": [
                                      {
                                          "titleV2": "Siddhartha Dey",
                                          "caption": "January 14, 2010, Siddhartha was senior to Ramesh K but didn't manage Ramesh K directly",
                                          "subtitle": "Head - Commercial Management | Addl Director on Board HCC Contract Solutions Ltd\nInfrastructure | P&L | Hydro | Airports | Logistics | Real Estate | Project Management and Delivery specialist | Strategy | Risk Mitigation",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/in/deysiddhartha",
                                          "image": "https://media.licdn.com/dms/image/v2/D4D03AQHTLEqy4z2nkw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1724612253542?e=1747872000&v=beta&t=BWXQ_BBX43nTgzBdRGmWNArL4K57sdiMlbx2NPUuC6I",
                                          "subComponents": [
                                              {
                                                  "fixedListComponent": [
                                                      {
                                                          "type": "textComponent",
                                                          "text": "Siddhu Da was a prominent figure in HCC, when it came to Planning & Budgeting. His in depth knowledge of construction industry, project management skills and professional approach use to make us admire him."
                                                      }
                                                  ]
                                              }
                                          ]
                                      },
                                      {
                                          "titleV2": "Capt Vipul Choudhary",
                                          "caption": "January 5, 2010, Ramesh K worked with Capt Vipul but on different teams",
                                          "subtitle": "AIFs ; Real Estate ; Distribution ; Technology",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/in/capt-vipul-choudhary-4991064",
                                          "image": "https://media.licdn.com/dms/image/v2/D4E03AQHF526wzBKL5g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1664548142302?e=1747872000&v=beta&t=6F5kgDcxVvBbj2ahMDmfcqqTpiOogm1XbgbAmseDgZc",
                                          "subComponents": [
                                              {
                                                  "fixedListComponent": [
                                                      {
                                                          "type": "textComponent",
                                                          "text": "Vipul is different from the league, Intelligent and an Impressive person with excellent communication skills"
                                                      }
                                                  ]
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "skills": [
                              {
                                  "title": "Corporate Finance",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Endorsed by Rakesh Kabra who is highly skilled at this"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Endorsed by 7 colleagues at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "17 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Syndications",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Ahamad Jani (MBA-Finance) has given an endorsement for this skill"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "1 endorsement"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Finance",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Endorsed by 6 colleagues at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Endorsed by 1 person in the last 6 months"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "12 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Contract Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "9 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Budgets",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "4 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "MIS",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "4 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/D4D03AQE7lizU0_zHdQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708866919087?e=1747872000&v=beta&t=VcEHzRyAHBWVIguSx2H6LXuY-0rYchlCqpxF2GlIzIc",
                          "linkedinUrl": "https://in.linkedin.com/in/ramesh-k-jha-a3435a6",
                          "email": "rameshjha@afcons.com",
                          "companyName": "Afcons Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "companyIndustry": "Construction",
                          "companyWebsite": "afcons.com",
                          "companyLinkedin": "linkedin.com/company/afcons-infrastructure-limited",
                          "companyFoundedIn": 1959,
                          "companySize": "1001-5000"
                      }
                  ]
              }
          },
          {
              "query": "Afcrons Infrastruture Chief Supply Chain Officer LinkedIn",
              "title": "Kunwardeep Sharma - Project SCM Head - AFCONS Infrastructure ...",
              "profileUrl": "https://in.linkedin.com/in/kunwardeep-sharma-87188b27",
              "profileData": {
                  "success": true,
                  "data": [
                      {
                          "firstName": "Kunwardeep",
                          "lastName": "Sharma",
                          "fullName": "Kunwardeep Sharma",
                          "publicIdentifier": "kunwardeep-sharma-87188b27",
                          "headline": "Project SCM Head at Afcons Infrastructure Ltd - A Shapoorji Pallonji Group Company",
                          "connections": 296,
                          "followers": 369,
                          "openConnection": false,
                          "urn": "ACoAAAWlpxUBSN_Q5eKDFgV8L8nyB4NKMsrY4wE",
                          "addressCountryOnly": "India",
                          "addressWithCountry": "New Delhi, Delhi, India",
                          "addressWithoutCountry": "New Delhi, Delhi",
                          "profilePic": "https://media.licdn.com/dms/image/v2/D5603AQF41chTM91_Jg/profile-displayphoto-shrink_100_100/B56ZRbNmoQGQAU-/0/1736697081559?e=1747872000&v=beta&t=bwXFiH_HFEJSoizFcLcjIQ7woC45LDQn5HRmhtgMSaA",
                          "profilePicAllDimensions": [
                              {
                                  "width": 100,
                                  "height": 100,
                                  "url": "https://media.licdn.com/dms/image/v2/D5603AQF41chTM91_Jg/profile-displayphoto-shrink_100_100/B56ZRbNmoQGQAU-/0/1736697081559?e=1747872000&v=beta&t=bwXFiH_HFEJSoizFcLcjIQ7woC45LDQn5HRmhtgMSaA"
                              },
                              {
                                  "width": 400,
                                  "height": 400,
                                  "url": "https://media.licdn.com/dms/image/v2/D5603AQF41chTM91_Jg/profile-displayphoto-shrink_400_400/B56ZRbNmoQGQAg-/0/1736697081559?e=1747872000&v=beta&t=U27CmYpkOYvGcKNSjRCX5iW69u9Y2UP_YOs2vUqLwwE"
                              },
                              {
                                  "width": 200,
                                  "height": 200,
                                  "url": "https://media.licdn.com/dms/image/v2/D5603AQF41chTM91_Jg/profile-displayphoto-shrink_200_200/B56ZRbNmoQGQAY-/0/1736697081559?e=1747872000&v=beta&t=vQyv0ubAhsxzvtjXsjenC5zraoNSWrSsmjHnGGVi0rU"
                              },
                              {
                                  "width": 800,
                                  "height": 800,
                                  "url": "https://media.licdn.com/dms/image/v2/D5603AQF41chTM91_Jg/profile-displayphoto-shrink_800_800/B56ZRbNmoQGQAc-/0/1736697081557?e=1747872000&v=beta&t=oK7sIYRCy4_yVb-Fs005kS-L-EU6KC1e2S2rZRI7j7s"
                              }
                          ],
                          "updates": [],
                          "about": "Seasoned procurement and logistics professional with over 18 years of experience across a diverse range of EPC (Engineering, Procurement, and Construction) projects. I hold a B.Tech in Mechanical Engineering and a Postgraduate Diploma in Supply Chain Management. This Diploma in Supply Chain Management from CII Institute of logistics thru Indian Institute of Material Management was completed at times when concept of SCM was new to Indian industry.Throughout my career, I have contributed to projects in the fields of bridges, tunnels (NATM), buildings, roads, and underground metro projects like DMRC-DC07, both in India and the Middle East. Over the years, I have developed a deep understanding of the complexities of procurement, logistics, and operations management.Presently acting as SCM Head at Afcons Infrastructure Ltd in DC07 DMRC project for underground TBM Tunnel works.\n",
                          "experiences": [
                              {
                                  "companyId": "220266",
                                  "companyUrn": "urn:li:fsd_company:220266",
                                  "companyLink1": "https://www.linkedin.com/company/220266/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D560BAQGOO03Tjy6Tkw/company-logo_200_200/company-logo_200_200/0/1730973766831/afcons_infrastructure_limited_logo?e=1747872000&v=beta&t=r5QYJ3bjV-_t6zTqRkR80luC7g0D76WBCfCAAkXqDUY",
                                  "title": "AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company",
                                  "subtitle": "18 yrs 9 mos",
                                  "breakdown": true,
                                  "subComponents": [
                                      {
                                          "title": "Project SCM Head",
                                          "subtitle": "Full-time",
                                          "caption": "Feb 2022 - Present · 3 yrs 2 mos",
                                          "metadata": "New Delhi, Delhi, India · On-site",
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": ". Developing and Implementing strategies  to reduce costs of SCM transactions.\n. Planning and executing infrastructure of warehouses at different project locations for smooth SCM implementation.\n. Leading procurement and warehousing functions for implementation of best practices in SCM.\n. Negotiating SCM transactions for value addition in SCM functions.\n• Monitoring coordination between Procurement, site planning , design , Stores and Logistics for proper implementation of SCM."
                                              }
                                          ]
                                      },
                                      {
                                          "title": "Manager SCM (1 st Level)",
                                          "subtitle": "Full-time",
                                          "caption": "Jul 2018 - Feb 2022 · 3 yrs 8 mos",
                                          "metadata": "Kullu( Himachal Pradesh) · On-site",
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsibility:\n \n• Leading a purchase team for all site related material required for smooth procurement function through SAP MM module with best negotiations.\n\n• Vendor development targeting regions Chandigarh, Delhi, Pathankot, Ludhiana.\n• Handling Site Coordination with HO centralized procurement & HO Logistics for bulk material and material under HO Rate Contracts.\n• Handling regional transport Union and managing dispatches from site.\n• Fixing of part load transporters in regions of Himachal, Chandigarh and Delhi for smooth and timely material inflow as per sites requirements.\n• Monitoring coordination between Procurement, Stores and Logistics for proper implementation of SCM."
                                              }
                                          ]
                                      },
                                      {
                                          "title": "Dy Manager - SCM",
                                          "subtitle": "Full-time",
                                          "caption": "Nov 2014 - Jul 2018 · 3 yrs 9 mos",
                                          "metadata": "Etawah Area, India · On-site",
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Leading procurement function for Agra Lucknow Expressway Greenfield project (package II)  after   generating an efficient and effective vendor base as it is Afcons first venture in UP region. Establishing an online UP entry form generation cell and fixing of transportation lines for smooth flow of material.\nUnderstanding of tax benefits to the project as per contract terms and minimizing landed rates by persuading  negotiations and procuring from regions with lower taxes and minimum freights.\n"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "educations": [
                              {
                                  "companyId": "13284130",
                                  "companyUrn": "urn:li:fsd_company:13284130",
                                  "companyLink1": "https://www.linkedin.com/company/13284130/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQHWwFtj0iomyA/company-logo_200_200/company-logo_200_200/0/1631310739200?e=1747872000&v=beta&t=t8hH4Yz7Lf1q29I_YTVLr5C9TFm6s85sRChw6d4g0k8",
                                  "title": "Indian Institute of Materials Management, Mumbai",
                                  "subtitle": "Post Graduate Diploma In supply Chain Management (CII Institute of Logistics), Logistics, Transportation and Material Management",
                                  "caption": "Jul 2008 - Jul 2010",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Grade: A"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyLink1": "https://www.linkedin.com/search/results/all/?keywords=Inderprastha+Engineering+College+%28IPEC%2C+Sahibabad%29",
                                  "title": "Inderprastha Engineering College (IPEC, Sahibabad)",
                                  "subtitle": "Bachelor of Technology (B.Tech.), Mechanical Engineering",
                                  "caption": "2002 - 2006",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Grade: A"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Activities and societies: Technical paper presentations, Seminars, Industrial visits (BHEL Haridwar, NPL Delhi, Maruti Udhyog Gurgaon, NFL Sonipat) and trainings."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "licenseAndCertificates": [
                              {
                                  "companyId": "162834",
                                  "companyUrn": "urn:li:fsd_company:162834",
                                  "companyLink1": "https://www.linkedin.com/company/162834/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQEVKSA5-tbKwQ/company-logo_200_200/company-logo_200_200/0/1713518738324/bureau_veritas_group_logo?e=1747872000&v=beta&t=McGtTVHqJhKWbsNtkv8NiGXVfyrpa960MkTFwraM5PA",
                                  "title": "Internal auditor",
                                  "subtitle": "Bureau Veritas Group",
                                  "caption": "Issued Sep 2007",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "honorsAndAwards": [],
                          "languages": [],
                          "volunteerAndAwards": [],
                          "verifications": [],
                          "promos": [],
                          "highlights": [],
                          "projects": [],
                          "publications": [],
                          "patents": [],
                          "courses": [],
                          "testScores": [],
                          "organizations": [],
                          "volunteerCauses": [],
                          "interests": [
                              {
                                  "section_name": "Top Voices",
                                  "section_components": [
                                      {
                                          "titleV2": "Tom Mills",
                                          "caption": "91,318 followers",
                                          "subtitle": "Get 1% smarter at Procurement every week | Join 15,000+ newsletter subscribers | Link below (it's free)👇",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/in/tom-mills-procurement",
                                          "subComponents": []
                                      }
                                  ]
                              },
                              {
                                  "section_name": "Companies",
                                  "section_components": [
                                      {
                                          "titleV2": "Confederation of Indian Industry",
                                          "caption": "190,517 followers",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/company/10792/",
                                          "subComponents": []
                                      },
                                      {
                                          "titleV2": "Genpact",
                                          "caption": "4,819,864 followers",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/company/210064/",
                                          "subComponents": []
                                      }
                                  ]
                              },
                              {
                                  "section_name": "Groups",
                                  "section_components": [
                                      {
                                          "titleV2": "India Logistics & Supply Chain - Leadership Professional's Group",
                                          "caption": "71,812 members",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/groups/4098562",
                                          "subComponents": []
                                      },
                                      {
                                          "titleV2": "Supply Chain & Logistics Management",
                                          "caption": "959,459 members",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/groups/2446684",
                                          "subComponents": []
                                      }
                                  ]
                              },
                              {
                                  "section_name": "Schools",
                                  "section_components": [
                                      {
                                          "titleV2": "Indian Institute of Materials Management, Mumbai",
                                          "caption": "5,425 followers",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/school/13284130/",
                                          "subComponents": []
                                      }
                                  ]
                              }
                          ],
                          "recommendations": [
                              {
                                  "section_name": "Received",
                                  "section_components": [
                                      {
                                          "titleV2": "Abhas Sharma",
                                          "caption": "January 20, 2025, Abhas managed Kunwardeep directly",
                                          "subtitle": "Ungerground metro professional ",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/in/abhas-sharma-2091131b",
                                          "image": "https://media.licdn.com/dms/image/v2/C4E03AQHxiMLCc3q0KQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1648055712033?e=1747872000&v=beta&t=C-FTDIAKrTVCLB68sRExTfwNCrwItxSKxL-VOKFR_oU",
                                          "subComponents": [
                                              {
                                                  "fixedListComponent": [
                                                      {
                                                          "type": "textComponent",
                                                          "text": "Mr. Kunwardeep has worked with me metro projects delhi. He is very knowledgeable and sincere to his work. He is having a good command on procurement , a wonderful negotiation skill as well. I wish him every success in his future endeavours."
                                                      }
                                                  ]
                                              }
                                          ]
                                      },
                                      {
                                          "titleV2": "Gururaj Parande",
                                          "caption": "January 1, 2025, Gururaj managed Kunwardeep directly",
                                          "subtitle": "Assistant General Manager - Procurement at Afcons Infrastructure Ltd.",
                                          "size": "LARGE",
                                          "textActionTarget": "https://www.linkedin.com/in/gururaj-parande-8789932a",
                                          "image": "https://media.licdn.com/dms/image/v2/C4D03AQEcRorNr9NC_g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1599636044601?e=1747872000&v=beta&t=BcGEvfH0isEINwQ8a6CcyBnFmAyYy3Rd1vhYpoX-2s0",
                                          "subComponents": [
                                              {
                                                  "fixedListComponent": [
                                                      {
                                                          "type": "textComponent",
                                                          "text": "Mr. Kunwardeep has worked with me in the Road and Bridge project of Dubai Government and handled all procurement related functions like closely coordination with all suppliers, meticulous follow-up with vendors which helped a lot in the progress of the project which we could hand over before time. While working he also has concentrated with other team members on JIT which helped in controlling Site Inventory. He has also arranged all demobilization of the site independently. He is now able to handle and lead effectively a supply chain team at any site."
                                                      }
                                                  ]
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "section_name": "Given",
                                  "section_components": []
                              }
                          ],
                          "skills": [
                              {
                                  "title": "Procurement",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Teamwork",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "7 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "SAP HANA",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "4 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "People Development",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Logistics Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Inventory Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Collaborative Problem Solving",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "7 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Interpersonal Communication",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "7 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Warehouse Operations",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "4 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "SAP ERP",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "1 endorsement"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Negotiation",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "1 endorsement"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "people management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Problem Solving",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "7 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Materials Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "7 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Indian Institute of Materials Management, Mumbai"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "vendor developement",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "1 endorsement"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Indian Institute of Materials Management, Mumbai"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "4 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Integrity",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "7 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 educational experiences at Indian Institute of Materials Management, Mumbai"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Internal auditor"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "interpersonal skills",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "7 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/D5603AQF41chTM91_Jg/profile-displayphoto-shrink_800_800/B56ZRbNmoQGQAc-/0/1736697081557?e=1747872000&v=beta&t=oK7sIYRCy4_yVb-Fs005kS-L-EU6KC1e2S2rZRI7j7s",
                          "linkedinUrl": "https://in.linkedin.com/in/kunwardeep-sharma-87188b27",
                          "email": "kunwardeep@afcons.com",
                          "companyName": "Afcons Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "companyIndustry": "Construction",
                          "companyWebsite": "afcons.com",
                          "companyLinkedin": "linkedin.com/company/afcons-infrastructure-limited",
                          "companyFoundedIn": 1959,
                          "companySize": "1001-5000"
                      }
                  ]
              }
          },
          {
              "query": "Afcrons Infrastruture CSCO LinkedIn",
              "error": "No LinkedIn profile found in search results"
          },
          {
              "query": "Afcrons Infrastruture Director of Procurement LinkedIn",
              "title": "Pavan Gavade - Procurement Manager - AFCONS Infrastructure ...",
              "profileUrl": "https://in.linkedin.com/in/pavan-gavade-65259156",
              "profileData": {
                  "success": true,
                  "data": [
                      {
                          "firstName": "Pavan",
                          "lastName": "Gavade",
                          "fullName": "Pavan Gavade",
                          "publicIdentifier": "pavan-gavade-65259156",
                          "headline": "Manager- Procurement",
                          "connections": 852,
                          "followers": 873,
                          "openConnection": false,
                          "urn": "ACoAAAvU_14BVWnI83KPrLsDwT1L-XPzDIOnXFo",
                          "addressCountryOnly": "India",
                          "addressWithCountry": "Mumbai, Maharashtra, India",
                          "addressWithoutCountry": "Mumbai, Maharashtra",
                          "profilePic": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730109017284?e=1747872000&v=beta&t=c7fUwWRBylkK6dqzgTFiyjbyFHAA6Z4z4Y9gc6xldmI",
                          "profilePicAllDimensions": [
                              {
                                  "width": 100,
                                  "height": 100,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730109017284?e=1747872000&v=beta&t=c7fUwWRBylkK6dqzgTFiyjbyFHAA6Z4z4Y9gc6xldmI"
                              },
                              {
                                  "width": 200,
                                  "height": 200,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730109017284?e=1747872000&v=beta&t=sAiw8Q6oVVoTBILUSzLj3dr3FXwRfgLYEdd8PlWY_9o"
                              },
                              {
                                  "width": 400,
                                  "height": 400,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730109017284?e=1747872000&v=beta&t=dY_F3H1YKjw5gVu5siofmUGOaglxvY2zJCKd7X2dtPk"
                              },
                              {
                                  "width": 800,
                                  "height": 800,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730109017318?e=1747872000&v=beta&t=YRCaj4_m4xHS7y-JX9mXKBN0EcHTdv6LH5_bRgqyil0"
                              }
                          ],
                          "updates": [],
                          "experiences": [
                              {
                                  "companyId": "220266",
                                  "companyUrn": "urn:li:fsd_company:220266",
                                  "companyLink1": "https://www.linkedin.com/company/220266/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D560BAQGOO03Tjy6Tkw/company-logo_200_200/company-logo_200_200/0/1730973766831/afcons_infrastructure_limited_logo?e=1747872000&v=beta&t=r5QYJ3bjV-_t6zTqRkR80luC7g0D76WBCfCAAkXqDUY",
                                  "title": "AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company",
                                  "subtitle": "5 yrs 7 mos",
                                  "caption": "Mumbai",
                                  "breakdown": true,
                                  "subComponents": [
                                      {
                                          "title": "Procurement Manager",
                                          "subtitle": "Full-time",
                                          "caption": "Apr 2022 - Present · 3 yrs",
                                          "description": []
                                      },
                                      {
                                          "title": "Senior Engineer Procurement",
                                          "caption": "Sep 2019 - Mar 2022 · 2 yrs 7 mos",
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyLink1": "https://www.linkedin.com/search/results/all/?keywords=Leena+Powertech+Engineers+Pvt+Ltd",
                                  "title": "Supply Chain Executive",
                                  "subtitle": "Leena Powertech Engineers Pvt Ltd",
                                  "caption": "Dec 2016 - Aug 2018 · 1 yr 9 mos",
                                  "metadata": "Navi Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "•\tHandling the overall supply chain operations for electrical distribution projects including power distribution, railway distribution, building distribution etc.\n•\tManaging the process flow starting after manufacturing clearance till receipt of material\n•\tCoordinate between supplier, project team and account team for smooth operations.\n•\tMaintain the material track and records at different stages of progress.\n•\tFollow up and provide requisites for keep moving the supply chain activities.\n•\tFollow up for inspection call from vendor and nomination from client.\n•\tArrange the inspection call and follow for reports after inspection.\n•\tFollow up for dispatch clearance from client and provide internal dispatch clearance to supplier.\n•\tKeep tracking of payment status of supplier.\n•\tCoordinate for invoice, Road permit and transport activities till unloading of material at site and Keep tracking of short shipment.\n•\tIdentify and develop potential vendor for better work flow.\n•\tLeading the review meeting with precise track record and general plan with respect to particular project.\n•\tIdentify and coordinate to solve technical queries with supplier and project team.\n•\tUnderstand and decide priority to maintain the continuous customer delight with respect to project."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "673332",
                                  "companyUrn": "urn:li:fsd_company:673332/",
                                  "companyLink1": "https://www.linkedin.com/company/673332/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C560BAQEI-p90YR6s5g/company-logo_200_200/company-logo_200_200/0/1631301844703?e=1747872000&v=beta&t=MQFljsfY3l3azIMu3cj9vK5vegz-V9fSKJ19WjkkoNE",
                                  "title": "Executive Engineer- Procurement",
                                  "subtitle": "Petron Engineering Construction Ltd",
                                  "caption": "Jul 2014 - Sep 2016 · 2 yrs 3 mos",
                                  "metadata": "Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsible for commodity purchase of steel,paints,consumables, rate approvals at site and subcontracting, while working of overall ongoing projects like GAIL PATA, IOCL PARADIP, RIL JAMNAGAR,UTCL NAGPUR, NTPC KUDGI and VINDYACHAL etc."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "1802855",
                                  "companyUrn": "urn:li:fsd_company:1802855",
                                  "companyLink1": "https://www.linkedin.com/company/1802855/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQHXWXNnaR7CJw/company-logo_200_200/company-logo_200_200/0/1646051066232/fabtechprojects_logo?e=1747872000&v=beta&t=8B2P5zyCqNjwZFbshk4sUtwFU_EP2W8E5YU575SogVU",
                                  "title": "Procurement Executive",
                                  "subtitle": "Fabtech Projects & Engineers Ltd.",
                                  "caption": "Feb 2012 - Jun 2014 · 2 yrs 5 mos",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsible for overall Purchase Activities related to SRU HPCL VIZAG REFINERY Project, including  all Mechanical,Civil,Electrical, Instrumentation and consumable items."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "educations": [
                              {
                                  "companyId": "13403581",
                                  "companyUrn": "urn:li:fsd_company:13403581",
                                  "companyLink1": "https://www.linkedin.com/company/13403581/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQH5Z1bfjM-2Xg/company-logo_200_200/company-logo_200_200/0/1736415172069/sinhgad_institute_of_business_administration_and_research_logo?e=1747872000&v=beta&t=Trx_wO8ydhGgkG5FPXggSOrKYRdbrue2FKeZ7I9W6JI",
                                  "title": "Sinhgad Institute of Business Administration and Research",
                                  "subtitle": "Master of Business Administration (MBA), Operations",
                                  "caption": "2010 - 2012",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyId": "375731",
                                  "companyUrn": "urn:li:fsd_company:375731",
                                  "companyLink1": "https://www.linkedin.com/company/375731/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQFCDkWlYRRDWQ/company-logo_200_200/company-logo_200_200/0/1667976723013/shivaji_university_logo?e=1747872000&v=beta&t=QUm8JmJ_wN_K8AGrE_wz7Pl6oJItYEFo_bXghyQI7JQ",
                                  "title": "Shivaji University",
                                  "subtitle": "Bachelor of Engineering (BE), Mechanical",
                                  "caption": "2005 - 2009",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "licenseAndCertificates": [],
                          "honorsAndAwards": [],
                          "languages": [],
                          "volunteerAndAwards": [],
                          "verifications": [],
                          "promos": [],
                          "highlights": [],
                          "projects": [
                              {
                                  "title": "HPCL SRU,Visakhapatnam",
                                  "subtitle": "Nov 2012 - Present",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Associated with Fabtech Projects & Engineers Ltd."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "publications": [],
                          "patents": [],
                          "courses": [],
                          "testScores": [],
                          "organizations": [],
                          "volunteerCauses": [],
                          "skills": [
                              {
                                  "title": "Change Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Operations",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Leadership",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Evaluation",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Budgeting",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Dispute Resolution",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Customer Relationship Management (CRM)",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Optimization",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Resolving Issues",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Logistics Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Source to Pay",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Purchase Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Oil and Gas",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences across Petron Engineering Construction Ltd and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "9 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Team Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "10 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Manufacturing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Talent Acquisition",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "1 endorsement"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Project Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730109017318?e=1747872000&v=beta&t=YRCaj4_m4xHS7y-JX9mXKBN0EcHTdv6LH5_bRgqyil0",
                          "linkedinUrl": "https://in.linkedin.com/in/pavan-gavade-65259156",
                          "email": "pavan.gavade@afcons.com",
                          "companyName": "Afcons Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "companyIndustry": "Construction",
                          "companyWebsite": "afcons.com",
                          "companyLinkedin": "linkedin.com/company/afcons-infrastructure-limited",
                          "companyFoundedIn": 1959,
                          "companySize": "1001-5000"
                      }
                  ]
              }
          },
          {
              "query": "Afcrons Infrastruture Vice President of Procurement LinkedIn",
              "title": "Gajanan Pai - Vice President - AFCONS Infrastructure Limited",
              "profileUrl": "https://in.linkedin.com/in/gajanan-pai-a392a0263",
              "profileData": {
                  "success": true,
                  "data": [
                      {
                          "firstName": "Gajanan",
                          "lastName": "Pai",
                          "fullName": "Gajanan Pai",
                          "publicIdentifier": "gajanan-pai-a392a0263",
                          "headline": "Vice President at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "connections": 375,
                          "followers": 406,
                          "openConnection": false,
                          "urn": "ACoAAECl980BpH0jz7YJjb5aFIfIWW0Z-MPTUJc",
                          "addressCountryOnly": "India",
                          "addressWithCountry": "Mumbai, Maharashtra, India",
                          "addressWithoutCountry": "Mumbai, Maharashtra",
                          "profilePic": "https://media.licdn.com/dms/image/v2/D5603AQHB4UM8v0tjQA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1674453882390?e=1747872000&v=beta&t=Q40SvrwCVPv8W_QGZEREh5GhOTpAhxYfEE-sPgl-NSI",
                          "profilePicAllDimensions": [
                              {
                                  "width": 100,
                                  "height": 100,
                                  "url": "https://media.licdn.com/dms/image/v2/D5603AQHB4UM8v0tjQA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1674453882390?e=1747872000&v=beta&t=Q40SvrwCVPv8W_QGZEREh5GhOTpAhxYfEE-sPgl-NSI"
                              },
                              {
                                  "width": 200,
                                  "height": 200,
                                  "url": "https://media.licdn.com/dms/image/v2/D5603AQHB4UM8v0tjQA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1674453882390?e=1747872000&v=beta&t=ngnOTag7sq29-pwOfWVYqxzGuPfzO3v8lfpsKJD4UOI"
                              },
                              {
                                  "width": 400,
                                  "height": 400,
                                  "url": "https://media.licdn.com/dms/image/v2/D5603AQHB4UM8v0tjQA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1674453882390?e=1747872000&v=beta&t=K2qsz66Plfg7Ffg7Njba4swUQVG-4jFgWvqE8u6KVWg"
                              },
                              {
                                  "width": 798,
                                  "height": 798,
                                  "url": "https://media.licdn.com/dms/image/v2/D5603AQHB4UM8v0tjQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674453882390?e=1747872000&v=beta&t=sFan9l7KtYRmNzdTmU4DQpvaCzwDBVSX5PAxGp5-L6c"
                              }
                          ],
                          "updates": [],
                          "experiences": [
                              {
                                  "companyId": "220266",
                                  "companyUrn": "urn:li:fsd_company:220266",
                                  "companyLink1": "https://www.linkedin.com/company/220266/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D560BAQGOO03Tjy6Tkw/company-logo_200_200/company-logo_200_200/0/1730973766831/afcons_infrastructure_limited_logo?e=1747872000&v=beta&t=r5QYJ3bjV-_t6zTqRkR80luC7g0D76WBCfCAAkXqDUY",
                                  "title": "Vice President",
                                  "subtitle": "AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company · Full-time",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "educations": [
                              {
                                  "companyId": "577550",
                                  "companyUrn": "urn:li:fsd_company:577550/",
                                  "companyLink1": "https://www.linkedin.com/company/577550/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C510BAQH66KkTTZFJ2A/company-logo_200_200/company-logo_200_200/0/1630615963889/manipal_institute_of_technology_logo?e=1747872000&v=beta&t=y56CZjfK3i0VNg7m6xnYjZLi9brApttvp7C3Nt_sDnI",
                                  "title": "Manipal Institute of Technology",
                                  "subtitle": "Bachelor of Engineering - BE, Mechanical Engineering",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "licenseAndCertificates": [],
                          "honorsAndAwards": [],
                          "languages": [],
                          "volunteerAndAwards": [],
                          "verifications": [],
                          "promos": [],
                          "highlights": [],
                          "projects": [],
                          "publications": [],
                          "patents": [],
                          "courses": [],
                          "testScores": [],
                          "organizations": [],
                          "volunteerCauses": [],
                          "skills": [],
                          "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/D5603AQHB4UM8v0tjQA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674453882390?e=1747872000&v=beta&t=sFan9l7KtYRmNzdTmU4DQpvaCzwDBVSX5PAxGp5-L6c",
                          "linkedinUrl": "https://in.linkedin.com/in/gajanan-pai-a392a0263",
                          "email": "gapai@afcons.com",
                          "companyName": "Afcons Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "companyIndustry": "Construction",
                          "companyWebsite": "afcons.com",
                          "companyLinkedin": "linkedin.com/company/afcons-infrastructure-limited",
                          "companyFoundedIn": 1959,
                          "companySize": "1001-5000"
                      }
                  ]
              }
          },
          {
              "query": "Afcrons Infrastruture Head of Procurement LinkedIn",
              "title": "Pavan Gavade - Procurement Manager - AFCONS Infrastructure ...",
              "profileUrl": "https://in.linkedin.com/in/pavan-gavade-65259156",
              "profileData": {
                  "success": true,
                  "data": [
                      {
                          "firstName": "Pavan",
                          "lastName": "Gavade",
                          "fullName": "Pavan Gavade",
                          "publicIdentifier": "pavan-gavade-65259156",
                          "headline": "Manager- Procurement",
                          "connections": 852,
                          "followers": 873,
                          "openConnection": false,
                          "urn": "ACoAAAvU_14BVWnI83KPrLsDwT1L-XPzDIOnXFo",
                          "addressCountryOnly": "India",
                          "addressWithCountry": "Mumbai, Maharashtra, India",
                          "addressWithoutCountry": "Mumbai, Maharashtra",
                          "profilePic": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730109017284?e=1747872000&v=beta&t=c7fUwWRBylkK6dqzgTFiyjbyFHAA6Z4z4Y9gc6xldmI",
                          "profilePicAllDimensions": [
                              {
                                  "width": 100,
                                  "height": 100,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730109017284?e=1747872000&v=beta&t=c7fUwWRBylkK6dqzgTFiyjbyFHAA6Z4z4Y9gc6xldmI"
                              },
                              {
                                  "width": 200,
                                  "height": 200,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730109017284?e=1747872000&v=beta&t=sAiw8Q6oVVoTBILUSzLj3dr3FXwRfgLYEdd8PlWY_9o"
                              },
                              {
                                  "width": 400,
                                  "height": 400,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730109017284?e=1747872000&v=beta&t=dY_F3H1YKjw5gVu5siofmUGOaglxvY2zJCKd7X2dtPk"
                              },
                              {
                                  "width": 800,
                                  "height": 800,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730109017318?e=1747872000&v=beta&t=YRCaj4_m4xHS7y-JX9mXKBN0EcHTdv6LH5_bRgqyil0"
                              }
                          ],
                          "updates": [],
                          "experiences": [
                              {
                                  "companyId": "220266",
                                  "companyUrn": "urn:li:fsd_company:220266",
                                  "companyLink1": "https://www.linkedin.com/company/220266/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D560BAQGOO03Tjy6Tkw/company-logo_200_200/company-logo_200_200/0/1730973766831/afcons_infrastructure_limited_logo?e=1747872000&v=beta&t=r5QYJ3bjV-_t6zTqRkR80luC7g0D76WBCfCAAkXqDUY",
                                  "title": "AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company",
                                  "subtitle": "5 yrs 7 mos",
                                  "caption": "Mumbai",
                                  "breakdown": true,
                                  "subComponents": [
                                      {
                                          "title": "Procurement Manager",
                                          "subtitle": "Full-time",
                                          "caption": "Apr 2022 - Present · 3 yrs",
                                          "description": []
                                      },
                                      {
                                          "title": "Senior Engineer Procurement",
                                          "caption": "Sep 2019 - Mar 2022 · 2 yrs 7 mos",
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyLink1": "https://www.linkedin.com/search/results/all/?keywords=Leena+Powertech+Engineers+Pvt+Ltd",
                                  "title": "Supply Chain Executive",
                                  "subtitle": "Leena Powertech Engineers Pvt Ltd",
                                  "caption": "Dec 2016 - Aug 2018 · 1 yr 9 mos",
                                  "metadata": "Navi Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "•\tHandling the overall supply chain operations for electrical distribution projects including power distribution, railway distribution, building distribution etc.\n•\tManaging the process flow starting after manufacturing clearance till receipt of material\n•\tCoordinate between supplier, project team and account team for smooth operations.\n•\tMaintain the material track and records at different stages of progress.\n•\tFollow up and provide requisites for keep moving the supply chain activities.\n•\tFollow up for inspection call from vendor and nomination from client.\n•\tArrange the inspection call and follow for reports after inspection.\n•\tFollow up for dispatch clearance from client and provide internal dispatch clearance to supplier.\n•\tKeep tracking of payment status of supplier.\n•\tCoordinate for invoice, Road permit and transport activities till unloading of material at site and Keep tracking of short shipment.\n•\tIdentify and develop potential vendor for better work flow.\n•\tLeading the review meeting with precise track record and general plan with respect to particular project.\n•\tIdentify and coordinate to solve technical queries with supplier and project team.\n•\tUnderstand and decide priority to maintain the continuous customer delight with respect to project."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "673332",
                                  "companyUrn": "urn:li:fsd_company:673332",
                                  "companyLink1": "https://www.linkedin.com/company/673332/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C560BAQEI-p90YR6s5g/company-logo_200_200/company-logo_200_200/0/1631301844703?e=1747872000&v=beta&t=MQFljsfY3l3azIMu3cj9vK5vegz-V9fSKJ19WjkkoNE",
                                  "title": "Executive Engineer- Procurement",
                                  "subtitle": "Petron Engineering Construction Ltd",
                                  "caption": "Jul 2014 - Sep 2016 · 2 yrs 3 mos",
                                  "metadata": "Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsible for commodity purchase of steel,paints,consumables, rate approvals at site and subcontracting, while working of overall ongoing projects like GAIL PATA, IOCL PARADIP, RIL JAMNAGAR,UTCL NAGPUR, NTPC KUDGI and VINDYACHAL etc."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "1802855",
                                  "companyUrn": "urn:li:fsd_company:1802855",
                                  "companyLink1": "https://www.linkedin.com/company/1802855/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQHXWXNnaR7CJw/company-logo_200_200/company-logo_200_200/0/1646051066232/fabtechprojects_logo?e=1747872000&v=beta&t=8B2P5zyCqNjwZFbshk4sUtwFU_EP2W8E5YU575SogVU",
                                  "title": "Procurement Executive",
                                  "subtitle": "Fabtech Projects & Engineers Ltd.",
                                  "caption": "Feb 2012 - Jun 2014 · 2 yrs 5 mos",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsible for overall Purchase Activities related to SRU HPCL VIZAG REFINERY Project, including  all Mechanical,Civil,Electrical, Instrumentation and consumable items."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "educations": [
                              {
                                  "companyId": "13403581",
                                  "companyUrn": "urn:li:fsd_company:13403581",
                                  "companyLink1": "https://www.linkedin.com/company/13403581/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQH5Z1bfjM-2Xg/company-logo_200_200/company-logo_200_200/0/1736415172069/sinhgad_institute_of_business_administration_and_research_logo?e=1747872000&v=beta&t=Trx_wO8ydhGgkG5FPXggSOrKYRdbrue2FKeZ7I9W6JI",
                                  "title": "Sinhgad Institute of Business Administration and Research",
                                  "subtitle": "Master of Business Administration (MBA), Operations",
                                  "caption": "2010 - 2012",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyId": "375731",
                                  "companyUrn": "urn:li:fsd_company:375731",
                                  "companyLink1": "https://www.linkedin.com/company/375731/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQFCDkWlYRRDWQ/company-logo_200_200/company-logo_200_200/0/1667976723013/shivaji_university_logo?e=1747872000&v=beta&t=QUm8JmJ_wN_K8AGrE_wz7Pl6oJItYEFo_bXghyQI7JQ",
                                  "title": "Shivaji University",
                                  "subtitle": "Bachelor of Engineering (BE), Mechanical",
                                  "caption": "2005 - 2009",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "licenseAndCertificates": [],
                          "honorsAndAwards": [],
                          "languages": [],
                          "volunteerAndAwards": [],
                          "verifications": [],
                          "promos": [],
                          "highlights": [],
                          "projects": [
                              {
                                  "title": "HPCL SRU,Visakhapatnam",
                                  "subtitle": "Nov 2012 - Present",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Associated with Fabtech Projects & Engineers Ltd."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "publications": [],
                          "patents": [],
                          "courses": [],
                          "testScores": [],
                          "organizations": [],
                          "volunteerCauses": [],
                          "skills": [
                              {
                                  "title": "Change Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Operations",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Leadership",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Evaluation",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Budgeting",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Dispute Resolution",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Customer Relationship Management (CRM)",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Optimization",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Resolving Issues",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Logistics Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Source to Pay",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Purchase Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Oil and Gas",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences across Petron Engineering Construction Ltd and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "9 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Team Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "10 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Manufacturing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Talent Acquisition",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "1 endorsement"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Project Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730109017318?e=1747872000&v=beta&t=YRCaj4_m4xHS7y-JX9mXKBN0EcHTdv6LH5_bRgqyil0",
                          "linkedinUrl": "https://in.linkedin.com/in/pavan-gavade-65259156",
                          "email": "pavan.gavade@afcons.com",
                          "companyName": "Afcons Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "companyIndustry": "Construction",
                          "companyWebsite": "afcons.com",
                          "companyLinkedin": "linkedin.com/company/afcons-infrastructure-limited",
                          "companyFoundedIn": 1959,
                          "companySize": "1001-5000"
                      }
                  ]
              }
          },
          {
              "query": "Afcrons Infrastruture General Manager Procurement LinkedIn",
              "title": "Pavan Gavade - Procurement Manager - AFCONS Infrastructure ...",
              "profileUrl": "https://in.linkedin.com/in/pavan-gavade-65259156",
              "profileData": {
                  "success": true,
                  "data": [
                      {
                          "firstName": "Pavan",
                          "lastName": "Gavade",
                          "fullName": "Pavan Gavade",
                          "publicIdentifier": "pavan-gavade-65259156",
                          "headline": "Manager- Procurement",
                          "connections": 852,
                          "followers": 873,
                          "openConnection": false,
                          "urn": "ACoAAAvU_14BVWnI83KPrLsDwT1L-XPzDIOnXFo",
                          "addressCountryOnly": "India",
                          "addressWithCountry": "Mumbai, Maharashtra, India",
                          "addressWithoutCountry": "Mumbai, Maharashtra",
                          "profilePic": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730109017284?e=1747872000&v=beta&t=c7fUwWRBylkK6dqzgTFiyjbyFHAA6Z4z4Y9gc6xldmI",
                          "profilePicAllDimensions": [
                              {
                                  "width": 100,
                                  "height": 100,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730109017284?e=1747872000&v=beta&t=c7fUwWRBylkK6dqzgTFiyjbyFHAA6Z4z4Y9gc6xldmI"
                              },
                              {
                                  "width": 200,
                                  "height": 200,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730109017284?e=1747872000&v=beta&t=sAiw8Q6oVVoTBILUSzLj3dr3FXwRfgLYEdd8PlWY_9o"
                              },
                              {
                                  "width": 400,
                                  "height": 400,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1730109017284?e=1747872000&v=beta&t=dY_F3H1YKjw5gVu5siofmUGOaglxvY2zJCKd7X2dtPk"
                              },
                              {
                                  "width": 800,
                                  "height": 800,
                                  "url": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730109017318?e=1747872000&v=beta&t=YRCaj4_m4xHS7y-JX9mXKBN0EcHTdv6LH5_bRgqyil0"
                              }
                          ],
                          "updates": [],
                          "experiences": [
                              {
                                  "companyId": "220266",
                                  "companyUrn": "urn:li:fsd_company:220266",
                                  "companyLink1": "https://www.linkedin.com/company/220266/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D560BAQGOO03Tjy6Tkw/company-logo_200_200/company-logo_200_200/0/1730973766831/afcons_infrastructure_limited_logo?e=1747872000&v=beta&t=r5QYJ3bjV-_t6zTqRkR80luC7g0D76WBCfCAAkXqDUY",
                                  "title": "AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company",
                                  "subtitle": "5 yrs 7 mos",
                                  "caption": "Mumbai",
                                  "breakdown": true,
                                  "subComponents": [
                                      {
                                          "title": "Procurement Manager",
                                          "subtitle": "Full-time",
                                          "caption": "Apr 2022 - Present · 3 yrs",
                                          "description": []
                                      },
                                      {
                                          "title": "Senior Engineer Procurement",
                                          "caption": "Sep 2019 - Mar 2022 · 2 yrs 7 mos",
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyLink1": "https://www.linkedin.com/search/results/all/?keywords=Leena+Powertech+Engineers+Pvt+Ltd",
                                  "title": "Supply Chain Executive",
                                  "subtitle": "Leena Powertech Engineers Pvt Ltd",
                                  "caption": "Dec 2016 - Aug 2018 · 1 yr 9 mos",
                                  "metadata": "Navi Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "•\tHandling the overall supply chain operations for electrical distribution projects including power distribution, railway distribution, building distribution etc.\n•\tManaging the process flow starting after manufacturing clearance till receipt of material\n•\tCoordinate between supplier, project team and account team for smooth operations.\n•\tMaintain the material track and records at different stages of progress.\n•\tFollow up and provide requisites for keep moving the supply chain activities.\n•\tFollow up for inspection call from vendor and nomination from client.\n•\tArrange the inspection call and follow for reports after inspection.\n•\tFollow up for dispatch clearance from client and provide internal dispatch clearance to supplier.\n•\tKeep tracking of payment status of supplier.\n•\tCoordinate for invoice, Road permit and transport activities till unloading of material at site and Keep tracking of short shipment.\n•\tIdentify and develop potential vendor for better work flow.\n•\tLeading the review meeting with precise track record and general plan with respect to particular project.\n•\tIdentify and coordinate to solve technical queries with supplier and project team.\n•\tUnderstand and decide priority to maintain the continuous customer delight with respect to project."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "673332",
                                  "companyUrn": "urn:li:fsd_company:673332",
                                  "companyLink1": "https://www.linkedin.com/company/673332/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C560BAQEI-p90YR6s5g/company-logo_200_200/company-logo_200_200/0/1631301844703?e=1747872000&v=beta&t=MQFljsfY3l3azIMu3cj9vK5vegz-V9fSKJ19WjkkoNE",
                                  "title": "Executive Engineer- Procurement",
                                  "subtitle": "Petron Engineering Construction Ltd",
                                  "caption": "Jul 2014 - Sep 2016 · 2 yrs 3 mos",
                                  "metadata": "Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsible for commodity purchase of steel,paints,consumables, rate approvals at site and subcontracting, while working of overall ongoing projects like GAIL PATA, IOCL PARADIP, RIL JAMNAGAR,UTCL NAGPUR, NTPC KUDGI and VINDYACHAL etc."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "1802855",
                                  "companyUrn": "urn:li:fsd_company:1802855",
                                  "companyLink1": "https://www.linkedin.com/company/1802855/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQHXWXNnaR7CJw/company-logo_200_200/company-logo_200_200/0/1646051066232/fabtechprojects_logo?e=1747872000&v=beta&t=8B2P5zyCqNjwZFbshk4sUtwFU_EP2W8E5YU575SogVU",
                                  "title": "Procurement Executive",
                                  "subtitle": "Fabtech Projects & Engineers Ltd.",
                                  "caption": "Feb 2012 - Jun 2014 · 2 yrs 5 mos",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "Responsible for overall Purchase Activities related to SRU HPCL VIZAG REFINERY Project, including  all Mechanical,Civil,Electrical, Instrumentation and consumable items."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "educations": [
                              {
                                  "companyId": "13403581",
                                  "companyUrn": "urn:li:fsd_company:13403581",
                                  "companyLink1": "https://www.linkedin.com/company/13403581/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQH5Z1bfjM-2Xg/company-logo_200_200/company-logo_200_200/0/1736415172069/sinhgad_institute_of_business_administration_and_research_logo?e=1747872000&v=beta&t=Trx_wO8ydhGgkG5FPXggSOrKYRdbrue2FKeZ7I9W6JI",
                                  "title": "Sinhgad Institute of Business Administration and Research",
                                  "subtitle": "Master of Business Administration (MBA), Operations",
                                  "caption": "2010 - 2012",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "companyId": "375731",
                                  "companyUrn": "urn:li:fsd_company:375731",
                                  "companyLink1": "https://www.linkedin.com/company/375731/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQFCDkWlYRRDWQ/company-logo_200_200/company-logo_200_200/0/1667976723013/shivaji_university_logo?e=1747872000&v=beta&t=QUm8JmJ_wN_K8AGrE_wz7Pl6oJItYEFo_bXghyQI7JQ",
                                  "title": "Shivaji University",
                                  "subtitle": "Bachelor of Engineering (BE), Mechanical",
                                  "caption": "2005 - 2009",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "licenseAndCertificates": [],
                          "honorsAndAwards": [],
                          "languages": [],
                          "volunteerAndAwards": [],
                          "verifications": [],
                          "promos": [],
                          "highlights": [],
                          "projects": [
                              {
                                  "title": "HPCL SRU,Visakhapatnam",
                                  "subtitle": "Nov 2012 - Present",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Associated with Fabtech Projects & Engineers Ltd."
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "publications": [],
                          "patents": [],
                          "courses": [],
                          "testScores": [],
                          "organizations": [],
                          "volunteerCauses": [],
                          "skills": [
                              {
                                  "title": "Change Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Operations",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Leadership",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Evaluation",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Budgeting",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Dispute Resolution",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Customer Relationship Management (CRM)",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Optimization",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Resolving Issues",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Logistics Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Source to Pay",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supplier Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Purchase Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 experiences across AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company and 3 other companies"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Oil and Gas",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 experiences across Petron Engineering Construction Ltd and 1 other company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "9 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Team Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "10 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Manufacturing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "5 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Talent Acquisition",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "1 endorsement"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Project Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/D4D03AQHcWTCFesNF2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730109017318?e=1747872000&v=beta&t=YRCaj4_m4xHS7y-JX9mXKBN0EcHTdv6LH5_bRgqyil0",
                          "linkedinUrl": "https://in.linkedin.com/in/pavan-gavade-65259156",
                          "email": "pavan.gavade@afcons.com",
                          "companyName": "Afcons Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "companyIndustry": "Construction",
                          "companyWebsite": "afcons.com",
                          "companyLinkedin": "linkedin.com/company/afcons-infrastructure-limited",
                          "companyFoundedIn": 1959,
                          "companySize": "1001-5000"
                      }
                  ]
              }
          },
          {
              "query": "Afcrons Infrastruture Senior Procurement Manager LinkedIn",
              "title": "Saurabh Patel - PGEMP - Senior Procurement Manager - LinkedIn",
              "profileUrl": "https://in.linkedin.com/in/saurabh-patel-pgemp-6375a115",
              "profileData": {
                  "success": true,
                  "data": [
                      {
                          "firstName": "Saurabh",
                          "lastName": "Patel - PGEMP",
                          "fullName": "Saurabh Patel - PGEMP",
                          "publicIdentifier": "saurabh-patel-pgemp-6375a115",
                          "headline": "Senior Manager Procurement at AFCONS Infrastructure Limited (Oil & Gas BU)",
                          "connections": 801,
                          "followers": 828,
                          "openConnection": false,
                          "urn": "ACoAAAMcwEsBd1Cl-05XLGneA0aQfOkifHD7kbI",
                          "addressCountryOnly": "India",
                          "addressWithCountry": "Mumbai, Maharashtra, India",
                          "addressWithoutCountry": "Mumbai, Maharashtra",
                          "profilePic": "https://media.licdn.com/dms/image/v2/C5103AQHg2re3DyXodw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1576780552228?e=1747872000&v=beta&t=8YxC7s6afWGjDnfKjNFj7mkt5Z8hJDghrRwWGmCOf24",
                          "profilePicAllDimensions": [
                              {
                                  "width": 100,
                                  "height": 100,
                                  "url": "https://media.licdn.com/dms/image/v2/C5103AQHg2re3DyXodw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1576780552228?e=1747872000&v=beta&t=8YxC7s6afWGjDnfKjNFj7mkt5Z8hJDghrRwWGmCOf24"
                              },
                              {
                                  "width": 200,
                                  "height": 200,
                                  "url": "https://media.licdn.com/dms/image/v2/C5103AQHg2re3DyXodw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1576780552201?e=1747872000&v=beta&t=6BVIiJnJQRjGQE5fgVTngLSuqJj-Q79FFx2iFnmHv6Y"
                              },
                              {
                                  "width": 400,
                                  "height": 400,
                                  "url": "https://media.licdn.com/dms/image/v2/C5103AQHg2re3DyXodw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1576780552261?e=1747872000&v=beta&t=kFcs83pgJjC_3G5o2nLSoUMRYkxcZ1ftPWU0AVkJmpw"
                              },
                              {
                                  "width": 500,
                                  "height": 500,
                                  "url": "https://media.licdn.com/dms/image/v2/C5103AQHg2re3DyXodw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1576780552293?e=1747872000&v=beta&t=mDt77Df7hab006JH1-BNn2199_j95usWfa9Zf73I3aI"
                              }
                          ],
                          "updates": [],
                          "experiences": [
                              {
                                  "companyId": "220266",
                                  "companyUrn": "urn:li:fsd_company:220266",
                                  "companyLink1": "https://www.linkedin.com/company/220266/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D560BAQGOO03Tjy6Tkw/company-logo_200_200/company-logo_200_200/0/1730973766831/afcons_infrastructure_limited_logo?e=1747872000&v=beta&t=r5QYJ3bjV-_t6zTqRkR80luC7g0D76WBCfCAAkXqDUY",
                                  "title": "Senior Procurement Manager",
                                  "subtitle": "AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company · Full-time",
                                  "caption": "Mar 2014 - Present · 11 yrs 1 mo",
                                  "metadata": "Mumbai, Maharashtra, India",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "  helped me get this job"
                                              },
                                              {
                                                  "type": "textComponent",
                                                  "text": "Roles & Responsibilities:\n•\tProcurement\tAnalysis of MR, Techno-commercial Evaluation, Finalizing T&Cs, Commercial Negotiations & Award of PO\n•\tSupply Chain Mgmt. / Order Execution\tDriver for Vendor & Internal Disciplines (Engg / QA / PMT / Logistics / F&A), Client (if required)\n•\tProcurement Lead for Projects\tSingle Point Contact – Engg. To Commissioning\nProcurement Compliance, Progress & Risk Review, Cash Flow Management, Client Meeting\n•\tVendor Management\tPerformance Evaluation\n•\tPre-bid Estimation\tEvaluation of Tender Docs & MRs, Finalizing Scope of Procurement, Furnishing Cost Estimates\n\nProjects:\n•\tONGC – India\tKG-DWN-98-2, LEWPP-1, LEWPP-2 MHSRP-II, MHN PP & LQ, HRD Process Platform etc. \n•\tVOPAK - India\tVopak Tank Terminal Project\n•\tGSPC – India\tPLQP\n•\tPTTEPI - Myanmar\tZawtika – WH\n•\tSLNG\tSingapore LNG Terminal \n•\tEssar Oil, Steel and Power Projects\tVadinar Refinery Expansion Project Phase-1 & 2, Essar Steel Hazira Expansion and Vadinar Power Company Expansion\n\n\nEquipment Procured: \nDeck Crane, Air Coolers, Piles, Jacket Material\nTest Separators, Pressure Vessels, Columns, Towers\nNitrogen Generation & Instrument Utility Compressor Packages\nAluminum Helidecks\nChemical Injection Skids\nSafety Packages like DCP Skids, CO2 Snuffing Systems, and Fire Water Systems\nFRP Gratings\nBall Valves, Gate, Globe, Check Valves\nPipes, Fittings, Flanges, Plates, Tubulars\nAngle, Channels, Sections etc"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyLink1": "https://www.linkedin.com/search/results/all/?keywords=Samsung+C%26T+India+Private+Limited",
                                  "title": "Asst. Manager Procurement",
                                  "subtitle": "Samsung C&T India Private Limited · Full-time",
                                  "caption": "Apr 2012 - Mar 2014 · 2 yrs",
                                  "metadata": "Mumbai Area, India",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "- Procurement of Pressure Vessels, Towers & Columns, Heat Exchangers, Tower Internals, Process Packages & Piping Bulks.\n\n- Other Mechanical Packages like Demineralized Plant, Condensate Polishing Units, Waste Heat Recovery Units, Fuel Gas Conditioning Skids, Air Fin Coolers, FCCU, DHDT, Heavy Crude Filtration Packages, Pumps etc, \n\n-Looking after Procurement, Bidding, Estimation for Mechanical Equipment for Domestic and Overseas Projects.\n-Float enquiries to local & international client approved vendors.\n-Seek approval for new vendors if & whenever required. Vendor evaluation & Pre-qualification process. Approval of new vendors from client  \n-Scrutinize offers for their completeness / compliance for technical & commercial requirement & compile them in the form of bid tabulation.\n-Negotiations with the vendors for price, delivery and any other terms that may form an integral part of the requirement.\n-Co-ordinate within house details Engineering & Consultant for Technical Queries, Technical Bid Analysis etc. \n-Negotiating & finalization of terms & conditions with vendor."
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "4837",
                                  "companyUrn": "urn:li:fsd_company:4837",
                                  "companyLink1": "https://www.linkedin.com/company/4837/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQFnEYpR8MlYsA/company-logo_200_200/company-logo_200_200/0/1631300737623?e=1747872000&v=beta&t=ZakQFIA8pPVDIUOnBqiSOqnL6fG3zrinsxmErX-LcfM",
                                  "title": "Asst Manger Procurement",
                                  "subtitle": "Larsen & Toubro Limited",
                                  "caption": "Oct 2008 - Apr 2012 · 3 yrs 7 mos",
                                  "metadata": "Mumbai Area, India",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "-Procurement, Expediting & Execution of the equipments being handled from RFQ generation to      Commissioning stage by owning the complete (Procurement) responsibility. \n-To support the Estimation team with Complete Techno-Commercial quotations (Pre-bid phase) & Engineering team to generate the RFQ (Post-bid phase) enquiries.\n-To obtain & evaluate the complete technical & commercial offers from shortlisted vendors\n-To finalize the contractual terms, carry-out the negotiations and to award the Purchase Order\n-To closely monitor the progress of Order at Engg-Procu-Fab stage \n-To prepare & get approval of Purchase Specifications (PS) from Client with the help of Project Mang. Team (Major Milestone in PSU Projects)\n-Expediting and witnessing manufacturing at various stages for Vendors.\n-To co-ordinate with  QA&I to obtain Client's approval on QC documents (Inspection Test Plans, Quality Assurance Plans, Test Procedures etc) & to carry-out the test and inspections accordingly\n-To co-ordinate with Construction & Commissioning team for arranging the vendor supervisor during Pre-Commissioning, Erection & Commissioning.\n\nEquipments / Packages Handled :-\n\n-3-Phase Test Separators, Pressure Vessels (CS), Knock Out Drums (CS + SS316L) & Process Internals for Process Vessels. \n-Waste Heat Recovery Units of capacity 13.5 MW x 3 Nos & 7.7 MW.\n-Fuel Gas Conditioning Skids \n-Expediting of API Welded Tubular (Approx – 170 Nos ranging from 3 Met – 6 Met in Length) to deliver the Tubular on Schedule.\n\nProjects :\n1. ONGC – MHSRP - II Project Mumbai (Offshore Process Platform)\n2. MHN Process Project, India (Offshore Process Platform)\n3. ZAWTIKA Field Development, Myanmar (Offshore Well Head Platform)\n4. MHN Process Gas Compressor Project, India (Offshore Process Platform) \n5. ADMA NASR Project, Abu Dhabi - Procurement Coordinator\n6. ADMA Water Injection Project, Abu Dhabi (Bidding Project- Procurement Coordinator)"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "7337",
                                  "companyUrn": "urn:li:fsd_company:7337",
                                  "companyLink1": "https://www.linkedin.com/company/7337/",
                                  "logo": "https://media.licdn.com/dms/image/v2/D4D0BAQEuXWWCblWEow/company-logo_200_200/company-logo_200_200/0/1724999105641/essar_logo?e=1747872000&v=beta&t=fPVcAcmiOyPH-z3a38bDSLsw0rNsCKdENvxVcgwsUg8",
                                  "title": "Asst Manager Procurement",
                                  "subtitle": "Essar",
                                  "caption": "2007 - 2008 · 1 yr",
                                  "metadata": "Mumbai",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "textComponent",
                                                  "text": "- Order placement of Water Packages DM Water Plant capacity of 750m3/day, Raw Water Treatment Plant.\n- Heavy oil Filtration Unit like FCCU Crude Filtration Unit, DHDT Crude Filters, VGO Filters, ATF Filters for Expansion of Essar Refinery at Jamnagar.\n- Dust Collection System for Blast Furnace Unit for Expansion of Steel Plant.\n"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "166260",
                                  "companyUrn": "urn:li:fsd_company:166260",
                                  "companyLink1": "https://www.linkedin.com/company/166260/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C560BAQElLjzBOS5uaA/company-logo_200_200/company-logo_200_200/0/1631380543482?e=1747872000&v=beta&t=cGWI3mp3EEhvuhFrPsYmkNaRtoEkOdUZ_PcPLqjGcRw",
                                  "title": "Soda Ash Department",
                                  "subtitle": "Tata Chemicals",
                                  "caption": "2006 - 2007 · 1 yr",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "educations": [
                              {
                                  "companyId": "215708",
                                  "companyUrn": "urn:li:fsd_company:215708",
                                  "companyLink1": "https://www.linkedin.com/company/215708/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C4D0BAQEP81TtQDURzQ/company-logo_200_200/company-logo_200_200/0/1654151712456/spjimr_logo?e=1747872000&v=beta&t=UoqJNoIeiXLoi7QntfiRBHwXEYoVbMI8R_kx0yTzDJQ",
                                  "title": "SPJIMR SP Jain Institute of Management & Research",
                                  "subtitle": "Post Graduate Executive Management Programme",
                                  "caption": "Sep 2019 - Nov 2021",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Grade: 3.12"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "companyId": "15140268",
                                  "companyUrn": "urn:li:fsd_company:15140268",
                                  "companyLink1": "https://www.linkedin.com/company/15140268/",
                                  "logo": "https://media.licdn.com/dms/image/v2/C510BAQFnU9phh-q1EQ/company-logo_200_200/company-logo_200_200/0/1630623324891/k_j_somaiya_institute_of_engineering_and_information_technology_logo?e=1747872000&v=beta&t=nnbn4CqnOdfsdBIhV_VHcRQAeCd63Z0jLpmoYgy9Xs0",
                                  "title": "K. J. Somaiya Institute of Technology",
                                  "subtitle": "Bachelor's Degree, Mechanical Engineering",
                                  "caption": "2003 - 2006",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "licenseAndCertificates": [],
                          "honorsAndAwards": [],
                          "languages": [
                              {
                                  "title": "English",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              },
                              {
                                  "title": "Gujarati",
                                  "breakdown": false,
                                  "subComponents": [
                                      {
                                          "description": []
                                      }
                                  ]
                              }
                          ],
                          "volunteerAndAwards": [],
                          "verifications": [],
                          "promos": [],
                          "highlights": [],
                          "projects": [],
                          "publications": [],
                          "patents": [],
                          "courses": [],
                          "testScores": [],
                          "organizations": [],
                          "volunteerCauses": [],
                          "skills": [
                              {
                                  "title": "Category Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Senior Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Value Engineering",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Senior Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Project Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Senior Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "EPC",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Senior Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "20 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Procurement",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Senior Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "41 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "9 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Contract Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "8 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Project Engineering",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "15 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Global Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Materials Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "11 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Project Estimation",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "7 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Chain",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "2 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Strategic Sourcing",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Senior Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Petrochemical",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "6 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Vendor Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "Senior Procurement Manager at AFCONS Infrastructure Limited - A Shapoorji Pallonji Group Company"
                                              },
                                              {
                                                  "type": "insightComponent",
                                                  "text": "3 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Supply Management",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "4 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Engineering",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "18 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Power Plants",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "4 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              },
                              {
                                  "title": "Materials",
                                  "subComponents": [
                                      {
                                          "description": [
                                              {
                                                  "type": "insightComponent",
                                                  "text": "4 endorsements"
                                              }
                                          ]
                                      }
                                  ]
                              }
                          ],
                          "profilePicHighQuality": "https://media.licdn.com/dms/image/v2/C5103AQHg2re3DyXodw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1576780552293?e=1747872000&v=beta&t=mDt77Df7hab006JH1-BNn2199_j95usWfa9Zf73I3aI",
                          "linkedinUrl": "https://in.linkedin.com/in/saurabh-patel-pgemp-6375a115",
                          "email": null,
                          "companyName": "Afcons Infrastructure Limited - A Shapoorji Pallonji Group Company",
                          "companyIndustry": "Construction",
                          "companyWebsite": "afcons.com",
                          "companyLinkedin": "linkedin.com/company/afcons-infrastructure-limited",
                          "companyFoundedIn": 1959,
                          "companySize": "1001-5000"
                      }
                  ]
              }
          }
      ]
  },
  "CompetitorsEngagement": [
      {
          "competitor": "SAIL",
          "priceComparison": {
              "jswSteelPrice": "₹58,000",
              "competitorPrice": "₹56,840",
              "percentageDifference": "-2.0%"
          },
          "marketPosition": {
              "marketShare": "JSW Steel: 15%, SAIL: 20%",
              "regionalStrengths": "JSW Steel: Strong in South and West India; SAIL: Strong in North and East India",
              "distributionNetwork": "JSW Steel: Extensive network with 200+ warehouses; SAIL: 150+ warehouses",
              "manufacturingCapabilities": "JSW Steel: Advanced manufacturing with 18 MTPA capacity; SAIL: 21 MTPA capacity"
          },
          "productQuality": {
              "steelGradeComparisons": "JSW Steel: Offers IS 1786, IS 2062 grades; SAIL: Offers similar grades with slight variations",
              "qualityCertifications": "JSW Steel: ISO 9001, ISO 14001; SAIL: ISO 9001, ISO 14001, OHSAS 18001",
              "productRangeAvailability": "JSW Steel: Wide range including TMT, HR, CR; SAIL: Similar range with additional specialty products",
              "technicalSpecifications": "JSW Steel: High tensile strength, corrosion resistance; SAIL: Comparable with additional certifications"
          },
          "deliveryLogistics": {
              "deliveryTimeframes": "JSW Steel: 7-10 days; SAIL: 10-14 days",
              "geographicCoverage": "JSW Steel: Pan-India with focus on urban areas; SAIL: Extensive rural and urban coverage",
              "warehouseLocations": "JSW Steel: 200+ warehouses; SAIL: 150+ warehouses",
              "transportationCapabilities": "JSW Steel: Advanced logistics with GPS tracking; SAIL: Reliable but less tech-driven"
          },
          "financialStability": {
              "creditTermsComparison": "JSW Steel: 30-60 days credit; SAIL: 45-90 days credit",
              "paymentFlexibility": "JSW Steel: Flexible payment options; SAIL: Standard payment terms",
              "financialHealthIndicators": "JSW Steel: Strong revenue growth; SAIL: Stable but slower growth",
              "riskAssessment": "JSW Steel: Lower risk due to diversified portfolio; SAIL: Moderate risk with government backing"
          },
          "competitiveAdvantages": {
              "environmentalCompliance": "JSW Steel: High compliance with green initiatives; SAIL: Moderate compliance",
              "technologyAdoption": "JSW Steel: Advanced automation and AI; SAIL: Traditional methods with gradual upgrades",
              "rndCapabilities": "JSW Steel: Strong R&D with 500+ patents; SAIL: Moderate R&D with government support",
              "customerServiceQuality": "JSW Steel: High customer satisfaction; SAIL: Reliable but slower response times"
          },
          "strategicRecommendations": {
              "keyDifferentiators": "JSW Steel: Advanced technology, faster delivery; SAIL: Government backing, extensive rural reach",
              "riskMitigationStrategies": "JSW Steel: Diversify supply chain; SAIL: Enhance technology adoption",
              "negotiationLeveragePoints": "JSW Steel: Price competitiveness; SAIL: Long-term credit terms",
              "longTermPartnershipBenefits": "JSW Steel: Innovation and efficiency; SAIL: Stability and reliability"
          }
      }
  ],
  "errors": []
}


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

// Add this after your imports
const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Company Details Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Decision Makers Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div className="ml-4">
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Analysis Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="h-6 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="divide-y divide-gray-100">
                {/* Price Analysis Skeleton */}
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="border rounded-lg p-4">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Market Position Skeleton */}
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, j) => (
                      <div key={j} className="border rounded-lg p-4">
                        <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
    <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  </div>
);

const SkeletonSection = ({ title }: { title: string }) => (
  <div className="mb-6">
    <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
    <div className="space-y-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="divide-y divide-gray-100">
            {/* Price Analysis Skeleton */}
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="border rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
            {/* Market Position Skeleton */}
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="border rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ContactButton Component - with proper props definition
const ContactButton = ({ 
  profileUrl, 
  fetchContactDetails, 
  contactStates 
}: { 
  profileUrl: string; 
  fetchContactDetails: (profileUrl: string) => Promise<any>;
  contactStates: {
    [key: string]: {
      showOptions: boolean;
      contactInfo: { email: string[]; phone: string[]; } | null;
    };
  };
}) => {
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
          {contactState?.contactInfo?.email?.[0] && (
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
          {contactState?.contactInfo?.phone?.[0] && (
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

// Main component
const Home = () => {
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
      // Check if in development mode
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock data in development mode');
        // Use mock data with a slight delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 5000));
        setApiResponse(mockApiResponse as any);
        setIsLoading(false);
        return;
      }

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
        {isLoading && (
            <SkeletonLoader />
        )}

        {
          apiResponse && (
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
                          fetchContactDetails={fetchContactDetails}
                          contactStates={contactStates}
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
                  <h2 className="text-2xl font-semibold text-blue-800">Competitor Analysis</h2>
                  <div className="ml-3 h-px flex-1 bg-gradient-to-r from-gray-200 to-gray-200"></div>
                </div>
                <div className="grid gap-8">
                  {apiResponse?.CompetitorsEngagement?.map((engagement, index) => (
                    <div key={index} className="rounded-xl border border-blue-100 bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Header */}
                      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-6 py-5">
                        <h3 className="text-xl font-semibold flex items-center gap-3">
                          <span className="font-bold">JSW Steel</span>
                          <span className="px-3 py-1 bg-white/20 rounded-full ">VS</span>
                          <span className="font-bold">
                            {index === 0 ? apiResponse.companyData?.data?.Basic_Company_Details?.["Legal Name"] : engagement?.competitor }
                          </span>
                        </h3>
                      </div>
                      
                      {/* Content */}
                      <div className="divide-y divide-blue-50">
                        {/* Price Comparison */}
                        <div className="p-6 bg-gradient-to-b from-white to-blue-50">
                          <h4 className="mb-4 text-lg font-medium flex items-center gap-2">
                            <div className="p-1.5 bg-blue-100 rounded-full">
                              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-blue-800">Price Analysis</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="border border-blue-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                              <p className="text-sm font-medium mb-2 ">JSW Steel Price</p>
                              <p className="text-lg font-semibold ">{engagement?.priceComparison?.jswSteelPrice ?? "N/A"}</p>
                            </div>
                            <div className="border border-blue-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                              <p className="text-sm font-medium mb-2 ">Competitor Price</p>
                              <p className="text-lg font-semibold ">{engagement?.priceComparison?.competitorPrice ?? "N/A"}</p>
                            </div>
                            <div className="border border-blue-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                              <p className="text-sm font-medium mb-2 ">Price Difference</p>
                              <div className={`inline-flex items-center gap-1 text-lg font-semibold 
                                ${engagement?.priceComparison?.percentageDifference?.includes('-') 
                                  ? 'text-red-600' 
                                  : engagement?.priceComparison?.percentageDifference?.includes('+') 
                                    ? 'text-green-600' 
                                    : 'text-red-800'}`}>
                                {engagement?.priceComparison?.percentageDifference?.includes('-') && (
                                  <div className="p-1 bg-red-100 rounded-full">
                                    <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                  </div>
                                )}
                                {engagement?.priceComparison?.percentageDifference?.includes('+') && (
                                  <div className="p-1 bg-green-100 rounded-full">
                                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                  </div>
                                )}
                                <p className="text-base">
                                  {engagement?.priceComparison?.percentageDifference
                                    ? engagement.priceComparison.percentageDifference
                                        .split(";")
                                        .map((difference, idx) => (
                                          <span key={idx} className="block">
                                            {difference.trim()}
                                          </span>
                                        ))
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Market Position */}
                        <div className="p-6 bg-gradient-to-b from-white to-purple-50">
                          <h4 className="mb-4 text-lg font-medium flex items-center gap-2">
                            <div className="p-1.5 bg-purple-100 rounded-full">
                              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <span className="text-purple-800">Market Position</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-purple-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                              <p className="text-sm font-medium mb-2 text-purple-500">Market Share</p>
                              <p className="text-lg font-semibold text-purple-600">{engagement.marketPosition.marketShare ?? "N/A"}</p>
                            </div>
                            <div className="border border-purple-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                              <p className="text-sm font-medium mb-2 text-purple-500">Regional Strengths</p>
                              <p className="text-base text-gray-800">
                                {engagement.marketPosition.regionalStrengths
                                  ? engagement.marketPosition.regionalStrengths
                                      .split(";")
                                      .map((strength, idx) => (
                                        <span key={idx} className="block py-0.5">
                                          {strength.trim()}
                                        </span>
                                      ))
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Product Quality */}
                        <div className="p-6 bg-gradient-to-b from-white to-green-50">
                          <h4 className="mb-4 text-lg font-medium flex items-center gap-2">
                            <div className="p-1.5 bg-green-100 rounded-full">
                              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            </div>
                            <span className="text-green-800">Product Quality</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-green-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                              <p className="text-sm font-medium mb-2 text-green-500">Quality Certifications</p>
                              <p className="text-base text-gray-800">
                                {engagement?.productQuality?.qualityCertifications
                                  ? engagement.productQuality.qualityCertifications
                                      .split(";")
                                      .map((certification, idx) => (
                                        <span key={idx} className="block py-0.5">
                                          {certification.trim()}
                                        </span>
                                      ))
                                  : "N/A"}
                              </p>
                            </div>
                            <div className="border border-green-100 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                              <p className="text-sm font-medium mb-2 text-green-500">Product Range</p>
                              <p className="text-base text-gray-800">
                                {engagement?.productQuality?.productRangeAvailability
                                  ? engagement.productQuality.productRangeAvailability
                                      .split(";")
                                      .map((item, idx) => (
                                        <span key={idx} className="block py-0.5">
                                          {item.trim()}
                                        </span>
                                      ))
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Two Column Layout for Delivery & Financial */}
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                          {/* Delivery Logistics */}
                          <div className="p-6">
                            <h4 className="mb-4 text-lg font-medium flex items-center gap-2">
                              <svg className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Delivery Logistics
                            </h4>
                            <div className="space-y-4">
                              <div className="border rounded-lg p-4 bg-white shadow-sm">
                                <p className="text-sm font-medium mb-2 text-gray-500">Delivery Timeframes</p>
                              <p className="text-base text-gray-800">
  {engagement?.deliveryLogistics?.deliveryTimeframes
    ? engagement.deliveryLogistics.deliveryTimeframes
        .split(";")
        .map((timeframe, index) => (
          <span key={index} className="block">
            {timeframe.trim()}
          </span>
        ))
    : "N/A"}
</p>
 </div>
                              <div className="border rounded-lg p-4 bg-white shadow-sm">
                                <p className="text-sm font-medium mb-2 text-gray-500">Geographic Coverage</p>
                              <p className="text-base text-gray-800">
  {engagement?.deliveryLogistics?.geographicCoverage
    ? engagement.deliveryLogistics.geographicCoverage
        .split(";")
        .map((coverage, index) => (
          <span key={index} className="block">
            {coverage.trim()}
          </span>
        ))
    : "N/A"}
</p>
  </div>
                            </div>
                          </div>

                          {/* Financial Stability */}
                          <div className="p-6">
                            <h4 className="mb-4 text-lg font-medium flex items-center gap-2">
                              <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                              </svg>
                              Financial Stability
                            </h4>   
                            <div className="space-y-4">
                              <div className="border rounded-lg p-4 bg-white shadow-sm">
                                <p className="text-sm font-medium mb-2 text-gray-500">Credit Terms</p>
                               <p className="text-base text-gray-800">
  {engagement?.financialStability?.creditTermsComparison
    ? engagement.financialStability.creditTermsComparison
        .split(";")
        .map((term, index) => (
          <span key={index} className="block">
            {term.trim()}
          </span>
        ))
    : "N/A"}
</p>
    </div>
                              <div className="border rounded-lg p-4 bg-white shadow-sm">
                                <p className="text-sm font-medium mb-2 text-gray-500">Risk Assessment</p>
                                <div className={`text-base font-medium ${
                                  engagement.financialStability.riskAssessment?.toLowerCase().includes('low') 
                                    ? 'text-green-600' 
                                    : engagement.financialStability.riskAssessment?.toLowerCase().includes('high')
                                      ? 'text-red-600'
                                      : 'text-yellow-600'
                                }`}>
                                 <p className="text-base text-gray-800">
  {engagement?.financialStability?.riskAssessment
    ? engagement.financialStability.riskAssessment
        .split(";")
        .map((risk, index) => (
          <span key={index} className="block">
            {risk.trim()}
          </span>
        ))
    : "N/A"}
</p>
  </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Strategic Recommendations */}
                        <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
                          <h4 className="mb-4 text-lg font-medium flex items-center gap-2">
                            <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Strategic Recommendations
                          </h4>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-4 bg-white shadow-sm">
                              <p className="text-sm font-medium mb-2 text-gray-500">Key Differentiators</p>
                           <p className="text-base text-gray-800">
  {engagement?.strategicRecommendations?.keyDifferentiators
    ? engagement.strategicRecommendations.keyDifferentiators
        .split(";")
        .map((differentiator, index) => (
          <span key={index} className="block">
            {differentiator.trim()}
          </span>
        ))
    : "N/A"}
</p>
 </div>
                            <div className="border rounded-lg p-4 bg-white shadow-sm">
                              <p className="text-sm font-medium mb-2 text-gray-500">Negotiation Leverage Points</p>
                           <p className="text-base text-gray-800">
  {engagement?.strategicRecommendations?.negotiationLeveragePoints
    ? engagement.strategicRecommendations.negotiationLeveragePoints
        .split(";")
        .map((point, index) => (
          <span key={index} className="block">
            {point.trim()}
          </span>
        ))
    : "N/A"}
</p>
 </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!apiResponse?.CompetitorsEngagement || apiResponse.CompetitorsEngagement.length === 0) && (
                    <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center bg-gradient-to-r from-blue-50 via-white to-purple-50">
                      <svg className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg text-gray-500">No competitor analysis available</p>
                      <p className="text-sm text-gray-400 mt-2">Select competitors to analyze market positioning</p>
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
                              <p className="mt-1 text-sm text-gray-700">
                             
                               </p>
                              <div className="flex items-center space-x-2">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                                  Procurement Executive
                                </span>
                                
                              </div>
                            </div>
                            <ContactButton 
                              profileUrl={executive.profileUrl} 
                              fetchContactDetails={fetchContactDetails} 
                              contactStates={contactStates} 
                            />
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

export default Home;

