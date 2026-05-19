import React, { useState, useEffect, useMemo } from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid, Area, AreaChart } from "recharts";
import {
  HeartPulse, ArrowRight, ArrowLeft, LogOut, Plus, FileText, User, Settings, CheckCircle2,
  PhoneCall, Bell, AlertTriangle, Shield, Calendar, Paperclip, Printer,
  Globe, Stethoscope, RotateCcw, X, Activity, BarChart3, Upload, Zap, Sliders, Trash2,
  Users, Copy, Link, MessageSquare, Eye, ChevronRight, BellRing, Check, UserPlus, Hash
} from "lucide-react";

// ─── i18n (abbreviated for space — full version in production) ───
const T = {
  it: {
    appName: "PSA Triage", subtitle: "Assistente clinico", login: "Accedi", register: "Registrati",
    email: "Email", password: "Password", name: "Nome completo",
    noAccount: "Non hai un account?", hasAccount: "Hai già un account?",
    logout: "Esci", dashboard: "Home", newEntry: "Nuovo PSA", history: "Storico", profile: "Profilo",
    save: "Salva", cancel: "Annulla", next: "Continua", back: "Indietro",
    welcomeTitle: "Configura il tuo profilo clinico",
    welcomeDesc: "Queste informazioni servono per calcolare la soglia PSA corretta.",
    diagnosisDate: "Data diagnosi", prostatectomy: "Prostatectomia",
    prostatectomyDesc: "Rimozione chirurgica della prostata",
    radiotherapy: "Radioterapia", radiotherapyDesc: "Radioterapia definitiva o adiuvante/salvage",
    hormonalTherapy: "Terapia ormonale in corso", hormonalDesc: "ADT attualmente in corso",
    surgeryDate: "Data intervento", rtDate: "Data radioterapia", rtType: "Tipo RT",
    rtDefinitive: "Definitiva", rtAdjuvant: "Adiuvante/Salvage",
    hormonalStart: "Inizio terapia ormonale",
    nadirPsa: "Nadir PSA (ng/ml)", nadirHelp: "Valore minimo post-RT",
    gleasonScore: "Gleason", gleasonHelp: "Opzionale", stage: "Stadio TNM", stageHelp: "Opzionale",
    doctorName: "Medico di riferimento", doctorPhone: "Tel. medico",
    doctorHelp: "Utile in caso di allarme",
    psaValue: "Valore PSA (ng/ml)", psaDate: "Data prelievo",
    attachReport: "Allega referto", attachHelp: "Foto o scan (opzionale)",
    evaluate: "Valuta PSA",
    resultOk: "PSA nella norma", resultOkDesc: "Nessuna azione immediata richiesta.",
    resultNotify: "Notifica al medico", resultNotifyDesc: "Visita a discrezione del medico.",
    resultUrgent: "Variazione significativa",
    resultUrgentDesc: "Variazione PSA > ±2 ng/ml. Possibili cause: infezioni, sdifferenziazione o confondenti.",
    resultAlarm: "Contattare il medico", resultAlarmDesc: "Contatta il tuo oncologo.",
    profileLabel: "Profilo clinico", thresholdLabel: "Soglia applicata",
    psaMeasured: "PSA misurato", reason: "Motivazione",
    newEvaluation: "Nuova valutazione", printReport: "Stampa report",
    noEntries: "Nessun PSA registrato", noEntriesDesc: "Inserisci il primo valore PSA.",
    addFirst: "Inserisci primo PSA", lastCheck: "Ultimo controllo",
    nextCheck: "Prossimo controllo", nextCheckHelp: "Promemoria prossimo prelievo",
    entries: "misurazioni", threshold: "Soglia",
    disclaimer: "Strumento dimostrativo. Non sostituisce il parere del medico.",
    disclaimerLong: "Prototipo dimostrativo. Non costituisce diagnosi. Contatta il tuo oncologo in caso di dubbi.",
    psaHistory: "Andamento PSA", clinicalDetails: "Dettagli clinici",
    treatments: "Terapie", noTreatments: "Nessuna terapia", yes: "Sì", no: "No",
    editProfile: "Modifica profilo", reminder: "Promemoria",
    reportTitle: "Report Monitoraggio PSA", patientData: "Dati paziente",
    generated: "Generato il", allValues: "Tutti i valori PSA",
    verdict: "Esito", date: "Data", value: "Valore", savedOk: "Salvato",
    metastatic: "Metastatico o PSA iniziale > 50",
    metastaticDesc: "Metastatico alla diagnosi o PSA iniziale > 50 ng/ml",
    excludedTitle: "Gestione oncologica dedicata",
    excludedDesc: "Richiede gestione oncologica personalizzata.",
    customCutoffs: "Soglie personalizzate",
    customCutoffsDesc: "Soglie aggiuntive valutate insieme a quella standard.",
    cutoffName: "Nome soglia", cutoffNamePlaceholder: "es. Post-biopsia",
    cutoffValue: "Valore (ng/ml)", cutoffMessage: "Messaggio",
    cutoffMessagePlaceholder: "es. Verificare con il medico",
    addCutoff: "Aggiungi soglia", noCutoffs: "Nessuna soglia personalizzata",
    variationUp: "PSA aumentato di", variationDown: "PSA diminuito di",
    vsLast: "rispetto all'ultimo valore", variationDetected: "Variazione significativa",
    // Doctor-specific
    rolePatient: "Sono un paziente", roleDoctor: "Sono un medico",
    roleQuestion: "Come vuoi usare l'app?",
    myPatients: "I miei pazienti", notifications: "Notifiche",
    generateCode: "Genera codice paziente", yourCode: "Il tuo codice medico",
    codeCopied: "Codice copiato!",
    codeInstructions: "Comunica questo codice al paziente. Lo inserirà nel suo profilo per collegarsi a te.",
    noPatients: "Nessun paziente collegato",
    noPatientsDesc: "Genera un codice e comunicalo ai tuoi pazienti.",
    patientDetail: "Dettaglio paziente",
    addNote: "Aggiungi nota", notePlaceholder: "Nota clinica sul valore...",
    doctorNotes: "Note del medico", noNotes: "Nessuna nota",
    linkDoctor: "Collega medico", doctorCode: "Codice medico",
    doctorCodeHelp: "Inserisci il codice che ti ha dato il tuo medico",
    linked: "Collegato",
    unread: "non lette",
    markRead: "Segna come letta",
    allRead: "Nessuna notifica non letta",
    patientSince: "Paziente dal",
    lastPsa: "Ultimo PSA",
    editPatientProfile: "Modifica profilo paziente",
    editPatientCutoffs: "Modifica soglie paziente",
  },
  en: {
    appName: "PSA Triage", subtitle: "Clinical assistant", login: "Log in", register: "Sign up",
    email: "Email", password: "Password", name: "Full name",
    noAccount: "Don't have an account?", hasAccount: "Already have an account?",
    logout: "Log out", dashboard: "Home", newEntry: "New PSA", history: "History", profile: "Profile",
    save: "Save", cancel: "Cancel", next: "Continue", back: "Back",
    welcomeTitle: "Set up your clinical profile",
    welcomeDesc: "Used to calculate the correct PSA threshold.",
    diagnosisDate: "Diagnosis date", prostatectomy: "Prostatectomy",
    prostatectomyDesc: "Surgical removal of the prostate",
    radiotherapy: "Radiotherapy", radiotherapyDesc: "Definitive or adjuvant/salvage",
    hormonalTherapy: "Ongoing hormonal therapy", hormonalDesc: "ADT currently active",
    surgeryDate: "Surgery date", rtDate: "RT date", rtType: "RT type",
    rtDefinitive: "Definitive", rtAdjuvant: "Adjuvant/Salvage",
    hormonalStart: "Hormonal therapy start",
    nadirPsa: "PSA nadir (ng/ml)", nadirHelp: "Lowest value post-RT",
    gleasonScore: "Gleason", gleasonHelp: "Optional", stage: "TNM Stage", stageHelp: "Optional",
    doctorName: "Referring physician", doctorPhone: "Doctor's phone",
    doctorHelp: "Useful for PSA alarm",
    psaValue: "PSA value (ng/ml)", psaDate: "Sample date",
    attachReport: "Attach report", attachHelp: "Photo or scan (optional)",
    evaluate: "Evaluate PSA",
    resultOk: "PSA within range", resultOkDesc: "No immediate action required.",
    resultNotify: "Doctor notification advised", resultNotifyDesc: "Follow-up at doctor's discretion.",
    resultUrgent: "Significant variation detected",
    resultUrgentDesc: "PSA variation > ±2 ng/ml. Possible: infections, dedifferentiation, confounders.",
    resultAlarm: "Contact your doctor", resultAlarmDesc: "Contact your oncologist ASAP.",
    profileLabel: "Clinical profile", thresholdLabel: "Applied threshold",
    psaMeasured: "Measured PSA", reason: "Rationale",
    newEvaluation: "New evaluation", printReport: "Print report",
    noEntries: "No PSA values recorded", noEntriesDesc: "Enter your first PSA value.",
    addFirst: "Add first PSA", lastCheck: "Last check",
    nextCheck: "Next check", nextCheckHelp: "Reminder for next blood test",
    entries: "measurements", threshold: "Threshold",
    disclaimer: "Demonstration tool. Does not replace medical advice.",
    disclaimerLong: "Demonstration prototype. Not a diagnosis. Contact your oncologist if in doubt.",
    psaHistory: "PSA Trend", clinicalDetails: "Clinical details",
    treatments: "Treatments", noTreatments: "No treatments", yes: "Yes", no: "No",
    editProfile: "Edit profile", reminder: "Reminder",
    reportTitle: "PSA Monitoring Report", patientData: "Patient data",
    generated: "Generated on", allValues: "All PSA values",
    verdict: "Verdict", date: "Date", value: "Value", savedOk: "Saved",
    metastatic: "Metastatic or initial PSA > 50",
    metastaticDesc: "Metastatic at diagnosis or initial PSA > 50 ng/ml",
    excludedTitle: "Dedicated oncological management",
    excludedDesc: "Requires personalized oncological management.",
    customCutoffs: "Custom thresholds",
    customCutoffsDesc: "Additional thresholds evaluated alongside the standard one.",
    cutoffName: "Name", cutoffNamePlaceholder: "e.g. Post-biopsy",
    cutoffValue: "Value (ng/ml)", cutoffMessage: "Message",
    cutoffMessagePlaceholder: "e.g. Verify with doctor",
    addCutoff: "Add threshold", noCutoffs: "No custom thresholds",
    variationUp: "PSA increased by", variationDown: "PSA decreased by",
    vsLast: "vs last value", variationDetected: "Significant variation",
    rolePatient: "I'm a patient", roleDoctor: "I'm a doctor",
    roleQuestion: "How will you use the app?",
    myPatients: "My patients", notifications: "Notifications",
    generateCode: "Generate patient code", yourCode: "Your doctor code",
    codeCopied: "Code copied!",
    codeInstructions: "Share this code with your patient. They'll enter it in their profile to link with you.",
    noPatients: "No patients linked",
    noPatientsDesc: "Generate a code and share it with your patients.",
    patientDetail: "Patient detail",
    addNote: "Add note", notePlaceholder: "Clinical note on this value...",
    doctorNotes: "Doctor's notes", noNotes: "No notes",
    linkDoctor: "Link doctor", doctorCode: "Doctor code",
    doctorCodeHelp: "Enter the code your doctor gave you",
    linked: "Linked",
    unread: "unread",
    markRead: "Mark as read",
    allRead: "No unread notifications",
    patientSince: "Patient since",
    lastPsa: "Last PSA",
    editPatientProfile: "Edit patient profile",
    editPatientCutoffs: "Edit patient thresholds",
  }
};

