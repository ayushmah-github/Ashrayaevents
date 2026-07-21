import type { Metadata } from "next";
import BlogAssistant from "@/components/studio/BlogAssistant";

// Internal tool — keep it out of search results.
export const metadata: Metadata = {
  title: "AI Blog Assistant (Internal)",
  robots: { index: false, follow: false },
};

export default function BlogAssistantPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:pt-40">
      <p className="eyebrow text-gold-dark">Internal tool</p>
      <h1 className="mt-3 text-4xl text-maroon">AI Blog Assistant</h1>
      <p className="mt-3 text-ink-soft">
        Jot down a few notes about an event or topic (and paste photo captions if
        you like). Get a polished draft back, then copy it into the Sanity Studio
        to publish. Not linked in the public navigation.
      </p>
      <div className="mt-8">
        <BlogAssistant />
      </div>
    </div>
  );
}
