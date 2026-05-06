// src/components/ui/Button.tsx
import Link from 'next/link'

type ButtonProps = {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
}

const sizeStyles = {
  sm: { fontSize: '10px', padding: '10px 24px', letterSpacing: '0.18em' },
  md: { fontSize: '11px', padding: '14px 32px', letterSpacing: '0.2em' },
  lg: { fontSize: '13px', padding: '18px 40px', letterSpacing: '0.22em' },
}

const variantStyles = {
  primary: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    border: 'none',
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    border: '1px solid var(--primary)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#171717',
    border: '1px solid #171717',
  },
}

export default function Button({
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const baseStyle = {
    ...sizeStyles[size],
    ...variantStyles[variant],
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase' as const,
    transition: 'opacity 0.2s ease',
    width: fullWidth ? '100%' : 'fit-content',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }

  // Render as Link if href is provided
  if (href && !disabled) {
    return (
      <Link href={href} style={baseStyle} className="hover:bg-amber-100 hover:text-amber-600">
        {label}
      </Link>
    )
  }

  // Render as button
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={baseStyle}
      className="hover:bg-amber-100 hover:text-amber-600"
    >
      {label}
    </button>
  )
}