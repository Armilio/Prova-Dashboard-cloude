import { BusinessRule, ChoiceColumn, Property, Table } from '@servicenow/sdk/core'
import { setOpenSlot } from '../../server/business-rules/set-open-slot'

// Giorno della settimana e ora di apertura dell'incident, salvati come campi
// per poterli usare come dimensioni nella heatmap della dashboard
// (il trendBy di Platform Analytics accetta una sola frequenza per volta).

export const incident = Table({
    augments: 'incident',
    schema: {
        x_507217_incdash_open_dow: ChoiceColumn({
            label: 'Giorno apertura',
            maxLength: 2,
            readOnly: true,
            dropdown: 'dropdown_with_none',
            choices: {
                1: { label: '1 - Lunedì', sequence: 1 },
                2: { label: '2 - Martedì', sequence: 2 },
                3: { label: '3 - Mercoledì', sequence: 3 },
                4: { label: '4 - Giovedì', sequence: 4 },
                5: { label: '5 - Venerdì', sequence: 5 },
                6: { label: '6 - Sabato', sequence: 6 },
                7: { label: '7 - Domenica', sequence: 7 },
            },
        }),
        x_507217_incdash_open_hour: ChoiceColumn({
            label: 'Ora apertura',
            maxLength: 2,
            readOnly: true,
            dropdown: 'dropdown_with_none',
            choices: {
                '00': { label: '00:00', sequence: 0 },
                '01': { label: '01:00', sequence: 1 },
                '02': { label: '02:00', sequence: 2 },
                '03': { label: '03:00', sequence: 3 },
                '04': { label: '04:00', sequence: 4 },
                '05': { label: '05:00', sequence: 5 },
                '06': { label: '06:00', sequence: 6 },
                '07': { label: '07:00', sequence: 7 },
                '08': { label: '08:00', sequence: 8 },
                '09': { label: '09:00', sequence: 9 },
                '10': { label: '10:00', sequence: 10 },
                '11': { label: '11:00', sequence: 11 },
                '12': { label: '12:00', sequence: 12 },
                '13': { label: '13:00', sequence: 13 },
                '14': { label: '14:00', sequence: 14 },
                '15': { label: '15:00', sequence: 15 },
                '16': { label: '16:00', sequence: 16 },
                '17': { label: '17:00', sequence: 17 },
                '18': { label: '18:00', sequence: 18 },
                '19': { label: '19:00', sequence: 19 },
                '20': { label: '20:00', sequence: 20 },
                '21': { label: '21:00', sequence: 21 },
                '22': { label: '22:00', sequence: 22 },
                '23': { label: '23:00', sequence: 23 },
            },
        }),
    },
})

Property({
    $id: Now.ID['open-slot-timezone'],
    name: 'x_507217_incdash.open_slot_timezone',
    type: 'string',
    value: 'Europe/Rome',
    description:
        "Fuso orario (ID IANA) usato per calcolare giorno e ora di apertura degli incident nella heatmap della dashboard.",
})

BusinessRule({
    $id: Now.ID['set-incident-open-slot'],
    name: 'Imposta giorno/ora apertura (Incident Dashboard)',
    table: 'incident',
    when: 'before',
    action: ['insert', 'update'],
    order: 200,
    filterCondition: 'opened_atVALCHANGES^ORx_507217_incdash_open_dowISEMPTY^EQ',
    script: setOpenSlot,
    description: 'Valorizza i campi giorno della settimana e ora di apertura usati dalla heatmap.',
})
