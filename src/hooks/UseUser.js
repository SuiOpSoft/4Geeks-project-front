import { useContext, useCallback, useState } from "react";
import ContextToken from '../store/UserContext'
import loginServices from '../services/LoginServices'

export default function UseUser () {
    const {access_token, setAccess_token} = useContext(ContextToken)
    const [state, setstate] = useState({ loading: false,
    error: false})

    const login = useCallback(({email , password}) => {
        setstate({ loading: true , error: false})
        loginServices({ email , password})
        .then(access_token => {
            window.sessionStorage.setItem('access_token', access_token)
            setstate({ loading: false , error: false})
            setAccess_token(access_token)
        })
        .catch(err => {
            window.sessionStorage.removeItem('access_token')
            setstate({ loading: false , error: true})
            console.error(err)
        })
    },[setAccess_token])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('access_token')
        setAccess_token(null)
    }, [setAccess_token])

    return{
        isLogged: Boolean(access_token),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }
}