import { redirect } from 'next/navigation';

export default function ViewingRequestPage({ params }: { params: { slug: string } }) {
  redirect(`/appartements/${params.slug}/reserver`);
}
