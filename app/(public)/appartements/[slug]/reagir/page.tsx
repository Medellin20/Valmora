import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileCheck2, ArrowRight, type LucideIcon } from 'lucide-react';
import { getPropertyBySlug } from '@/lib/data/properties';

export const metadata: Metadata = { title: 'Réagir à cette annonce' };

export default async function ReactToPropertyPage({ params }: { params: { slug: string } }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();

  return (
    <div className="container-app py-8 sm:py-16">
      <Link href={`/appartements/${property.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ArrowLeft className="h-4 w-4" /> Retour au logement
      </Link>
      <div className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-canal-600">{property.title}</p>
        <h1 className="mt-2 text-display-sm font-extrabold text-ink-900 sm:text-display-md">
          Envoyez votre demande de réservation
        </h1>
        <div className="mt-9">
          <Choice href={`/appartements/${property.slug}/reserver`} icon={FileCheck2} title="Réservation" description="Soumettez votre dossier pour louer ce logement et valider votre projet avec notre équipe." />
        </div>
      </div>
    </div>
  );
}

function Choice({ href, icon: Icon, title, description }: { href: string; icon: LucideIcon; title: string; description: string }) {
  return (
    <Link
      href={href}
      className="group block rounded-3xl border border-ink-100 bg-white p-6 text-left shadow-soft transition duration-200 hover:-translate-y-1 hover:border-canal-300 hover:shadow-lifted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canal-600 focus-visible:ring-offset-4 sm:p-8"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-canal-50 text-canal-700">
        <Icon className="h-6 w-6" />
      </span>
      <h2 className="mt-5 text-xl font-extrabold text-ink-900">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500">{description}</p>
      <span className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink-800 px-5 py-3 text-sm font-bold text-white shadow-soft transition-colors group-hover:bg-ink-900">
        Continuer
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
