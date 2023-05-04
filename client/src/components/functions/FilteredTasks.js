import React, {useContext} from 'react';

// функция фильтрации задач по времени и ответственным
const FilteredTasks = ({tasks, filterType, selectedPurpose, id_user}) => {

    const currentDate = new Date();

    // Функция, которая возвращает задачи, завершающиеся сегодня
    const getTasksForToday = (tasks) => {
        return tasks.filter(task => {
            const taskDate = new Date(task.due_date);
            const taskDateFormatted = taskDate.toISOString().slice(0, 10);
            const currentDateFormatted = currentDate.toISOString().slice(0, 10);
            return taskDateFormatted === currentDateFormatted;
        });
    }

    // Функция, которая возвращает задачи, завершающиеся в течение недели
    const getTasksForWeek = (tasks) => {
        const nextWeekDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        return tasks.filter(task => {
            const taskDueDate = new Date(task.due_date);
            const taskDueDateFormatted = taskDueDate.toISOString().slice(0, 10);
            const currentDateFormatted = currentDate.toISOString().slice(0, 10);
            const nextWeekDateFormatted = nextWeekDate.toISOString().slice(0, 10);
            return taskDueDateFormatted > currentDateFormatted && taskDueDateFormatted <= nextWeekDateFormatted;
        });
    }

    // Функция, которая возвращает задачи, завершающиеся в будущем
    const getTasksForFuture = (tasks) => {
        return tasks.filter(task => new Date(task.due_date) > currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    // Функция, которая возвращает задачи, отсортированные по дате последнего обновления
    const getTasksSortedByUpdatedAt = (tasks) => {
        return tasks.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    // Функция, которая возвращает задачи, по id ответственного подчененного авторизованного пользователя
    const getTasksForPurpose = (tasks) => {
        return tasks.filter(task => task.id_user_responsible === selectedPurpose);
    }

    // Функция, которая возвращает задачи, по id ответственного авторизованного пользователя
    const getTasksForUser = (tasks) => {
        return tasks.filter(task => task.id_user_responsible === id_user);
    }

    switch (filterType) {
        case 'today':
            return getTasksForToday(tasks);
        case 'week':
            return getTasksForWeek(tasks);
        case 'future':
            return getTasksForFuture(tasks);
        case 'all_time':
            return getTasksSortedByUpdatedAt(tasks);
        case 'purpose':
            return getTasksForPurpose(tasks);
        case 'user':
            return getTasksForUser(tasks);
        default:
            return tasks;
    }
};

export default FilteredTasks;