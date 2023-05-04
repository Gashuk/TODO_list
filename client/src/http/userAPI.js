import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

// запрос на сервер, чтобы зарегистрировать пользователя
export const registration = async (login, password) => {
    const {data} = await $host.post('api/user/registration', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

// запрос на сервер, чтобы авторизировать пользователя
export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)

}

// запрос на сервер, чтобы проверить пользователя
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}