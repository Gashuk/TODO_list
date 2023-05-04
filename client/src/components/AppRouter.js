import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes"
import {AUTH_ROUTE, TASK_ROUTE} from "../utils/consts"
import {Context} from "../index";

// компонент маршрутизатор
const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {/*доступ только к странице авторизации для неавторизованного пользователя*/}
            {publicRoutes.map(({path, Component}) =>
                <Route
                    key={path}
                    path={path}
                    element={<Component/>}/>
            )}

            {/*доступ только к странице со списком задач для авторизованного пользователя*/}
            {user.isAuth &&
            authRoutes.map(({path, Component}) =>
                <Route
                    key={path}
                    path={path}
                    element={<Component/>}
                />
            )}

            {/*переадресация по ошибочному адресу на страницу авторизации или со списком задач*/}
            <Route path='*' element={<Navigate to={user.isAuth ? TASK_ROUTE : AUTH_ROUTE}/>}/>
        </Routes>
    );
};


export default AppRouter;