// ─── Mock patients for doctor demo ───
function generateMockPatients() {
  return [
    {
      id: "mock-p1", name: "Mario Rossi", email: "mario.rossi@email.com",
      profile: { diagnosisDate: "2023-01-15", surgery: true, surgeryDate: "2023-03-01", radiotherapy: false, rtType: "definitive", hormonal: false, hormonalStart: "", nadirValue: "", gleason: "3+4", stage: "T2N0M0", doctorName: "", doctorPhone: "", metastatic: false },
      cutoffs: [],
      entries: [
        { id: 1, value: 0.04, date: "2023-06-15", verdict: "ok", reason: "0.04 ng/ml è inferiore alla soglia di 0.20 ng/ml.", threshold: "PSA < 0,2 ng/ml", alerts: [] },
        { id: 2, value: 0.06, date: "2023-12-10", verdict: "ok", reason: "0.06 ng/ml è inferiore alla soglia di 0.20 ng/ml.", threshold: "PSA < 0,2 ng/ml", alerts: [] },
        { id: 3, value: 0.08, date: "2024-06-20", verdict: "ok", reason: "0.08 ng/ml è inferiore alla soglia di 0.20 ng/ml.", threshold: "PSA < 0,2 ng/ml", alerts: [] },
        { id: 4, value: 0.15, date: "2024-12-15", verdict: "ok", reason: "0.15 ng/ml è inferiore alla soglia di 0.20 ng/ml.", threshold: "PSA < 0,2 ng/ml", alerts: [] },
        { id: 5, value: 0.35, date: "2025-06-10", verdict: "alarm", reason: "0.35 ng/ml supera la soglia di 0.20 ng/ml.", threshold: "PSA < 0,2 ng/ml", alerts: [] },
      ],
      linkedDate: "2023-05-01",
      notes: { 5: "Richiamare il paziente per visita urgente. Possibile recidiva biochimica." },
    },
    {
      id: "mock-p2", name: "Luigi Bianchi", email: "luigi.bianchi@email.com",
      profile: { diagnosisDate: "2022-06-01", surgery: false, radiotherapy: true, rtDate: "2022-09-01", rtType: "definitive", hormonal: false, hormonalStart: "", nadirValue: "0.4", gleason: "4+3", stage: "T3aN0M0", doctorName: "", doctorPhone: "", metastatic: false },
      cutoffs: [{ id: 1, name: "Post-biopsia", value: 3, message: "Possibile rialzo da biopsia — verificare" }],
      entries: [
        { id: 1, value: 0.8, date: "2023-03-15", verdict: "ok", reason: "0.8 ng/ml è inferiore alla soglia di 2.40 ng/ml.", threshold: "PSA < nadir + 2 = 2.40 ng/ml", alerts: [] },
        { id: 2, value: 1.2, date: "2023-09-15", verdict: "ok", reason: "1.2 ng/ml è inferiore alla soglia di 2.40 ng/ml.", threshold: "PSA < nadir + 2 = 2.40 ng/ml", alerts: [] },
        { id: 3, value: 1.8, date: "2024-03-15", verdict: "ok", reason: "1.8 ng/ml è inferiore alla soglia di 2.40 ng/ml.", threshold: "PSA < nadir + 2 = 2.40 ng/ml", alerts: [] },
        { id: 4, value: 1.5, date: "2024-09-15", verdict: "ok", reason: "1.5 ng/ml è inferiore alla soglia di 2.40 ng/ml.", threshold: "PSA < nadir + 2 = 2.40 ng/ml", alerts: [] },
      ],
      linkedDate: "2023-02-01",
      notes: {},
    },
    {
      id: "mock-p3", name: "Anna Verdi", email: "anna.verdi@email.com",
      profile: { diagnosisDate: "2024-01-10", surgery: false, radiotherapy: false, rtType: "definitive", hormonal: false, hormonalStart: "", nadirValue: "", gleason: "", stage: "", doctorName: "", doctorPhone: "", metastatic: false },
      cutoffs: [],
      entries: [
        { id: 1, value: 2.1, date: "2024-04-15", verdict: "ok", reason: "2.1 ng/ml è sotto la soglia di 4 ng/ml.", threshold: "PSA < 4 ng/ml", alerts: [] },
        { id: 2, value: 2.5, date: "2024-08-15", verdict: "ok", reason: "2.5 ng/ml è sotto la soglia di 4 ng/ml.", threshold: "PSA < 4 ng/ml", alerts: [] },
        { id: 3, value: 3.1, date: "2024-12-15", verdict: "notify", reason: "3.1 ng/ml è sotto soglia, ma terzo dosaggio in aumento (2.1 → 2.5 → 3.1).", threshold: "PSA < 4 ng/ml", alerts: [] },
        { id: 4, value: 2.8, date: "2025-04-15", verdict: "ok", reason: "2.8 ng/ml è sotto la soglia di 4 ng/ml. Nessun pattern di incrementi.", threshold: "PSA < 4 ng/ml", alerts: [] },
        { id: 5, value: 5.2, date: "2025-10-01", verdict: "urgent", reason: "5.2 ng/ml supera la soglia di 4 ng/ml.", threshold: "PSA < 4 ng/ml",
          alerts: [{ type: "urgent", label: "Variazione significativa", message: "PSA aumentato di 2.40 ng/ml rispetto all'ultimo valore (2.8 → 5.2)", detail: "Possibili cause: infezioni, sdifferenziazione o confondenti." }] },
      ],
      linkedDate: "2024-03-01",
      notes: { 3: "Monitorare attentamente. Programmare controllo a 3 mesi." },
    },
  ];
}

