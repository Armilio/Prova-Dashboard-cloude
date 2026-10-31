// Genera incident demo realistici sugli ultimi 6 mesi, per popolare la dashboard Incident Monitoring.
// Solo per istanze di sviluppo/PDI. Ogni incident ha correlation_display = 'INCMON_DEMO'
// (rimozione: scripts/delete-demo-incidents.js, oppure rollback dell'esecuzione).
// Va eseguito in scope global.
// Esecuzione:
//   source scripts/sdk-env.sh
//   cd apps/incident-dashboard && npx now-sdk exec --scope global --file ../../scripts/generate-demo-incidents.js --reason "Incident demo per dashboard"
// Inserisce con setWorkflow(false): niente notifiche, SLA, assignment rule; le date (opened/resolved/closed,
// sys_created_on) sono impostate esplicitamente e i campi giorno/ora apertura calcolati come nella business rule.
(function generateDemoIncidents() {
    var DRY_RUN = false;
    var DAYS = 182;
    var TAG = 'INCMON_DEMO';
    var TIMEZONE = gs.getProperty('x_507217_incdash.open_slot_timezone', 'Europe/Rome');

    var existing = new GlideAggregate('incident');
    existing.addQuery('correlation_display', TAG);
    existing.addAggregate('COUNT');
    existing.query();
    if (existing.next() && parseInt(existing.getAggregate('COUNT'), 10) > 0) {
        gs.info('Incident demo già presenti: eseguire prima delete-demo-incidents.js');
        return;
    }

    // PRNG con seed fisso: stessi dati a ogni esecuzione
    var seed = 20261023;
    function rand() {
        seed = (seed * 16807) % 2147483647; // Park-Miller
        return (seed - 1) / 2147483646;
    }
    function pick(list) { return list[Math.floor(rand() * list.length)]; }
    function weighted(map) {
        var total = 0, k;
        for (k in map) total += map[k];
        var r = rand() * total;
        for (k in map) { r -= map[k]; if (r <= 0) return k; }
        return k;
    }
    function poisson(lambda) {
        var l = Math.exp(-lambda), k = 0, p = 1;
        do { k++; p *= rand(); } while (p > l);
        return k - 1;
    }
    // Lognormale con mediana data (ore)
    function lognormalHours(median, sigma) {
        var u = Math.max(rand(), 1e-9), v = rand();
        var z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        return median * Math.exp(sigma * z);
    }
    function pad(n) { return (n < 10 ? '0' : '') + n; }

    // Ora "a muro" nel fuso configurato -> GlideDateTime UTC.
    // Lo script gira in scope global, dove GlideDateTime.setTimeZone è consentito
    // (la business rule, in scope applicativo, usa invece GlideScheduleDateTime).
    function localToUtc(dateStr, hour, minute) {
        var gdt = new GlideDateTime();
        gdt.setTimeZone(TIMEZONE);
        gdt.setDisplayValueInternal(dateStr + ' ' + pad(hour) + ':' + pad(minute) + ':' + pad(Math.floor(rand() * 60)));
        return gdt;
    }

    // --- Dati di riferimento dell'istanza ---
    var GROUPS = {
        'Service Desk': 'd625dccec0a8016700a222a0f7900d06',
        'Help Desk': '679434f053231300e321ddeeff7b12d8',
        'Network': '287ebd7da9fe198100f92cc8d1d2154e',
        'Hardware': '8a5055c9c61122780043563ef53438e3',
        'Software': '8a4dde73c6112278017a6a4baf547aa7',
        'Database': '287ee6fea9fe198100ada7950d0b1b73',
        'Application Development': '0a52d3dcd7011200f2d224837e6103f2',
        'IT Securities': '5f6441efc0a8010e0177fcb589156352'
    };
    var CI = {
        callxpr: '0c43b143c6112275019abd2b3390d1f9', webserver: '0c43b896c6112275019abd2b2b93f464',
        fileserver: 'b0c25d1bc0a800090168be1bfcdcd759', san: '109562a3c611227500a7b7ff98cc0dc7',
        sfa: 'a9c0c8d2c6112276018f7705562f9cb0', peoplesoft: 'b0cb50c3c0a8000900893e69d3c5885e',
        dbserver: '14a9e27bc61122750037b90c4d34da38', exchange: '281190e3c0a8000b003f593aa3f20ca6',
        mailserver: 'b0c4030ac0a800090152e7a4564ca36c', sapfi: '26e426be0a0a0bb40046890d90059eaa',
        saphr: '26e51a2f0a0a0bb4008628d2254c42db', efoweb: '0c43b55ac6112275019abd2b247baf31'
    };
    var CATEGORIES = {
        inquiry: { w: 16, groups: ['Service Desk', 'Help Desk'], cis: [], text: ['Richiesta informazioni su utilizzo VPN', 'Domanda su configurazione stampante di piano', 'Come richiedere una nuova licenza software', 'Informazioni su procedura di smart working'] },
        software: { w: 15, groups: ['Software'], cis: ['sfa', 'peoplesoft'], text: ['Errore all\'avvio di Sales Force Automation', 'Applicazione PeopleSoft si chiude inaspettatamente', 'Aggiornamento software fallito', 'Licenza scaduta su applicativo di reporting'] },
        access: { w: 14, groups: ['Service Desk'], cis: [], text: ['Account bloccato dopo tentativi errati', 'Reset password richiesto', 'Accesso negato a cartella condivisa', 'MFA non funzionante su nuovo smartphone'] },
        hardware: { w: 12, groups: ['Hardware'], cis: ['fileserver', 'san'], text: ['Laptop non si accende', 'Monitor esterno non rilevato', 'Spazio disco esaurito su file server', 'Docking station non funzionante'] },
        network: { w: 11, groups: ['Network'], cis: ['callxpr', 'webserver'], text: ['Connessione Wi-Fi instabile in sede', 'VPN disconnessa frequentemente', 'Lentezza di rete al terzo piano', 'Sito intranet non raggiungibile'] },
        collaboration_tools: { w: 8, groups: ['Software'], cis: ['exchange', 'mailserver'], text: ['Email non ricevute in Outlook', 'Casella di posta piena', 'Calendario condiviso non sincronizzato', 'Errore invio email verso esterni'] },
        internal_applications: { w: 8, groups: ['Application Development'], cis: ['sapfi', 'saphr', 'efoweb'], text: ['Errore in registrazione fattura SAP FI', 'Cedolino non visualizzabile su SAP HR', 'Timeout su portale EFOWEB', 'Report mensile SAP non generato'] },
        database: { w: 6, groups: ['Database'], cis: ['dbserver'], text: ['Query lente su database di produzione', 'Job di backup database fallito', 'Tablespace quasi pieno', 'Deadlock ricorrenti su DB applicativo'] },
        security: { w: 5, groups: ['IT Securities'], cis: [], text: ['Email di phishing segnalata', 'Antivirus ha rilevato una minaccia', 'Accesso sospetto da paese estero', 'Certificato SSL in scadenza'] },
        performance: { w: 5, groups: ['Database', 'Network'], cis: ['dbserver', 'webserver'], text: ['Tempi di risposta elevati applicazione web', 'CPU al 100% su server applicativo', 'Degrado prestazioni in orario di punta'] }
    };
    var CATEGORY_WEIGHTS = {};
    for (var c in CATEGORIES) CATEGORY_WEIGHTS[c] = CATEGORIES[c].w;

    // priorità -> [impact, urgency]
    var PRIORITY = { 1: [1, 1], 2: [1, 2], 3: [2, 2], 4: [3, 2], 5: [3, 3] };
    var PRIORITY_WEIGHTS = { 1: 4, 2: 12, 3: 40, 4: 41, 5: 3 };
    var RESOLUTION_MEDIAN_H = { 1: 5, 2: 20, 3: 80, 4: 160, 5: 320 };
    var DOW_WEIGHTS = { 1: 1.3, 2: 1.2, 3: 1.1, 4: 1.0, 5: 0.9, 6: 0.3, 7: 0.2 };
    var HOUR_WEIGHTS = { 0: .1, 1: .1, 2: .1, 3: .1, 4: .1, 5: .15, 6: .25, 7: .5, 8: 1.3, 9: 1.7, 10: 1.6, 11: 1.3, 12: .8,
        13: .9, 14: 1.4, 15: 1.3, 16: 1.1, 17: .8, 18: .45, 19: .25, 20: .2, 21: .15, 22: .12, 23: .1 };
    var HOLD_REASONS = { 1: 45, 4: 25, 5: 15, 3: 15 };
    var CLOSE_CODES = { 'Resolved – Permanent Fix Applied': 35, 'Workaround provided': 25, 'Resolved by caller': 12,
        'Resolved – Fixed Without Action': 8, 'Resolved - No response from caller': 8, 'Resolved – Fixed by Vendor': 6,
        'Duplicate': 3, 'Resolved by problem': 3 };

    var users = [];
    var u = new GlideRecord('sys_user');
    u.addActiveQuery();
    u.addNotNullQuery('email');
    u.setLimit(200);
    u.query();
    while (u.next()) users.push(u.getUniqueValue());

    var members = {};
    for (var g in GROUPS) {
        members[g] = [];
        var m = new GlideRecord('sys_user_grmember');
        m.addQuery('group', GROUPS[g]);
        m.query();
        while (m.next()) members[g].push(m.getValue('user'));
        if (!members[g].length) members[g] = users.slice(0, 5);
    }

    var nowMs = new GlideDateTime().getNumericValue();
    var HOUR = 3600 * 1000;
    var stats = { total: 0, open: 0, resolved: 0, closed: 0, canceled: 0 };
    var majorDay = DAYS - 75;

    for (var d = 0; d <= DAYS; d++) {
        var dayGdt = new GlideDateTime();
        dayGdt.addDaysUTC(d - DAYS);
        var dateStr = dayGdt.getValue().substring(0, 10);
        var noon = new GlideDateTime(dateStr + ' 12:00:00');
        var dow = noon.getDayOfWeekUTC();
        var progress = d / DAYS;                       // 0 = 6 mesi fa, 1 = oggi
        var rate = (2.0 + 0.9 * progress) * DOW_WEIGHTS[dow];
        var n = poisson(rate);
        var isMajor = d === majorDay;
        if (isMajor) n += 22;

        for (var i = 0; i < n; i++) {
            var major = isMajor && i >= n - 22;
            var category = major ? 'collaboration_tools' : weighted(CATEGORY_WEIGHTS);
            var cat = CATEGORIES[category];
            var hour = major ? 9 + Math.floor(rand() * 3) : parseInt(weighted(HOUR_WEIGHTS), 10);
            var opened = localToUtc(dateStr, hour, Math.floor(rand() * 60));
            var openedMs = opened.getNumericValue();
            if (openedMs > nowMs) continue;

            var priority = major ? (i === n - 22 ? 1 : 2) : parseInt(weighted(PRIORITY_WEIGHTS), 10);
            // canale: lo shift-left sposta volume da telefono a self-service/virtual agent nel tempo
            var channel = major ? weighted({ phone: 50, email: 30, 'self-service': 20 }) : weighted({
                'self-service': 24 + 14 * progress, phone: 30 - 12 * progress, email: 22, chat: 9,
                virtual_agent: 4 + 6 * progress, 'walk-in': 5
            });
            var groupName = pick(cat.groups);
            var ci = major ? CI.exchange : (cat.cis.length && rand() < 0.8 ? CI[pick(cat.cis)] : '');

            // Ciclo di vita
            var resolvedMs = openedMs + lognormalHours(RESOLUTION_MEDIAN_H[priority], 0.9) * HOUR;
            var stuck = !major && openedMs < nowMs - 30 * 24 * HOUR && rand() < 0.07;
            var canceled = !major && !stuck && rand() < 0.02;
            var state, holdReason = '', closedMs = null;
            if (canceled) {
                state = 8; closedMs = openedMs + lognormalHours(4, 0.8) * HOUR;
                if (closedMs > nowMs) closedMs = nowMs;
            } else if (stuck || resolvedMs > nowMs) {
                var ageH = (nowMs - openedMs) / HOUR;
                state = ageH < 6 && rand() < 0.6 ? 1 : weighted({ 2: 62, 3: 30, 1: 8 });
                if (stuck) state = weighted({ 3: 60, 2: 40 });
                if (state == 3) holdReason = weighted(stuck ? { 4: 50, 5: 25, 1: 25 } : HOLD_REASONS);
                resolvedMs = null;
            } else {
                closedMs = resolvedMs + 72 * HOUR;   // chiusura automatica dopo 3 giorni
                state = closedMs <= nowMs ? 7 : 6;
                if (state == 6) closedMs = null;
            }

            var unassigned = state == 1 && rand() < 0.5;
            var inc = new GlideRecord('incident');
            inc.initialize();
            inc.setValue('short_description', major ? 'Posta elettronica non disponibile (Exchange)' : pick(cat.text));
            inc.setValue('description', 'Incident generato per la demo della dashboard Incident Monitoring.');
            inc.setValue('caller_id', pick(users));
            inc.setValue('category', category);
            inc.setValue('contact_type', channel);
            inc.setValue('impact', PRIORITY[priority][0]);
            inc.setValue('urgency', PRIORITY[priority][1]);
            inc.setValue('priority', priority);
            if (ci) inc.setValue('cmdb_ci', ci);
            if (!unassigned) {
                inc.setValue('assignment_group', GROUPS[groupName]);
                if (state != 1 || rand() < 0.3) inc.setValue('assigned_to', pick(members[groupName]));
            }
            inc.setValue('state', state);
            inc.setValue('incident_state', state);
            if (holdReason) inc.setValue('hold_reason', holdReason);
            inc.setValue('opened_at', opened.getValue());
            inc.setValue('opened_by', inc.getValue('caller_id'));
            var r = rand();
            inc.setValue('reassignment_count', r < 0.68 ? 0 : r < 0.88 ? 1 : r < 0.96 ? 2 : 3);
            inc.setValue('reopen_count', state >= 6 && rand() < 0.05 ? 1 : 0);
            if (resolvedMs) {
                var resolved = new GlideDateTime(); resolved.setNumericValue(resolvedMs);
                inc.setValue('resolved_at', resolved.getValue());
                inc.setValue('resolved_by', inc.getValue('assigned_to') || pick(members[groupName]));
                inc.setValue('close_code', weighted(CLOSE_CODES));
                inc.setValue('close_notes', 'Risolto (dati demo).');
                inc.setValue('calendar_stc', Math.round((resolvedMs - openedMs) / 1000));
            }
            if (closedMs) {
                var closed = new GlideDateTime(); closed.setNumericValue(closedMs);
                inc.setValue('closed_at', closed.getValue());
                inc.setValue('closed_by', inc.getValue('assigned_to') || pick(members[groupName]));
                inc.setValue('active', false);
            } else {
                inc.setValue('active', state != 6 && state != 7 && state != 8);
            }
            if (state == 6) inc.setValue('active', true);
            if (major && i === n - 22) inc.setValue('major_incident_state', 'accepted');
            inc.setValue('correlation_display', TAG);

            // Giorno/ora apertura (stessa logica della business rule, che con setWorkflow(false) non gira)
            inc.setValue('x_507217_incdash_open_dow', String(opened.getDayOfWeekLocalTime()));
            inc.setValue('x_507217_incdash_open_hour', opened.getDisplayValueInternal().substring(11, 13));

            var lastMs = closedMs || resolvedMs || openedMs;
            var last = new GlideDateTime(); last.setNumericValue(Math.min(lastMs, nowMs));
            inc.setValue('sys_created_on', opened.getValue());
            inc.setValue('sys_created_by', 'admin');
            inc.setValue('sys_updated_on', last.getValue());
            inc.setValue('sys_updated_by', 'admin');
            inc.setWorkflow(false);
            inc.autoSysFields(false);
            if (!DRY_RUN) inc.insert();

            stats.total++;
            if (state == 7) stats.closed++; else if (state == 6) stats.resolved++; else if (state == 8) stats.canceled++; else stats.open++;
        }
    }
    gs.info((DRY_RUN ? '[DRY RUN] ' : '') + 'Incident demo generati: ' + JSON.stringify(stats));
})();
