import Link from "next/link";
import InquiryDrawer from "@/components/shared/InquiryDrawer";

/**
 * A CTA that's either a real link (when `url` is set) or, by default, opens
 * the site's enquiry drawer in place — used for step/team/page CTAs that are
 * admin-editable but shouldn't force a whole new "enquiry form" page to exist.
 */
export default function CtaAction({
  label,
  url,
  className,
}: {
  label: string;
  url?: string;
  className: string;
}) {
  if (url) {
    const external = /^https?:\/\//.test(url);
    return (
      <Link
        href={url}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {label}
      </Link>
    );
  }
  return <InquiryDrawer triggerLabel={label} triggerClassName={className} />;
}
