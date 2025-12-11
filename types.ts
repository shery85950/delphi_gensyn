export interface AIModel {
  id: string;
  name: string;
  type: string;
  initialPrice: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  winProbability: number; // For simulation logic
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum DemoStep {
  SELECT = 0,
  INVEST = 1,
  COMPETE = 2,
  REWARD = 3
}