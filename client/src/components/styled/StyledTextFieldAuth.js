import React from 'react';
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyledTextFieldAuth = styled(TextField)({
    marginBottom: '20px',
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },

    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
            color: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
        '& .MuiInputBase-input': {
            color: 'white',
        },
        '& .MuiFormHelperText-root': {
            color: 'white',
        },
        '& .Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
        },
        '& .Mui-error .MuiInputBase-input': {
            color: 'white',
        },

    },
});

export default StyledTextFieldAuth;