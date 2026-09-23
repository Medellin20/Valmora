import { redirect } from 'next/navigation';

export default function ViewingConfirmationPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  redirect(`/appartements?ref=${searchParams.ref ?? ''}`);
}
