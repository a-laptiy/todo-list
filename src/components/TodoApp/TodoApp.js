import React from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import TaskList from '../TaskList/TaskList';
import Filter from '../Filter/Filter';
import './TodoApp.scss';

const TodoApp = () => {
  return (
    <div className="todo-main">
      <h1 className="todo-main__title">Todo List</h1>
      <AddTaskForm />
      <Filter />
      <TaskList />
    </div>
  );
};

export default TodoApp;
