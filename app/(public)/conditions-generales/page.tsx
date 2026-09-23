import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';

export const metadata: Metadata = { title: 'Conditions générales' };

export default function ConditionsGeneralesPage() {
  return (
    <LegalPage title="Conditions générales d’utilisation" updatedAt="21 août 2026">
      <h2>Objet</h2>
      <p>
        Les présentes conditions générales régissent l’utilisation du site Valmora et les
        services de mise en relation pour la location de chalets et villas en France.
      </p>

      <h2>Demandes de réservation</h2>
      <p>
        L’envoi d’une demande de réservation depuis le site ne nécessite aucun paiement. Valmora
        examine ensuite le dossier, contacte le client si nécessaire et organise la suite du
        traitement avec le propriétaire ou gestionnaire concerné.
      </p>

      <h2>Étape de paiement</h2>
      <p>
        Après l’enregistrement de la demande de réservation, une dernière étape présente le lien de
        paiement lorsqu’il est disponible. Après le paiement, le client envoie une capture d’écran
        justificative à contact@valmora.fr avec la référence de sa demande. Valmora vérifie le
        justificatif avant de confirmer la suite du dossier.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Valmora agit en tant qu’intermédiaire entre locataires et propriétaires ou
        gestionnaires de biens. Le contrat de location définitif est conclu directement entre le
        locataire et le bailleur du logement concerné.
      </p>

      <h2>Droit applicable</h2>
      <p>Les présentes conditions générales sont soumises au droit néerlandais.</p>
    </LegalPage>
  );
}
