import React from 'react';
import {format} from 'date-fns';

// функция, которая переводит дату в формат dd/MM/yyyy
const DateFormatter = ({date}) => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');

    return (
        `${formattedDate}`
    );
};

export default DateFormatter;