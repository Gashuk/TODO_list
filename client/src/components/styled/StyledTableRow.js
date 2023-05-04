import React from 'react';
import {styled} from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

export default StyledTableRow;