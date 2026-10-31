import { gs, GlideDateTime, GlideRecord, GlideScheduleDateTime } from '@servicenow/glide'

const DEFAULT_TIMEZONE = 'Europe/Rome'

export type OpenSlot = { dow: string; hour: string }

// Calcola giorno (1 = lunedì ... 7 = domenica) e ora (00-23) di un datetime
// interno (UTC) nel fuso orario configurato nella property dell'app.
// GlideDateTime.setTimeZone non è consentito in scope: GlideScheduleDateTime
// interpreta lo stesso valore come ora locale del fuso, quindi la differenza
// tra i due istanti è l'offset del fuso rispetto a UTC.
export function computeOpenSlot(openedAt: string): OpenSlot | null {
    if (!openedAt) return null
    const timezone = gs.getProperty('x_507217_incdash.open_slot_timezone', DEFAULT_TIMEZONE)
    const utc = new GlideDateTime(openedAt)
    const asLocal = new GlideScheduleDateTime(utc)
    asLocal.setTimeZone(timezone)
    const offsetMs = utc.getNumericValue() - asLocal.getGlideDateTime().getNumericValue()

    const local = new GlideDateTime(openedAt)
    local.add(offsetMs)
    return {
        dow: String(local.getDayOfWeekUTC()),
        hour: local.getValue().substring(11, 13),
    }
}

export function setOpenSlot(current: GlideRecord, previous: GlideRecord) {
    // Campi solo di reporting: un errore qui non deve mai bloccare il salvataggio dell'incident
    try {
        const slot = computeOpenSlot(current.getValue('opened_at'))
        current.setValue('x_507217_incdash_open_dow', slot ? slot.dow : '')
        current.setValue('x_507217_incdash_open_hour', slot ? slot.hour : '')
    } catch (e) {
        gs.error('Incident Monitoring: calcolo giorno/ora apertura fallito per ' + current.getValue('number') + ': ' + e)
    }
}
