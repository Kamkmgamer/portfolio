"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Offer } from "@/data/offers";

interface OfferListProps {
    offers: Offer[];
}

export default function OfferList({ offers }: OfferListProps) {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[hsl(var(--accent-gold))] text-sm tracking-[0.3em] uppercase block mb-4"
                    >
                        Services & Pricing
                    </motion.span>
                    <h1 className="text-6xl md:text-8xl font-display leading-none">
                        Past <span className="italic text-text/50">Offers</span>
                    </h1>
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {offers.map((offer, index) => (
                    <OfferCard key={offer.id} offer={offer} index={index} />
                ))}
            </motion.div>
        </>
    );
}

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
    return (
        <motion.a
            href={offer.demo}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-secondary/5 border border-white/5 overflow-hidden hover:border-[hsl(var(--accent-gold))]/30 transition-colors duration-500 flex flex-col h-full block"
        >
            <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
            </div>

            <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-3xl font-display mb-2">{offer.title}</h3>
                    <p className="text-[hsl(var(--accent-gold))] font-mono text-lg">{offer.price}</p>
                </div>
                <p className="text-text/60 line-clamp-3 mb-6 flex-grow">{offer.description}</p>
            </div>
        </motion.a>
    );
}
