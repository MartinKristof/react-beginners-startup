import { FC, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import classNames from 'classnames';

interface IButtonProps {
  children: ReactNode;
}

export const SubmitButton: FC<IButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={classNames(
        'font-bold text-white py-3 px-6 w-fit',
        { 'bg-green-600': !pending },
        { 'bg-gray-400': pending },
      )}
    >
      {children}
    </button>
  );
};
