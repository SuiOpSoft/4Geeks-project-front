import React,{useState} from 'react'

const ContextTokenCompany = React.createContext({})

export function UserContextProviderCompany ({children}){
    const [access_token_company, setAccess_token_company] =  useState(
        () => window.sessionStorage.getItem('access_token_company')
    )

    return <ContextTokenCompany.Provider value={{access_token_company, setAccess_token_company}}>
        {children}
    </ContextTokenCompany.Provider>
}

export default ContextTokenCompany