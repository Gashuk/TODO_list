import React from 'react';
import TextField from '@mui/material/TextField';
import {LocalizationProvider, DesktopDatePicker} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {format, parseISO} from 'date-fns';
import ruLocale from "date-fns/locale/ru";
import Box from "@mui/material/Box";

// компонент с DateTimePicker
const MyDateTimePicker = ({label, formats, value, onChange, name, disabled, margin}) => {

    return (
        <Box style={{marginTop: '8px'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                <DesktopDatePicker
                    margin={margin}
                    label={label}
                    format={formats}
                    value={value ? parseISO(value) : null}
                    name={name}
                    onChange={(date) => onChange({target: {name, value: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}})}
                    disabled={disabled}
                    renderInput={(params) => <TextField margin={margin} {...params} />}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default MyDateTimePicker;
