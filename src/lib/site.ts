/* ============================================================================
 * SITE CONFIG — Ashraya Events
 * ----------------------------------------------------------------------------
 * This is the ONE file to edit for brand/contact details. No layout code here,
 * just data. Swap the [PLACEHOLDER] values for the client's real information.
 * ========================================================================== */

export const site = {                                                 
  name: "Ashraya Events",
  // Brand tagline from the logo
  tagline: "A home for your events.",
  // Real logo artwork. Save the ivory/white logo as public/logo.png, then set
  // this to "/logo.png" — it will replace the A|E monogram in the navbar/footer.
  logoSrc: "",
  description:
    "Ashraya Events is a wedding & event planning studio creating elegant, unforgettable celebrations — weddings, destination weddings, corporate events and private parties.",
  // Used for absolute URLs (OpenGraph, sitemap). Update at launch.
  url: "https://ashrayaevents.com",

  contact: {
    // [PLACEHOLDER] real details from the client
    phone: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    whatsapp: "910000000000", // digits only, country code first — for wa.me link
    email: "hello@ashrayaevents.com",
    // [PLACEHOLDER] city/base location
    city: "India",
    address: "[PLACEHOLDER] Studio address, City, State",
    // Google Maps embed src — replace with the client's real place embed URL
    mapEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.!2d72.8!3d19.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sin!4v0000000000000",
  },

  social: {
    instagram: "https://www.instagram.com/ashrayaevents/",
    instagramHandle: "@ashrayaevents",
    // [PLACEHOLDER] real channel URL
    youtube: "https://www.youtube.com/@ashrayaevents",
    facebook: "#",
    // [PLACEHOLDER] link to the studio's Google Business reviews page
    googleReviews: "#",
  },

  /* -------------------------------------------------------------------------
   * Integrations (set these in .env.local — see .env.example)
   * ----------------------------------------------------------------------- */
  integrations: {
    // Formspree form endpoint, e.g. https://formspree.io/f/xxxxxx
    formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "",
    // SnapWidget / Behold / Elfsight embed URL for the Instagram feed
    instagramEmbedSrc: process.env.NEXT_PUBLIC_INSTAGRAM_EMBED_SRC || "",
  },

  // [PLACEHOLDER] real YouTube video IDs for the "Event Films" section
  youtubeVideoIds: ["dQw4w9WgXcQ", "9bZkp7q19f0", "M7lc1UVf-VE"],
};

// Primary navigation — order matters
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Destination Wedding" },
  { href: "/portfolio", label: "Our Work" },
  { href: "/blog", label: "Blogs" },
  { href: "/contact", label: "Contact Us" },
];

export type NavLink = (typeof navLinks)[number];
