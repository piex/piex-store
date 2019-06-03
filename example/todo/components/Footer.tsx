import React, { FC, useMemo } from 'react';

import { useStore } from '@piex-store/react';
import todoStore from '../todoStore';

import Link from './Link';
import { FILTER_TITLES, FilterEnum } from '../constants';

interface IFooterProps {
  completedCount: number;
  activeCount: number;
}

const Footer: FC<IFooterProps> = ({ activeCount, completedCount }) => {
  const store = useStore(todoStore);

  const itemWord = useMemo(() => activeCount === 1 ? 'item' : 'items', [activeCount]);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES)
          .map(filter => (
            <li key={filter}>
              <Link
                active={store.state.filter === filter}
                setFilter={() => store.setVisibilityFilter(filter as FilterEnum)}
              >
                {FILTER_TITLES[filter]}
              </Link>
            </li>
          ))}
      </ul>
      {
        !!completedCount && (
          <button
            className="clear-completed"
            onClick={() => store.clearCompleted()}
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};

export default Footer;
