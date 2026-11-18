import { notFound } from "next/navigation";

/** Routes unmatched paths under a locale to [locale]/not-found.tsx, inside the site chrome. */
export default function CatchAll() {
  notFound();
}
