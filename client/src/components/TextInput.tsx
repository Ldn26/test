import { useState } from 'react'

type Props = {
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: string
  error?: string
}

export default function TextInput({ placeholder, value, onChange, type = 'text', error }: Props) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: focused ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.12)',
          border: `1.5px solid ${error ? '#f87171' : focused ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)'}`,
        }}
        className="w-full rounded-full px-5 py-[10px] text-[13.5px] text-white placeholder-white/55 outline-none transition-all"
      />
      {error && <span className="text-[11px] text-red-400 pl-4">{error}</span>}
    </div>
  )
}