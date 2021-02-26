import React,{useState} from 'react'

const ContextToken = React.createContext({})

export function UserContextProvider ({children}){
    const [access_token, setAccess_token] =  useState(
        () => window.sessionStorage.getItem('access_token')
    )

    return <ContextToken.Provider value={{access_token, setAccess_token}}>
        {children}
    </ContextToken.Provider>
}

export default ContextToken