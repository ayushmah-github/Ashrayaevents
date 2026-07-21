import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { getServices } from "@/lib/cms/content";
import Container from "@/components/ui/Container";
import Logo from "@/components/layout/Logo";

export default async function Footer() {
  const year = new Date().getFullYear();
  const services = await getServices();
  return (
    <footer className="bg-maroon-dark text-cream/80">
      <Container className="py-16" size="wide">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo className="text-cream" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {site.tagline}
            </p>
            <div className="mt-6 flex gap-4">
              <SocialLink href={site.social.instagram} label="Instagram" />
              <SocialLink href={site.social.youtube} label="YouTube" />
              <SocialLink href={site.social.facebook} label="Facebook" />
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-light">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-light">
              Services
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="transition-colors hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gold-light">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={site.contact.phoneHref} className="hover:text-gold">
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-gold">
                  {site.contact.email}
                </a>
              </li>
              <li className="text-cream/70">{site.contact.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Crafted with care for unforgettable celebrations.</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-xs font-medium text-cream/80 transition-colors hover:border-gold hover:bg-gold hover:text-maroon-dark"
    >
      {label[0]}
    </a>
  );
}
