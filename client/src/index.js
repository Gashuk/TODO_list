import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from './store/UserStore';
import TaskStore from './store/TaskStore';
import StatusStore from './store/StatusStore';
import PriorityStore from './store/PriorityStore';
import PurposeStore from './store/PurposeStore';
import App from './App';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Context.Provider value={{
        user: new UserStore(),
        task: new TaskStore(),
        status: new StatusStore(),
        priority: new PriorityStore(),
        purpose: new PurposeStore(),
    }}>
        <App/>
    </Context.Provider>
);


