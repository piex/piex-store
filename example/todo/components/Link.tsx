import React, { FC } from 'react';

interface ILinkProps {
  active: boolean;
  setFilter: () => void;

}

const Link: FC<ILinkProps> = ({ active, setFilter, children }) => (
  <a
    className={`${active ? 'selected' : ''}`}
    style={{ cursor: 'pointer' }}
    onClick={() => setFilter()}
  >
    {children}
  </a>
);

export default Link;
