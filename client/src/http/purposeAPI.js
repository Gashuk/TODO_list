import {$authHost} from "./index";

// запрос на сервер, чтобы получить список подчиненных авторизованного пользователя
export const fetchUserPurpose = async (id_user_supervisor) => {
    const {data} = await $authHost.get('api/purpose/user/' + id_user_supervisor)
    return data
}