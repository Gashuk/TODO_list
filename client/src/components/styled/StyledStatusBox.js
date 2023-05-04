import React from 'react';
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledStatusBox = styled(Box)(({status_color}) => ({

    color:
        status_color === "green"
            ? "#9ae59a"
            : status_color === "red"
            ? "#ff9999"
            : status_color === "gray"
                ? "#bfbfbf"
                : "#bfbfbf"
}));

export default StyledStatusBox;