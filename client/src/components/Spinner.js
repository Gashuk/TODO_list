import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// компонент с анимацией загрузки
const Spinner = () => {
    return (
        <Box sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
        }}>
            <CircularProgress/>
        </Box>
    );
};

export default Spinner;
