import React, {useContext, useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import {Context} from '../index';
import {observer} from 'mobx-react-lite';
import ValidationComponent from "../components/functions/ValidationComponent";
import {login} from "../http/userAPI";
import {TASK_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom';
import StyledButton from "../components/styled/StyledButton";
import StyledBoxAuth from "../components/styled/StyledBoxAuth";
import StyledTextFieldAuth from "../components/styled/StyledTextFieldAuth";

// страница с авторизацией
const Auth = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate()

    // authData - состояние введенного логина и пароля
    const [authData, setAuthData] = useState({
        login: "",
        password: "",
    });
    const [disabled, setDisabled] = useState(true);// состояние disabled для кнопки
    const [valid, setValid] = useState(false);// состояние первого открытия для логина и пароля
    // isErrorsMiddleware - состояние ошибки после нажатия кнопки
    const [isErrorsMiddleware, setErrorsMiddleware] = useState(false);

    const [errors, setErrors] = useState({// состояние ошибки на пустое поле для логина и пароля
        login: null,
        password: null,
    });

    // обнуление данных авторизованного пользователя
    useEffect(() => {
        user.setUser({})
        user.setIsAuth(false)
    }, [])

    // проверка полей логин и пароль на наличие ошибок, чтобы поменять состояние disabled для кнопки
    useEffect(() => {
        if ((errors.login === null) && (errors.password === null) && valid) {
            // setValid(true)
            setDisabled(false)
        } else if (isErrorsMiddleware) {
            // setValid(true)
            setDisabled(false)
            setErrorsMiddleware(false)
        } else {
            setValid(true)
            setDisabled(true)
        }

    }, [errors])

    // авторизация после нажатия на кнопку
    const handleLogin = async () => {
        try {
            const response = await login(authData.login, authData.password)
            user.setUser(response)
            user.setIsAuth(true)
            navigate(TASK_ROUTE)// переход на страницу со списком задач

        } catch (e) {//обработка ошибок при авторизации
            const response = e.response.data.message
            setErrorsMiddleware(true)

            if (response.hasOwnProperty('login')) {
                setErrors({...errors, login: response.login});
            } else {
                setErrors({...errors, password: response.password});
            }
        }
    };

    // изменения состояния для полей логин и пароль
    const handleInputChange = (event) => {
        const {name, value, type} = event.target;
        setAuthData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        //проверка на пустое поле
        const newErrors = ValidationComponent({
            name: name,
            value: value,
            type: type,
            errors: errors,
        })

        setErrors(newErrors);
    };

    return (
        <StyledBoxAuth>
            <Typography variant="h6" gutterBottom style={{color: 'white'}}>
                Авторизация
            </Typography>
            <StyledTextFieldAuth
                label="Имя пользователя"
                fullWidth
                value={authData.username}
                onChange={handleInputChange}
                variant="outlined"
                name="login"
                error={(errors.login !== null) && errors.login}
                helperText={(errors.login !== null) && errors.login}

            />
            <StyledTextFieldAuth
                label="Пароль"
                type="password"
                fullWidth
                value={authData.password}
                onChange={handleInputChange}
                variant="outlined"
                name="password"
                error={(errors.password !== null) && errors.password}
                helperText={(errors.password !== null) && errors.password}

            />
            <StyledButton variant="contained" disabled={disabled} onClick={handleLogin} height={48}>
                Войти
            </StyledButton>
        </StyledBoxAuth>
    );
});

export default Auth;
