"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Ashraya Events concierge 🌸 Ask me about our services, availability or a rough estimate — or tell me about your celebration and I'll help.",
};

/**
 * Site-wide AI Chat Concierge — floating widget (bottom-right).
 * Talks to /api/chat. Degrades gracefully if the AI isn't configured.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }), // drop the greeting
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the server. Please try WhatsApp or the Contact page.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with us"}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-cream shadow-[var(--shadow-soft)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:bottom-6 sm:right-6"
      >
        <span className="text-xl">{open ? "✕" : "💬"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-4 z-[60] flex h-[32rem] max-h-[75vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-maroon/10 bg-cream shadow-[var(--shadow-soft)] sm:right-6"
            role="dialog"
            aria-label="Ashraya Events chat concierge"
          >
            <div className="bg-maroon px-5 py-4 text-cream">
              <p className="font-serif text-lg">{site.name} Concierge</p>
              <p className="text-xs text-cream/70">Typically replies in a moment</p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-maroon px-4 py-2.5 text-sm text-cream"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm bg-sand px-4 py-2.5 text-sm text-ink"
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm bg-sand px-4 py-3 text-sm text-ink-soft">
                    <span className="inline-flex gap-1">
                      <Dot /> <Dot delay={0.15} /> <Dot delay={0.3} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-maroon/10 bg-cream p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your event…"
                className="flex-1 rounded-full border border-maroon/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
                aria-label="Your message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-maroon-dark transition-colors hover:bg-gold-dark hover:text-cream disabled:opacity-50"
                aria-label="Send message"
              >
                ➤
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      className="inline-block h-1.5 w-1.5 rounded-full bg-ink-soft"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  );
}
