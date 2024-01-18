import { createContext, useReducer } from 'react';

export const ModuleContext = createContext();

export const ModulesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MODULES':
            return {
                modules: action.payload
            }
        case 'CREATE_MODULE':
            return {
                modules: [action.payload, ...state.modules]
            }
        case 'DELETE_MODULE':
            return {
                modules: state.modules.filter((module) => module._id !== action.payload._id)
            }
        default:
            return state;
    }
}

export const ModuleContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(ModulesReducer, {
        modules: null
    });

    return (
        <ModuleContext.Provider value={{
            ...state, dispatch
        }}>
            {children}
        </ModuleContext.Provider>
    )
}