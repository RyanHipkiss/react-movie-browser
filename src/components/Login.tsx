import React from "react"
import { login } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Promo from "./Promo";
import './Login.css'

const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: RootState) => state.user.value.isLoggedIn)

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //@todo - type
        const formData: any = Object.fromEntries(new FormData(e.currentTarget));

        dispatch(login(formData))
    }

    if (isLoggedIn) {
        return (
            <div>
                <Promo />
            </div>
        )
    }

    return (
        <div className="page">
            <form onSubmit={e => handleLogin(e)}>
                <input type="text" name="name"/>
                <input type="password" name="password" />
                <button type="submit">Login!</button>
            </form>
        </div>
    )
}

export default Login