import { BusinessRule } from '@servicenow/sdk/core'

// Regola OOB presa in carico con `now-sdk move` e disattivata: la sostituisce
// "Riprendi On Hold su commento/work note" (src/fluent/incident/resume-on-hold.now.ts),
// che copre ogni commento e work note e non solo quelli del caller in Awaiting Caller.
BusinessRule({
    $id: Now.ID['82d38a27f31403100c43346b62968c0d'],
    name: 'Auto state change from On-Hold',
    table: 'incident',
    active: false,
    when: 'before',
    action: ['update'],
    condition: 'gs.getUserID() == current.caller_id.toString()',
    filterCondition: 'state=3^hold_reason=1^commentsVALCHANGES^EQ',
    setFieldValue: 'state=2^EQ',
    $meta: {
        useEsLatest: true,
    },
})
