/** Existing reservations without a unit were recorded in days. */
export function formatReservationDuration(reservation: { duration_months: number; booking_unit?: 'night' | 'day' }) {
  const unit = reservation.booking_unit === 'night' ? 'nuit' : 'journée';
  return `${reservation.duration_months} ${unit}${reservation.duration_months > 1 ? 's' : ''}`;
}
