import { useState } from 'react'

type Variant = 'primary' | 'purple'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  variant?: Variant
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({ children, onClick, variant = 'primary', type = 'button', disabled }: Props) {
  const [hovered, setHovered] = useState(false)

  const bg =
    variant === 'primary'
      ? hovered ? '#d97706' : '#f59e0b'
      : hovered ? '#581c87' : '#6d28d9'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: bg }}
      className="rounded-full px-6 py-[10px] text-[12px] font-bold tracking-widest uppercase text-white transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap border-none outline-none"
    >
      {children}
    </button>
  )
}