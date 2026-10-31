// Disattiva le due business rule OOB che riportano In Progress un incident On Hold
// solo per i commenti del caller su "Awaiting Caller": la logica è sostituita da
// "Riporta In Progress da On Hold su commento/work note" dell'app (src/fluent/incident/resume-on-hold.now.ts).
// Sono record global, quindi non possono stare nell'app scoped: lo script registra la modifica
// in un update set global dedicato, poi ripristina l'update set corrente precedente.
// Esecuzione:
//   source scripts/sdk-env.sh
//   npx now-sdk exec --scope global --file scripts/deactivate-oob-onhold-rules.js --reason "Disattiva BR OOB On Hold"
// Per riattivarle: active = true sulle due regole (o back out dell'update set).
(function deactivateOobOnHoldRules() {
    var UPDATE_SET_NAME = 'Incident - Disattivazione BR OOB On Hold';
    var RULES = {
        '82d38a27f31403100c43346b62968c0d': 'Auto state change from On-Hold',
        '162581e087133200b4ae6c5837cb0b1a': 'Incident State Change to In Progress'
    };

    var updateSets = new GlideUpdateSet();
    var previousSetId = updateSets.get();

    var us = new GlideRecord('sys_update_set');
    us.addQuery('name', UPDATE_SET_NAME);
    us.addQuery('state', 'in progress');
    us.query();
    var setId;
    if (us.next()) {
        setId = us.getUniqueValue();
    } else {
        us.initialize();
        us.setValue('name', UPDATE_SET_NAME);
        us.setValue('application', 'global');
        us.setValue('description', 'Disattiva le BR OOB su commento del caller in Awaiting Caller, sostituite dalla BR dell\'app x_507217_incdash che copre commenti e work notes.');
        setId = us.insert();
    }

    updateSets.set(setId);
    try {
        for (var id in RULES) {
            var br = new GlideRecord('sys_script');
            if (!br.get(id) || br.getValue('name') !== RULES[id]) {
                gs.warn('Regola non trovata o rinominata, saltata: ' + RULES[id] + ' (' + id + ')');
                continue;
            }
            if (br.getValue('active') === '0') {
                gs.info('Già disattivata: ' + RULES[id]);
                continue;
            }
            br.setValue('active', false);
            br.update();
            gs.info('Disattivata: ' + RULES[id]);
        }
    } finally {
        updateSets.set(previousSetId);
    }
    gs.info('Update set: ' + UPDATE_SET_NAME + ' (' + setId + ')');
})();
