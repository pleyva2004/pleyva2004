export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  period: string;
  position: 'left' | 'right';
}

export const timelineData: TimelineItem[] = [
  {
    id: '1',
    role: 'Founder',
    company: 'Your Company',
    companyUrl: 'https://yourcompany.com',
    description: 'Building the next generation of innovative solutions that empower businesses and transform industries.',
    period: 'Feb 2025 - Present',
    position: 'left'
  },
  {
    id: '2',
    role: 'Intern',
    company: 'Previous Company',
    companyUrl: 'https://previouscompany.com',
    description: 'Software Engineering Intern - Full time offer received',
    period: 'Jun 2024 - Aug 2024',
    position: 'right'
  },
  {
    id: '3',
    role: 'Founder',
    company: 'Another Venture',
    companyUrl: 'https://anotherventure.com',
    description: 'Created innovative solutions for the education technology space.',
    period: 'Aug 2023 - Present',
    position: 'left'
  },
  {
    id: '4',
    role: 'Co-Founder',
    company: 'Startup Name',
    companyUrl: 'https://startup.com',
    description: 'Building sustainable solutions for tomorrow.',
    period: 'Oct 2022 - Sep 2023',
    position: 'right'
  }
];