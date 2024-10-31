import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
    const [taskText, setTaskText] = useState('');

    const handleAddTask = () => {
        const newTask = {
            id: Date.now(),
            title: taskText,
            isCompleted: false,
            dueDate: null,
        };

        addTask(newTask);
        setTaskText('');
    };

    return (
        <div className="task-input">
            <input
                type="text"
                placeholder="Добавить задачу"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
            />
            <button onClick={handleAddTask}>Добавить</button>
        </div>
    );
};

export default TaskInput;
