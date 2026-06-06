export interface SocialLinkPayload {
  network: string;
  url: string;
}

export interface EmployerSetupPayload {
  companyName: string;
  description: string;
  logo: File | null;
  banner: File | null;
  organizationType: string;
  industry: string;
  teamSize: string;
  founded: string;
  companyWebsite: string;
  vision: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: SocialLinkPayload[];
}

export interface EmployerProfile {
  id: number;
  companyName: string;
  address: string;
  companyWebsite: string;
  logo: string;
  banner: string;
  description: string;
  vision: string;
  founded: string;
  teamSize: string;
  industry: string;
  organizationType: string;
  email: string;
  phone: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  linkedInUrl?: string;
  approvalStatus?: string;
  rejectionReason?: string | null;
}

export interface JobResponse {
  id: number;
  title: string;
  description: string;
  employmentType: string;
  salaryMin: number;
  salaryMax: number;
  salaryType: string;
  expiresAt: string;
  status: string;
  jobLevel?: string;
  educationLevel?: string;
  experience?: number;
  tags?: string;
  isFeatured?: boolean;
  isHighlighted?: boolean;
  jobRole?: string;
  responsibilities?: string;
  vacancies?: number;
  applicationCount?: number;
  industries?: { id: number; name: string }[];
  employer?: {
    id: number;
    companyName: string;
    companyWebsite: string;
    logo: string | null;
  };
}
