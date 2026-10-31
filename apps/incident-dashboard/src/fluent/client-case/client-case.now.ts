import { Form, Formatter, StringColumn, Table, default_view } from '@servicenow/sdk/core'

export const x_507217_incdash_client_case = Table({
    name: 'x_507217_incdash_client_case',
    label: 'Client Case',
    extends: 'task',
    schema: {
        pippo: StringColumn({ label: 'Pippo', maxLength: 100 }),
        pluto: StringColumn({ label: 'Pluto', maxLength: 200 }),
    },
    autoNumber: {
        prefix: 'CCS',
        number: 1000,
        numberOfDigits: 7,
    },
    allowWebServiceAccess: true,
})

Form({
    table: 'x_507217_incdash_client_case',
    view: default_view,
    sections: [
        {
            caption: 'Client Case',
            content: [
                {
                    layout: 'two-column',
                    leftElements: [
                        { field: 'number', type: 'table_field' },
                        { field: 'state', type: 'table_field' },
                        { field: 'priority', type: 'table_field' },
                    ],
                    rightElements: [
                        { field: 'assignment_group', type: 'table_field' },
                        { field: 'assigned_to', type: 'table_field' },
                        { field: 'opened_at', type: 'table_field' },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'short_description', type: 'table_field' },
                        { field: 'pippo', type: 'table_field' },
                        { field: 'pluto', type: 'table_field' },
                        { field: 'description', type: 'table_field' },
                    ],
                },
            ],
        },
        {
            caption: 'Attività',
            content: [
                {
                    layout: 'one-column',
                    elements: [
                        { field: 'comments', type: 'table_field' },
                        { field: 'work_notes', type: 'table_field' },
                    ],
                },
                {
                    layout: 'one-column',
                    elements: [{ type: 'formatter', formatterRef: Formatter.Activities_Filtered }],
                },
            ],
        },
    ],
})
