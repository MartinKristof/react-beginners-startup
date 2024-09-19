import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface INavItemProps {
  children: ReactNode;
  to: string;
}

export const NavItem: FC<INavItemProps> = ({ children, to }) => (
  <li className="mr-6">
    <NavLink
      className={({ isActive }) => classNames('text-white font-bold hover:underline', { underline: isActive })}
      to={to}
    >
      {children}
    </NavLink>
  </li>
);
