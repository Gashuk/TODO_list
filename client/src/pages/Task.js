import * as React from 'react';
import {useContext, useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import TaskModal from '../components/TaskModal';
import DropdownMenu from "../components/DropdownMenu";
import TasksTable from "../components/TasksTable";
import FullName from "../components/functions/FullName";
import FilteredTasks from "../components/functions/FilteredTasks";
import {fetchStatus} from "../http/statusAPI";
import {fetchPriority} from "../http/priorityAPI";
import {fetchTaskPurpose, fetchTaskUser} from "../http/taskAPI";
import {fetchUserPurpose} from "../http/purposeAPI";
import Box from "@mui/material/Box";
import StyledButton from "../components/styled/StyledButton";


// страница со списком задач
const Task = observer(() => {
    const {task} = useContext(Context);
    const {purpose} = useContext(Context);
    const {user} = useContext(Context);
    const {status} = useContext(Context);
    const {priority} = useContext(Context);

    //tasks - список задач, где ответственный
    // это авторизованный пользователь или подчиненные авторизованного пользователя
    const tasks = task.task;
    const isSupervisor = purpose.isSupervisor // являеться ли  авторизованный пользователь Руководителем
    const userData = user.user // данные авторизованного пользователя
    const userPurposes = purpose.purpose; // список данных подчиненных авторизованного пользователя
    // userAndUserPurpose - список состоящий из данных авторизованного пользователя и его подчиненных
    const userAndUserPurpose = [userData, ...userPurposes]
    const dateGroupOptions = task.dateGroupOptions // список времени для фильтрации

    const [openModal, setOpenModal] = useState(false);// состояние модального окна
    const [isNewTask, setIsNewTask] = useState(true);// состояние создается новая задача или нет
    const [tasksToRender, setTasksToRender] = useState([]);// состояние списка задач после фильтрации
    // selectedDateGroup - состояние выбранного эл. из выпадающего списков Время (all_time)
    const [selectedDateGroup, setSelectedDateGroup] = useState(dateGroupOptions[0].id);
    // selectedDateGroup - состояние выбранного эл.
    // из выпадающего списков Отвесвенный (id_user авторизованного пользователя)
    const [selectedPurpose, setSelectedPurpose] = useState(userData.id_user);
    const [dropdownValue, setDropdownValue] = useState(null);// дефолтные значения для выпадающих списков

    // подгрузка данных из БД
    useEffect(() => {

        // запрос на сервер, чтобы получить список статусов
        fetchStatus().then(data => {
            status.setStatus(data)
        })

        // запрос на сервер, чтобы получить список приоритетов
        fetchPriority().then(data => {
            priority.setPriority(data)
        })

        // запрос на сервер, чтобы получить список задач авторизованного пользователя
        fetchTaskUser(userData.id_user).then(data => {
            task.setTask(data)
        })

        // запрос на сервер, чтобы получить список задач подчиненных авторизованного пользователя
        fetchTaskPurpose(userData.id_user).then(data => {
            task.setTaskPurpose(data)
        })

        // запрос на сервер, чтобы получить список подчиненных авторизованного пользователя
        fetchUserPurpose(userData.id_user).then(data => {
            purpose.setPurpose(data.subordinate)
            purpose.setIsSupervisor(data.isSupervisor)
        })
    }, [openModal]);

    // фильтрация по времени и по ответственным
    useEffect(() => {
        let resultTask = tasks;

        if (isSupervisor && selectedPurpose !== 'all_user') {
            resultTask = FilteredTasks({
                tasks: tasks,
                filterType: 'purpose',
                selectedPurpose: selectedPurpose,
                id_user: userData.id_user
            });
        } else if (selectedPurpose !== 'all_user') {
            resultTask = FilteredTasks({
                tasks: tasks,
                filterType: 'user',
                selectedPurpose: selectedPurpose,
                id_user: userData.id_user
            });
        }

        const filteredTasks = FilteredTasks({
            tasks: resultTask,
            filterType: selectedDateGroup,
            selectedPurpose: selectedPurpose,
            id_user: userData.id_user
        });

        setTasksToRender(filteredTasks);

    }, [selectedDateGroup, selectedPurpose, tasks]);

    // изменения состояния выпадающего списка Время
    const handleDateGroupChange = (event) => {
        setSelectedDateGroup(event.target.value);
        setDropdownValue(event.target.value)
    };

    // изменения состояния выпадающего списка Ответственный
    const handlePurposeChange = (event) => {
        setSelectedPurpose(event.target.value);
        setDropdownValue(event.target.value)
    };

    // изменения состояния открытия модального окна
    const handleOpenModal = (tasks) => {
        if (tasks) {
            task.setSelectTask(tasks);
            setIsNewTask(false);
        } else {
            task.setSelectTask(null);
            setIsNewTask(true);
        }
        setOpenModal(true);
    }

    // изменения состояния закрытия модального окна
    const handleCloseModal = () => {
        task.setSelectTask(null);
        setOpenModal(false);

    };

    // изменения состояния после создания или изменения задач
    const handleSaveTask = (editedTask) => {
        task.setSelectTask(editedTask);
        handleCloseModal();
    };

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" align="center" gutterBottom>
                    Список задач
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>

                    <Box mr={2}>
                        <DropdownMenu
                            select
                            label="Время"
                            value={selectedDateGroup}
                            options={dateGroupOptions}
                            onChange={handleDateGroupChange}
                            defaultDropdownValue={dropdownValue}
                        />
                    </Box>

                    {isSupervisor && (
                        <Box mr={2}>
                            <DropdownMenu
                                label="Ответственный"
                                value={selectedPurpose}
                                options={[
                                    {id: 'all_user', label: 'Все пользователи'},
                                    ...userAndUserPurpose.map((purpose) => ({
                                        id: purpose.id_user,
                                        label: <FullName
                                            lastName={purpose.last_name}
                                            firstName={purpose.first_name}
                                            middleName={purpose.middle_name}
                                            isCurrentUser={purpose.id_user === userData.id_user}

                                        />
                                    })),
                                ]}
                                onChange={handlePurposeChange}
                                defaultDropdownValue={dropdownValue}
                            />
                        </Box>
                    )}
                    <StyledButton variant="contained" onClick={() => handleOpenModal(null)} height={48}>
                        Новая задача
                    </StyledButton>
                </Box>

            </Box>
            <TasksTable
                tasksToRender={tasksToRender}
                handleOpenModal={handleOpenModal}
                user_date={userData}
                isSupervisor={isSupervisor}
            />
            <TaskModal open={openModal} onClose={handleCloseModal} onSave={handleSaveTask} isNewTask={isNewTask}/>

        </>
    );

});
export default Task;


