# Incident ServiceNow – app Fluent

Repository con due app ServiceNow sviluppate con il [ServiceNow SDK](https://www.npmjs.com/package/@servicenow/sdk) (Fluent). Ognuna è un progetto separato con il proprio `now.config.json`, le proprie dipendenze e il proprio `keys.ts`, e si builda e installa in modo indipendente.

| Cartella | App | Scope | Contenuto |
|---|---|---|---|
| `apps/incident-dashboard` | Incident Monitoring Dashboard | `x_507217_incdash` (scoped) | Dashboard Platform Analytics sugli incident, campi giorno/ora apertura per la heatmap, tabella Client Case |
| `apps/incident-customizations` | Incident Customizations | `global` | Personalizzazioni del processo incident, comprese le regole OOB prese in carico e modificate |
| `scripts/` | – | – | Script condivisi: configurazione SDK, dati demo |

## apps/incident-dashboard

| File | Cosa definisce |
|---|---|
| `src/fluent/dashboards/incident-monitoring.now.ts` | Dashboard `Incident Monitoring` (`par_dashboard`) con filtri in testata e due tab |
| `src/fluent/incident/open-slot.now.ts` | Campi `x_507217_incdash_open_dow` / `_open_hour` su `incident`, business rule che li valorizza, property del fuso orario |
| `src/server/business-rules/set-open-slot.ts` | Logica della business rule (giorno/ora di apertura nel fuso configurato) |
| `src/fluent/client-case/client-case.now.ts` | Tabella `Client Case` (`x_507217_incdash_client_case`, estende `task`, numerazione `CCS`) con i campi `pippo` e `pluto`, più il suo form |
| `scripts/backfill-open-slot.js` | Backfill una tantum dei campi giorno/ora sugli incident esistenti |

### Dashboard

Filtri in testata, validi per tutti i widget: **Priorità**, **Assignment group**, **Categoria**.

**Volumi e trend**: vista direzionale. I grafici coprono gli ultimi 6 mesi, i KPI gli ultimi 30 giorni.
- KPI: aperti, chiusi e P1 aperti negli ultimi 30 giorni
- Aperti vs chiusi per settimana (linea doppia)
- Aperti per canale (`contact_type`, donut)
- Aperti per priorità per settimana (colonne impilate)
- Top 10 categorie e top 10 CI impattati (barre orizzontali)
- Heatmap delle aperture per giorno della settimana × ora

**Backlog**: vista operativa sugli incident in stato New, In Progress o On Hold (`stateIN1,2,3`).
- KPI: backlog aperto, P1 aperti, senza assegnatario, aperti da oltre 30 giorni
- Backlog per assignment group, impilato per stato
- Backlog per priorità (donut)
- Aging per fasce (<1g, 1–3g, 3–7g, 7–30g, >30g) per priorità
- On Hold per motivo (`hold_reason`)

### Perché due campi su `incident`

Il `trendBy` di Platform Analytics accetta una sola frequenza alla volta (per esempio `dayOfWeek` oppure `hourOfDay`), quindi da solo non basta per una heatmap giorno × ora. Una business rule `before insert/update` salva quindi giorno (1 = lunedì … 7 = domenica) e ora (00–23) di `opened_at`. Il calcolo usa il fuso orario della property `x_507217_incdash.open_slot_timezone`, che vale di default `Europe/Rome`.

Se si cambia il fuso, bisogna svuotare i due campi e rieseguire il backfill.

## apps/incident-customizations

App in scope **global**: è l'unico modo per prendere in carico e modificare nel codice record OOB del global, con il pattern "move and edit" della guida SDLC dell'SDK.

| File | Cosa definisce |
|---|---|
| `src/fluent/incident/resume-on-hold.now.ts` | Business rule "Riprendi On Hold su commento/work note": un incident On Hold che riceve un commento o una work note torna In Progress. Non scatta se lo stato cambia nello stesso salvataggio |
| `src/server/business-rules/resume-on-hold.ts` | Logica della business rule |
| `src/fluent/generated/server-development/business-rule/*.now.ts` | Le BR OOB "Auto state change from On-Hold" e "Incident State Change to In Progress", prese in carico con `now-sdk move` e disattivate (`active: false`). Sono sostituite dalla regola sopra |
| `src/fluent/generated/.claims.json` | Claim dei record OOB presi in carico (`sys_claim`): va committato |

Per prendere in carico un altro record OOB, dalla cartella dell'app:

```bash
npx now-sdk move --ids <sys_id>                     # rivendica il record nell'app
npx now-sdk transform --table <tabella> --id <sys_id> # genera il .now.ts
```

Le business rule in scope global girano in ES5 per default. Quelle che usano moduli (`script: funzione importata`) richiedono `$meta: { useEsLatest: true }`.

## Sviluppo e deploy

Prerequisiti: Node.js 20 o superiore, credenziali dell'istanza nelle variabili d'ambiente oppure in `.env` nella root (vedi `.env.example`; il file `.env` non va committato).

```bash
source scripts/sdk-env.sh   # modalità CI: credenziali da variabili d'ambiente, nessun keyring
cd apps/<app>
npm install
npm run build
npm run deploy
```

Su una nuova istanza installare prima `incident-customizations`, poi `incident-dashboard`.

I comandi `now-sdk` (`query`, `exec`, `transform`, …) vanno lanciati dalla cartella di un'app, dove si trova `now.config.json`.

Backfill dei campi giorno/ora, da eseguire una volta dopo il primo deploy di `incident-dashboard` su una nuova istanza:

```bash
cd apps/incident-dashboard
npx now-sdk exec --file scripts/backfill-open-slot.js --reason "Backfill giorno/ora apertura incident"
```

Il backfill non aggiorna `sys_updated_*` e non esegue business rule né notifiche. Crea un contesto di rollback, consultabile nella Script Execution History.

`src/fluent/generated/keys.ts` di ogni app contiene i sys_id stabili dei record e va sempre committato insieme al codice.

## Dati demo (solo PDI / istanze di sviluppo)

`scripts/generate-demo-incidents.js` genera circa 390 incident realistici negli ultimi 6 mesi:
- **Orari e giorni:** più aperture nei giorni feriali e negli orari d'ufficio.
- **Canali:** shift-left graduale verso self-service e virtual agent.
- **Major incident:** circa 75 giorni fa, un'indisponibilità di Exchange.
- **Ciclo di vita:** tempi di risoluzione coerenti con la priorità, più un backlog con incident On Hold e alcuni ticket vecchi rimasti aperti.

Il seed è fisso, quindi i dati sono riproducibili. Gli incident sono marcati con `correlation_display = INCMON_DEMO`. Gli script vanno eseguiti in scope global:

```bash
cd apps/incident-dashboard
npx now-sdk exec --scope global --file ../../scripts/generate-demo-incidents.js --reason "Incident demo"
npx now-sdk exec --scope global --file ../../scripts/delete-demo-incidents.js --reason "Rimozione incident demo"
```
