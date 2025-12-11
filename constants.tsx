import { 
  LineChart, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Users, 
  Trophy, 
  Brain, 
  Activity 
} from 'lucide-react';
import { AIModel, Feature, FAQItem } from './types';

export const AI_MODELS: AIModel[] = [
  {
    id: 'm1',
    name: 'Omni-G 4.0',
    type: 'General Purpose',
    initialPrice: 42.50,
    trend: 'up',
    description: 'Versatile reasoning engine with high adaptability.',
    winProbability: 0.8
  },
  {
    id: 'm2',
    name: 'CodeWiz Pro',
    type: 'Coding Specialist',
    initialPrice: 38.20,
    trend: 'stable',
    description: 'Optimized for syntax generation and debugging.',
    winProbability: 0.6
  },
  {
    id: 'm3',
    name: 'CreativeFlow',
    type: 'Creative Writing',
    initialPrice: 29.99,
    trend: 'up',
    description: 'Focuses on narrative nuance and style transfer.',
    winProbability: 0.5
  },
  {
    id: 'm4',
    name: 'LogicCore v2',
    type: 'Math & Logic',
    initialPrice: 45.00,
    trend: 'down',
    description: 'Strict logical adherence and step-by-step proofs.',
    winProbability: 0.7
  }
];

export const FEATURES: Feature[] = [
  {
    id: 'f1',
    title: 'Real-Time Markets',
    description: 'Prices fluctuate instantly based on global demand and model performance.',
    icon: Activity
  },
  {
    id: 'f2',
    title: 'Continuous Liquidity',
    description: 'Enter or exit your position at any moment. The market never sleeps.',
    icon: Zap
  },
  {
    id: 'f3',
    title: 'On-Chain Verification',
    description: 'Every benchmark result is cryptographically verified via Gensyn.',
    icon: ShieldCheck
  },
  {
    id: 'f4',
    title: 'Open Participation',
    description: 'No gatekeepers. Anyone with insight can trade and win.',
    icon: Globe
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "What happens if the model I pick loses?",
    answer: "Like the stock market, the value of your stake decreases. However, you can sell your position at any time or hold if you believe it will improve in future benchmarks."
  },
  {
    question: "How are the models actually tested?",
    answer: "We run verified inference tasks—like coding challenges or Q&A sets. The results are validated on-chain to ensure no central authority can rig the outcome."
  },
  {
    question: "Is this real money?",
    answer: "Currently, Delphi is operating on a Testnet environment. You can experience the mechanics without financial risk before the Mainnet launch."
  }
];