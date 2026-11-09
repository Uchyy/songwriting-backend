import type { Enquiry } from "../models/Enquiry";


interface EnquiriesListProps {
  enquiries: Enquiry[];
}

function EnquiriesList({ enquiries }: EnquiriesListProps) {
  const newCount = enquiries.filter( (enquiry) => enquiry.status === "NEW").length;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl">Enquiries</h2>
           <span className="rounded-full bg-gold/20 px-3 py-1 text-sm text-espresso">
                {newCount} new
            </span>
        </div>

       
      </div>

      <div className="divide-y divide-beige border-y border-beige bg-white/90 p-5">
        {enquiries.map((enquiry) => (
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
                  enquiry.status === "NEW"
                    ? "bg-gold/20 text-espresso"
                    : "bg-beige text-espresso-light"
                }`}
              >
                {enquiry.status === "NEW" ? "New" : "Responded"}
              </span>
            </div>

            <h4 className="mt-3 font-label text-sm">
              {enquiry.subject}
            </h4>

            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-espresso-light">
              {enquiry.message}
            </p>

            <div className="mt-3 flex justify-end">
              <a
                href={`mailto:${enquiry.email}?subject=${encodeURIComponent(
                  `Re: ${enquiry.subject}`
                )}`}
                className="font-label text-sm text-gold-muted underline-offset-4 hover:underline"
              >
                Respond →
              </a>
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
