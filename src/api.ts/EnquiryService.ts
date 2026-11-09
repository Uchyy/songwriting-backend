import type { Enquiry } from "../models/Enquiry";
import { apiRequest } from "./service";

export async function getAdminEnquiries(): Promise<Enquiry[]> {
  return apiRequest<Enquiry[]>("/api/enquiries");
}