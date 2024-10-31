import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);

    // Получение задач из API при загрузке
    useEffect(() => {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Добавление задачи
    const addTask = (task) => {
        fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        })
            .then(response => response.json())
            .then(newTask => setTasks([...tasks, newTask]))
            .catch(error => console.error('Error adding task:', error));
    };

    const updateTask = (updatedFields) => {
        fetch(`/api/tasks/${updatedFields.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text().then(text => text ? JSON.parse(text) : {});
            })
            .then(() => {
                setTasks(tasks.map(task =>
                    task.id === updatedFields.id ? { ...task, ...updatedFields } : task
                ));
            })
            .catch(error => console.error('Error updating task:', error));
    };

    // Удаление задачи
    const deleteTask = (taskId) => {
        fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    return (
        <div className="app">
            <h1>To-Do List</h1>
            <TaskInput addTask={addTask} />
            <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
    );
};

export default App;
