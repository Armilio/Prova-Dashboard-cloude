import { BusinessRule } from '@servicenow/sdk/core'

// Regola OOB presa in carico con `now-sdk move` e disattivata: la sostituisce
// "Riprendi On Hold su commento/work note" (src/fluent/incident/resume-on-hold.now.ts),
// che copre ogni commento e work note e non solo quelli del caller in Awaiting Caller.
BusinessRule({
    $id: Now.ID['162581e087133200b4ae6c5837cb0b1a'],
    name: 'Incident State Change to In Progress',
    table: 'incident',
    active: false,
    when: 'before',
    action: ['update'],
    filterCondition: 'commentsVALCHANGES^state=3^hold_reason=1^caller_idDYNAMIC90d1921e5f510100a9ad2572f2b477fe^EQ',
    setFieldValue: 'state=2^incident_state=2^EQ',
})
