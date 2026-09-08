import NextLink, { type LinkProps as NextLinkProps } from 'next/link'
import { type AnchorHTMLAttributes, forwardRef } from 'react'

type LinkVariant =
  | 'primary'
  | 'primaryOutline'
  | 'secondary'
  | 'secondaryOutline'

interface LinkProps
  extends NextLinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  variant?: LinkVariant
}
const variantStyles: Record<LinkVariant, string> = {
  primary:
    'bg-primary-500 text-black hover:bg-primary-400 focus-visible:outline-primary-500',
  primaryOutline:
    'text-white border border-primary-500 hover:bg-primary-700 focus-visible:outline-primary-500',
  secondary:
    'bg-accent-500 text-white hover:bg-accent-900 focus-visible:outline-accent-400',
  secondaryOutline:
    'text-white border border-accent-500 hover:bg-accent-900 focus-visible:outline-primary-500',
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'primary', className = '', children, ...props }, ref) => {
    return (
      <NextLink
        ref={ref}
        className={`inline-flex w-full items-center justify-center rounded-lg py-2 font-medium outline-offset-2 transition-colors focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
