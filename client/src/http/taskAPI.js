import {$authHost} from "./index";

// запрос на сервер, чтобы получить список задач авторизованного пользователя
export const fetchTaskUser = async (id_user_responsible) => {
    const {data} = await $authHost.get('api/task/user/' + id_user_responsible)
    return data
}

// запрос на сервер, чтобы получить список задач подчиненных авторизованного пользователя
export const fetchTaskPurpose = async (id_user_responsible) => {
    const {data} = await $authHost.get('api/task/purpose/' + id_user_responsible)
    return data
}

// запрос на сервер, чтобы изменить задачу
export const updateTask = async (task_data) => {
    const {data} = await $authHost.put('api/task/', task_data)
    return data
}

// запрос на сервер, чтобы добавить задачу
export const addTask = async (task_data) => {
    const {data} = await $authHost.post('api/task/', task_data)
    return data
}