import { useContext, useCallback, useState } from "react";
import ContextTokenCompany from '../store/CompanyContext'
import loginServicesCompany from '../services/LoginServicesCompany'

export default function UseUser () {
    const {access_token_company, setAccess_token_company} = useContext(ContextTokenCompany)
    const [state, setstate] = useState({ loading: false, error: false })

    const loginCompany = useCallback(({companyUser , passwordCompany}) =>{
        setstate({ loading: true , error: false})
        loginServicesCompany({ companyUser, passwordCompany })
        .then(access_token_company => {
            window.sessionStorage.setItem('access_token_company', access_token_company)
            setstate({ loading: false , error: false})
            setAccess_token_company(access_token_company)
        })
        .catch(err => {
            window.sessionStorage.removeItem('access_token_company')
            setstate({ loading: false , error: true})
            console.error(err)
        })
    }, [setAccess_token_company])

    const logoutCompany = useCallback(() => {
        window.sessionStorage.removeItem('access_token_company')
        setAccess_token_company(null)
    }, [setAccess_token_company])

    return{
        isLoggedCompany: Boolean(access_token_company),
        isLoginLoadingCompany: state.loading,
        hasLoginErrorCompany: state.error,
        loginCompany,
        logoutCompany,
    }
}