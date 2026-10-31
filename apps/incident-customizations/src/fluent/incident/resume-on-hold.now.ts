import { BusinessRule } from '@servicenow/sdk/core'
import { resumeOnHold } from '../../server/business-rules/resume-on-hold'

// Sostituisce le regole OOB "Auto state change from On-Hold" e "Incident State Change
// to In Progress" (disattivate in questa app, vedi generated/server-development/business-rule),
// che coprivano solo i commenti del caller con hold reason Awaiting Caller.
// Non scatta se lo stato cambia nello stesso salvataggio (es. messa in On Hold con
// work note di motivazione, o risoluzione con commento).
BusinessRule({
    $id: Now.ID['incident-resume-on-hold-global'],
    name: 'Riprendi On Hold su commento/work note',
    table: 'incident',
    when: 'before',
    action: ['update'],
    order: 99,
    filterCondition: 'state=3^commentsVALCHANGES^ORwork_notesVALCHANGES^EQ',
    condition: '!current.state.changes()',
    script: resumeOnHold,
    // In scope global le business rule girano in ES5 per default: il bridge verso il modulo richiede ES latest
    $meta: { useEsLatest: true },
    description:
        'Quando un incident On Hold riceve un commento o una work note lo riporta In Progress. Order 99: gira prima di "Clear On Hold Reason" (101), che svuota l\'hold reason.',
})
