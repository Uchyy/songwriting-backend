
import { useState } from "react";
import { MoreHorizontal, Check } from "lucide-react";
import type { Enquiry, EnquiryStatus } from "../models/Enquiry";
import { updateEnquiryStatus } from "../api.ts/EnquiryService";

interface Props {
  enquiry: Enquiry;
  onUpdate: (updated: Enquiry) => void;
}

const statuses: EnquiryStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "RESPONDED",
  "CLOSED",
];

const labels: Record<EnquiryStatus, string> = {
  NEW: "New",
  IN_PROGRESS: "In progress",
  RESPONDED: "Responded",
  CLOSED: "Closed",
};

export default function EnquiryStatusMenu({
  enquiry,
  onUpdate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleStatusChange(status: EnquiryStatus) {
    if (status === enquiry.status) {
      setOpen(false);
      return;
    }

    try {
      setLoading(true);

      const updated = await updateEnquiryStatus(enquiry, status);
      onUpdate(updated);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update enquiry status:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        disabled={loading}
        title="Change enquiry status"
        aria-label="Change enquiry status"
        className="rounded-md p-2 text-espresso-light hover:bg-beige"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 bottom-full z-20 mb-2 w-44 rounded-lg border border-beige bg-white p-2 shadow-lg">
          <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-espresso-light">
            Enquiry status
          </p>

          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              disabled={loading}
              onClick={() => handleStatusChange(status)}
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm text-espresso hover:bg-beige disabled:opacity-50"
            >
              {labels[status]}

              {enquiry.status === status && (
                <Check size={15} className="text-gold-muted" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
