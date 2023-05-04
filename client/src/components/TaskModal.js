import React, {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import {Context} from "../index";
import DropdownMenu from "./DropdownMenu";
import FullName from "./functions/FullName";
import MyDateTimePicker from "./MyDateTimePicker";
import TextFieldDisabled from "./functions/TextFieldDisabled";
import ValidationComponent from "./functions/ValidationComponent";
import {parseISO, format} from 'date-fns';
import {addTask, updateTask} from "../http/taskAPI";
import {observer} from "mobx-react-lite";
import StyledButton from "./styled/StyledButton";

// компонент с модальным окном
const TaskModal = observer(({open, onClose, onSave, isNewTask}) => {
    const {task} = useContext(Context);
    const {user} = useContext(Context);
    const {purpose} = useContext(Context);
    const {status} = useContext(Context);
    const {priority} = useContext(Context);

    const userData = user.user // данные авторизованного пользователя
    const statuses = status.status // список статусов
    const priorities = priority.priority// список приоритетов
    const userPurposes = purpose.purpose;// список данных подчиненных авторизованного пользователя
    const selectTask = task.selectTask // данные выбранного пользователя

    const currentDate = new Date();
    const title = isNewTask ? 'Создание новой задачи' : 'Редактирование задачи';
    const name_button = isNewTask ? 'Добавить' : 'Изменить';
    // userAndUserPurpose - список состоящий из данных авторизованного пользователя и его подчиненных
    const userAndUserPurpose = [userData, ...userPurposes]
    //formattedDate - прибавляем неделю к тек. дате
    const formattedDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const [editedTask, setEditedTask] = useState(null);// состояние полей в модальном окне
    const [disabled, setDisabled] = useState(true);// состояние disabled для кнопки
    const [valid, setValid] = useState(false);// состояние первого открытия для логина и пароля
    const [errors, setErrors] = useState({// состояние ошибки на пустое поле для заголовка и описания
        title: null,
        description: null,
    });

    // заполнение дефолтными значениями, когда создается новая задача
    // или
    // заполнение значениями выбранной задачи при редактировании выбранной задачи
    useEffect(() => {
        if (isNewTask) {
            setEditedTask({
                id_task: '',
                title: '',
                description: '',
                due_date: formattedDate,
                created_at: '',
                updated_at: '',
                id_priority: priorities[0] ? priorities[0].id_priority : '',
                id_status: statuses[0] ? statuses[0].id_status : '',
                last_name_user_сreat: '',
                first_name_user_сreat: '',
                middle_name_user_сreat: '',
                id_user_responsible: userAndUserPurpose[0] ? userAndUserPurpose[0].id_user : '',
                last_name_user_responsible: userAndUserPurpose[0] ? userAndUserPurpose[0].last_name : '',
                first_name_user_responsible: userAndUserPurpose[0] ? userAndUserPurpose[0].first_name : '',
                middle_name_user_responsible: userAndUserPurpose[0] ? userAndUserPurpose[0].middle_name : '',
            });

        } else {
            setEditedTask(selectTask);
            setErrors({
                title: null,
                description: null,
            })
        }

    }, [isNewTask, selectTask, statuses, priorities]);

    // проверка полей заголовок и описания на наличие ошибок, чтобы поменять состояние disabled для кнопки
    useEffect(() => {
        if (!isNewTask && (errors.title === null) && (errors.description === null)) {
            setDisabled(false)
        } else if ((errors.title === null) && (errors.description === null) && valid) {
            setDisabled(false)
        } else {
            setValid(true)
            setDisabled(true)
        }

    }, [errors, open])

    // добавление или изменение задачи после нажатия на кнопку
    const handleSave = () => {
        const data = {
            id_task: editedTask.id_task,
            title: editedTask.title,
            description: editedTask.description,
            due_date: format(parseISO(editedTask.due_date), "yyyy-MM-dd"),
            id_priority: editedTask.id_priority,
            id_status: editedTask.id_status,
            id_user_responsible: editedTask.id_user_responsible,
            id_user_сreat: userData.id_user
        };

        try {
            if (isNewTask) {
                addTask(data).then(data => {
                    closeModal()
                })
            } else {
                updateTask(data).then(data => {
                    closeModal()
                })
            }

        } catch (e) {
            alert(e.response.data.message)
        }
    };

    // изменения состояния для заголовка и описания
    const handleInputChange = (event) => {
        const {name, value, type} = event.target;
        setEditedTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        //проверка на пустое поле
        const newErrors = ValidationComponent({
            name: name,
            value: value,
            type: type,
            errors: errors,
        })

        setErrors(newErrors);
    };

    // закрытие модального окна
    const closeModal = () => {
        onClose()
    }

    return (
        <>
            {editedTask && (
                <Dialog open={open} onClose={onClose} BackdropProps={{onClick: closeModal}}>
                    <DialogTitle sx={{fontWeight: 'bold'}}>{title}</DialogTitle>
                    <DialogContent sx={{paddingBottom: '10px'}}>
                        <TextField
                            margin="dense"
                            label="Заголовок"
                            type="text"
                            fullWidth
                            value={editedTask.title}
                            name="title"
                            disabled={TextFieldDisabled({
                                isNewTask: isNewTask,
                                editedTask: editedTask,
                                fieldName: "title"
                            })}
                            onChange={handleInputChange}
                            error={(errors.title !== null) && errors.title}
                            helperText={(errors.title !== null) && errors.title}
                        />
                        <TextField
                            margin="dense"
                            label="Описание"
                            type="text"
                            fullWidth
                            value={editedTask.description}
                            name="description"
                            disabled={TextFieldDisabled({
                                isNewTask: isNewTask,
                                editedTask: editedTask,
                                fieldName: "description"
                            })}
                            onChange={handleInputChange}
                            error={(errors.description !== null) && errors.description}
                            helperText={(errors.description !== null) && errors.description}
                        />

                        <MyDateTimePicker
                            margin="dense"
                            label="Дата окончания"
                            formats="dd/MM/yyyy"
                            name="due_date"
                            value={editedTask.due_date}
                            onChange={handleInputChange}

                            disabled={TextFieldDisabled({
                                isNewTask: isNewTask,
                                editedTask: editedTask,
                                fieldName: "due_date"
                            })}
                        />


                        {!isNewTask && (
                            <Box>
                                <MyDateTimePicker
                                    margin="dense"
                                    label="Дата изменения"
                                    formats="dd/MM/yyyy"
                                    value={editedTask.created_at}
                                    name="created_at"
                                    disabled={true}
                                />

                                <MyDateTimePicker
                                    margin="dense"
                                    label="Дата создания"
                                    formats="dd/MM/yyyy"
                                    value={editedTask.updated_at}
                                    name="updated_at"
                                    disabled={true}
                                />
                            </Box>

                        )}

                        <DropdownMenu
                            label="Приоритет"
                            name="id_priority"
                            value={editedTask.id_priority}
                            options={priorities.map((priorities) => ({
                                id: priorities.id_priority,
                                label: priorities.name,
                            }))}
                            disabled={TextFieldDisabled({
                                isNewTask: isNewTask,
                                editedTask: editedTask,
                                fieldName: "id_priority"
                            })}
                            onChange={handleInputChange}
                            defaultDropdownValue={editedTask.id_priority}
                        />

                        <DropdownMenu
                            label="Статус"
                            name="id_status"
                            value={editedTask.id_status}
                            options={statuses.map((statuses) => ({
                                id: statuses.id_status,
                                label: statuses.name,
                            }))}
                            disabled={TextFieldDisabled({
                                isNewTask: isNewTask,
                                editedTask: editedTask,
                                fieldName: "id_status"
                            })}
                            onChange={handleInputChange}
                            defaultDropdownValue={editedTask.id_status}
                        />
                        {!isNewTask && (
                            <TextField
                                margin="dense"
                                label="Создатель"
                                type="text"
                                fullWidth
                                name="user_create"
                                disabled={true}
                                value={FullName({
                                    lastName: editedTask.last_name_user_сreat,
                                    firstName: editedTask.first_name_user_сreat,
                                    middleName: editedTask.middle_name_user_сreat,
                                    isCurrentUser: editedTask.id_user_сreat === userData.id_user,
                                })}
                            />


                        )}
                        <DropdownMenu
                            label="Ответственный"
                            name="id_user_responsible"
                            value={editedTask.id_user_responsible}
                            options={userAndUserPurpose.map((purpose) => ({
                                id: purpose.id_user,
                                label: <FullName
                                    lastName={purpose.last_name}
                                    firstName={purpose.first_name}
                                    middleName={purpose.middle_name}
                                    isCurrentUser={purpose.id_user === userData.id_user}

                                />
                            }))}
                            disabled={TextFieldDisabled({
                                isNewTask: isNewTask,
                                editedTask: editedTask,
                                fieldName: "id_user_responsible"
                            })}
                            onChange={handleInputChange}
                            defaultDropdownValue={editedTask.id_user_responsible}

                        />

                    </DialogContent>
                    <DialogActions sx={{marginBottom: '10px'}}>
                        <StyledButton onClick={closeModal} height={37}>
                            Отмена
                        </StyledButton>

                        <StyledButton disabled={disabled} onClick={handleSave} sx={{marginRight: '16px'}} height={37}>
                            {name_button}
                        </StyledButton>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
});

export default TaskModal;
