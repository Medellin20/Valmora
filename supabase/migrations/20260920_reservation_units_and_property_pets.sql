begin;

alter table public.properties
  add column if not exists pets_allowed boolean not null default false;

-- Existing durations were saved in days. Preserve their meaning.
alter table public.reservations
  add column if not exists booking_unit text not null default 'day'
    check (booking_unit in ('night', 'day'));

-- Enforce the minimum on new writes without rejecting historical records.
alter table public.reservations
  add constraint reservations_booking_duration_check
  check (duration_months between 1 and 365 and (booking_unit <> 'night' or duration_months >= 3)) not valid;

comment on column public.reservations.duration_months is
  'Historical name: number of nights or days according to booking_unit.';

commit;
