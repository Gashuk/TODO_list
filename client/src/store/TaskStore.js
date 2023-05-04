import {makeAutoObservable} from "mobx";


export default class TaskStore {
    constructor() {
        this._task = []// список задач авторизованного пользователя
        this._taskPurpose = []// список задач подчиненных авторизованного пользователя
        this._selectTask = null // выбранная задача
        this._columns = ['Заголовок', 'Приоритет', 'Дата окончания', 'Ответственный', 'Статус']// список название колонок
        this._dateGroupOptions = [  // список времени для фильтрации
            {id: 'all_time', label: 'За все время'},
            {id: 'today', label: 'Сегодня'},
            {id: 'week', label: 'На неделю'},
            {id: 'future', label: 'На будущее'},
        ]

        makeAutoObservable(this)
    }

    setTask(task) {
        this._task = task
    }

    // возращает список задач, где ответственный
    // это авторизованный пользователь или подчиненные авторизованного пользователя
    get task() {
        return [...this._task, ...this._taskPurpose];
    }

    setTaskPurpose(taskPurpose) {
        this._taskPurpose = taskPurpose
    }

    get taskPurpose() {
        return this._taskPurpose
    }

    setSelectTask(selectTask) {
        this._selectTask = selectTask
    }

    get selectTask() {
        return this._selectTask
    }

    get dateGroupOptions() {
        return this._dateGroupOptions
    }

    get columns() {
        return this._columns
    }

}