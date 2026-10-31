import { gs, GlideRecord } from '@servicenow/glide'

const IN_PROGRESS = '2'

// Un incident On Hold che riceve un commento o una work note torna In Progress.
// L'hold reason viene svuotato dalla regola OOB "Clear On Hold Reason" (order 101).
export function resumeOnHold(current: GlideRecord, previous: GlideRecord) {
    current.setValue('state', IN_PROGRESS)
    gs.addInfoMessage('Incident ' + current.getValue('number') + ' riportato In Progress dopo un nuovo commento o work note.')
}
