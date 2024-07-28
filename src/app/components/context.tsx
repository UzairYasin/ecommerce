"use client"
import { createContext, ReactNode, useReducer } from "react";

let defaultValue = 0;

export const CreateContext = createContext<{
    State: number,
    dispatch: (action:any) => void 
}>({State:0, dispatch: ()=>{}});

const Reducer = (State:any, Action:any) => {
    switch (Action.type) {
        case 'Count_Up':
            State = Action.payload
            return State
    
        default:
            defaultValue
            break;
    }
}

export const ContextApi = ({ children }: { children: React.ReactNode }) => {
    const [State, dispatch] = useReducer(Reducer, defaultValue);
    return (

        <CreateContext.Provider value={{State, dispatch}} >
            {children}
        </CreateContext.Provider>
    )
}