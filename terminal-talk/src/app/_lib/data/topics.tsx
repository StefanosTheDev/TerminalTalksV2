// src/data/topics.ts
import { Code } from 'lucide-react';

export const topics = () => [
  {
    id: 'nextjs',
    name: 'Next.js App Router',
    icon: 'layout',
    items: [
      { id: 'nextjs-intro', name: 'Introduction' },
      { id: 'nextjs-routing', name: 'Routing & Pages' },
      { id: 'nextjs-data', name: 'Data Fetching' },
      { id: 'nextjs-auth', name: 'Authentication' },
      { id: 'nextjs-deploy', name: 'Deployment' },
    ],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: 'server',
    items: [
      { id: 'node-intro', name: 'Getting Started' },
      { id: 'node-express', name: 'Express.js' },
      { id: 'node-database', name: 'Database Integration' },
      { id: 'node-auth', name: 'Auth & Sessions' },
      { id: 'node-api', name: 'Building APIs' },
    ],
  },
  {
    id: 'aws',
    name: 'AWS Essentials',
    icon: 'cloud',
    items: [
      { id: 'aws-intro', name: 'Intro to AWS' },
      { id: 'aws-compute', name: 'EC2 & Lambda' },
      { id: 'aws-storage', name: 'S3 & Storage' },
      { id: 'aws-database', name: 'RDS & DynamoDB' },
      { id: 'aws-security', name: 'IAM & Security' },
    ],
  },
];

export const getFrameworks = () => [
  {
    label: 'Next.js App Router',
    desc: "The Next.js App Router introduces a new model for building applications using React's latest features.",
    icon: <span className="text-white font-bold text-sm">N</span>,
    color: 'bg-black',
    hover: 'hover:border-blue-500/50',
    linkColor: 'text-blue-400 hover:text-blue-300',
  },
  {
    label: 'React',
    desc: 'The web framework for content-driven websites with React components and hooks.',
    icon: <Code className="h-5 w-5 text-white" />,
    color: 'bg-blue-500',
    hover: 'hover:border-blue-500/50',
    linkColor: 'text-blue-400 hover:text-blue-300',
  },
];
