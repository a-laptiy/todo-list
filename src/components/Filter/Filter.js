import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../features/todoSlice';
import Button from '../base/Button/Button';
import './Filter.scss';

const filterButtons = [
  { type: 'all', label: 'All' },
  { type: 'completed', label: 'Completed', theme: 'secondary' },
  { type: 'active', label: 'Active', theme: 'error' },
];

const Filter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.todo.filter);

  return (
    <div className='filter-list'>
      {filterButtons.map(({ type, label, theme }) => (
        <Button
          key={type}
          active={currentFilter === type}
          onClick={() => dispatch(setFilter(type))}
          theme={theme}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default Filter;
