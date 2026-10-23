// Backfill una tantum di giorno/ora apertura sugli incident esistenti
// (i nuovi incident li valorizza la business rule dell'app).
// Stessa logica di src/server/business-rules/set-open-slot.ts.
// Esecuzione:
//   source scripts/sdk-env.sh
//   npx now-sdk exec --file scripts/backfill-open-slot.js --reason "Backfill giorno/ora apertura incident"
// Senza aggiornare sys_updated_* e senza eseguire business rule/notifiche (setWorkflow(false)).
// L'esecuzione crea un contesto di rollback, annullabile dalla Script Execution History.
(function backfillOpenSlot() {
    var timezone = gs.getProperty('x_507217_incdash.open_slot_timezone', 'Europe/Rome');
    var updated = 0;

    var gr = new GlideRecord('incident');
    gr.addNotNullQuery('opened_at');
    gr.addNullQuery('x_507217_incdash_open_dow');
    gr.query();
    while (gr.next()) {
        var openedAt = gr.getValue('opened_at');
        var utc = new GlideDateTime(openedAt);
        var asLocal = new GlideScheduleDateTime(utc);
        asLocal.setTimeZone(timezone);
        var local = new GlideDateTime(openedAt);
        local.add(utc.getNumericValue() - asLocal.getGlideDateTime().getNumericValue());

        gr.setValue('x_507217_incdash_open_dow', String(local.getDayOfWeekUTC()));
        gr.setValue('x_507217_incdash_open_hour', local.getValue().substring(11, 13));
        gr.setWorkflow(false);
        gr.autoSysFields(false);
        gr.update();
        updated++;
    }
    gs.info('Backfill giorno/ora apertura completato: ' + updated + ' incident aggiornati (fuso ' + timezone + ')');
})();
