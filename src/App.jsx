import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid, Area, AreaChart } from "recharts";
import {
  HeartPulse, ArrowRight, ArrowLeft, LogOut, Plus, Clock, FileText, User, Settings, CheckCircle2,
  PhoneCall, Bell, AlertTriangle, Shield, TrendingUp, Calendar, Paperclip, Printer, ChevronRight,
  Globe, Stethoscope, RotateCcw, X, Activity, BarChart3, Upload
} from "lucide-react";

// ─── i18n ───
const T = {
  it: {
    appName: "PSA Triage",
    subtitle: "Assistente clinico",
    login: "Accedi",
    register: "Registrati",
    email: "Email",
    password: "Password",
    name: "Nome completo",
    noAccount: "Non hai un account?",
    hasAccount: "Hai già un account?",
    logout: "Esci",
    dashboard: "Home",
    newEntry: "Nuovo PSA",
    history: "Storico",
    profile: "Profilo",
    save: "Salva",
    cancel: "Annulla",
    next: "Continua",
    back: "Indietro",
    welcomeTitle: "Configura il tuo profilo clinico",
    welcomeDesc: "Queste informazioni servono per calcolare la soglia PSA corretta per il tuo caso specifico.",
    diagnosisDate: "Data diagnosi tumore prostatico",
    prostatectomy: "Prostatectomia",
    prostatectomyDesc: "Intervento chirurgico di rimozione della prostata",
    radiotherapy: "Radioterapia",
    radiotherapyDesc: "Radioterapia definitiva o adiuvante/salvage",
    hormonalTherapy: "Terapia ormonale in corso",
    hormonalDesc: "Deprivazione androgenica (ADT) attualmente in corso",
    surgeryDate: "Data intervento",
    rtDate: "Data radioterapia",
    rtType: "Tipo radioterapia",
    rtDefinitive: "Definitiva",
    rtAdjuvant: "Adiuvante/Salvage",
    hormonalStart: "Data inizio terapia ormonale",
    nadirPsa: "Nadir PSA post-radioterapia (ng/ml)",
    nadirHelp: "Il valore minimo di PSA raggiunto dopo la radioterapia",
    gleasonScore: "Gleason Score",
    gleasonHelp: "Opzionale — lo trovi nel referto istologico",
    stage: "Stadio TNM",
    stageHelp: "Opzionale — lo trovi nella lettera di dimissione",
    doctorName: "Medico di riferimento",
    doctorPhone: "Telefono medico",
    doctorHelp: "Utile in caso di allarme PSA",
    psaValue: "Valore PSA (ng/ml)",
    psaDate: "Data prelievo",
    attachReport: "Allega referto",
    attachHelp: "Foto o scan del referto (opzionale)",
    evaluate: "Valuta PSA",
    resultOk: "PSA nella norma",
    resultOkDesc: "Nessuna azione immediata richiesta.",
    resultNotify: "Notifica al medico consigliata",
    resultNotifyDesc: "Visita di controllo a discrezione del medico.",
    resultAlarm: "Contattare il medico",
    resultAlarmDesc: "Contatta il tuo oncologo il prima possibile.",
    profileLabel: "Profilo clinico",
    thresholdLabel: "Soglia applicata",
    psaMeasured: "PSA misurato",
    reason: "Motivazione",
    newEvaluation: "Nuova valutazione",
    printReport: "Stampa report",
    noEntries: "Nessun valore PSA registrato",
    noEntriesDesc: "Inserisci il tuo primo valore PSA per iniziare il monitoraggio.",
    addFirst: "Inserisci primo PSA",
    lastCheck: "Ultimo controllo",
    nextCheck: "Prossimo controllo",
    nextCheckHelp: "Imposta un promemoria per il prossimo prelievo",
    nextCheckDate: "Data prossimo controllo",
    trend: "Trend PSA",
    entries: "misurazioni",
    threshold: "Soglia",
    disclaimer: "Strumento dimostrativo. Non sostituisce il parere del medico.",
    disclaimerLong: "Questo è un prototipo dimostrativo. Non costituisce diagnosi né sostituisce il giudizio del medico. In caso di dubbi, sintomi o valori inattesi, contatta sempre il tuo oncologo di riferimento.",
    psaHistory: "Andamento PSA",
    clinicalDetails: "Dettagli clinici",
    treatments: "Terapie",
    noTreatments: "Nessuna terapia",
    yes: "Sì",
    no: "No",
    editProfile: "Modifica profilo",
    language: "Lingua",
    reminder: "Promemoria",
    report: "Report",
    reportTitle: "Report Monitoraggio PSA",
    patientData: "Dati paziente",
    generated: "Generato il",
    age: "Età",
    allValues: "Tutti i valori PSA",
    verdict: "Esito",
    date: "Data",
    value: "Valore",
    attachment: "Allegato",
    onboarded: "Profilo completato",
    years: "anni",
    fileSelected: "File selezionato",
    removeFile: "Rimuovi",
    savedOk: "Salvato con successo",
    metastatic: "Paziente metastatico o PSA iniziale > 50 ng/ml",
    metastaticDesc: "Seleziona se il paziente era metastatico alla diagnosi o aveva un PSA iniziale superiore a 50 ng/ml",
    excludedTitle: "Gestione oncologica dedicata",
    excludedDesc: "I pazienti metastatici o con PSA iniziale molto elevato richiedono una gestione oncologica personalizzata.",
  },
  en: {
    appName: "PSA Triage",
    subtitle: "Clinical assistant",
    login: "Log in",
    register: "Sign up",
    email: "Email",
    password: "Password",
    name: "Full name",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    logout: "Log out",
    dashboard: "Home",
    newEntry: "New PSA",
    history: "History",
    profile: "Profile",
    save: "Save",
    cancel: "Cancel",
    next: "Continue",
    back: "Back",
    welcomeTitle: "Set up your clinical profile",
    welcomeDesc: "This information is used to calculate the correct PSA threshold for your specific case.",
    diagnosisDate: "Prostate cancer diagnosis date",
    prostatectomy: "Prostatectomy",
    prostatectomyDesc: "Surgical removal of the prostate",
    radiotherapy: "Radiotherapy",
    radiotherapyDesc: "Definitive or adjuvant/salvage radiotherapy",
    hormonalTherapy: "Ongoing hormonal therapy",
    hormonalDesc: "Androgen deprivation therapy (ADT) currently active",
    surgeryDate: "Surgery date",
    rtDate: "Radiotherapy date",
    rtType: "Radiotherapy type",
    rtDefinitive: "Definitive",
    rtAdjuvant: "Adjuvant/Salvage",
    hormonalStart: "Hormonal therapy start date",
    nadirPsa: "PSA nadir post-radiotherapy (ng/ml)",
    nadirHelp: "The lowest PSA value reached after radiotherapy",
    gleasonScore: "Gleason Score",
    gleasonHelp: "Optional — found in your pathology report",
    stage: "TNM Stage",
    stageHelp: "Optional — found in your discharge letter",
    doctorName: "Referring physician",
    doctorPhone: "Doctor's phone",
    doctorHelp: "Useful in case of PSA alarm",
    psaValue: "PSA value (ng/ml)",
    psaDate: "Sample date",
    attachReport: "Attach report",
    attachHelp: "Photo or scan of report (optional)",
    evaluate: "Evaluate PSA",
    resultOk: "PSA within range",
    resultOkDesc: "No immediate action required.",
    resultNotify: "Doctor notification advised",
    resultNotifyDesc: "Follow-up visit at doctor's discretion.",
    resultAlarm: "Contact your doctor",
    resultAlarmDesc: "Contact your oncologist as soon as possible.",
    profileLabel: "Clinical profile",
    thresholdLabel: "Applied threshold",
    psaMeasured: "Measured PSA",
    reason: "Rationale",
    newEvaluation: "New evaluation",
    printReport: "Print report",
    noEntries: "No PSA values recorded",
    noEntriesDesc: "Enter your first PSA value to start monitoring.",
    addFirst: "Add first PSA",
    lastCheck: "Last check",
    nextCheck: "Next check",
    nextCheckHelp: "Set a reminder for your next blood test",
    nextCheckDate: "Next check date",
    trend: "PSA Trend",
    entries: "measurements",
    threshold: "Threshold",
    disclaimer: "Demonstration tool. Does not replace medical advice.",
    disclaimerLong: "This is a demonstration prototype. It does not constitute a diagnosis nor replaces the doctor's judgment. If in doubt, always contact your oncologist.",
    psaHistory: "PSA Trend",
    clinicalDetails: "Clinical details",
    treatments: "Treatments",
    noTreatments: "No treatments",
    yes: "Yes",
    no: "No",
    editProfile: "Edit profile",
    language: "Language",
    reminder: "Reminder",
    report: "Report",
    reportTitle: "PSA Monitoring Report",
    patientData: "Patient data",
    generated: "Generated on",
    age: "Age",
    allValues: "All PSA values",
    verdict: "Verdict",
    date: "Date",
    value: "Value",
    attachment: "Attachment",
    onboarded: "Profile complete",
    years: "years",
    fileSelected: "File selected",
    removeFile: "Remove",
    savedOk: "Saved successfully",
    metastatic: "Metastatic patient or initial PSA > 50 ng/ml",
    metastaticDesc: "Select if the patient was metastatic at diagnosis or had initial PSA above 50 ng/ml",
    excludedTitle: "Dedicated oncological management",
    excludedDesc: "Metastatic patients or those with very high initial PSA require personalized oncological management.",
  }
};