// ─── Triage Logic (same as before) ───
function getProfileType(p) {
  if (!p) return "unknown";
  if (p.metastatic) return "excluded";
  const s = p.surgery, r = p.radiotherapy, h = p.hormonal;
  if (!s && !r && !h) return "healthy";
  if (s && !r && !h) return "surgery-only";
  if (!s && r && !h) return "rt-only";
  if (s && r && !h) return "surgery-rt";
  if (s && !r && h) return "surgery-hormonal";
  if (!s && r && h) return "rt-hormonal";
  if (s && r && h) return "surgery-rt-hormonal";
  return "unknown";
}

function evaluatePsa(psa, profile, allEntries, lang, customCutoffs = []) {
  const type = getProfileType(profile);
  const t = T[lang];
  const profileLabels = { healthy: lang==="it"?"Nessuna terapia":"No treatment", "surgery-only": lang==="it"?"Prostatectomia":"Prostatectomy", "rt-only": lang==="it"?"RT definitiva":"Definitive RT", "surgery-rt": lang==="it"?"Prostatectomia + RT":"Prostatectomy + RT", "surgery-hormonal": lang==="it"?"Prostatectomia + Ormonale":"Prostatectomy + Hormonal", "rt-hormonal": lang==="it"?"RT + Ormonale":"RT + Hormonal", "surgery-rt-hormonal": lang==="it"?"Prostatectomia + RT + Ormonale":"Prostatectomy + RT + Hormonal" };
  if (type === "excluded" || type === "unknown") return { verdict: "excluded", profile: profileLabels[type]||type, threshold: "-", reason: t.excludedDesc, alerts: [] };

  let verdict, reason, threshold;
  const nadirVal = parseFloat(profile.nadirValue)||0;
  const alerts = [];
  const thresholds = { healthy:{val:4,label:"PSA < 4 ng/ml"}, "surgery-only":{val:0.2,label:"PSA < 0,2 ng/ml"}, "rt-only":{val:nadirVal+2,label:`PSA < nadir+2 = ${(nadirVal+2).toFixed(2)}`}, "surgery-rt":{val:0.2,label:"PSA < 0,2 ng/ml"}, "surgery-hormonal":{val:0.08,label:"PSA < 0,08 ng/ml"}, "rt-hormonal":{val:0.08,label:"PSA < 0,08 / < ultimo"}, "surgery-rt-hormonal":{val:0.08,label:"PSA < 0,08 ng/ml"} };
  const th = thresholds[type]; threshold = th.label;

  if (type==="rt-hormonal") { const sorted=[...allEntries].sort((a,b)=>new Date(a.date)-new Date(b.date)); const lastP=sorted.length>0?sorted[sorted.length-1].value:null; if(psa<0.08){verdict="ok";reason=`${psa} < 0,08 ng/ml.`;}else if(lastP!==null&&psa<lastP){verdict="ok";reason=`${psa} > 0,08 ma < ultimo (${lastP}): trend ↓.`;}else{verdict="alarm";reason=`${psa} supera 0,08${lastP?` e ultimo (${lastP})`:""}.`;} }
  else if(type==="healthy"){if(psa>=4){verdict="alarm";reason=`${psa} supera 4 ng/ml.`;}else{const sorted=[...allEntries].sort((a,b)=>new Date(a.date)-new Date(b.date));const l2=sorted.slice(-2);if(l2.length===2&&l2[0].value<l2[1].value&&l2[1].value<psa){verdict="notify";reason=`${psa} sotto soglia, ma 3° incremento (${l2[0].value}→${l2[1].value}→${psa}).`;}else{verdict="ok";reason=`${psa} sotto 4 ng/ml. Nessun pattern.`;}}}
  else{if(psa<th.val){verdict="ok";reason=`${psa} < ${th.val.toFixed(2)} ng/ml.`;}else{verdict="alarm";reason=`${psa} supera ${th.val.toFixed(2)} ng/ml.`;}}

  const sorted=[...allEntries].sort((a,b)=>new Date(a.date)-new Date(b.date));
  if(sorted.length>0){const lastV=sorted[sorted.length-1].value;const delta=psa-lastV;const abs=Math.abs(delta);if(abs>2){alerts.push({type:"urgent",label:t.variationDetected,message:`${delta>0?t.variationUp:t.variationDown} ${abs.toFixed(2)} ng/ml ${t.vsLast} (${lastV}→${psa})`,detail:lang==="it"?"Possibili cause: infezioni, sdifferenziazione o confondenti.":"Possible: infections, dedifferentiation, confounders."});if(verdict==="ok"||verdict==="notify")verdict="urgent";}}
  if(customCutoffs?.length>0){for(const co of customCutoffs){const cv=parseFloat(co.value);if(!isNaN(cv)&&psa>=cv){alerts.push({type:"custom",label:co.name,message:co.message,detail:`≥ ${cv} ng/ml`});if(verdict==="ok"||verdict==="notify")verdict="urgent";}}}

  return { verdict, profile: profileLabels[type], threshold, psa, reason, alerts };
}

// ─── Storage ───
function load(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch{return null;}}
function sv(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}

// ─── UI Components ───
const Input=({label,help,type="text",...p})=>(<label className="block"><span className="text-sm font-medium text-slate-700">{label}</span>{help&&<span className="block text-xs text-slate-500 mt-0.5">{help}</span>}<input type={type} {...p} className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-base focus:border-teal-500 focus:outline-none bg-white"/></label>);
const Toggle=({label,desc,checked,onChange})=>(<button onClick={()=>onChange(!checked)} className={`w-full text-left border-2 rounded-xl p-4 transition ${checked?"border-teal-500 bg-teal-50":"border-slate-200 bg-white hover:border-slate-300"}`}><div className="flex items-center gap-3"><div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${checked?"border-teal-600 bg-teal-600":"border-slate-300"}`}>{checked&&<CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3}/>}</div><div><div className="font-semibold text-slate-900 text-sm">{label}</div>{desc&&<div className="text-xs text-slate-600">{desc}</div>}</div></div></button>);
const Btn=({children,variant="primary",className="",...p})=>{const base="font-semibold py-3 px-5 rounded-xl transition flex items-center justify-center gap-2 text-sm";const v={primary:"bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed",secondary:"bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-900",ghost:"text-slate-600 hover:text-slate-900 hover:bg-slate-100"};return <button className={`${base} ${v[variant]} ${className}`} {...p}>{children}</button>;};
const Card=({children,className=""})=><div className={`bg-white border border-slate-200 rounded-2xl p-5 ${className}`}>{children}</div>;

const VBadge=({verdict,lang,small})=>{const s={ok:{bg:"bg-emerald-100",text:"text-emerald-800",icon:CheckCircle2},notify:{bg:"bg-yellow-100",text:"text-yellow-800",icon:Bell},urgent:{bg:"bg-orange-100",text:"text-orange-800",icon:Zap},alarm:{bg:"bg-rose-100",text:"text-rose-800",icon:PhoneCall},excluded:{bg:"bg-slate-100",text:"text-slate-600",icon:Stethoscope}};const l={ok:{s:"OK",f:lang==="it"?"PSA OK":"PSA OK"},notify:{s:lang==="it"?"Notifica":"Notify",f:lang==="it"?"Notifica medico":"Doctor notification"},urgent:{s:lang==="it"?"Attenzione":"Attention",f:lang==="it"?"Variazione significativa":"Significant variation"},alarm:{s:lang==="it"?"Allarme":"Alarm",f:lang==="it"?"Contattare medico":"Contact doctor"},excluded:{s:"N/A",f:"N/A"}};const c=s[verdict]||s.ok;const lb=l[verdict]||l.ok;const I=c.icon;return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${c.bg} ${c.text}`}><I className="w-3.5 h-3.5"/>{small?lb.s:lb.f}</span>;};

function getThresholdVal(p){const t=getProfileType(p);const n=parseFloat(p?.nadirValue)||0;return{healthy:4,"surgery-only":0.2,"rt-only":n+2,"surgery-rt":0.2,"surgery-hormonal":0.08,"rt-hormonal":0.08,"surgery-rt-hormonal":0.08}[t]||null;}

