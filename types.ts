export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface ValueItem {
  title: string;
  description: string;
  bgColor: 'white' | 'gold' | 'beige';
}

export interface ApproachStep {
  title: string;
  description: string;
}