# Company Intelligence Frontend

A modern, minimalist frontend application built with Next.js for gathering comprehensive insights about target companies. The application features an Apple-inspired design with a focus on user experience and professional aesthetics.

## Features

- Company information input form
- Multiple key decision maker support
- Project details input
- Competitor evaluation with predefined options
- Real-time loading states
- Animated results display
- Responsive design
- Apple-inspired UI/UX

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Heroicons

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-jsw-enrichment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # Reusable components
└── types/                 # TypeScript type definitions
```

## API Integration

The frontend is designed to work with a backend API endpoint at `/api/enrichment`. The API should accept POST requests with the following structure:

```typescript
interface FormData {
  companyName: string;
  keyDecisionMakers: { name: string }[];
  projectDetails: string;
  competitors: { name: string; selected: boolean }[];
}
```

And return data in the following format:

```typescript
interface ApiResponse {
  keyDecisionMakerIntelligence: {
    name: string;
    position: string;
    experience: string;
    education: string;
    achievements: string[];
    interests: string[];
  }[];
  companyTechnicalDetails: {
    registeredAddress: string;
    directors: string[];
    listingStatus: string;
    incorporationDate: string;
    industry: string;
  };
  competitorEngagements: {
    competitorName: string;
    engagementType: string;
    description: string;
    date: string;
  }[];
  alternateDecisionMakers: {
    name: string;
    position: string;
    relevance: string;
    contactInfo: string;
  }[];
}
```

## Development

- The application uses TypeScript for type safety
- Tailwind CSS is used for styling with custom theme configuration
- Framer Motion is used for smooth animations
- The UI follows Apple's design principles with a focus on typography and spacing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. #   H i g h _ I n t e l l i g e n c e _ S c r a p p e r 
 
 