// ─── Triage Logic ───
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
  if (!s && !r && h) return "hormonal-only";
  return "unknown";
}

function evaluatePsa(psa, profile, allEntries, lang) {
  const type = getProfileType(profile);
  const t = T[lang];
  const profileLabels = {
    healthy: lang === "it" ? "Nessuna terapia" : "No treatment",
    "surgery-only": lang === "it" ? "Prostatectomia" : "Prostatectomy",
    "rt-only": lang === "it" ? "Radioterapia definitiva" : "Definitive radiotherapy",
    "surgery-rt": lang === "it" ? "Prostatectomia + Radioterapia" : "Prostatectomy + Radiotherapy",
    "surgery-hormonal": lang === "it" ? "Prostatectomia + Ormonale" : "Prostatectomy + Hormonal",
    "rt-hormonal": lang === "it" ? "Radioterapia + Ormonale" : "Radiotherapy + Hormonal",
    "surgery-rt-hormonal": lang === "it" ? "Prostatectomia + RT + Ormonale" : "Prostatectomy + RT + Hormonal",
    "hormonal-only": lang === "it" ? "Solo terapia ormonale" : "Hormonal therapy only",
  };

  if (type === "excluded" || type === "unknown" || type === "hormonal-only") {
    return { verdict: "excluded", profile: profileLabels[type] || type, threshold: "-", reason: t.excludedDesc };
  }

  let verdict, reason, threshold;
  const nadirVal = parseFloat(profile.nadirValue) || 0;

  const thresholds = {
    healthy: { val: 4, label: "PSA < 4 ng/ml" },
    "surgery-only": { val: 0.2, label: "PSA < 0,2 ng/ml" },
    "rt-only": { val: nadirVal + 2, label: `PSA < nadir + 2 = ${(nadirVal + 2).toFixed(2)} ng/ml` },
    "surgery-rt": { val: 0.2, label: lang === "it" ? "PSA < 0,2 ng/ml (ideale < 0,08)" : "PSA < 0.2 ng/ml (ideal < 0.08)" },
    "surgery-hormonal": { val: 0.08, label: "PSA < 0,08 ng/ml" },
    "rt-hormonal": { val: 0.08, label: lang === "it" ? "PSA < 0,08 ng/ml oppure < ultimo PSA" : "PSA < 0.08 ng/ml or < last PSA" },
    "surgery-rt-hormonal": { val: 0.08, label: "PSA < 0,08 ng/ml" },
  };

  const th = thresholds[type];
  threshold = th.label;

  if (type === "rt-hormonal") {
    const sorted = [...allEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
    const lastPsa = sorted.length > 0 ? sorted[sorted.length - 1].value : null;
    if (psa < 0.08) {
      verdict = "ok";
      reason = lang === "it" ? `${psa} ng/ml è inferiore alla soglia di 0,08 ng/ml.` : `${psa} ng/ml is below the 0.08 ng/ml threshold.`;
    } else if (lastPsa !== null && psa < lastPsa) {
      verdict = "ok";
      reason = lang === "it" ? `${psa} ng/ml supera 0,08 ma è inferiore all'ultimo PSA (${lastPsa}): trend in discesa.` : `${psa} ng/ml exceeds 0.08 but is below the last PSA (${lastPsa}): downward trend.`;
    } else {
      verdict = "alarm";
      reason = lang === "it" ? `${psa} ng/ml supera la soglia di 0,08 ng/ml${lastPsa ? ` e l'ultimo PSA (${lastPsa})` : ""}.` : `${psa} ng/ml exceeds the 0.08 ng/ml threshold${lastPsa ? ` and the last PSA (${lastPsa})` : ""}.`;
    }
  } else if (type === "healthy") {
    if (psa >= 4) {
      verdict = "alarm";
      reason = lang === "it" ? `${psa} ng/ml supera la soglia di 4 ng/ml.` : `${psa} ng/ml exceeds the 4 ng/ml threshold.`;
    } else {
      const sorted = [...allEntries].sort((a, b) => new Date(a.date) - new Date(b.date));
      const last2 = sorted.slice(-2);
      if (last2.length === 2 && last2[0].value < last2[1].value && last2[1].value < psa) {
        verdict = "notify";
        reason = lang === "it"
          ? `${psa} ng/ml è sotto soglia, ma è il terzo dosaggio consecutivo in aumento (${last2[0].value} → ${last2[1].value} → ${psa}).`
          : `${psa} ng/ml is below threshold, but it's the third consecutive increase (${last2[0].value} → ${last2[1].value} → ${psa}).`;
      } else {
        verdict = "ok";
        reason = lang === "it" ? `${psa} ng/ml è sotto la soglia di 4 ng/ml. Nessun pattern di incrementi consecutivi.` : `${psa} ng/ml is below the 4 ng/ml threshold. No consecutive increase pattern.`;
      }
    }
  } else {
    if (psa < th.val) {
      verdict = "ok";
      reason = lang === "it" ? `${psa} ng/ml è inferiore alla soglia di ${th.val.toFixed(2)} ng/ml.` : `${psa} ng/ml is below the ${th.val.toFixed(2)} ng/ml threshold.`;
    } else {
      verdict = "alarm";
      reason = lang === "it" ? `${psa} ng/ml supera la soglia di ${th.val.toFixed(2)} ng/ml.` : `${psa} ng/ml exceeds the ${th.val.toFixed(2)} ng/ml threshold.`;
    }
  }

  return { verdict, profile: profileLabels[type], threshold, psa, reason };
}

// ─── Storage (localStorage) ───
function load(key) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
}
function save(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    return true;
  } catch { return false; }
}

