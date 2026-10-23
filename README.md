# Incident Monitoring Dashboard

App scoped ServiceNow (`x_507217_incdash`) sviluppata con il [ServiceNow SDK](https://www.npmjs.com/package/@servicenow/sdk) (Fluent): contiene una dashboard Platform Analytics per il monitoraggio degli incident.

## Contenuto

| File | Cosa definisce |
|---|---|
| `src/fluent/dashboards/incident-monitoring.now.ts` | Dashboard `Incident Monitoring` (`par_dashboard`) con filtri in testata e due tab |
| `src/fluent/incident/open-slot.now.ts` | Campi `x_507217_incdash_open_dow` / `_open_hour` su `incident`, business rule che li valorizza, property del fuso orario |
| `src/server/business-rules/set-open-slot.ts` | Logica della business rule (giorno/ora di apertura nel fuso configurato) |
| `scripts/backfill-open-slot.js` | Backfill una tantum dei due campi sugli incident esistenti |
| `scripts/sdk-env.sh` | Configura `now-sdk` in modalità CI a partire da `SN_INSTANCE_URL` / `SN_USERNAME` / `SN_PASSWORD` |

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

## Sviluppo e deploy

Prerequisiti: Node.js 20 o superiore, credenziali dell'istanza nelle variabili d'ambiente oppure in `.env` (vedi `.env.example`; il file `.env` non va committato).

```bash
npm install
source scripts/sdk-env.sh   # modalità CI: credenziali da variabili d'ambiente, nessun keyring
npm run build
npm run deploy
```

Backfill dei campi giorno/ora, da eseguire una volta dopo il primo deploy su una nuova istanza:

```bash
source scripts/sdk-env.sh
npx now-sdk exec --file scripts/backfill-open-slot.js --reason "Backfill giorno/ora apertura incident"
```

Il backfill non aggiorna `sys_updated_*` e non esegue business rule né notifiche. Crea un contesto di rollback, consultabile nella Script Execution History.

`src/fluent/generated/keys.ts` contiene i sys_id stabili dei record e va sempre committato insieme al codice.
