export type ApplicationStatus =
  | "PENDING"
  | "REVIEWING"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED"
  | "ACCEPTED";

export interface JobSeekerProfile {
  id: number;
  fullName: string;
  address: string;
  phone: string;
  email?: string;
  secondaryPhone?: string;
  professionalTitle?: string;
  biography?: string;
  dateOfBirth?: string;
  nationality?: string;
  maritalStatus?: string;
  gender?: string;
  experienceSummary?: string;
  educationSummary?: string;
  website?: string;
}

export interface JobApplication {
  id: number;
  coverLetter: string;
  status: ApplicationStatus;
  appliedAt?: string;
  jobSeekerProfile: JobSeekerProfile;
  jobPost: {
    id: number;
    title: string;
  };
}

export interface JobApplicationResponse {
  success: boolean;
  message: string;
  data: JobApplication[];
}

export interface JobApplicationDetail {
  id: number;

  coverLetter: string;

  approve: boolean;

  jobSeekerProfile: {
    id: number;
    fullName: string;
    email?: string;
    address: string;
    phone: string;
    secondaryPhone?: string;
    professionalTitle?: string;
    biography?: string;
    dateOfBirth?: string;
    nationality?: string;
    maritalStatus?: string;
    gender?: string;
    experienceSummary?: string;
    educationSummary?: string;
    website?: string;
    social?: {
      facebook?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
  jobPost: {
    id: number;
    title: string;
  };
  resume: {
    id: number;
    fileUrl: string;
  };
}
