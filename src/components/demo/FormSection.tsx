import type { ReactElement, ReactNode } from 'react'

interface FormSectionProps {
  title: string
  children: ReactNode
}

const FormSection = ({ title, children }: FormSectionProps): ReactElement => (
  <div className="bg-blue-gray rounded-xl p-6 space-y-4">
    <h3 className="text-xl font-serif text-white mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
)

export default FormSection

