import React, {useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Context} from "../index";
import {observer} from 'mobx-react-lite';
import FullName from "./functions/FullName";
import StyledAppBar from "./styled/StyledAppBar";

// компонент с шапкой страницы
const Navbar = observer(() => {
    const {purpose} = useContext(Context);
    const {user} = useContext(Context);

    const isSupervisor = purpose.isSupervisor
    const user_date = user.user

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    TODO list
                </Typography>
                <Button color="inherit">
                    <FullName
                        lastName={user_date.last_name}
                        firstName={user_date.first_name}
                        middleName={user_date.middle_name}
                        isCurrentUser={user_date.id_user === user_date.id_user}
                        isSupervisor={isSupervisor}
                        isNavBar={true}

                    />
                </Button>

                <Button color="inherit" onClick={() => logOut()}>Выйти</Button>
            </Toolbar>
        </StyledAppBar>
    );
});

export default Navbar;
