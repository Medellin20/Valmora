import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowDown, ArrowUpRight, ArrowRight } from 'lucide-react';
import { getCityPropertySummaries } from '@/lib/data/properties';
import { FRENCH_TESTIMONIALS } from '@/lib/data/testimonials';

export const revalidate = 60;
export const metadata: Metadata = {
  title: 'Valmora — Des lieux, une autre vie',
  description: 'Chalets, villas, appartements meublés et mobil-homes en France. Découvrez votre prochaine adresse avec Valmora.',
};
const collections = [
  { type: 'chalet', title: 'Prendre de la hauteur.', label: 'Les chalets', image: '/properties/la-clusaz/IMG_4208.jpeg', text: 'Le bois, le calme et la montagne pour horizon.' },
  { type: 'villa', title: 'Vivre au grand jour.', label: 'Les villas', image: '', text: 'De l’espace pour se retrouver et profiter des beaux jours.' },
  { type: 'furnished_studio', title: 'Poser ses valises.', label: 'Les appartements meublés', image: '/images/categories/appartement-meuble.png', text: 'Une adresse équipée, prête pour votre quotidien.' },
  { type: 'mobile_home', title: 'Retrouver le grand air.', label: 'Les mobil-homes', image: '/images/categories/mobil-home.png', text: 'Une terrasse, du temps et la liberté de ralentir.' },
];
const steps = [
  ['Laissez-vous inspirer', 'Explorez les lieux et affinez votre recherche par destination, budget et capacité.'],
  ['Faisons connaissance', 'Demandez une visite ou transmettez votre projet de location à notre équipe.'],
  ['Écrivez la suite', 'Suivez votre dossier depuis votre compte, jusqu’à sa validation et la remise des clés.'],
];
export default async function HomePage() {
  const cities = await getCityPropertySummaries();
  return (
    <div className="travel-journal">
      <section className="journal-hero container-app">
        <div className="journal-kicker"><span>Des lieux à vivre · France</span><span>La collection Valmora</span></div>
        <h1>Vos plus beaux séjours<br />commencent <em>ici.</em></h1>
        <div className="hero-composition">
          <div className="hero-note"><span className="journal-index">01 / L’envie d’ailleurs</span><p>Il y a des lieux où l’on se sent bien. Tout simplement.</p><p>Chalets, villas, appartements et mobil-homes : trouvez le décor de votre prochaine histoire.</p><Link className="journal-button" href="/appartements">Trouver mon lieu <ArrowUpRight size={19} /></Link><a href="#collections" className="journal-scroll"><ArrowDown size={16} /> Prendre le temps de découvrir</a></div>
          <figure className="hero-photo"><Image src="/properties/grand-bornand/IMG_4225.jpeg" alt="Un salon en bois ouvert sur le paysage verdoyant du Grand-Bornand" fill priority sizes="(max-width: 767px) 100vw, 65vw" className="object-cover" /><figcaption><span>Un matin au Grand-Bornand</span><span>Alpes françaises ↗</span></figcaption></figure>
          <div className="hero-stamp" aria-hidden="true">L’art de<br /><em>se sentir</em><br />ailleurs.</div>
        </div>
        <div className="journal-strip"><span>Des lieux choisis</span><span>Un accompagnement humain</span><span>De la découverte aux clés</span></div>
      </section>

      <section id="collections" className="container-app journal-section">
        <div className="journal-section-title"><span className="journal-index">02 / Les collections</span><h2>À chacun<br /><em>son ailleurs.</em></h2><p>Quatre façons d’habiter vos envies.<br />Laquelle vous ressemble ?</p></div>
        <div className="collection-spread">{collections.map((item, i) => <Link key={item.type} href={`/appartements?type=${item.type}`} className="collection-story"><div className="collection-image">{item.image ? <Image src={item.image} alt={item.label} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /> : <div className="villa-illustration" aria-hidden="true"><span className="villa-sun" /><span className="villa-arch" /><span className="villa-pool" /><span className="villa-label">Sous le soleil.</span></div>}<span className="collection-number">0{i + 1}</span><span className="collection-arrow"><ArrowUpRight /></span></div><div className="collection-caption"><span className="journal-index">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div></Link>)}</div>
      </section>

      <section className="destination-section"><div className="container-app"><div className="journal-section-title"><span className="journal-index">03 / Le carnet d’adresses</span><h2>Suivez<br /><em>vos envies.</em></h2><p>Un nom sur la carte.<br />Le début d’une nouvelle histoire.</p></div><div className="destination-list">{cities.map((city, i) => <Link key={city.city} href={`/appartements?city=${encodeURIComponent(city.city)}`} className="destination-row"><span className="journal-index">{String(i + 1).padStart(2, '0')}</span>{city.imageUrl && <div className="destination-thumb"><Image src={city.imageUrl} alt="" fill sizes="100px" className="object-cover" /></div>}<h3>{city.city}</h3><span className="destination-count">{city.count} bien{city.count > 1 ? 's' : ''} à découvrir</span><ArrowUpRight aria-hidden="true" /></Link>)}</div>{cities.length === 0 && <p className="py-8">Notre carnet d’adresses se prépare. Découvrez nos collections pour commencer votre recherche.</p>}<Link href="/appartements" className="journal-text-link">Explorer toutes les destinations <ArrowRight size={18} /></Link></div></section>

      <section className="container-app journal-section approach-section"><div><span className="journal-index">04 / À vos côtés</span><h2>Le lieu vous plaît.<br /><em>On fait la suite<br />ensemble.</em></h2><Link href="/comment-ca-marche" className="journal-text-link">Découvrir notre accompagnement <ArrowUpRight size={18} /></Link></div><ol className="journal-steps">{steps.map(([title, description], i) => <li key={title}><span className="journal-index">0{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></section>

      <section className="journal-testimonials"><div className="container-app"><span className="journal-index">Les mots de nos clients</span><h2>Des lieux.<br /><em>Et des liens.</em></h2><div className="journal-quotes scrollbar-safe" tabIndex={0} role="region" aria-label="Témoignages clients à faire défiler">{FRENCH_TESTIMONIALS.map((quote, i) => <figure key={i}><span aria-hidden="true" className="quote-mark">“</span><blockquote>{quote}</blockquote><figcaption>Client Valmora · {String(i + 1).padStart(2, '0')}</figcaption></figure>)}</div></div></section>
      <section className="container-app journal-end"><span className="journal-index">Votre prochaine histoire commence ici</span><h2>On vous garde<br /><em>une place ?</em></h2><Link href="/appartements" className="journal-button">Découvrir les lieux <ArrowUpRight size={20} /></Link></section>
    </div>
  );
}
