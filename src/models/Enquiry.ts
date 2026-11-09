export type EnquiryStatus = "NEW" | "RESPONDED" | "IN_PROGRESS" | "CLOSED";

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  createdAt?: string;
  updatedAt?: string;
}