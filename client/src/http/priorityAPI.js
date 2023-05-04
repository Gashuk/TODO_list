import {$authHost} from "./index";

// запрос на сервер, чтобы получить список приоритетов
export const fetchPriority = async () => {
    const {data} = await $authHost.get('api/priority')
    return data
}