import { useState } from "react";
import { updateEnquiryStatus } from "../api.ts/EnquiryService";
import type { Enquiry } from "../models/Enquiry";
import { Mail, MoreHorizontal, Check } from "lucide-react";
import EnquiryStatusMenu from "./EnquiryStatusMenu";


interface EnquiriesListProps {
  enquiries: Enquiry[];
}

const statusOrder = {
  NEW: 1,
  IN_PROGRESS: 2,
  RESPONDED: 3,
  CLOSED: 4,
};

function EnquiriesList({ enquiries }: EnquiriesListProps) {
  const newCount = enquiries.filter( (enquiry) => enquiry.status === "NEW").length;
  const [enquiriesState, setEnquiries] = useState<Enquiry[]>(enquiries);

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Enquiries</h2>
           <span className="rounded-full bg-gold/20 px-3 py-1 text-sm text-espresso">
                {newCount} new
            </span>   
      </div>

      <div className="divide-y divide-beige border-y border-beige bg-white/90 p-5">
        {enquiries.sort((a, b) => (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0)).map((enquiry) => (
          <article
            key={enquiry.id}
            className="py-2"  >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg">
                  {enquiry.name}
                </h3>
                <p className="text-xs text-espresso-light">
                  {enquiry.email}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  enquiry.status === "NEW" ? "bg-gold/20 text-espresso" : "bg-beige text-espresso-light" }`}>
                {enquiry.status.replace("_", " ").toLowerCase()}
              </span>
            </div>

            <h4 className="mt-3 font-label text-sm">
              {enquiry.subject}
            </h4>

            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-espresso-light">
              {enquiry.message}
            </p>

            <div className="mt-3 flex items-center justify-end gap-2">
                <a
                    href={`mailto:${enquiry.email}?subject=${encodeURIComponent(
                    `Re: ${enquiry.subject}`
                    )}`}
                    title="Reply to enquiry"
                    className="rounded-md p-2 text-espresso-light hover:bg-beige"
                >
                    <Mail size={17} />
                </a>

                <EnquiryStatusMenu
                    enquiry={enquiry}
                    onUpdate={(updated) =>
                    setEnquiries((previous) =>
                        previous.map((item) =>
                        item.id === updated.id ? updated : item
                        )
                    )
                    }
                />
                </div>
          </article>
        ))}

        {enquiries.length === 0 && (
          <p className="py-10 text-center text-sm text-espresso-light">
            No enquiries yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default EnquiriesList;
