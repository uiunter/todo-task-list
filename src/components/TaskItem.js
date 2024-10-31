import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.title);

    const handleCheckboxChange = () => {
        updateTask({ id: task.id, isCompleted: !task.isCompleted });
    };

    const handleDueDateChange = (e) => {
        updateTask({ id: task.id, dueDate: e.target.value });
    };

    const handleTextClick = () => {
        setIsEditing(true);
    };

    const handleTextChange = (e) => {
        setEditedText(e.target.value);
    };

    const handleTextBlur = () => {
        setIsEditing(false);
        if (editedText !== task.title) {
            updateTask({ id: task.id, title: editedText });
        }
    };

    const handleTextKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleTextBlur();
        }
    };

    return (
        <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={handleCheckboxChange}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={handleTextChange}
                    onBlur={handleTextBlur}
                    onKeyPress={handleTextKeyPress}
                    autoFocus
                />
            ) : (
                <span onClick={handleTextClick}>{task.title}</span>
            )}
            <input
                type="date"
                value={task.dueDate || ''}
                onChange={handleDueDateChange}
            />
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
        </div>
    );
};

export default TaskItem;
