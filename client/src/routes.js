import Task from "./pages/Task";
import {AUTH_ROUTE, TASK_ROUTE} from "./utils/consts"
import Auth from "./pages/Auth";

export const authRoutes = [
    {
        path: TASK_ROUTE,
        Component: Task
    }
]

export const publicRoutes = [

    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]