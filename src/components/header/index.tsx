import { ArrowLeftCircle, Cloud } from 'lucide-react'

type headerProps = {
  title: string
  back?: boolean
  onBack?: () => void
}

export const Header = ({ title, back, onBack }: headerProps) => {
  return (
    <header className="flex w-full items-center justify-between border-neutral-700 border-b bg-black px-6 py-4">
      {back ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="rounded-full text-white transition-colors hover:scale-105 hover:text-primary-500 focus-visible:text-primary-500 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        >
          <ArrowLeftCircle aria-hidden="true" />
        </button>
      ) : (
        <div /> // mantém o title centralizado mesmo sem o botão
      )}
      <p className="text-lg text-white">{title}</p>
      <Cloud aria-hidden="true" className="text-primary-500" />
    </header>
  )
}
