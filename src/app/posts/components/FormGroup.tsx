import { FC, ReactNode } from 'react';

interface IFormGroupProps {
  id: string;
  children: ReactNode;
  label?: string;
  error?: string;
}

export const FormGroup: FC<IFormGroupProps> = ({ id, children, label = 'Your input', error }) => (
  <div className="mt-2">
    <label htmlFor={id} className="block mb-2 text-sm font-medium">
      {label}:{children}
    </label>
    {error && <div className="text-red-500">{error}</div>}
  </div>
);
