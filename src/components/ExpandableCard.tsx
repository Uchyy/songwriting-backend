import { useEffect,useId, useRef, useState, type ReactNode,} from "react";
import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  image: string;
  children: ReactNode;
  isSquare?: boolean;
}

function ExpandableCard({ title, subtitle, image, children, isSquare = false }: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key === "Tab") {
        const focusableElements =
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );

        if (!focusableElements?.length) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      previousFocus?.focus();
    };
  }, [isOpen]);

  return (
    <>
      {/* Card trigger */}
      <motion.button
        ref={triggerRef}
        type="button"
        layoutId={`card-${id}`}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? `${id}-dialog` : undefined}
        className={`relative ${isSquare ? "w-45" : "w-full "}overflow-hidden rounded-2xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold `} >
          <img
            src={image}
            alt=""
            className="h-30 w-full object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/40"
          />

          <div className="absolute bottom-0 pt-6 text-white px-3 pb-3">
            <h3 className="font-display text-lg">{title}</h3>

            {subtitle && (
              <p className="mt-1 text-xs">{subtitle}</p>
            )}
          </div>
      </motion.button>

      {/* Expanded dialog */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.button
                type="button"
                aria-label="Close dialog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-50 cursor-default bg-black/60"
              />

              {/* Dialog container */}
              <div className="no-scrollbar fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
                <motion.div
                  ref={dialogRef}
                  id={`${id}-dialog`}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  aria-describedby={subtitle ? descriptionId : undefined}
                  tabIndex={-1}
                  layoutId={`card-${id}`}
                  className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-ivory shadow-xl focus:outline-none">
                  {/* Close button */}
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close dialog"
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-espresso transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                    <span aria-hidden="true">✕</span>
                  </button>

                  <div className="grid md:grid-cols-2">
                    <img
                      src={image}
                      alt=""
                      className="h-64 w-full object-cover md:h-full"
                    />

                    <div className="no-scrollbar max-h-[80vh] overflow-y-auto p-6 md:p-8">
                      <h2
                        id={titleId}
                        className="mb-1 mt-3 pb-5 font-script text-6xl text-espresso sm:text-5xl">
                        {title}
                      </h2>

                      {subtitle && (
                        <p
                          id={descriptionId}
                          className="font-germania text-sm leading-relaxed text-espresso-light">
                          {subtitle}
                        </p>
                      )}

                      <div className="mt-6">{children}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default ExpandableCard;