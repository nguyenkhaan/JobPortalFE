export interface JobSeekerProfile {
  id: number;
  fullName: string;
  email?: string;
  address: string;
  phone: string;
  professionalTitle?: string;
  biography?: string;
  dateOfBirth?: string;
  nationality?: string;
  maritalStatus?: string;
  gender?: string;
  experienceSummary?: string;
  educationSummary?: string;
  website?: string;
  secondaryPhone?: string;
  approve?: boolean;
}

export interface ResumeRecord {
  id: number;
  fileUrl: string;
  defaultResume: boolean;
  uploadedAt: string;
}
