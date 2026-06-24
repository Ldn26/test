type Props = {
  label: string
  onRemove: () => void
}

export default function DispoTag({ label, onRemove }: Props) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white/20 border border-white/35 rounded-full px-3 py-1 text-white text-xs font-medium">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Supprimer ${label}`}
        className="text-white/70 hover:text-white text-base leading-none cursor-pointer bg-transparent border-none p-0"
      >
        ×
      </button>
    </span>
  )
}