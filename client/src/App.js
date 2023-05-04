import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/NavBar";
import Auth from "./pages/Auth";
import {Context} from "./index";
import './index.css';
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import Spinner from "./components/Spinner";
import Box from "@mui/material/Box";


const App = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true)// состояние анимации загрузки

    // проверка авторизован или нет пользователь после перезагрузки страницы
    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)

        }).finally(() => setLoading(false))

    }, [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <Box>
            <BrowserRouter>
                {user.isAuth ? <Navbar/> : <Auth/>}
                <AppRouter/>
            </BrowserRouter>
        </Box>
    );
});

export default App;
