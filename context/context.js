import React from "react"

const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

export const useAuthState=()=>{

    const context = React.useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error("useAuthState must be within AuthProvider")
    }

    return context;

}

export const useAuthDispatch=()=>{

    const context = React.useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error("useAuthDispatch must be within AuthProvider")
    }

    return context;

}

export const AuthProvider = ({children})=>{
    const [user, dispatch] = useReducer(reducer, initialState);
    return (
        <AuthStateContext.Provider value={user} >
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>

        </AuthStateContext.Provider>
    )
}