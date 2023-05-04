import React from 'react';

// функция возращающая ФИО в формате Иванов И.И. с подписью при необходимости Руководитель или Вы
const FullName = ({lastName, firstName, middleName, isCurrentUser, isSupervisor, isNavBar}) => {
    const fullName = `${lastName} ${firstName[0]}. ${middleName[0]}.`;
    const currentUserText = isSupervisor ? '(Руководитель)' : !isNavBar ? '(Вы)' : '';

    return (
        isCurrentUser ? `${fullName} ${currentUserText}` : fullName
    );
};

export default FullName;