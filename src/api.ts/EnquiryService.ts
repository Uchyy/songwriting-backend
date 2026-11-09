import type { Enquiry, EnquiryStatus } from "../models/Enquiry";
import { apiRequest } from "./service";

export async function getAdminEnquiries(): Promise<Enquiry[]> {
  return apiRequest<Enquiry[]>("/api/enquiries");
}


export async function updateEnquiryStatus( enquiry: Enquiry, status: EnquiryStatus): Promise<Enquiry> {
  return apiRequest<Enquiry>(`/api/enquiries/${enquiry.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...enquiry,
      status,
    }),
  });
}