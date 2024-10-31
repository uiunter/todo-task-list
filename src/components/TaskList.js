import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
    const activeTasks = tasks.filter(task => !task.isCompleted);
    const completedTasks = tasks.filter(task => task.isCompleted);

    return (
        <div className="task-list">
            {activeTasks.map(task => (
                <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
            ))}
            {completedTasks.length > 0 && (
                <div className="completed-tasks">
                    <h3>Завершенные</h3>
                    {completedTasks.map(task => (
                        <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} isCompleted />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;
