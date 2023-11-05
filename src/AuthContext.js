import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, {});

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}

export function useUserDispatch() {
    return useContext(UserDispatchContext);
}

const userReducer = (user, action) => {
    switch (action.type) {
        case 'signout': {
            return null;
        }
        case 'signin': {
            return action.data;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}