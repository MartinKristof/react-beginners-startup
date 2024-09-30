import classNames from 'classnames';
import { AllHTMLAttributes, FC } from 'react';
import { EInputVariant } from '../enums';

interface IInputProps extends AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  variant?: EInputVariant;
}

export const Input: FC<IInputProps> = ({ variant: Tag = EInputVariant.INPUT, className = '', ...rest }) => (
  <Tag
    className={classNames(
      'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
      className,
    )}
    {...rest}
  />
);
