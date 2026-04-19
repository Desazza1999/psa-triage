# PSA Triage Assistant

Prototipo di app per il monitoraggio del PSA in pazienti oncologici prostatici.

## Deploy su Vercel (5 minuti)

### Prerequisiti
- Account [GitHub](https://github.com) (gratuito)
- Account [Vercel](https://vercel.com) (gratuito, si registra con GitHub)

### Passaggi

#### 1. Crea un repository su GitHub
1. Vai su https://github.com/new
2. Nome repository: `psa-triage`
3. Lascia "Public" selezionato
4. NON selezionare "Add a README file" (ce l'abbiamo già)
5. Clicca **Create repository**

#### 2. Carica i file
**Opzione A — Da interfaccia web (più semplice):**
1. Nella pagina del repository appena creato, clicca **"uploading an existing file"**
2. Trascina TUTTI i file e cartelle di questo progetto nella finestra
3. Clicca **Commit changes**

**Opzione B — Da terminale:**
```bash
cd psa-triage
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/psa-triage.git
git push -u origin main
```

#### 3. Deploy su Vercel
1. Vai su https://vercel.com e accedi con GitHub
2. Clicca **"Add New..." → "Project"**
3. Trova `psa-triage` nella lista dei tuoi repository → clicca **Import**
4. Lascia tutto com'è (Vercel rileva automaticamente che è un progetto Vite)
5. Clicca **Deploy**
6. Aspetta ~60 secondi → il tuo URL sarà tipo `psa-triage-xxx.vercel.app`

#### 4. Condividi il link
Copia l'URL e mandalo a chi deve testare. Funziona su mobile e desktop.

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri http://localhost:5173

## Stack tecnico
- **Vite** — build tool
- **React 18** — UI
- **Tailwind CSS 4** — styling
- **Recharts** — grafici PSA
- **Lucide React** — icone
- **localStorage** — persistenza dati (lato client)

## Note
- I dati sono salvati nel browser dell'utente (localStorage). Ogni utente vede solo i propri dati.
- Non c'è backend: nessun dato esce dal dispositivo dell'utente.
- Questo è un prototipo dimostrativo, non un dispositivo medico.
