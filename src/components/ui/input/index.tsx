import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id ?? props.name

    return (
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="font-medium text-sm text-white">
            {label}
          </label>
        )}{' '}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:bg-gray-100 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            ${className}
                    `}
          {...props}
        />
        {error ? (
          <span className="text-red-500 text-xs">{error}</span>
        ) : helperText ? (
          <span className="text-gray-500 text-xs">{helperText}</span>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
