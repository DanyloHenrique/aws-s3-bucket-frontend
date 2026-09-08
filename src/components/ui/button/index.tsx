import { Loader2 } from 'lucide-react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'primaryOutline' | 'secondary' | 'secondaryOutline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:'bg-primary-500 text-black hover:bg-primary-400 focus-visible:outline-primary-500',
  primaryOutline: 'text-white border border-primary-500 hover:bg-primary-700 focus-visible:outline-primary-500',
  secondary:'bg-accent-500 text-white hover:bg-accent-900 focus-visible:outline-accent-400',
  secondaryOutline: 'text-white border border-accent-500 hover:bg-accent-900 focus-visible:outline-primary-500',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      isLoading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`inline-flex w-full items-center justify-center rounded-lg py-2 font-medium outline-offset-2 transition-colors focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <Loader2 className="-translate-x-1 animate-spin" size={18} />
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