const getResultStyle=(v,t)=>({ok:{bg:"bg-emerald-50",border:"border-emerald-300",iconBg:"bg-emerald-500",icon:CheckCircle2,title:t.resultOk,desc:t.resultOkDesc},notify:{bg:"bg-yellow-50",border:"border-yellow-300",iconBg:"bg-yellow-500",icon:Bell,title:t.resultNotify,desc:t.resultNotifyDesc},urgent:{bg:"bg-orange-50",border:"border-orange-300",iconBg:"bg-orange-500",icon:Zap,title:t.resultUrgent,desc:t.resultUrgentDesc},alarm:{bg:"bg-rose-50",border:"border-rose-300",iconBg:"bg-rose-500",icon:PhoneCall,title:t.resultAlarm,desc:t.resultAlarmDesc}}[v]||{bg:"bg-emerald-50",border:"border-emerald-300",iconBg:"bg-emerald-500",icon:CheckCircle2,title:t.resultOk,desc:t.resultOkDesc});

// ─── Cutoff Editor ───
const CutoffEditor=({cutoffs,setCutoffs,lang,onSave})=>{const t=T[lang];const[n,sn]=useState("");const[v,sv2]=useState("");const[m,sm]=useState("");const add=()=>{if(!n||!v||!m)return;const u=[...cutoffs,{id:Date.now(),name:n,value:parseFloat(v),message:m}];setCutoffs(u);if(onSave)onSave(u);sn("");sv2("");sm("");};const rm=(id)=>{const u=cutoffs.filter(c=>c.id!==id);setCutoffs(u);if(onSave)onSave(u);};
return <div className="space-y-3"><div className="flex items-center gap-2"><Sliders className="w-4 h-4 text-orange-600"/><span className="text-xs font-semibold text-slate-500 uppercase">{t.customCutoffs}</span></div>{cutoffs.length>0&&<div className="space-y-2">{cutoffs.map(co=><div key={co.id} className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-xl p-3"><div className="flex-1"><div className="text-sm font-semibold text-slate-900">{co.name}</div><div className="text-xs text-slate-600">≥ {co.value} ng/ml</div><div className="text-xs text-orange-700 mt-1">{co.message}</div></div><button onClick={()=>rm(co.id)} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-4 h-4"/></button></div>)}</div>}{cutoffs.length===0&&<div className="text-xs text-slate-400 italic">{t.noCutoffs}</div>}<div className="space-y-2 border-t border-slate-100 pt-3"><Input label={t.cutoffName} value={n} onChange={e=>sn(e.target.value)} placeholder={t.cutoffNamePlaceholder}/><Input label={t.cutoffValue} type="number" step="0.01" value={v} onChange={e=>sv2(e.target.value)} placeholder="0.50"/><Input label={t.cutoffMessage} value={m} onChange={e=>sm(e.target.value)} placeholder={t.cutoffMessagePlaceholder}/><Btn variant="secondary" className="w-full" onClick={add} disabled={!n||!v||!m}><Plus className="w-4 h-4"/>{t.addCutoff}</Btn></div></div>;};

