import { BusinessRule } from '@servicenow/sdk/core'
import { resumeOnHold } from '../../server/business-rules/resume-on-hold'

// Estende il comportamento OOB ("Auto state change from On-Hold", che copre solo
// i commenti del caller con hold reason Awaiting Caller) a ogni commento e work note.
// Non scatta se lo stato cambia nello stesso salvataggio (es. messa in On Hold con
// work note di motivazione, o risoluzione con commento).
BusinessRule({
    $id: Now.ID['incident-resume-on-hold'],
    name: 'Riporta In Progress da On Hold su commento/work note',
    table: 'incident',
    when: 'before',
    action: ['update'],
    order: 99,
    filterCondition: 'state=3^commentsVALCHANGES^ORwork_notesVALCHANGES^EQ',
    condition: '!current.state.changes()',
    script: resumeOnHold,
    description:
        'Quando un incident On Hold riceve un commento o una work note lo riporta In Progress. Order 99: gira prima di "Clear On Hold Reason" (101), che svuota l\'hold reason.',
})
