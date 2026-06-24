import { useState } from 'react'

type Option = { value: string; label: string }

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export default function SelectInput({ options, value, onChange }: Props) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: 'rgba(255,255,255,0.12)',
          border: `1.5px solid ${focused ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.25)'}`,
        }}
        className="appearance-none rounded-full pl-4 pr-8 py-[10px] text-white text-[13.5px] cursor-pointer outline-none transition-all min-w-[100px]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: '#1e1040', color: '#fff' }}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="absolute right-3 text-white/60 pointer-events-none text-[11px]">▾</span>
    </div>
  )
}