

import { useState } from 'react'
import RadioGroup from '@/components/RadioGroup'
import SelectInput from '@/components/SelectInput'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'
import DispoTag from '@/components/DispoTag'
import BG from '../assets/salon.png'
import { useCreateContact } from '../api/contact'
import { Navbar } from '@/components/Navbar'
import { Home } from 'lucide-react'

const CIVILITE_OPTIONS = [
  { value: 'mme', label: 'Mme' },
  { value: 'm', label: 'M' },
]

const MOTIF_OPTIONS = [
  { value: 'visite', label: 'Demande de visite' },
  { value: 'rappel', label: 'Être rappelé·e' },
  { value: 'photos', label: 'Plus de photos' },
]

const JOURS = [
  { value: 'lundi', label: 'Lundi' },
  { value: 'mardi', label: 'Mardi' },
  { value: 'mercredi', label: 'Mercredi' },
  { value: 'jeudi', label: 'Jeudi' },
  { value: 'vendredi', label: 'Vendredi' },
  { value: 'samedi', label: 'Samedi' },
]

const HEURES = Array.from({ length: 13 }, (_, i) => {
  const h = i + 7
  return { value: String(h), label: `${h}h` }
})

const MINUTES = [
  { value: '0', label: '0m' },
  { value: '15', label: '15m' },
  { value: '30', label: '30m' },
  { value: '45', label: '45m' },
]

type Dispo = { id: number; label: string; jour: string; heure: string; minute: string }
type Errors = Partial<Record<'nom' | 'prenom' | 'email' | 'telephone', string>>

function formatDispo(jour: string, heure: string, minute: string) {
  const jourLabel = JOURS.find((j) => j.value === jour)?.label ?? jour
  return `${jourLabel} à ${heure}h${minute === '0' ? '' : minute}`
}

function validate(nom: string, prenom: string, email: string, telephone: string): Errors {
  const errors: Errors = {}
  if (!nom.trim()) errors.nom = 'Requis'
  if (!prenom.trim()) errors.prenom = 'Requis'
  if (!email.trim()) errors.email = 'Requis'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Email invalide'
  if (!telephone.trim()) errors.telephone = 'Requis'
  return errors
}

