import React from 'react';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledBoxAuth = styled(Box)({
    width: '400px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: '20px',
    borderRadius: '5px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #FF8E53',
});

export default StyledBoxAuth;