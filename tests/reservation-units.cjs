const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, imports) {
  const context = { exports: {}, require: name => { assert.ok(name in imports, name); return imports[name]; } };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, context);
  return context.exports;
}
const { reservationSchema } = load('lib/validations/reservation.ts', { zod: require('zod') });
const input = { propertyId: '11111111-1111-4111-8111-111111111111', firstName: 'Alice', lastName: 'Martin', email: 'alice@example.com', phone: '0600000000', desiredMoveInDate: '2026-12-01', bookingUnit: 'night', durationDays: 3, occupantsCount: 2, hasPets: false };
for (const [bookingUnit, durationDays, valid] of [['night',1,false],['night',2,false],['night',3,true],['day',1,true],['day',0,false],['night',3.5,false],['day',366,false],['week',7,false]]) {
  test(`${bookingUnit} / ${durationDays}: ${valid ? 'accepted' : 'rejected'}`, () => {
    assert.equal(reservationSchema.safeParse({ ...input, bookingUnit, durationDays }).success, valid);
  });
}
function actionHarness(petsAllowed) {
  let saved, clients = 0;
  const supabase = { from(table) {
    const query = { select() { return this; }, eq() { return this; },
      async maybeSingle() { return { data: { id: input.propertyId, title: 'Chalet', is_published: true, pets_allowed: petsAllowed } }; },
      insert(payload) { saved = payload; return this; }, async single() { return { data: { id: 'reservation' } }; } };
    return query;
  } };
  const { createReservation } = load('actions/reservations.ts', {
    'next/navigation': { redirect: () => { throw new Error('redirect'); } },
    'next/cache': { revalidatePath() {} },
    '@/lib/supabase/admin': { createAdminClient: () => supabase },
    '@/lib/data/clients': { upsertClient: async () => { clients++; return { id: 'client' }; } },
    '@/lib/data/history': { recordStatusChange: async () => {} },
    '@/lib/validations/reservation': { reservationSchema },
    '@/lib/utils/reference': { generateReference: () => 'REN-TEST' },
    '@/lib/notifications/email': { sendAdminAlert: async () => {} },
  });
  return { createReservation, saved: () => saved, clients: () => clients };
}
test('server rejects animals before creating a client or reservation when property refuses pets', async () => {
  const h = actionHarness(false);
  assert.equal((await h.createReservation({ ...input, hasPets: true }, 'chalet')).success, false);
  assert.equal(h.clients(), 0);
  assert.equal(h.saved(), undefined);
});
test('server enforces minimum nights even when bypassing the form', async () => {
  const h = actionHarness(true);
  assert.equal((await h.createReservation({ ...input, durationDays: 2 }, 'chalet')).success, false);
  assert.equal(h.saved(), undefined);
});
for (const bookingUnit of ['night', 'day']) {
  test(`server persists ${bookingUnit} and allowed pets`, async () => {
    const h = actionHarness(true);
    await assert.rejects(h.createReservation({ ...input, bookingUnit, durationDays: bookingUnit === 'day' ? 1 : 3, hasPets: true }, 'chalet'), /redirect/);
    assert.equal(h.saved().booking_unit, bookingUnit);
    assert.equal(h.saved().has_pets, true);
    assert.equal(h.saved().duration_months, bookingUnit === 'day' ? 1 : 3);
  });
}
test('duration labels retain the meaning of old reservations', () => {
  const { formatReservationDuration } = load('lib/utils/reservation-duration.ts', {});
  assert.equal(formatReservationDuration({ duration_months: 7 }), '7 journées');
  assert.equal(formatReservationDuration({ duration_months: 3, booking_unit: 'night' }), '3 nuits');
  assert.equal(formatReservationDuration({ duration_months: 1, booking_unit: 'day' }), '1 journée');
});
