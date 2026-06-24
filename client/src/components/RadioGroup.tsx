type Option = { value: string; label: string }

type Props = {
  name: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export default function RadioGroup({ name, options, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            className={`w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              value === opt.value ? 'border-white' : 'border-white/50'
            }`}
          >
            {value === opt.value && (
              <span className="w-[7px] h-[7px] rounded-full bg-white block" />
            )}
          </span>
          <span className={`text-[13px] font-medium transition-colors ${value === opt.value ? 'text-white' : 'text-white/75'}`}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  )
}
