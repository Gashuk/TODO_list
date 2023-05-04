import {$authHost} from "./index";

// запрос на сервер, чтобы получить список статусов
export const fetchStatus = async () => {
    const {data} = await $authHost.get('api/status')
    return data
}