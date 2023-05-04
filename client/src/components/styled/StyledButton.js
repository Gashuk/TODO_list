import React from 'react';
import {styled} from "@mui/material/styles";
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({height = 48}) => ({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: '2px solid #FF8E53',
    borderRadius: '3px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, 0.3)',
    color: 'white',
    height: `${height}px`,
    padding: ' 0 30px',

    '&:disabled': {
        color: 'white',
    },

    '&:not(:disabled):hover': {
        background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    }
}));

export default StyledButton;
