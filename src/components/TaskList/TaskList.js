import React, { useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleTask, editTask, reorderTasks } from '../../features/todoSlice';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import UnderlinedTextEditor from '../UnderlinedTextEditor/UnderlinedTextEditor';
import EditButton from '../base/Button/EditButton';
import DeleteButton from '../base/Button/DeleteButton';

import './TaskList.scss';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks);
  const filter = useSelector((state) => state.todo.filter);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const handleEdit = (id, text) => {
    setEditingTaskId(id);
    setEditedText(text);
  };

  const handleSaveEdit = (id) => {
    if (typeof editedText === 'string' && editedText.trim()) {
      dispatch(editTask({ id, newText: editedText.trim() }));
    }
    setEditingTaskId(null);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    dispatch(reorderTasks(reorderedTasks));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            {...provided.droppableProps} ref={provided.innerRef}
            className='task-list'
          >
            {filteredTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='task-list__item'
                  >
                    <div className='task-list__item-top'>
                      <div
                        onClick={() => dispatch(toggleTask(task.id))}
                        className={cn('task-list__checkbox', task.completed && 'task-list__checkbox--active')}
                      />

                      <div className='task-list__content'>
                        {editingTaskId === task.id ? (
                          <UnderlinedTextEditor
                            initialText={task.text}
                            onChange={setEditedText}
                          />
                        ) : (
                          <div className={cn('task-list__text', task.completed && 'task-list__text--completed')}>{task.text}</div>
                        )}
                      </div>
                    </div>
                    <div className='task-list__item-bottom'>
                      <EditButton
                        isEditing={editingTaskId === task.id}
                        onEditClick={() => handleEdit(task.id, task.text)}
                        onSaveClick={() => handleSaveEdit(task.id)}
                      />
                      <DeleteButton
                        onClick={() => dispatch(deleteTask(task.id))}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
