import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../features/todoSlice';
import PlusButton from '../base/CustomizableImages/PlusButton';
import './AddTaskForm.scss';

const AddTaskForm = () => {
  const [newTaskText, setNewTaskText] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleAddTask = () => {
    const trimmedText = newTaskText.trim();
    if (trimmedText) {
      dispatch(addTask(trimmedText));
      setNewTaskText('');
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className='add-task-form'>
      <input
        ref={inputRef}
        type='text'
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='Create a task'
        className='add-task-form__input'
      />
      <button onClick={handleAddTask} className='add-task-form__button'>
        <PlusButton />
      </button>
    </div>
  );
};

export default AddTaskForm;