// ─── Components ───
const Input = ({ label, help, type = "text", ...props }) => (
  <label className="block">
    <span className="text-sm font-medium text-slate-700">{label}</span>
    {help && <span className="block text-xs text-slate-500 mt-0.5">{help}</span>}
    <input type={type} {...props} className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-base focus:border-teal-500 focus:outline-none bg-white" />
  </label>
);

const Toggle = ({ label, desc, checked, onChange }) => (
  <button onClick={() => onChange(!checked)} className={`w-full text-left border-2 rounded-xl p-4 transition ${checked ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${checked ? "border-teal-600 bg-teal-600" : "border-slate-300"}`}>
        {checked && <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />}
      </div>
      <div>
        <div className="font-semibold text-slate-900 text-sm">{label}</div>
        {desc && <div className="text-xs text-slate-600">{desc}</div>}
      </div>
    </div>
  </button>
);

const Btn = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "font-semibold py-3 px-5 rounded-xl transition flex items-center justify-center gap-2 text-sm";
  const v = { primary: "bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 disabled:cursor-not-allowed", secondary: "bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-900", danger: "bg-rose-600 hover:bg-rose-700 text-white", ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100" };
  return <button className={`${base} ${v[variant]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = "" }) => <div className={`bg-white border border-slate-200 rounded-2xl p-5 ${className}`}>{children}</div>;

const VerdictBadge = ({ verdict, t, small }) => {
  const cfg = {
    ok: { bg: "bg-emerald-100", text: "text-emerald-800", label: small ? "OK" : t.resultOk, icon: CheckCircle2 },
    notify: { bg: "bg-amber-100", text: "text-amber-800", label: small ? (t === T.it ? "Notifica" : "Notify") : t.resultNotify, icon: Bell },
    alarm: { bg: "bg-rose-100", text: "text-rose-800", label: small ? (t === T.it ? "Allarme" : "Alarm") : t.resultAlarm, icon: PhoneCall },
    excluded: { bg: "bg-slate-100", text: "text-slate-600", label: small ? "N/A" : t.excludedTitle, icon: Stethoscope },
  };
  const c = cfg[verdict] || cfg.ok;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${c.bg} ${c.text}`}>
      <Icon className="w-3.5 h-3.5" />
      {c.label}
    </span>
  );
};

