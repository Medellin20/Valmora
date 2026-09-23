import type { Metadata } from 'next';
import { Accordion } from '@/components/shared/accordion';
import { FadeIn } from '@/components/ui/fade-in';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions fréquentes sur les demandes de réservation et l’accompagnement chez Valmora.',
};

const CATEGORIES = [
  {
    title: 'Prise de contact',
    items: [
      {
        question: 'Comment demander un logement ?',
        answer:
          'Depuis la fiche d’un bien, choisissez celui qui vous convient, puis envoyez votre demande via le formulaire dédié. Notre équipe vous répond ensuite pour valider le projet et organiser la suite.',
      },
      {
        question: 'Dois-je payer pour envoyer une demande ?',
        answer:
          'Votre demande est enregistrée avant le paiement. Une dernière étape affiche le lien de paiement configuré par l’agence. Après le paiement, envoyez une capture justificative à contact@valmora.fr en précisant votre référence.',
      },
      {
        question: 'Puis-je modifier ma demande ?',
        answer:
          'Oui, contactez notre équipe via le formulaire de contact en indiquant votre référence ; nous vous proposerons la meilleure option disponible.',
      },
    ],
  },
  {
    title: 'Réservation',
    items: [
      {
        question: 'Que se passe-t-il après l’envoi de ma demande de réservation ?',
        answer:
          'Notre équipe examine votre demande et vos dates de séjour, puis vous contacte pour organiser les formalités suivantes.',
      },
      {
        question: 'Quels documents dois-je fournir ?',
        answer:
          'Selon le logement, une pièce d’identité, un justificatif de revenus et une lettre de recommandation ou de garant peuvent être demandés lors de la finalisation de votre dossier.',
      },
    ],
  },
  {
    title: 'Délais',
    items: [
      {
        question: 'Sous quel délai recevrai-je une réponse à ma demande ?',
        answer:
          'Nous répondons généralement aux demandes et réservations sous 48 heures ouvrées.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="container-app py-14 sm:py-20">
      <FadeIn>
        <span className="text-eyebrow uppercase text-canal-600">Aide</span>
        <h1 className="mt-2 text-display-sm font-extrabold text-ink-900 sm:text-display-md">
          Questions fréquentes
        </h1>
        <p className="mt-3 max-w-xl text-ink-500">
          Tout ce qu’il faut savoir pour demander un logement ou réserver votre prochain séjour.
        </p>
      </FadeIn>

      <div className="mt-12 max-w-3xl space-y-10">
        {CATEGORIES.map((category, i) => (
          <FadeIn key={category.title} delay={i * 0.05}>
            <h2 className="mb-4 text-lg font-bold text-ink-900">{category.title}</h2>
            <Accordion items={category.items} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
