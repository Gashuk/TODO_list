import React, {useContext} from 'react';
import {Context} from '../../index';

// функция возвращающая значение true или false для каждого поля в модальном окне в зависимости от доступа к этому полю
const TextFieldDisabled = ({isNewTask, editedTask, fieldName}) => {
    const {user} = useContext(Context);
    const {purpose} = useContext(Context);

    const user_date = user.user;
    const isSupervisor = purpose.isSupervisor;

    if (
        !isNewTask &&
        editedTask.id_user_сreat !== user_date.id_user &&
        editedTask.id_user_responsible === user_date.id_user &&
        isSupervisor &&
        fieldName !== 'id_user_responsible' &&
        fieldName !== 'id_status'
    ) {
        return true;
    } else if (
        !isNewTask &&
        editedTask.id_user_сreat !== user_date.id_user &&
        editedTask.id_user_responsible === user_date.id_user &&
        !isSupervisor &&
        fieldName !== 'id_status'
    ) {
        return true;
    } else if (
        !isNewTask &&
        editedTask.id_user_сreat !== user_date.id_user &&
        editedTask.id_user_responsible !== user_date.id_user &&
        isSupervisor &&
        fieldName !== 'id_user_responsible'
    ) {
        return true;
    } else {
        return false;
    }
};

export default TextFieldDisabled;
