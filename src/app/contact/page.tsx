"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Send,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Column: Info */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase block mb-6">
              Contact
            </span>
            <h1 className="text-6xl md:text-8xl font-display mb-12">
              Get In <br />
              <span className="italic text-text/40">Touch</span>
            </h1>
          </motion.div>

          <div className="space-y-12 font-bold">
            <ContactItem
              icon={<Mail />}
              label="Email"
              value="khalil@khalil.mageed.net"
              delay={0.2}
            />
            <ContactItem
              icon={<Phone />}
              label="Phone"
              value="+20 15 000 4055 67"
              delay={0.3}
            />
            <ContactItem
              icon={<MapPin />}
              label="Location"
              value="Cairo, Egypt"
              delay={0.4}
            />
          </div>

          <div className="mt-20">
            <h4 className="text-sm uppercase tracking-widest text-text/50 mb-8">
              Socials
            </h4>
            <div className="flex gap-6">
              <SocialLink
                href="https://github.com/kamkmgamer"
                icon={<Github />}
              />
              <SocialLink
                href="https://linkedin.com/in/kamkm-gamer"
                icon={<Linkedin />}
              />
              <SocialLink
                href="https://twitter.com/kamkmgamer"
                icon={<Twitter />}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--accent-gold))]/20 to-transparent blur-3xl -z-10" />
          <form className="glass-card p-10 md:p-16 rounded-3xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(var(--accent-gold))]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-text/60 ml-1">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-text/20 py-4 text-xl focus:border-[hsl(var(--accent-gold))] focus:outline-none transition-colors"
                placeholder="Your Name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-text/60 ml-1">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-text/20 py-4 text-xl focus:border-[hsl(var(--accent-gold))] focus:outline-none transition-colors"
                placeholder="name@domain.tld"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-text/60 ml-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full bg-transparent border-b border-text/20 py-4 text-xl focus:border-[hsl(var(--accent-gold))] focus:outline-none transition-colors resize-none"
                placeholder="Hello, I'd like to talk about..."
              />
            </div>

            <button className="w-full py-6 mt-8 bg-text text-background font-bold tracking-widest uppercase hover:bg-[hsl(var(--accent-gold))] hover:text-white transition-colors duration-500 flex items-center justify-center gap-2 group">
              <span>Send Message</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

function ContactItem({
  icon,
  label,
  value,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-6 group cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full border border-text/10 flex items-center justify-center text-text/60 group-hover:border-[hsl(var(--accent-gold))] group-hover:text-[hsl(var(--accent-gold))] transition-all duration-300">
        {icon}
      </div>
      <div>
        <span className="block text-xs uppercase tracking-widest text-text/40 mb-1">
          {label}
        </span>
        <span className="text-xl font-display">{value}</span>
      </div>
    </motion.div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-12 h-12 flex items-center justify-center border border-text/10 rounded-full hover:bg-[hsl(var(--accent-gold))] hover:text-white hover:border-transparent transition-all duration-300 text-text/60"
    >
      {icon}
    </a>
  );
}
