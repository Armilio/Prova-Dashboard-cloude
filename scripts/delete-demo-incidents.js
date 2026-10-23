// Elimina gli incident demo creati da generate-demo-incidents.js (correlation_display = 'INCMON_DEMO').
// Esecuzione:
//   source scripts/sdk-env.sh
//   npx now-sdk exec --scope global --file scripts/delete-demo-incidents.js --reason "Rimozione incident demo"
(function deleteDemoIncidents() {
    var gr = new GlideRecord('incident');
    gr.addQuery('correlation_display', 'INCMON_DEMO');
    gr.query();
    var count = gr.getRowCount();
    gr.setWorkflow(false);
    gr.deleteMultiple();
    gs.info('Incident demo eliminati: ' + count);
})();
