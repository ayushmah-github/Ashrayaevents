import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";
import Button from "@/components/ui/Button";

/**
 * Company details block — address, contact, hours + map. Sits near the foot of
 * the home page. All values come from src/lib/site.ts.
 */
export default function CompanyDetails() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Reveal>
        <p className="eyebrow text-gold-dark">Ashraya Events</p>
        <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
          A home for your events.
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
          Reach out any time — we&rsquo;d love to hear about your celebration and
          show you how we can bring it to life.
        </p>

        <ul className="mt-8 space-y-4 text-ink">
          <Row label="Call" value={site.contact.phone} href={site.contact.phoneHref} />
          <Row label="Email" value={site.contact.email} href={`mailto:${site.contact.email}`} />
          <Row label="Studio" value={site.contact.address} />
          {/* [PLACEHOLDER] real working hours */}
          <Row label="Hours" value="Mon–Sat, 10am – 7pm" />
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">Contact us</Button>
          <a
            href={whatsappLink(site.contact.whatsapp, "Hi Ashraya Events!")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            💬 WhatsApp
          </a>
        </div>
      </Reveal>

      <Reveal delayIndex={1}>
        <div className="h-full overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
          {/* [PLACEHOLDER] real Google Maps embed in src/lib/site.ts */}
          <iframe
            src={site.contact.mapEmbedSrc}
            title="Ashraya Events location"
            className="h-full min-h-[22rem] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </div>
  );
}

function Row({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <li className="flex gap-4">
      <span className="w-16 flex-none text-xs font-semibold uppercase tracking-wider text-ink-soft">
        {label}
      </span>
      {href ? (
        <a href={href} className="hover:text-gold-dark">{value}</a>
      ) : (
        <span>{value}</span>
      )}
    </li>
  );
}