export default function ContactForm() {
  const [civilite, setCivilite] = useState('mme')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [motif, setMotif] = useState('visite')
  const [message, setMessage] = useState('')
  const [jour, setJour] = useState('lundi')
  const [heure, setHeure] = useState('7')
  const [minute, setMinute] = useState('0')
  const [dispos, setDispos] = useState<Dispo[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState(false)

  const { mutateAsync, isLoading } = useCreateContact()

  function handleAddDispo() {
    const label = formatDispo(jour, heure, minute)
    if (!dispos.find((d) => d.label === label)) {
      setDispos([...dispos, { id: Date.now(), label, jour, heure, minute }])
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(nom, prenom, email, telephone)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    try {
      await mutateAsync({
        civilite,
        nom: nom.trim(),
        prenom: prenom.trim(),
        email: email.trim(),
        telephone: telephone.trim(),
        motif,
        message: message.trim(),
        disponibilites: dispos.map(({ jour, heure, minute }) => ({ jour, heure, minute })),
      })
      setSuccess(true)
    } catch {
      alert("Erreur lors de l'envoi.")
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <>
        <Navbar />
        <div
          className="relative min-h-[calc(100vh-64px)] w-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${BG})` }}
        >
          <div className="absolute inset-0 bg-black/55" />

          {/* Purple side panel */}
          <div className="absolute left-0 top-0 bottom-0 w-[260px] bg-purple-900/75 backdrop-blur-sm hidden xl:flex flex-col justify-center px-8">
            <div className="flex items-center gap-2 mb-2">
              <Home className="h-6 w-6 text-amber-400" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-extrabold tracking-wide text-white uppercase leading-tight mb-2">
              Agence<br />Immobilière
            </h2>
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-5">
              Trouvez le bien qui vous ressemble
            </p>
            <div className="w-10 h-px bg-amber-400 mb-5" />
            <ul className="space-y-3 text-white/80 text-xs font-semibold uppercase tracking-widest">
              {['Achat', 'Vente', 'Location', 'Gestion'].map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-5 py-24 px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-400 text-white text-3xl flex items-center justify-center font-bold shadow-lg">
              ✓
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-wide uppercase">
              Message envoyé !
            </h2>
            <p className="text-white/75 text-sm">Nous vous recontacterons très prochainement.</p>
            <Button variant="primary" onClick={() => setSuccess(false)}>
              Nouveau message
            </Button>
          </div>
        </div>
      </>
    )
  }

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <div
        className="relative min-h-[calc(100vh-64px)] w-full bg-cover bg-center flex items-center justify-center p-6"
        style={{ backgroundImage: `url(${BG})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Purple side panel */}
        <div className="absolute left-0 top-0 bottom-0 w-[260px] bg-purple-900/75 backdrop-blur-sm hidden xl:flex flex-col justify-center px-8">
          <div className="flex items-center gap-2 mb-2">
            <Home className="h-6 w-6 text-amber-400" strokeWidth={2.5} />
          </div>
          <h2 className="text-xl font-extrabold tracking-wide text-white uppercase leading-tight mb-2">
            Agence<br />Immobilière
          </h2>
          <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-5">
            Trouvez le bien qui vous ressemble
          </p>
          <div className="w-10 h-px bg-amber-400 mb-5" />
          <ul className="space-y-3 text-white/80 text-xs font-semibold uppercase tracking-widest">
            {['Achat', 'Vente', 'Location', 'Gestion'].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Form card */}
        <div className="relative z-10 w-full max-w-5xl xl:ml-[280px] xl:mr-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-8 sm:p-10">

              {/* Card header */}
              <div className="mb-8">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400 mb-1 flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5" /> Kings of Sedari
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-white uppercase"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                  CONTACTEZ L'AGENCE
                </h1>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                  {/* Left — coordinates */}
                  <section className="flex flex-col gap-4">
                    <h2 className="text-[10px] font-bold tracking-[0.18em] text-white/60 uppercase border-b border-white/10 pb-2">
                      VOS COORDONNÉES
                    </h2>
                    <RadioGroup name="civilite" options={CIVILITE_OPTIONS} value={civilite} onChange={setCivilite} />
                    <div className="grid grid-cols-2 gap-3">
                      <TextInput placeholder="Nom" value={nom} onChange={setNom} error={errors.nom} />
                      <TextInput placeholder="Prénom" value={prenom} onChange={setPrenom} error={errors.prenom} />
                    </div>
                    <TextInput placeholder="Adresse mail" type="email" value={email} onChange={setEmail} error={errors.email} />
                    <TextInput placeholder="Téléphone" type="tel" value={telephone} onChange={setTelephone} error={errors.telephone} />
                  </section>

                  {/* Right — message */}
                  <section className="flex flex-col gap-4">
                    <h2 className="text-[10px] font-bold tracking-[0.18em] text-white/60 uppercase border-b border-white/10 pb-2">
                      VOTRE MESSAGE
                    </h2>
                    <RadioGroup name="motif" options={MOTIF_OPTIONS} value={motif} onChange={setMotif} />
                    <textarea
                      placeholder="Votre message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      className="w-full rounded-2xl px-5 py-4 text-sm text-gray-800 bg-white placeholder-gray-400 resize-none outline-none flex-1 focus:ring-2 focus:ring-amber-400/40"
                    />
                  </section>
                </div>

                {/* Disponibilités */}
                <section className="flex flex-col gap-3 border-t border-white/10 pt-6">
                  <h2 className="text-[10px] font-bold tracking-[0.18em] text-white/60 uppercase">
                    DISPONIBILITÉS POUR UNE VISITE
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <SelectInput options={JOURS} value={jour} onChange={setJour} />
                    <SelectInput options={HEURES} value={heure} onChange={setHeure} />
                    <SelectInput options={MINUTES} value={minute} onChange={setMinute} />
                    <Button variant="purple" onClick={handleAddDispo}>
                      Ajouter dispo
                    </Button>
                    <div className="ml-auto">
                      <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Envoi...' : 'ENVOYER'}
                      </Button>
                    </div>
                  </div>
                  {dispos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {dispos.map((d) => (
                        <DispoTag
                          key={d.id}
                          label={d.label}
                          onRemove={() => setDispos(dispos.filter((x) => x.id !== d.id))}
                        />
                      ))}
                    </div>
                  )}
                </section>
              </form>
            </div>
          </div>

          <div className="h-1 rounded-b-2xl bg-gradient-to-r from-purple-700 via-amber-500 to-purple-700 opacity-80 -mt-px" />
        </div>
      </div>
    </>
  )
}