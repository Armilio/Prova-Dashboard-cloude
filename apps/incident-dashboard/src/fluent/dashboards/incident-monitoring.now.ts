import { Dashboard } from '@servicenow/sdk/core'

// Dashboard di monitoraggio incident (Platform Analytics, par_dashboard).
// Tab "Volumi e trend": vista direzionale, finestra ultimi 6 mesi (KPI ultimi 30 giorni).
// Tab "Backlog": vista operativa sugli incident aperti (stateIN1,2,3 = New, In Progress, On Hold).
// I filtri in testata (priorità, assignment group, categoria) valgono per entrambi i tab:
// ogni widget dati ha followFilters: true.

export const IncidentMonitoringDashboard = Dashboard({
    $id: Now.ID['incident-monitoring-dashboard'],
    name: 'Incident Monitoring',
    description: 'Volumi, trend e backlog degli incident.',
    topLayout: {
        widgets: [
            {
                $id: Now.ID['incmon-header-filters'],
                component: 'filter-group',
                componentProps: {
                    filterName: 'Filtri incident',
                    isDashboard: true,
                    groupConfiguration: {
                        filterId: 'incmon-filters',
                        showLabel: false,
                        label: 'Filtri incident',
                        layout: 'horizontal',
                        spacing: 's',
                        showSelectedValuesInPill: true,
                        showBorder: false,
                        showApply: true,
                        showClear: true,
                        showReset: false,
                        showSeparator: false,
                        filterMaxWidth: 300,
                        filters: [
                            {
                                filterId: 'incmon-f-priority',
                                filterName: 'Priorità',
                                filterComponentType: 'multiselect',
                                dateFilterView: 'calendar-reldates',
                                defaultSelectedDateRange: {
                                    range: '',
                                },
                                defaultSelectedItems: [],
                                filterConfigurations: [],
                                datasource: {
                                    type: 'table',
                                    payload: {
                                        table: 'incident',
                                        field: 'priority',
                                        fieldType: 'choice',
                                    },
                                },
                                targets: [
                                    {
                                        type: 'table',
                                        payload: {
                                            table: 'incident',
                                            field: 'priority',
                                            fieldType: 'choice',
                                        },
                                    },
                                ],
                            },
                            {
                                filterId: 'incmon-f-group',
                                filterName: 'Assignment group',
                                filterComponentType: 'multiselect',
                                dateFilterView: 'calendar-reldates',
                                defaultSelectedDateRange: {
                                    range: '',
                                },
                                defaultSelectedItems: [],
                                filterConfigurations: [],
                                datasource: {
                                    type: 'table',
                                    payload: {
                                        table: 'sys_user_group',
                                    },
                                },
                                targets: [
                                    {
                                        type: 'table',
                                        payload: {
                                            table: 'incident',
                                            field: 'assignment_group',
                                            primaryKey: 'sys_id',
                                        },
                                    },
                                ],
                            },
                            {
                                filterId: 'incmon-f-category',
                                filterName: 'Categoria',
                                filterComponentType: 'multiselect',
                                dateFilterView: 'calendar-reldates',
                                defaultSelectedDateRange: {
                                    range: '',
                                },
                                defaultSelectedItems: [],
                                filterConfigurations: [],
                                datasource: {
                                    type: 'table',
                                    payload: {
                                        table: 'incident',
                                        field: 'category',
                                        fieldType: 'choice',
                                    },
                                },
                                targets: [
                                    {
                                        type: 'table',
                                        payload: {
                                            table: 'incident',
                                            field: 'category',
                                            fieldType: 'choice',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                },
                width: 48,
                height: 4,
                position: {
                    x: 0,
                    y: 0,
                },
            },
        ],
    },
    tabs: [
        {
            $id: Now.ID['incmon-tab-volumes'],
            name: 'Volumi e trend',
            widgets: [
                {
                    $id: Now.ID['incmon-kpi-opened-30d'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'Aperti (ultimi 30 gg)',
                        description: 'Incident aperti negli ultimi 30 giorni',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'opened_atRELATIVEGE@dayofweek@ago@30',
                                id: 'ds_1',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showZero: true,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 16,
                    height: 7,
                    position: {
                        x: 0,
                        y: 0,
                    },
                },
                {
                    $id: Now.ID['incmon-kpi-closed-30d'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'Chiusi (ultimi 30 gg)',
                        description: 'Incident chiusi negli ultimi 30 giorni',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'closed_atRELATIVEGE@dayofweek@ago@30',
                                id: 'ds_1',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showZero: true,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 16,
                    height: 7,
                    position: {
                        x: 16,
                        y: 0,
                    },
                },
                {
                    $id: Now.ID['incmon-kpi-p1-30d'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'P1 aperti (ultimi 30 gg)',
                        description: 'Incident critici aperti negli ultimi 30 giorni',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'priority=1^opened_atRELATIVEGE@dayofweek@ago@30',
                                id: 'ds_1',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showZero: true,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 16,
                    height: 7,
                    position: {
                        x: 32,
                        y: 0,
                    },
                },
                {
                    $id: Now.ID['incmon-opened-vs-closed'],
                    component: 'line',
                    componentProps: {
                        headerTitle: 'Aperti vs chiusi per settimana',
                        description: 'Ultimi 6 mesi. Se la linea dei chiusi sta sotto quella degli aperti il backlog cresce.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'opened_atRELATIVEGE@month@ago@6',
                                id: 'ds_opened',
                                label: 'Aperti',
                            },
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'closed_atRELATIVEGE@month@ago@6',
                                id: 'ds_closed',
                                label: 'Chiusi',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_opened',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_opened',
                                label: 'Aperti',
                            },
                            {
                                dataSource: 'ds_closed',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_closed',
                                label: 'Chiusi',
                            },
                        ],
                        trendBy: {
                            trendByFrequency: 'week',
                            trendByFields: [
                                {
                                    field: 'opened_at',
                                    metric: 'm_opened',
                                },
                                {
                                    field: 'closed_at',
                                    metric: 'm_closed',
                                },
                            ],
                        },
                        showLegend: true,
                        legendPosition: 'bottom',
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 32,
                    height: 14,
                    position: {
                        x: 0,
                        y: 7,
                    },
                },
                {
                    $id: Now.ID['incmon-by-channel'],
                    component: 'donut',
                    componentProps: {
                        headerTitle: 'Aperti per canale',
                        description: 'Ultimi 6 mesi, campo Contact type. Misura lo shift-left verso il self-service.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'opened_atRELATIVEGE@month@ago@6',
                                id: 'ds_1',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'contact_type',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                                sortBy: 'value',
                                sortByOrder: 'desc',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showLegend: true,
                        legendPosition: 'bottom',
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 16,
                    height: 14,
                    position: {
                        x: 32,
                        y: 7,
                    },
                },
                {
                    $id: Now.ID['incmon-priority-trend'],
                    component: 'column',
                    componentProps: {
                        headerTitle: 'Aperti per priorità per settimana',
                        description: 'Ultimi 6 mesi, barre impilate per priorità.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'opened_atRELATIVEGE@month@ago@6',
                                id: 'ds_1',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'priority',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        trendBy: {
                            trendByFrequency: 'week',
                            trendByFields: [
                                {
                                    field: 'opened_at',
                                    metric: 'm_1',
                                },
                            ],
                        },
                        chartVariation: 'stacked',
                        showLegend: true,
                        legendPosition: 'bottom',
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 24,
                    height: 14,
                    position: {
                        x: 0,
                        y: 21,
                    },
                },
                {
                    $id: Now.ID['incmon-top-category'],
                    component: 'horizontal-bar',
                    componentProps: {
                        headerTitle: 'Top 10 categorie',
                        description: 'Incident aperti negli ultimi 6 mesi per categoria.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'opened_atRELATIVEGE@month@ago@6',
                                id: 'ds_1',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'category',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: '10',
                                sortBy: 'value',
                                sortByOrder: 'desc',
                                showOthers: false,
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showDataLabels: true,
                        showLegend: false,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 12,
                    height: 14,
                    position: {
                        x: 24,
                        y: 21,
                    },
                },
                {
                    $id: Now.ID['incmon-top-ci'],
                    component: 'horizontal-bar',
                    componentProps: {
                        headerTitle: 'Top 10 CI impattati',
                        description: 'Incident aperti negli ultimi 6 mesi per Configuration Item.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'opened_atRELATIVEGE@month@ago@6^cmdb_ciISNOTEMPTY',
                                id: 'ds_1',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'cmdb_ci',
                                        isChoice: false,
                                    },
                                ],
                                maxNumberOfGroups: '10',
                                sortBy: 'value',
                                sortByOrder: 'desc',
                                showOthers: false,
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showDataLabels: true,
                        showLegend: false,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 12,
                    height: 14,
                    position: {
                        x: 36,
                        y: 21,
                    },
                },
                {
                    $id: Now.ID['incmon-open-heatmap'],
                    component: 'heatmap',
                    componentProps: {
                        headerTitle: 'Aperture per giorno e ora',
                        description: 'Ultimi 6 mesi, ora locale (property x_507217_incdash.open_slot_timezone). Utile per dimensionare turni e reperibilità.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'opened_atRELATIVEGE@month@ago@6^x_507217_incdash_open_dowISNOTEMPTY',
                                id: 'ds_1',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'x_507217_incdash_open_hour',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                                categoryIndex: 0,
                                sortBy: 'name',
                                sortByOrder: 'asc',
                            },
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'x_507217_incdash_open_dow',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                                categoryIndex: 1,
                                sortBy: 'name',
                                sortByOrder: 'asc',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        sortBy: 'name',
                        sortByOrder: 'asc',
                        showDataLabels: true,
                        showLegend: false,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 48,
                    height: 14,
                    position: {
                        x: 0,
                        y: 35,
                    },
                },
            ],
        },
        {
            $id: Now.ID['incmon-tab-backlog'],
            name: 'Backlog',
            widgets: [
                {
                    $id: Now.ID['incmon-kpi-backlog'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'Backlog aperto',
                        description: 'Incident in stato New, In Progress o On Hold',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3',
                                id: 'ds_1',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showZero: true,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 12,
                    height: 7,
                    position: {
                        x: 0,
                        y: 0,
                    },
                },
                {
                    $id: Now.ID['incmon-kpi-backlog-p1'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'P1 aperti',
                        description: 'Incident critici ancora aperti',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3^priority=1',
                                id: 'ds_1',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showZero: true,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 12,
                    height: 7,
                    position: {
                        x: 12,
                        y: 0,
                    },
                },
                {
                    $id: Now.ID['incmon-kpi-unassigned'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'Senza assegnatario',
                        description: 'Incident aperti senza Assigned to',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3^assigned_toISEMPTY',
                                id: 'ds_1',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showZero: true,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 12,
                    height: 7,
                    position: {
                        x: 24,
                        y: 0,
                    },
                },
                {
                    $id: Now.ID['incmon-kpi-older-30d'],
                    component: 'single-score',
                    componentProps: {
                        headerTitle: 'Aperti da oltre 30 gg',
                        description: 'Incident aperti più vecchi di 30 giorni',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3^opened_atRELATIVELE@dayofweek@ago@30',
                                id: 'ds_1',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showZero: true,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 12,
                    height: 7,
                    position: {
                        x: 36,
                        y: 0,
                    },
                },
                {
                    $id: Now.ID['incmon-backlog-by-group'],
                    component: 'horizontal-bar',
                    componentProps: {
                        headerTitle: 'Backlog per assignment group',
                        description: 'Incident aperti per gruppo, impilati per stato.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3',
                                id: 'ds_1',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'assignment_group',
                                        isChoice: false,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                                sortBy: 'value',
                                sortByOrder: 'desc',
                            },
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'state',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        chartVariation: 'stacked',
                        showLegend: true,
                        legendPosition: 'bottom',
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 32,
                    height: 16,
                    position: {
                        x: 0,
                        y: 7,
                    },
                },
                {
                    $id: Now.ID['incmon-backlog-by-priority'],
                    component: 'donut',
                    componentProps: {
                        headerTitle: 'Backlog per priorità',
                        description: 'Snapshot degli incident aperti.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3',
                                id: 'ds_1',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'priority',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showLegend: true,
                        legendPosition: 'bottom',
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 16,
                    height: 16,
                    position: {
                        x: 32,
                        y: 7,
                    },
                },
                {
                    $id: Now.ID['incmon-backlog-aging'],
                    component: 'vertical-bar',
                    componentProps: {
                        headerTitle: 'Aging del backlog per priorità',
                        description: 'Incident aperti per fascia di età (da Opened), impilati per priorità.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3^opened_atRELATIVEGT@dayofweek@ago@1',
                                id: 'age_lt1',
                                label: '< 1 g',
                            },
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3^opened_atRELATIVELE@dayofweek@ago@1^opened_atRELATIVEGT@dayofweek@ago@3',
                                id: 'age_1_3',
                                label: '1-3 g',
                            },
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3^opened_atRELATIVELE@dayofweek@ago@3^opened_atRELATIVEGT@dayofweek@ago@7',
                                id: 'age_3_7',
                                label: '3-7 g',
                            },
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3^opened_atRELATIVELE@dayofweek@ago@7^opened_atRELATIVEGT@dayofweek@ago@30',
                                id: 'age_7_30',
                                label: '7-30 g',
                            },
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'stateIN1,2,3^opened_atRELATIVELE@dayofweek@ago@30',
                                id: 'age_gt30',
                                label: '> 30 g',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'age_lt1',
                                        groupByField: 'priority',
                                        isChoice: true,
                                    },
                                    {
                                        dataSource: 'age_1_3',
                                        groupByField: 'priority',
                                        isChoice: true,
                                    },
                                    {
                                        dataSource: 'age_3_7',
                                        groupByField: 'priority',
                                        isChoice: true,
                                    },
                                    {
                                        dataSource: 'age_7_30',
                                        groupByField: 'priority',
                                        isChoice: true,
                                    },
                                    {
                                        dataSource: 'age_gt30',
                                        groupByField: 'priority',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'age_lt1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_age_lt1',
                                label: '< 1 g',
                            },
                            {
                                dataSource: 'age_1_3',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_age_1_3',
                                label: '1-3 g',
                            },
                            {
                                dataSource: 'age_3_7',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_age_3_7',
                                label: '3-7 g',
                            },
                            {
                                dataSource: 'age_7_30',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_age_7_30',
                                label: '7-30 g',
                            },
                            {
                                dataSource: 'age_gt30',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_age_gt30',
                                label: '> 30 g',
                            },
                        ],
                        chartVariation: 'stacked',
                        showLegend: true,
                        legendPosition: 'bottom',
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 32,
                    height: 14,
                    position: {
                        x: 0,
                        y: 23,
                    },
                },
                {
                    $id: Now.ID['incmon-on-hold-reason'],
                    component: 'horizontal-bar',
                    componentProps: {
                        headerTitle: 'On Hold per motivo',
                        description: 'Incident in On Hold per On hold reason: evidenzia le attese esterne.',
                        dataSources: [
                            {
                                sourceType: 'table',
                                tableOrViewName: 'incident',
                                filterQuery: 'state=3',
                                id: 'ds_1',
                            },
                        ],
                        groupBy: [
                            {
                                groupBy: [
                                    {
                                        dataSource: 'ds_1',
                                        groupByField: 'hold_reason',
                                        isChoice: true,
                                    },
                                ],
                                maxNumberOfGroups: 'ALL',
                                sortBy: 'value',
                                sortByOrder: 'desc',
                            },
                        ],
                        metrics: [
                            {
                                dataSource: 'ds_1',
                                aggregateFunction: 'COUNT',
                                axisId: 'primary',
                                id: 'm_1',
                            },
                        ],
                        showDataLabels: true,
                        showLegend: false,
                        enableDrilldown: true,
                        followFilters: true,
                        filterConfigurations: '@state.parFilters',
                        showFilterIcon: true,
                    },
                    width: 16,
                    height: 14,
                    position: {
                        x: 32,
                        y: 23,
                    },
                },
            ],
        },
    ],
    visibilities: [],
    permissions: [],
})
