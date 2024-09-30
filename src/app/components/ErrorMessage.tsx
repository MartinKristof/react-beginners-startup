import { FC, ReactNode } from 'react';

interface IErrorMessage {
  children: ReactNode;
}

export const ErrorMessage: FC<IErrorMessage> = ({ children }) => <div className="text-red-500">{children}</div>;
