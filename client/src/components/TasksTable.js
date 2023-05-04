import React, {useContext} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import FullName from "./functions/FullName";
import DateFormatter from "./functions/DateFormatter";
import {Context} from "../index";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import StyledStatusBox from "./styled/StyledStatusBox";
import StyledTableRow from "./styled/StyledTableRow";

// компонент с таблицей задач
const TasksTable = ({tasksToRender, handleOpenModal, user_date, isSupervisor}) => {

    const {task} = useContext(Context);
    const columns = task.columns // список название колонок

    return (
        <Box sx={{mx: 'auto', width: '80%'}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell align="center" sx={{fontWeight: 'bold'}}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasksToRender.map((task) => {
                            return (
                                <StyledTableRow
                                    key={task.id_task}
                                    onClick={() => handleOpenModal(task)}
                                >
                                    <TableCell align="center">
                                        <StyledStatusBox fontWeight={600} status_color={task.status_color}>
                                            {task.title}
                                        </StyledStatusBox>
                                    </TableCell>
                                    <TableCell align="center">{task.priority_name}</TableCell>
                                    <TableCell align="center">
                                        <Box fontWeight={500}>
                                            <DateFormatter date={task.due_date}/>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <FullName
                                            lastName={task.last_name_user_responsible}
                                            firstName={task.first_name_user_responsible}
                                            middleName={task.middle_name_user_responsible}
                                            isCurrentUser={
                                                task.id_user_responsible === user_date.id_user &&
                                                isSupervisor
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="center">{task.status_name}</TableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TasksTable;