// ═══════════════════════════════════════
// ─── MAIN APP ───
// ═══════════════════════════════════════
export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("it");
  const [page, setPage] = useState("auth");
  const [authMode, setAuthMode] = useState("login");
  const [toast, setToast] = useState(null);

  // User state
  const [user, setUser] = useState(null); // { email, name, role: "patient"|"doctor" }
  const [role, setRole] = useState(null);

  // Patient state
  const [profile, setProfile] = useState(null);
  const [entries, setEntries] = useState([]);
  const [cutoffs, setCutoffs] = useState([]);
  const [reminder, setReminder] = useState("");
  const [doctorCodeInput, setDoctorCodeInput] = useState("");
  const [linkedDoctor, setLinkedDoctor] = useState(null);
  const [pf, setPf] = useState({ diagnosisDate:"",surgery:false,surgeryDate:"",radiotherapy:false,rtDate:"",rtType:"definitive",hormonal:false,hormonalStart:"",nadirValue:"",gleason:"",stage:"",doctorName:"",doctorPhone:"",metastatic:false });

  // Doctor state
  const [doctorCode, setDoctorCode] = useState("");
  const [mockPatients, setMockPatients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [noteText, setNoteText] = useState("");

  // Entry form
  const [newPsa, setNewPsa] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [newFile, setNewFile] = useState(null);
  const [entryResult, setEntryResult] = useState(null);

  // Auth form
  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authName, setAuthName] = useState("");

  const t = T[lang];
  const flash=(m)=>{setToast(m);setTimeout(()=>setToast(null),2000);};
  const toggleLang=()=>{const nl=lang==="it"?"en":"it";setLang(nl);sv("psa-lang",nl);};

  // Load
  useEffect(()=>{
    const l=load("psa-lang");if(l)setLang(l);
    const u=load("psa-user");
    if(u){setUser(u);setRole(u.role);
      if(u.role==="patient"){const p=load("psa-profile");const e=load("psa-entries");const r=load("psa-reminder");const co=load("psa-cutoffs");const ld=load("psa-linked-doctor");if(p){setProfile(p);setPf(p);}if(e)setEntries(e);if(r)setReminder(r);if(co)setCutoffs(co);if(ld)setLinkedDoctor(ld);setPage(p?"dashboard":"onboarding");}
      else{const dc=load("psa-doctor-code")||("DR-"+Math.random().toString(36).substring(2,8).toUpperCase());sv("psa-doctor-code",dc);setDoctorCode(dc);const mp=load("psa-mock-patients")||generateMockPatients();sv("psa-mock-patients",mp);setMockPatients(mp);const nt=load("psa-notifications")||[{id:1,patientId:"mock-p1",patientName:"Mario Rossi",entryId:5,type:"alarm",message:"PSA 0.35 — supera soglia 0.20 ng/ml",read:false,date:"2025-06-10"},{id:2,patientId:"mock-p3",patientName:"Anna Verdi",entryId:5,type:"urgent",message:"PSA 5.2 — variazione +2.40 ng/ml",read:false,date:"2025-10-01"}];sv("psa-notifications",nt);setNotifications(nt);setPage("doctor-dashboard");}
    }
    setLoading(false);
  },[]);

  // ─── Auth ───
  const doRegister=(r)=>{const u={email:authEmail,name:authName,role:r};sv("psa-user",u);sv("psa-pass",authPass);setUser(u);setRole(r);if(r==="patient")setPage("onboarding");else{const dc="DR-"+Math.random().toString(36).substring(2,8).toUpperCase();sv("psa-doctor-code",dc);setDoctorCode(dc);const mp=generateMockPatients();sv("psa-mock-patients",mp);setMockPatients(mp);const nt=[{id:1,patientId:"mock-p1",patientName:"Mario Rossi",entryId:5,type:"alarm",message:"PSA 0.35 — supera soglia 0.20",read:false,date:"2025-06-10"},{id:2,patientId:"mock-p3",patientName:"Anna Verdi",entryId:5,type:"urgent",message:"PSA 5.2 — variazione +2.40",read:false,date:"2025-10-01"}];sv("psa-notifications",nt);setNotifications(nt);setPage("doctor-dashboard");}};
  const doLogin=()=>{const u=load("psa-user");const sp=load("psa-pass");if(u&&u.email===authEmail&&sp===authPass){setUser(u);setRole(u.role);if(u.role==="patient"){const p=load("psa-profile");const e=load("psa-entries");const co=load("psa-cutoffs");const r=load("psa-reminder");const ld=load("psa-linked-doctor");if(p){setProfile(p);setPf(p);}if(e)setEntries(e);if(co)setCutoffs(co);if(r)setReminder(r);if(ld)setLinkedDoctor(ld);setPage(p?"dashboard":"onboarding");}else{const dc=load("psa-doctor-code");setDoctorCode(dc||"");const mp=load("psa-mock-patients")||generateMockPatients();setMockPatients(mp);const nt=load("psa-notifications")||[];setNotifications(nt);setPage("doctor-dashboard");}}else flash(lang==="it"?"Credenziali non valide":"Invalid credentials");};
  const doLogout=()=>{setUser(null);setRole(null);setProfile(null);setEntries([]);setCutoffs([]);setMockPatients([]);setNotifications([]);setSelectedPatient(null);setPage("auth");setAuthMode("login");setAuthEmail("");setAuthPass("");setAuthName("");};

  // ─── Patient actions ───
  const saveProfile=()=>{sv("psa-profile",pf);setProfile(pf);flash(t.savedOk);setPage("dashboard");};
  const saveEntry=()=>{const val=parseFloat(newPsa);const r=evaluatePsa(val,profile,entries,lang,cutoffs);const entry={id:Date.now(),value:val,date:newDate,fileName:newFile?.name||null,verdict:r.verdict,reason:r.reason,threshold:r.threshold,alerts:r.alerts||[]};const upd=[...entries,entry];setEntries(upd);sv("psa-entries",upd);setEntryResult({...r,psa:val});setNewPsa("");setNewFile(null);};
  const linkDoctor=()=>{if(doctorCodeInput){setLinkedDoctor({code:doctorCodeInput,date:new Date().toISOString().split("T")[0]});sv("psa-linked-doctor",{code:doctorCodeInput,date:new Date().toISOString().split("T")[0]});flash(t.savedOk);}};

  // ─── Doctor actions ───
  const unreadCount=notifications.filter(n=>!n.read).length;
  const markRead=(id)=>{const upd=notifications.map(n=>n.id===id?{...n,read:true}:n);setNotifications(upd);sv("psa-notifications",upd);};
  const markAllRead=()=>{const upd=notifications.map(n=>({...n,read:true}));setNotifications(upd);sv("psa-notifications",upd);};
  const addNote=(patientId,entryId)=>{if(!noteText.trim())return;const upd=mockPatients.map(p=>{if(p.id===patientId){return{...p,notes:{...p.notes,[entryId]:noteText}};}return p;});setMockPatients(upd);sv("psa-mock-patients",upd);if(selectedPatient?.id===patientId)setSelectedPatient(upd.find(p=>p.id===patientId));setNoteText("");flash(t.savedOk);};

  const sortedEntries=[...entries].sort((a,b)=>new Date(a.date)-new Date(b.date));
  const lastEntry=sortedEntries.length>0?sortedEntries[sortedEntries.length-1]:null;
  const thresholdVal=getThresholdVal(profile);
  const chartData=sortedEntries.map(e=>({date:new Date(e.date).toLocaleDateString(lang==="it"?"it-IT":"en-US",{month:"short",year:"2-digit"}),psa:e.value}));

  if(loading)return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-pulse flex items-center gap-2 text-slate-500"><HeartPulse className="w-5 h-5"/>Loading...</div></div>;

  // ═══════════ AUTH ═══════════
  if(page==="auth"){
    return(
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2"><div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600"><HeartPulse className="w-7 h-7 text-white"/></div><div className="text-2xl font-bold text-slate-900">{t.appName}</div><div className="text-slate-500 text-sm">{t.subtitle}</div></div>
          <Card>
            <div className="space-y-4">
              {authMode==="register"&&<Input label={t.name} value={authName} onChange={e=>setAuthName(e.target.value)} placeholder="Mario Rossi"/>}
              <Input label={t.email} type="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder="mario@email.com"/>
              <Input label={t.password} type="password" value={authPass} onChange={e=>setAuthPass(e.target.value)} placeholder="••••••••"/>
              {authMode==="register"?(
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700 text-center">{t.roleQuestion}</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Btn variant="secondary" onClick={()=>doRegister("patient")} disabled={!authEmail||!authPass||!authName}><User className="w-4 h-4"/>{t.rolePatient}</Btn>
                    <Btn variant="secondary" onClick={()=>doRegister("doctor")} disabled={!authEmail||!authPass||!authName}><Stethoscope className="w-4 h-4"/>{t.roleDoctor}</Btn>
                  </div>
                </div>
              ):(
                <Btn className="w-full" onClick={doLogin} disabled={!authEmail||!authPass}>{t.login}<ArrowRight className="w-4 h-4"/></Btn>
              )}
              <button onClick={()=>setAuthMode(authMode==="login"?"register":"login")} className="w-full text-center text-sm text-teal-600">{authMode==="login"?t.noAccount:t.hasAccount}</button>
            </div>
          </Card>
          <button onClick={toggleLang} className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-700"><Globe className="w-3.5 h-3.5"/>{lang==="it"?"English":"Italiano"}</button>
        </div>
      </div>
    );
  }

  // ═══════════ PATIENT ONBOARDING ═══════════
  if(page==="onboarding"&&role==="patient"){
    return(
      <div className="min-h-screen bg-slate-50 p-6"><div className="max-w-lg mx-auto space-y-6">
        <div><div className="text-2xl font-bold text-slate-900">{t.welcomeTitle}</div><div className="text-slate-600 text-sm">{t.welcomeDesc}</div></div>
        <Card className="space-y-4">
          <Input label={t.diagnosisDate} type="date" value={pf.diagnosisDate} onChange={e=>setPf({...pf,diagnosisDate:e.target.value})}/>
          <Toggle label={t.metastatic} desc={t.metastaticDesc} checked={pf.metastatic} onChange={v=>setPf({...pf,metastatic:v})}/>
          {!pf.metastatic&&<div><div className="border-t border-slate-100 pt-3 space-y-3"><div className="text-xs font-semibold text-slate-500 uppercase">{t.treatments}</div>
            <Toggle label={t.prostatectomy} desc={t.prostatectomyDesc} checked={pf.surgery} onChange={v=>setPf({...pf,surgery:v})}/>
            {pf.surgery&&<Input label={t.surgeryDate} type="date" value={pf.surgeryDate} onChange={e=>setPf({...pf,surgeryDate:e.target.value})}/>}
            <Toggle label={t.radiotherapy} desc={t.radiotherapyDesc} checked={pf.radiotherapy} onChange={v=>setPf({...pf,radiotherapy:v})}/>
            {pf.radiotherapy&&<div className="space-y-3 pl-2 border-l-2 border-teal-200"><Input label={t.rtDate} type="date" value={pf.rtDate} onChange={e=>setPf({...pf,rtDate:e.target.value})}/><div><span className="text-sm font-medium text-slate-700">{t.rtType}</span><div className="flex gap-2 mt-1">{["definitive","adjuvant"].map(v=><button key={v} onClick={()=>setPf({...pf,rtType:v})} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition ${pf.rtType===v?"border-teal-500 bg-teal-50 text-teal-800":"border-slate-200 text-slate-600"}`}>{v==="definitive"?t.rtDefinitive:t.rtAdjuvant}</button>)}</div></div><Input label={t.nadirPsa} help={t.nadirHelp} type="number" step="0.01" value={pf.nadirValue} onChange={e=>setPf({...pf,nadirValue:e.target.value})} placeholder="0.15"/></div>}
            <Toggle label={t.hormonalTherapy} desc={t.hormonalDesc} checked={pf.hormonal} onChange={v=>setPf({...pf,hormonal:v})}/>
            {pf.hormonal&&<Input label={t.hormonalStart} type="date" value={pf.hormonalStart} onChange={e=>setPf({...pf,hormonalStart:e.target.value})}/>}
          </div><div className="border-t border-slate-100 pt-3 space-y-3"><div className="text-xs font-semibold text-slate-500 uppercase">{t.clinicalDetails}</div><div className="grid grid-cols-2 gap-3"><Input label={t.gleasonScore} help={t.gleasonHelp} value={pf.gleason} onChange={e=>setPf({...pf,gleason:e.target.value})} placeholder="3+4"/><Input label={t.stage} help={t.stageHelp} value={pf.stage} onChange={e=>setPf({...pf,stage:e.target.value})} placeholder="T2N0M0"/></div></div></div>}
          <div className="border-t border-slate-100 pt-3 space-y-3"><div className="text-xs font-semibold text-slate-500 uppercase">{t.doctorName}</div><div className="grid grid-cols-2 gap-3"><Input label={t.doctorName} value={pf.doctorName} onChange={e=>setPf({...pf,doctorName:e.target.value})} placeholder="Dr. Bianchi"/><Input label={t.doctorPhone} help={t.doctorHelp} value={pf.doctorPhone} onChange={e=>setPf({...pf,doctorPhone:e.target.value})} placeholder="+39 02 123456"/></div></div>
          <div className="border-t border-slate-100 pt-3 space-y-3"><div className="flex items-center gap-2"><Link className="w-4 h-4 text-teal-600"/><span className="text-xs font-semibold text-slate-500 uppercase">{t.linkDoctor}</span></div><div className="flex gap-2"><Input label={t.doctorCode} help={t.doctorCodeHelp} value={doctorCodeInput} onChange={e=>setDoctorCodeInput(e.target.value)} placeholder="DR-A7X9K2"/></div>{doctorCodeInput&&<Btn variant="secondary" className="w-full" onClick={linkDoctor}><Link className="w-4 h-4"/>{t.linkDoctor}</Btn>}{linkedDoctor&&<div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2"><CheckCircle2 className="w-4 h-4"/>{t.linked}: {linkedDoctor.code}</div>}</div>
        </Card>
        <Btn className="w-full" onClick={saveProfile}>{t.save}<ArrowRight className="w-4 h-4"/></Btn>
      </div></div>
    );
  }

  // ═══════════ DOCTOR VIEWS ═══════════
  if(role==="doctor"){
    const docNav=[
      {id:"doctor-dashboard",icon:Users,label:t.myPatients},
      {id:"doctor-notifications",icon:Bell,label:t.notifications,badge:unreadCount},
      {id:"doctor-code",icon:Hash,label:lang==="it"?"Codice":"Code"},
      {id:"doctor-profile",icon:User,label:t.profile},
    ];

    // Patient detail view
    if(selectedPatient){
      const sp=selectedPatient;
      const spEntries=[...sp.entries].sort((a,b)=>new Date(a.date)-new Date(b.date));
      const spLast=spEntries[spEntries.length-1];
      const spThreshold=getThresholdVal(sp.profile);
      const spChart=spEntries.map(e=>({date:new Date(e.date).toLocaleDateString(lang==="it"?"it-IT":"en-US",{month:"short",year:"2-digit"}),psa:e.value}));

      return(
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
          {toast&&<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/>{toast}</div>}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-10"><div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={()=>setSelectedPatient(null)} className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"><ArrowLeft className="w-4 h-4"/>{t.back}</button>
            <span className="font-semibold text-slate-900 text-sm">{sp.name}</span>
            <div className="w-16"/>
          </div></header>
          <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-5 space-y-4">
            {/* Patient summary */}
            <Card>
              <div className="flex items-center gap-3 mb-3"><div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center"><User className="w-5 h-5 text-teal-700"/></div><div><div className="font-semibold text-slate-900">{sp.name}</div><div className="text-xs text-slate-500">{sp.email}</div></div></div>
              <div className="space-y-1.5 text-sm border-t border-slate-100 pt-3">
                <div className="flex justify-between"><span className="text-slate-600">{t.diagnosisDate}</span><span className="font-semibold">{sp.profile.diagnosisDate}</span></div>
                {sp.profile.surgery&&<div className="flex justify-between"><span className="text-slate-600">{t.prostatectomy}</span><span className="font-semibold">{t.yes} ({sp.profile.surgeryDate})</span></div>}
                {sp.profile.radiotherapy&&<div><div className="flex justify-between"><span className="text-slate-600">{t.radiotherapy}</span><span className="font-semibold">{t.yes} — {sp.profile.rtType==="definitive"?t.rtDefinitive:t.rtAdjuvant}</span></div>{sp.profile.nadirValue&&<div className="flex justify-between"><span className="text-slate-600">Nadir</span><span className="font-semibold">{sp.profile.nadirValue} ng/ml</span></div>}</div>}
                {sp.profile.hormonal&&<div className="flex justify-between"><span className="text-slate-600">{t.hormonalTherapy}</span><span className="font-semibold">{t.yes}</span></div>}
                {!sp.profile.surgery&&!sp.profile.radiotherapy&&!sp.profile.hormonal&&<div className="text-slate-500 italic">{t.noTreatments}</div>}
                {sp.profile.gleason&&<div className="flex justify-between"><span className="text-slate-600">Gleason</span><span className="font-semibold">{sp.profile.gleason}</span></div>}
                {sp.profile.stage&&<div className="flex justify-between"><span className="text-slate-600">{t.stage}</span><span className="font-semibold">{sp.profile.stage}</span></div>}
                <div className="flex justify-between border-t border-slate-100 pt-1.5"><span className="text-slate-600">{t.patientSince}</span><span className="font-semibold">{sp.linkedDate}</span></div>
              </div>
            </Card>

            {/* Chart */}
            {spEntries.length>=2&&<Card><div className="text-xs font-semibold text-slate-500 uppercase mb-3">{t.psaHistory}</div><div className="h-44"><ResponsiveContainer width="100%" height="100%"><AreaChart data={spChart}><defs><linearGradient id="spG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.15}/><stop offset="95%" stopColor="#0d9488" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="date" tick={{fontSize:11}} stroke="#94a3b8"/><YAxis tick={{fontSize:11}} stroke="#94a3b8" domain={["dataMin - 0.1","auto"]}/><Tooltip contentStyle={{borderRadius:12,border:"1px solid #e2e8f0",fontSize:13}}/>{spThreshold&&<ReferenceLine y={spThreshold} stroke="#ef4444" strokeDasharray="6 3" label={{value:t.threshold,position:"right",fontSize:10,fill:"#ef4444"}}/>}{sp.cutoffs?.map((co,i)=><ReferenceLine key={i} y={parseFloat(co.value)} stroke="#f97316" strokeDasharray="4 4"/>)}<Area type="monotone" dataKey="psa" stroke="#0d9488" strokeWidth={2.5} fill="url(#spG)" dot={{r:4,fill:"#0d9488",stroke:"#fff",strokeWidth:2}} activeDot={{r:6}}/></AreaChart></ResponsiveContainer></div></Card>}

            {/* Entries with notes */}
            <div className="text-xs font-semibold text-slate-500 uppercase">{t.allValues}</div>
            <div className="space-y-2">
              {[...spEntries].reverse().map(e=>(
                <Card key={e.id}>
                  <div className="flex items-center justify-between mb-1"><span className="text-xs text-slate-500">{new Date(e.date).toLocaleDateString(lang==="it"?"it-IT":"en-US",{day:"numeric",month:"short",year:"numeric"})}</span><VBadge verdict={e.verdict} lang={lang} small/></div>
                  <div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-slate-900">{e.value}</span><span className="text-xs text-slate-500">ng/ml</span></div>
                  <div className="text-xs text-slate-600 mt-1">{e.reason}</div>
                  {e.alerts?.length>0&&<div className="mt-2">{e.alerts.map((a,j)=><div key={j} className="text-xs bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 flex items-start gap-2 mt-1"><Zap className="w-3 h-3 text-orange-600 mt-0.5 flex-shrink-0"/><span className="text-orange-800"><strong>{a.label}</strong>: {a.message}</span></div>)}</div>}
                  {/* Doctor note */}
                  {sp.notes[e.id]&&<div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 text-xs"><div className="flex items-center gap-1 font-semibold text-blue-800 mb-1"><MessageSquare className="w-3 h-3"/>{t.doctorNotes}</div><div className="text-blue-700">{sp.notes[e.id]}</div></div>}
                  {/* Add note */}
                  {!sp.notes[e.id]&&<div className="mt-2 flex gap-2"><input value={noteText} onChange={ev=>setNoteText(ev.target.value)} placeholder={t.notePlaceholder} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-teal-500 focus:outline-none"/><button onClick={()=>addNote(sp.id,e.id)} disabled={!noteText.trim()} className="text-xs bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"><MessageSquare className="w-3 h-3"/></button></div>}
                </Card>
              ))}
            </div>
          </main>
        </div>
      );
    }

    return(
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {toast&&<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/>{toast}</div>}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10"><div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><Stethoscope className="w-4 h-4 text-white"/></div><span className="font-semibold text-slate-900 text-sm">{t.appName} <span className="text-indigo-600 text-xs font-normal">Doctor</span></span></div><div className="flex items-center gap-2"><button onClick={toggleLang} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"><Globe className="w-3.5 h-3.5"/>{lang==="it"?"EN":"IT"}</button><button onClick={doLogout} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"><LogOut className="w-3.5 h-3.5"/>{t.logout}</button></div></div></header>

        <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-5 pb-24">
          {/* Doctor Dashboard */}
          {page==="doctor-dashboard"&&(
            <div className="space-y-4">
              <div className="flex items-center justify-between"><div className="text-lg font-bold text-slate-900">{t.myPatients}</div><span className="text-xs text-slate-500">{mockPatients.length} {lang==="it"?"pazienti":"patients"}</span></div>
              {unreadCount>0&&<div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center gap-2 cursor-pointer hover:bg-rose-100 transition" onClick={()=>setPage("doctor-notifications")}><BellRing className="w-5 h-5 text-rose-600"/><span className="text-sm text-rose-800 font-semibold">{unreadCount} {lang==="it"?"notifiche non lette":"unread notifications"}</span><ChevronRight className="w-4 h-4 text-rose-400 ml-auto"/></div>}
              <div className="space-y-2">
                {mockPatients.map(p=>{const pEntries=[...p.entries].sort((a,b)=>new Date(a.date)-new Date(b.date));const last=pEntries[pEntries.length-1];return(
                  <Card key={p.id} className="cursor-pointer hover:border-teal-300 transition" onClick={()=>setSelectedPatient(p)}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center"><User className="w-5 h-5 text-teal-700"/></div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 text-sm">{p.name}</div>
                        <div className="text-xs text-slate-500">{getProfileType(p.profile)==="healthy"?t.noTreatments:p.profile.surgery?t.prostatectomy:t.radiotherapy}</div>
                      </div>
                      <div className="text-right">
                        {last&&<div><VBadge verdict={last.verdict} lang={lang} small/><div className="text-lg font-bold text-slate-900 mt-1">{last.value}<span className="text-xs font-normal text-slate-500 ml-1">ng/ml</span></div><div className="text-xs text-slate-500">{new Date(last.date).toLocaleDateString(lang==="it"?"it-IT":"en-US",{month:"short",year:"2-digit"})}</div></div>}
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400"/>
                    </div>
                  </Card>
                );})}
              </div>
            </div>
          )}

          {/* Notifications */}
          {page==="doctor-notifications"&&(
            <div className="space-y-4">
              <div className="flex items-center justify-between"><div className="text-lg font-bold text-slate-900">{t.notifications}</div>{unreadCount>0&&<button onClick={markAllRead} className="text-xs text-teal-600 hover:text-teal-800">{lang==="it"?"Segna tutte lette":"Mark all read"}</button>}</div>
              {notifications.length===0?<Card className="text-center py-8"><Bell className="w-10 h-10 text-slate-300 mx-auto mb-3"/><div className="text-sm text-slate-500">{t.allRead}</div></Card>:
              <div className="space-y-2">{notifications.map(n=>(
                <Card key={n.id} className={`${n.read?"opacity-60":""} cursor-pointer hover:border-teal-300 transition`} onClick={()=>{markRead(n.id);const p=mockPatients.find(mp=>mp.id===n.patientId);if(p)setSelectedPatient(p);}}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.type==="alarm"?"bg-rose-500":"bg-orange-500"}`}>{n.type==="alarm"?<PhoneCall className="w-4 h-4 text-white"/>:<Zap className="w-4 h-4 text-white"/>}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 text-sm">{n.patientName}</div>
                      <div className="text-xs text-slate-600">{n.message}</div>
                      <div className="text-xs text-slate-400 mt-1">{new Date(n.date).toLocaleDateString(lang==="it"?"it-IT":"en-US",{day:"numeric",month:"short",year:"numeric"})}</div>
                    </div>
                    {!n.read&&<div className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0 mt-2"/>}
                  </div>
                </Card>
              ))}</div>}
            </div>
          )}

          {/* Doctor Code */}
          {page==="doctor-code"&&(
            <div className="space-y-4">
              <div className="text-lg font-bold text-slate-900">{t.yourCode}</div>
              <Card className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 mb-4"><Hash className="w-8 h-8 text-indigo-600"/></div>
                <div className="text-3xl font-mono font-bold text-slate-900 tracking-widest mb-2">{doctorCode}</div>
                <button onClick={()=>{navigator.clipboard?.writeText(doctorCode);flash(t.codeCopied);}} className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800"><Copy className="w-4 h-4"/>{lang==="it"?"Copia codice":"Copy code"}</button>
                <p className="text-sm text-slate-600 mt-4 max-w-xs mx-auto">{t.codeInstructions}</p>
              </Card>
            </div>
          )}

          {/* Doctor Profile */}
          {page==="doctor-profile"&&(
            <div className="space-y-4">
              <div className="text-lg font-bold text-slate-900">{t.profile}</div>
              <Card>
                <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center"><Stethoscope className="w-6 h-6 text-indigo-700"/></div><div><div className="font-semibold text-slate-900">{user?.name}</div><div className="text-sm text-slate-500">{user?.email}</div><div className="text-xs text-indigo-600 mt-0.5">{lang==="it"?"Account medico":"Doctor account"}</div></div></div>
              </Card>
              <Card><div className="flex justify-between text-sm"><span className="text-slate-600">{lang==="it"?"Codice medico":"Doctor code"}</span><span className="font-mono font-bold text-indigo-600">{doctorCode}</span></div><div className="flex justify-between text-sm mt-2"><span className="text-slate-600">{lang==="it"?"Pazienti collegati":"Linked patients"}</span><span className="font-semibold">{mockPatients.length}</span></div></Card>
            </div>
          )}
        </main>

        {/* Doctor Nav */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-10"><div className="max-w-2xl mx-auto flex">{docNav.map(n=>{const Icon=n.icon;const active=page===n.id;return(<button key={n.id} onClick={()=>setPage(n.id)} className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition relative ${active?"text-indigo-600":"text-slate-400 hover:text-slate-600"}`}><Icon className="w-5 h-5"/><span className="text-xs font-medium">{n.label}</span>{n.badge>0&&<span className="absolute top-1.5 right-1/4 w-4 h-4 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">{n.badge}</span>}</button>);})}</div></nav>
        <div className="h-16"/>
      </div>
    );
  }

  // ═══════════ PATIENT MAIN APP ═══════════
  const patNav=[{id:"dashboard",icon:Activity,label:t.dashboard},{id:"new-entry",icon:Plus,label:t.newEntry},{id:"history",icon:BarChart3,label:t.history},{id:"profile",icon:User,label:t.profile}];
  return(
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {toast&&<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/>{toast}</div>}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10"><div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center"><HeartPulse className="w-4 h-4 text-white"/></div><span className="font-semibold text-slate-900 text-sm">{t.appName}</span></div><div className="flex items-center gap-2"><button onClick={toggleLang} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"><Globe className="w-3.5 h-3.5"/>{lang==="it"?"EN":"IT"}</button><button onClick={doLogout} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"><LogOut className="w-3.5 h-3.5"/>{t.logout}</button></div></div></header>
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-5 pb-24">
        {/* Dashboard */}
        {page==="dashboard"&&(<div className="space-y-4">
          <div className="text-lg font-bold text-slate-900">{lang==="it"?`Ciao, ${user?.name?.split(" ")[0]}`:`Hi, ${user?.name?.split(" ")[0]}`}</div>
          {linkedDoctor&&<div className="flex items-center gap-2 text-xs bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-2"><Link className="w-3 h-3 text-indigo-600"/><span className="text-indigo-800">{t.linked}: {linkedDoctor.code}</span></div>}
          {lastEntry?(<div className="space-y-4"><Card><div className="flex items-start justify-between mb-3"><div className="text-xs font-semibold text-slate-500 uppercase">{t.lastCheck}</div><VBadge verdict={lastEntry.verdict} lang={lang} small/></div><div className="flex items-baseline gap-2"><span className="text-4xl font-bold text-slate-900">{lastEntry.value}</span><span className="text-slate-500 text-sm">ng/ml</span></div><div className="text-xs text-slate-500 mt-1">{new Date(lastEntry.date).toLocaleDateString(lang==="it"?"it-IT":"en-US",{day:"numeric",month:"long",year:"numeric"})}</div><div className="text-sm text-slate-600 mt-2">{lastEntry.reason}</div></Card>{lastEntry.alerts?.length>0&&<div className="space-y-2">{lastEntry.alerts.map((a,i)=><div key={i} className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4 flex items-start gap-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0"><Zap className="w-4 h-4 text-white"/></div><div className="flex-1"><div className="text-sm font-bold text-orange-900">{a.label}</div><div className="text-sm text-orange-800">{a.message}</div>{a.detail&&<div className="text-xs text-orange-700 mt-1">{a.detail}</div>}</div></div>)}</div>}</div>):(<Card className="text-center py-8"><Activity className="w-10 h-10 text-slate-300 mx-auto mb-3"/><div className="font-semibold text-slate-900">{t.noEntries}</div><div className="text-sm text-slate-500 mt-1">{t.noEntriesDesc}</div><Btn className="mx-auto mt-4" onClick={()=>{setEntryResult(null);setPage("new-entry");}}><Plus className="w-4 h-4"/>{t.addFirst}</Btn></Card>)}
          {sortedEntries.length>=2&&<Card><div className="text-xs font-semibold text-slate-500 uppercase mb-3">{t.psaHistory}</div><div className="h-44"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="pG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.15}/><stop offset="95%" stopColor="#0d9488" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="date" tick={{fontSize:11}} stroke="#94a3b8"/><YAxis tick={{fontSize:11}} stroke="#94a3b8" domain={["dataMin-0.1","auto"]}/><Tooltip contentStyle={{borderRadius:12,border:"1px solid #e2e8f0",fontSize:13}}/>{thresholdVal&&<ReferenceLine y={thresholdVal} stroke="#ef4444" strokeDasharray="6 3"/>}<Area type="monotone" dataKey="psa" stroke="#0d9488" strokeWidth={2.5} fill="url(#pG)" dot={{r:4,fill:"#0d9488",stroke:"#fff",strokeWidth:2}}/></AreaChart></ResponsiveContainer></div></Card>}
          <Card><div className="text-xs font-semibold text-slate-500 uppercase mb-3">{t.reminder}</div><input type="date" value={reminder} onChange={e=>{setReminder(e.target.value);sv("psa-reminder",e.target.value);flash(t.savedOk);}} className="w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"/><div className="text-xs text-slate-500 mt-2">{t.nextCheckHelp}</div></Card>
        </div>)}

        {/* New Entry */}
        {page==="new-entry"&&!entryResult&&(<div className="space-y-5"><div className="text-lg font-bold text-slate-900">{t.newEntry}</div><Card className="space-y-4"><Input label={t.psaValue} type="number" step="0.001" min="0" value={newPsa} onChange={e=>setNewPsa(e.target.value)} placeholder="0.08"/><Input label={t.psaDate} type="date" value={newDate} onChange={e=>setNewDate(e.target.value)}/><div><span className="text-sm font-medium text-slate-700">{t.attachReport}</span>{newFile?<div className="mt-2 flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3"><Paperclip className="w-4 h-4 text-teal-600"/><span className="text-sm text-teal-800 flex-1 truncate">{newFile.name}</span><button onClick={()=>setNewFile(null)}><X className="w-4 h-4 text-teal-600"/></button></div>:<label className="mt-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl py-4 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition"><Upload className="w-5 h-5 text-slate-400"/><span className="text-sm text-slate-500">{t.attachReport}</span><input type="file" accept="image/*,.pdf" className="hidden" onChange={e=>setNewFile(e.target.files?.[0]||null)}/></label>}</div><Btn className="w-full" onClick={saveEntry} disabled={!newPsa||parseFloat(newPsa)<0}>{t.evaluate}<ArrowRight className="w-4 h-4"/></Btn></Card></div>)}

        {page==="new-entry"&&entryResult&&(<div className="space-y-5">{(()=>{const s=getResultStyle(entryResult.verdict,t);const I=s.icon;return <div className={`${s.bg} ${s.border} border-2 rounded-2xl p-5`}><div className="flex items-start gap-3"><div className={`${s.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`}><I className="w-6 h-6 text-white"/></div><div className="flex-1 space-y-1"><div className="text-xl font-bold text-slate-900">{s.title}</div><div className="text-slate-700 text-sm">{s.desc}</div></div></div></div>;})()}{entryResult.alerts?.length>0&&<div className="space-y-2">{entryResult.alerts.map((a,i)=><div key={i} className="bg-orange-50 border-2 border-orange-300 rounded-xl p-4 flex items-start gap-3"><div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0"><Zap className="w-4 h-4 text-white"/></div><div className="flex-1"><div className="text-sm font-bold text-orange-900">{a.label}</div><div className="text-sm text-orange-800">{a.message}</div></div></div>)}</div>}<Card><dl className="space-y-2.5 text-sm"><div className="flex justify-between"><dt className="text-slate-600">{t.profileLabel}</dt><dd className="font-semibold text-right">{entryResult.profile}</dd></div><div className="flex justify-between border-t border-slate-100 pt-2.5"><dt className="text-slate-600">{t.thresholdLabel}</dt><dd className="font-semibold text-right">{entryResult.threshold}</dd></div><div className="flex justify-between items-center border-t border-slate-100 pt-2.5"><dt className="text-slate-600">{t.psaMeasured}</dt><dd className="text-2xl font-bold">{entryResult.psa} <span className="text-sm font-normal text-slate-500">ng/ml</span></dd></div><div className="border-t border-slate-100 pt-2.5"><dt className="text-slate-600 mb-1">{t.reason}</dt><dd className="text-slate-800">{entryResult.reason}</dd></div></dl></Card><div className="flex gap-3"><Btn variant="secondary" className="flex-1" onClick={()=>{setEntryResult(null);setNewPsa("");setNewDate(new Date().toISOString().split("T")[0]);}}><RotateCcw className="w-4 h-4"/>{t.newEvaluation}</Btn><Btn className="flex-1" onClick={()=>{setEntryResult(null);setPage("dashboard");}}>{t.dashboard}<ArrowRight className="w-4 h-4"/></Btn></div></div>)}

        {/* History */}
        {page==="history"&&(<div className="space-y-4"><div className="flex items-center justify-between"><div className="text-lg font-bold text-slate-900">{t.psaHistory}</div><span className="text-xs text-slate-500">{entries.length} {t.entries}</span></div>{sortedEntries.length>=2&&<Card><div className="h-52"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="pG2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.15}/><stop offset="95%" stopColor="#0d9488" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0"/><XAxis dataKey="date" tick={{fontSize:11}} stroke="#94a3b8"/><YAxis tick={{fontSize:11}} stroke="#94a3b8"/><Tooltip contentStyle={{borderRadius:12,border:"1px solid #e2e8f0",fontSize:13}}/>{thresholdVal&&<ReferenceLine y={thresholdVal} stroke="#ef4444" strokeDasharray="6 3"/>}<Area type="monotone" dataKey="psa" stroke="#0d9488" strokeWidth={2.5} fill="url(#pG2)" dot={{r:4,fill:"#0d9488",stroke:"#fff",strokeWidth:2}}/></AreaChart></ResponsiveContainer></div></Card>}{sortedEntries.length===0?<Card className="text-center py-8"><BarChart3 className="w-10 h-10 text-slate-300 mx-auto mb-3"/><div className="font-semibold text-slate-900">{t.noEntries}</div></Card>:<div className="space-y-2">{[...sortedEntries].reverse().map((e,i)=><Card key={i}><div className="flex items-center justify-between mb-1"><span className="text-xs text-slate-500">{new Date(e.date).toLocaleDateString(lang==="it"?"it-IT":"en-US",{day:"numeric",month:"short",year:"numeric"})}</span><VBadge verdict={e.verdict} lang={lang} small/></div><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-slate-900">{e.value}</span><span className="text-xs text-slate-500">ng/ml</span></div><div className="text-xs text-slate-600 mt-1">{e.reason}</div>{e.alerts?.length>0&&<div className="mt-2">{e.alerts.map((a,j)=><div key={j} className="text-xs bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mt-1"><Zap className="w-3 h-3 text-orange-600 inline mr-1"/><strong>{a.label}</strong>: {a.message}</div>)}</div>}</Card>)}</div>}</div>)}

        {/* Profile */}
        {page==="profile"&&(<div className="space-y-4"><div className="text-lg font-bold text-slate-900">{t.profile}</div><Card><div className="flex items-center gap-3 mb-4"><div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center"><User className="w-6 h-6 text-teal-700"/></div><div><div className="font-semibold text-slate-900">{user?.name}</div><div className="text-sm text-slate-500">{user?.email}</div></div></div><div className="space-y-2 text-sm border-t border-slate-100 pt-3"><div className="flex justify-between"><span className="text-slate-600">{t.diagnosisDate}</span><span className="font-semibold">{profile?.diagnosisDate||"-"}</span></div>{profile?.gleason&&<div className="flex justify-between"><span className="text-slate-600">Gleason</span><span className="font-semibold">{profile.gleason}</span></div>}</div></Card><Card><div className="text-xs font-semibold text-slate-500 uppercase mb-3">{t.treatments}</div><div className="space-y-2 text-sm"><div className="flex justify-between"><span className="text-slate-600">{t.prostatectomy}</span><span className="font-semibold">{profile?.surgery?`${t.yes}${profile.surgeryDate?` (${profile.surgeryDate})`:""}`  :t.no}</span></div><div className="flex justify-between"><span className="text-slate-600">{t.radiotherapy}</span><span className="font-semibold">{profile?.radiotherapy?`${t.yes} — ${profile.rtType==="definitive"?t.rtDefinitive:t.rtAdjuvant}`:t.no}</span></div><div className="flex justify-between"><span className="text-slate-600">{t.hormonalTherapy}</span><span className="font-semibold">{profile?.hormonal?t.yes:t.no}</span></div></div></Card>{linkedDoctor&&<Card><div className="flex items-center gap-2 text-sm"><Link className="w-4 h-4 text-indigo-600"/><span className="text-slate-600">{t.linked}:</span><span className="font-mono font-bold text-indigo-600">{linkedDoctor.code}</span></div></Card>}<Card><CutoffEditor cutoffs={cutoffs} setCutoffs={c=>{setCutoffs(c);sv("psa-cutoffs",c);}} lang={lang}/></Card><Btn variant="secondary" className="w-full" onClick={()=>setPage("onboarding")}><Settings className="w-4 h-4"/>{t.editProfile}</Btn></div>)}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-10"><div className="max-w-2xl mx-auto flex">{patNav.map(n=>{const I=n.icon;const a=page===n.id;return <button key={n.id} onClick={()=>{if(n.id==="new-entry")setEntryResult(null);setPage(n.id);}} className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition ${a?"text-teal-600":"text-slate-400 hover:text-slate-600"}`}><I className="w-5 h-5"/><span className="text-xs font-medium">{n.label}</span></button>;})}</div></nav>
      <div className="h-16"/>
    </div>
  );
}
