import React from 'react';

// функция проверяющая поля ввода текста на пустоту
const ValidationComponent = ({name, value, type, errors}) => {
    let newErrors = {...errors};

    if ((type === 'text' || type === 'password') && (!value || value.trim().length === 0)) {
        newErrors[name] = "Поле не должно быть пустым";
    } else if ((type === 'text' || type === 'password') && value.trim().length !== 0) {
        newErrors[name] = null;
    }
    return newErrors
};

export default ValidationComponent;