function getThresholdVal(profile) {
  const type = getProfileType(profile);
  const nadirVal = parseFloat(profile?.nadirValue) || 0;
  const thresholds = { healthy: 4, "surgery-only": 0.2, "rt-only": nadirVal + 2, "surgery-rt": 0.2, "surgery-hormonal": 0.08, "rt-hormonal": 0.08, "surgery-rt-hormonal": 0.08 };
  return thresholds[type] || null;
}

// ─── Main App ───
export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("it");
  const [page, setPage] = useState("auth");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [entries, setEntries] = useState([]);
  const [reminder, setReminder] = useState("");
  const [toast, setToast] = useState(null);

  const [authEmail, setAuthEmail] = useState("");
  const [authPass, setAuthPass] = useState("");
  const [authName, setAuthName] = useState("");

  const [pf, setPf] = useState({ diagnosisDate: "", surgery: false, surgeryDate: "", radiotherapy: false, rtDate: "", rtType: "definitive", hormonal: false, hormonalStart: "", nadirValue: "", gleason: "", stage: "", doctorName: "", doctorPhone: "", metastatic: false });

  const [newPsa, setNewPsa] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [newFile, setNewFile] = useState(null);
  const [entryResult, setEntryResult] = useState(null);

  const [showReport, setShowReport] = useState(false);

  const t = T[lang];

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  useEffect(() => {
    const l = load("psa-lang");
    if (l) setLang(l);
    const u = load("psa-user");
    if (u) {
      setUser(u);
      const p = load("psa-profile");
      const e = load("psa-entries");
      const r = load("psa-reminder");
      if (p) { setProfile(p); setPf(p); }
      if (e) setEntries(e);
      if (r) setReminder(r);
      setPage(p ? "dashboard" : "onboarding");
    }
    setLoading(false);
  }, []);

  const doRegister = () => {
    const u = { email: authEmail, name: authName };
    save("psa-user", u);
    save("psa-pass", authPass);
    setUser(u);
    setPage("onboarding");
  };

  const doLogin = () => {
    const u = load("psa-user");
    const savedPass = load("psa-pass");
    if (u && u.email === authEmail && savedPass === authPass) {
      setUser(u);
      const p = load("psa-profile");
      const e = load("psa-entries");
      const r = load("psa-reminder");
      if (p) { setProfile(p); setPf(p); }
      if (e) setEntries(e);
      if (r) setReminder(r);
      setPage(p ? "dashboard" : "onboarding");
    } else {
      showToast(lang === "it" ? "Credenziali non valide" : "Invalid credentials");
    }
  };

  const doLogout = () => {
    setUser(null); setProfile(null); setEntries([]); setPage("auth"); setAuthMode("login");
    setAuthEmail(""); setAuthPass(""); setAuthName("");
  };

  const saveProfile = () => {
    save("psa-profile", pf);
    setProfile(pf);
    showToast(t.savedOk);
    setPage("dashboard");
  };

  const saveEntry = () => {
    const val = parseFloat(newPsa);
    const result = evaluatePsa(val, profile, entries, lang);
    const entry = { id: Date.now(), value: val, date: newDate, fileName: newFile?.name || null, verdict: result.verdict, reason: result.reason, threshold: result.threshold, profileLabel: result.profile };
    const updated = [...entries, entry];
    setEntries(updated);
    save("psa-entries", updated);
    setEntryResult({ ...result, psa: val });
    setNewPsa(""); setNewFile(null);
  };

  const saveReminderFn = (d) => { setReminder(d); save("psa-reminder", d); showToast(t.savedOk); };

  const toggleLang = () => { const nl = lang === "it" ? "en" : "it"; setLang(nl); save("psa-lang", nl); };

  const sortedEntries = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
  const lastEntry = sortedEntries.length > 0 ? sortedEntries[sortedEntries.length - 1] : null;
  const profileType = getProfileType(profile);
  const thresholdVal = getThresholdVal(profile);

  const chartData = sortedEntries.map(e => ({ date: new Date(e.date).toLocaleDateString(lang === "it" ? "it-IT" : "en-US", { month: "short", year: "2-digit" }), psa: e.value, fullDate: e.date }));

  // ─── Print Report ───
  if (showReport) {
    return (
      <div className="bg-white min-h-screen p-8 max-w-3xl mx-auto font-sans text-sm print:p-4">
        <style>{`@media print { .no-print { display: none !important; } }`}</style>
        <div className="no-print flex justify-between items-center mb-6">
          <Btn variant="ghost" onClick={() => setShowReport(false)}><ArrowLeft className="w-4 h-4" />{t.back}</Btn>
          <Btn onClick={() => window.print()}><Printer className="w-4 h-4" />{t.printReport}</Btn>
        </div>
        <div className="flex items-center gap-3 mb-6 border-b border-slate-200 pb-4">
          <HeartPulse className="w-8 h-8 text-teal-600" />
          <div>
            <div className="text-xl font-bold text-slate-900">{t.reportTitle}</div>
            <div className="text-xs text-slate-500">{t.generated} {new Date().toLocaleDateString(lang === "it" ? "it-IT" : "en-US", { day: "numeric", month: "long", year: "numeric" })}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">{t.patientData}</div>
            <div className="font-semibold">{user?.name}</div>
            <div className="text-slate-600">{t.diagnosisDate}: {profile?.diagnosisDate || "-"}</div>
            {profile?.gleason && <div className="text-slate-600">Gleason: {profile.gleason}</div>}
            {profile?.stage && <div className="text-slate-600">{t.stage}: {profile.stage}</div>}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">{t.treatments}</div>
            {profile?.surgery && <div className="text-slate-600">{t.prostatectomy}: {profile.surgeryDate || "-"}</div>}
            {profile?.radiotherapy && <div className="text-slate-600">{t.radiotherapy} ({profile.rtType === "definitive" ? t.rtDefinitive : t.rtAdjuvant}): {profile.rtDate || "-"}</div>}
            {profile?.hormonal && <div className="text-slate-600">{t.hormonalTherapy}: {profile.hormonalStart || "-"}</div>}
            {!profile?.surgery && !profile?.radiotherapy && !profile?.hormonal && <div className="text-slate-500">{t.noTreatments}</div>}
            {profile?.doctorName && <div className="text-slate-600 mt-2">{t.doctorName}: {profile.doctorName} {profile.doctorPhone ? `(${profile.doctorPhone})` : ""}</div>}
          </div>
        </div>
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase mb-2">{t.allValues}</div>
          <table className="w-full text-xs">
            <thead><tr className="bg-slate-50"><th className="text-left p-2 font-semibold">{t.date}</th><th className="text-left p-2 font-semibold">PSA (ng/ml)</th><th className="text-left p-2 font-semibold">{t.verdict}</th><th className="text-left p-2 font-semibold">{t.reason}</th></tr></thead>
            <tbody>
              {sortedEntries.map((e, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="p-2">{new Date(e.date).toLocaleDateString(lang === "it" ? "it-IT" : "en-US")}</td>
                  <td className="p-2 font-semibold">{e.value}</td>
                  <td className="p-2"><VerdictBadge verdict={e.verdict} t={t} small /></td>
                  <td className="p-2 text-slate-600">{e.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-xs text-slate-400 border-t border-slate-200 pt-3 flex items-center gap-2"><Shield className="w-3 h-3" />{t.disclaimer}</div>
      </div>
    );
  }

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-pulse flex items-center gap-2 text-slate-500"><HeartPulse className="w-5 h-5" />Loading...</div></div>;

  // ─── Auth ───
  if (page === "auth") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600"><HeartPulse className="w-7 h-7 text-white" /></div>
            <div className="text-2xl font-bold text-slate-900">{t.appName}</div>
            <div className="text-slate-500 text-sm">{t.subtitle}</div>
          </div>
          <Card>
            <div className="space-y-4">
              {authMode === "register" && <Input label={t.name} value={authName} onChange={e => setAuthName(e.target.value)} placeholder="Mario Rossi" />}
              <Input label={t.email} type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="mario@email.com" />
              <Input label={t.password} type="password" value={authPass} onChange={e => setAuthPass(e.target.value)} placeholder="••••••••" />
              <Btn className="w-full" onClick={authMode === "register" ? doRegister : doLogin} disabled={!authEmail || !authPass || (authMode === "register" && !authName)}>
                {authMode === "register" ? t.register : t.login}<ArrowRight className="w-4 h-4" />
              </Btn>
              <button onClick={() => setAuthMode(authMode === "login" ? "register" : "login")} className="w-full text-center text-sm text-teal-600 hover:text-teal-700">
                {authMode === "login" ? t.noAccount : t.hasAccount}
              </button>
            </div>
          </Card>
          <button onClick={toggleLang} className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-700"><Globe className="w-3.5 h-3.5" />{lang === "it" ? "English" : "Italiano"}</button>
        </div>
      </div>
    );
  }

  // ─── Onboarding ───
  if (page === "onboarding") {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-lg mx-auto space-y-6">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-slate-900">{t.welcomeTitle}</div>
            <div className="text-slate-600 text-sm">{t.welcomeDesc}</div>
          </div>
          <Card className="space-y-4">
            <Input label={t.diagnosisDate} type="date" value={pf.diagnosisDate} onChange={e => setPf({ ...pf, diagnosisDate: e.target.value })} />
            <Toggle label={t.metastatic} desc={t.metastaticDesc} checked={pf.metastatic} onChange={v => setPf({ ...pf, metastatic: v })} />
            {!pf.metastatic && <>
              <div className="border-t border-slate-100 pt-3 space-y-3">
                <div className="text-xs font-semibold text-slate-500 uppercase">{t.treatments}</div>
                <Toggle label={t.prostatectomy} desc={t.prostatectomyDesc} checked={pf.surgery} onChange={v => setPf({ ...pf, surgery: v })} />
                {pf.surgery && <Input label={t.surgeryDate} type="date" value={pf.surgeryDate} onChange={e => setPf({ ...pf, surgeryDate: e.target.value })} />}
                <Toggle label={t.radiotherapy} desc={t.radiotherapyDesc} checked={pf.radiotherapy} onChange={v => setPf({ ...pf, radiotherapy: v })} />
                {pf.radiotherapy && (
                  <div className="space-y-3 pl-2 border-l-2 border-teal-200">
                    <Input label={t.rtDate} type="date" value={pf.rtDate} onChange={e => setPf({ ...pf, rtDate: e.target.value })} />
                    <div>
                      <span className="text-sm font-medium text-slate-700">{t.rtType}</span>
                      <div className="flex gap-2 mt-1">
                        {["definitive", "adjuvant"].map(v => (
                          <button key={v} onClick={() => setPf({ ...pf, rtType: v })} className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition ${pf.rtType === v ? "border-teal-500 bg-teal-50 text-teal-800" : "border-slate-200 text-slate-600"}`}>
                            {v === "definitive" ? t.rtDefinitive : t.rtAdjuvant}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Input label={t.nadirPsa} help={t.nadirHelp} type="number" step="0.01" value={pf.nadirValue} onChange={e => setPf({ ...pf, nadirValue: e.target.value })} placeholder="0.15" />
                  </div>
                )}
                <Toggle label={t.hormonalTherapy} desc={t.hormonalDesc} checked={pf.hormonal} onChange={v => setPf({ ...pf, hormonal: v })} />
                {pf.hormonal && <Input label={t.hormonalStart} type="date" value={pf.hormonalStart} onChange={e => setPf({ ...pf, hormonalStart: e.target.value })} />}
              </div>
              <div className="border-t border-slate-100 pt-3 space-y-3">
                <div className="text-xs font-semibold text-slate-500 uppercase">{t.clinicalDetails}</div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t.gleasonScore} help={t.gleasonHelp} value={pf.gleason} onChange={e => setPf({ ...pf, gleason: e.target.value })} placeholder="3+4" />
                  <Input label={t.stage} help={t.stageHelp} value={pf.stage} onChange={e => setPf({ ...pf, stage: e.target.value })} placeholder="T2N0M0" />
                </div>
              </div>
            </>}
            <div className="border-t border-slate-100 pt-3 space-y-3">
              <div className="text-xs font-semibold text-slate-500 uppercase">{t.doctorName}</div>
              <div className="grid grid-cols-2 gap-3">
                <Input label={t.doctorName} value={pf.doctorName} onChange={e => setPf({ ...pf, doctorName: e.target.value })} placeholder="Dr. Bianchi" />
                <Input label={t.doctorPhone} help={t.doctorHelp} value={pf.doctorPhone} onChange={e => setPf({ ...pf, doctorPhone: e.target.value })} placeholder="+39 02 1234567" />
              </div>
            </div>
          </Card>
          <Btn className="w-full" onClick={saveProfile}>{t.save}<ArrowRight className="w-4 h-4" /></Btn>
          <div className="text-xs text-slate-500 text-center flex items-center justify-center gap-1"><Shield className="w-3 h-3" />{t.disclaimer}</div>
        </div>
      </div>
    );
  }

  // ─── Main App Shell ───
  const nav = [
    { id: "dashboard", icon: Activity, label: t.dashboard },
    { id: "new-entry", icon: Plus, label: t.newEntry },
    { id: "history", icon: BarChart3, label: t.history },
    { id: "profile", icon: User, label: t.profile },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" />{toast}</div>}

      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center"><HeartPulse className="w-4 h-4 text-white" /></div>
            <span className="font-semibold text-slate-900 text-sm">{t.appName}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{lang === "it" ? "EN" : "IT"}</button>
            <button onClick={doLogout} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"><LogOut className="w-3.5 h-3.5" />{t.logout}</button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-5 pb-24">
        {/* ─── Dashboard ─── */}
        {page === "dashboard" && (
          <div className="space-y-4">
            <div className="text-lg font-bold text-slate-900">{lang === "it" ? `Ciao, ${user?.name?.split(" ")[0]}` : `Hi, ${user?.name?.split(" ")[0]}`}</div>

            {profileType === "excluded" ? (
              <Card className="bg-amber-50 border-amber-200">
                <div className="flex gap-3">
                  <Stethoscope className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div><div className="font-semibold text-amber-900">{t.excludedTitle}</div><p className="text-sm text-amber-800 mt-1">{t.excludedDesc}</p></div>
                </div>
              </Card>
            ) : lastEntry ? (
              <Card>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase">{t.lastCheck}</div>
                  <VerdictBadge verdict={lastEntry.verdict} t={t} small />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900">{lastEntry.value}</span>
                  <span className="text-slate-500 text-sm">ng/ml</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">{new Date(lastEntry.date).toLocaleDateString(lang === "it" ? "it-IT" : "en-US", { day: "numeric", month: "long", year: "numeric" })}</div>
                <div className="text-sm text-slate-600 mt-2">{lastEntry.reason}</div>
              </Card>
            ) : (
              <Card className="text-center py-8">
                <Activity className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <div className="font-semibold text-slate-900">{t.noEntries}</div>
                <div className="text-sm text-slate-500 mt-1">{t.noEntriesDesc}</div>
                <Btn className="mx-auto mt-4" onClick={() => { setEntryResult(null); setPage("new-entry"); }}><Plus className="w-4 h-4" />{t.addFirst}</Btn>
              </Card>
            )}

            {sortedEntries.length >= 2 && (
              <Card>
                <div className="text-xs font-semibold text-slate-500 uppercase mb-3">{t.psaHistory}</div>
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs><linearGradient id="psaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} /><stop offset="95%" stopColor="#0d9488" stopOpacity={0} /></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={["dataMin - 0.1", "auto"]} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
                      {thresholdVal && <ReferenceLine y={thresholdVal} stroke="#ef4444" strokeDasharray="6 3" label={{ value: t.threshold, position: "right", fontSize: 10, fill: "#ef4444" }} />}
                      <Area type="monotone" dataKey="psa" stroke="#0d9488" strokeWidth={2.5} fill="url(#psaGrad)" dot={{ r: 4, fill: "#0d9488", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {reminder && (
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"><Calendar className="w-5 h-5 text-blue-600" /></div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-500 uppercase">{t.nextCheck}</div>
                    <div className="font-semibold text-slate-900">{new Date(reminder).toLocaleDateString(lang === "it" ? "it-IT" : "en-US", { day: "numeric", month: "long", year: "numeric" })}</div>
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="text-xs font-semibold text-slate-500 uppercase mb-3">{t.reminder}</div>
              <div className="flex gap-2">
                <input type="date" value={reminder} onChange={e => saveReminderFn(e.target.value)} className="flex-1 rounded-xl border-2 border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none" />
              </div>
              <div className="text-xs text-slate-500 mt-2">{t.nextCheckHelp}</div>
            </Card>

            {entries.length > 0 && (
              <Btn variant="secondary" className="w-full" onClick={() => setShowReport(true)}><FileText className="w-4 h-4" />{t.printReport}</Btn>
            )}
          </div>
        )}

        {/* ─── New Entry ─── */}
        {page === "new-entry" && !entryResult && (
          <div className="space-y-5">
            <div className="text-lg font-bold text-slate-900">{t.newEntry}</div>
            {profileType === "excluded" ? (
              <Card className="bg-amber-50 border-amber-200 text-center py-6">
                <Stethoscope className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="font-semibold text-amber-900">{t.excludedTitle}</div>
                <p className="text-sm text-amber-800 mt-1">{t.excludedDesc}</p>
              </Card>
            ) : (
              <Card className="space-y-4">
                <Input label={t.psaValue} type="number" step="0.001" min="0" value={newPsa} onChange={e => setNewPsa(e.target.value)} placeholder="0.08" />
                <Input label={t.psaDate} type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                <div>
                  <span className="text-sm font-medium text-slate-700">{t.attachReport}</span>
                  <span className="block text-xs text-slate-500 mt-0.5">{t.attachHelp}</span>
                  {newFile ? (
                    <div className="mt-2 flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3">
                      <Paperclip className="w-4 h-4 text-teal-600" />
                      <span className="text-sm text-teal-800 flex-1 truncate">{newFile.name}</span>
                      <button onClick={() => setNewFile(null)} className="text-teal-600 hover:text-teal-800"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <label className="mt-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 rounded-xl py-4 cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition">
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-sm text-slate-500">{t.attachReport}</span>
                      <input type="file" accept="image/*,.pdf" className="hidden" onChange={e => setNewFile(e.target.files?.[0] || null)} />
                    </label>
                  )}
                </div>
                <Btn className="w-full" onClick={saveEntry} disabled={!newPsa || parseFloat(newPsa) < 0}>{t.evaluate}<ArrowRight className="w-4 h-4" /></Btn>
              </Card>
            )}
          </div>
        )}

        {page === "new-entry" && entryResult && (
          <div className="space-y-5">
            {(() => {
              const styles = {
                ok: { bg: "bg-emerald-50", border: "border-emerald-300", iconBg: "bg-emerald-500", icon: CheckCircle2, title: t.resultOk, desc: t.resultOkDesc },
                notify: { bg: "bg-amber-50", border: "border-amber-300", iconBg: "bg-amber-500", icon: Bell, title: t.resultNotify, desc: t.resultNotifyDesc },
                alarm: { bg: "bg-rose-50", border: "border-rose-300", iconBg: "bg-rose-500", icon: PhoneCall, title: t.resultAlarm, desc: t.resultAlarmDesc },
              };
              const s = styles[entryResult.verdict] || styles.ok;
              const Icon = s.icon;
              return (
                <div className={`${s.bg} ${s.border} border-2 rounded-2xl p-5`}>
                  <div className="flex items-start gap-3">
                    <div className={`${s.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`}><Icon className="w-6 h-6 text-white" /></div>
                    <div className="flex-1 space-y-1">
                      <div className="text-xl font-bold text-slate-900">{s.title}</div>
                      <div className="text-slate-700 text-sm">{s.desc}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
            <Card>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between"><dt className="text-slate-600">{t.profileLabel}</dt><dd className="font-semibold text-right">{entryResult.profile}</dd></div>
                <div className="flex justify-between border-t border-slate-100 pt-2.5"><dt className="text-slate-600">{t.thresholdLabel}</dt><dd className="font-semibold text-right">{entryResult.threshold}</dd></div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-2.5"><dt className="text-slate-600">{t.psaMeasured}</dt><dd className="text-2xl font-bold">{entryResult.psa} <span className="text-sm font-normal text-slate-500">ng/ml</span></dd></div>
                <div className="border-t border-slate-100 pt-2.5"><dt className="text-slate-600 mb-1">{t.reason}</dt><dd className="text-slate-800">{entryResult.reason}</dd></div>
              </dl>
            </Card>
            {entryResult.verdict === "alarm" && profile?.doctorPhone && (
              <a href={`tel:${profile.doctorPhone}`} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition">
                <PhoneCall className="w-5 h-5" />
                {lang === "it" ? `Chiama ${profile.doctorName || "il medico"}` : `Call ${profile.doctorName || "your doctor"}`}
              </a>
            )}
            <div className="flex gap-3">
              <Btn variant="secondary" className="flex-1" onClick={() => { setEntryResult(null); setNewPsa(""); setNewDate(new Date().toISOString().split("T")[0]); }}><RotateCcw className="w-4 h-4" />{t.newEvaluation}</Btn>
              <Btn className="flex-1" onClick={() => { setEntryResult(null); setPage("dashboard"); }}>{t.dashboard}<ArrowRight className="w-4 h-4" /></Btn>
            </div>
            <div className="bg-slate-100 rounded-xl p-3 text-xs text-slate-600 flex gap-2"><AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />{t.disclaimerLong}</div>
          </div>
        )}

        {/* ─── History ─── */}
        {page === "history" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-slate-900">{t.psaHistory}</div>
              <span className="text-xs text-slate-500">{entries.length} {t.entries}</span>
            </div>
            {sortedEntries.length >= 2 && (
              <Card>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs><linearGradient id="psaGrad2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} /><stop offset="95%" stopColor="#0d9488" stopOpacity={0} /></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={["dataMin - 0.1", "auto"]} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
                      {thresholdVal && <ReferenceLine y={thresholdVal} stroke="#ef4444" strokeDasharray="6 3" label={{ value: t.threshold, position: "right", fontSize: 10, fill: "#ef4444" }} />}
                      <Area type="monotone" dataKey="psa" stroke="#0d9488" strokeWidth={2.5} fill="url(#psaGrad2)" dot={{ r: 4, fill: "#0d9488", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
            {sortedEntries.length === 0 ? (
              <Card className="text-center py-8">
                <BarChart3 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <div className="font-semibold text-slate-900">{t.noEntries}</div>
                <div className="text-sm text-slate-500 mt-1">{t.noEntriesDesc}</div>
              </Card>
            ) : (
              <div className="space-y-2">
                {[...sortedEntries].reverse().map((e, i) => (
                  <Card key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500">{new Date(e.date).toLocaleDateString(lang === "it" ? "it-IT" : "en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <VerdictBadge verdict={e.verdict} t={t} small />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-900">{e.value}</span>
                      <span className="text-xs text-slate-500">ng/ml</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-1">{e.reason}</div>
                    {e.fileName && <div className="text-xs text-teal-600 mt-1 flex items-center gap-1"><Paperclip className="w-3 h-3" />{e.fileName}</div>}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── Profile ─── */}
        {page === "profile" && (
          <div className="space-y-4">
            <div className="text-lg font-bold text-slate-900">{t.profile}</div>
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center"><User className="w-6 h-6 text-teal-700" /></div>
                <div>
                  <div className="font-semibold text-slate-900">{user?.name}</div>
                  <div className="text-sm text-slate-500">{user?.email}</div>
                </div>
              </div>
              <div className="space-y-2.5 text-sm border-t border-slate-100 pt-3">
                <div className="flex justify-between"><span className="text-slate-600">{t.diagnosisDate}</span><span className="font-semibold">{profile?.diagnosisDate || "-"}</span></div>
                {profile?.gleason && <div className="flex justify-between"><span className="text-slate-600">Gleason</span><span className="font-semibold">{profile.gleason}</span></div>}
                {profile?.stage && <div className="flex justify-between"><span className="text-slate-600">{t.stage}</span><span className="font-semibold">{profile.stage}</span></div>}
              </div>
            </Card>
            <Card>
              <div className="text-xs font-semibold text-slate-500 uppercase mb-3">{t.treatments}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">{t.prostatectomy}</span><span className="font-semibold">{profile?.surgery ? `${t.yes}${profile.surgeryDate ? ` (${profile.surgeryDate})` : ""}` : t.no}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">{t.radiotherapy}</span><span className="font-semibold">{profile?.radiotherapy ? `${t.yes} — ${profile.rtType === "definitive" ? t.rtDefinitive : t.rtAdjuvant}` : t.no}</span></div>
                {profile?.radiotherapy && profile?.nadirValue && <div className="flex justify-between"><span className="text-slate-600">{t.nadirPsa}</span><span className="font-semibold">{profile.nadirValue} ng/ml</span></div>}
                <div className="flex justify-between"><span className="text-slate-600">{t.hormonalTherapy}</span><span className="font-semibold">{profile?.hormonal ? `${t.yes}${profile.hormonalStart ? ` (${profile.hormonalStart})` : ""}` : t.no}</span></div>
              </div>
            </Card>
            {profile?.doctorName && (
              <Card>
                <div className="text-xs font-semibold text-slate-500 uppercase mb-2">{t.doctorName}</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Stethoscope className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{profile.doctorName}</div>
                    {profile.doctorPhone && <div className="text-sm text-slate-500">{profile.doctorPhone}</div>}
                  </div>
                </div>
              </Card>
            )}
            <Btn variant="secondary" className="w-full" onClick={() => setPage("onboarding")}><Settings className="w-4 h-4" />{t.editProfile}</Btn>
          </div>
        )}
      </main>

      {/* ─── Bottom Nav ─── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-10">
        <div className="max-w-2xl mx-auto flex">
          {nav.map(n => {
            const Icon = n.icon;
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => { if (n.id === "new-entry") setEntryResult(null); setPage(n.id); }} className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition ${active ? "text-teal-600" : "text-slate-400 hover:text-slate-600"}`}>
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{n.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="h-16" />
    </div>
  );
}
