import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ashraya Events to plan your wedding, corporate event or private celebration.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Let's talk"
        intro="Tell us about your celebration and we'll be in touch to plan something beautiful."
      />

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Details */}
          <div>
            <h2 className="text-3xl text-maroon">Get in touch</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Prefer to reach us directly? We&rsquo;re just a message away.
            </p>

            <ul className="mt-8 space-y-5">
              <ContactRow label="Phone" value={site.contact.phone} href={site.contact.phoneHref} icon="✆" />
              <ContactRow label="Email" value={site.contact.email} href={`mailto:${site.contact.email}`} icon="✉" />
              <ContactRow label="Instagram" value={site.social.instagramHandle} href={site.social.instagram} icon="◎" />
              <ContactRow label="Location" value={site.contact.address} icon="⌖" />
            </ul>

            <a
              href={whatsappLink(site.contact.whatsapp, "Hi Ashraya Events! I'd love to plan an event.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              <span aria-hidden>💬</span> Chat on WhatsApp
            </a>

            {/* Map */}
            <div className="mt-8 overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
              {/* [PLACEHOLDER] replace src in lib/site.ts with the studio's real Google Maps embed */}
              <iframe
                src={site.contact.mapEmbedSrc}
                title="Ashraya Events location"
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: string;
}) {
  const inner = (
    <>
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gold/15 text-gold-dark">
        {icon}
      </span>
      <span>
        <span className="block text-xs uppercase tracking-wider text-ink-soft">{label}</span>
        <span className="text-ink">{value}</span>
      </span>
    </>
  );
  return (
    <li>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 hover:text-gold-dark">
          {inner}
        </a>
      ) : (
        <div className="flex items-center gap-4">{inner}</div>
      )}
    </li>
  );
}
