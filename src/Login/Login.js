import React from 'react'
import './Login.css'
import { auth, provider } from '../Firebase/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useStateValue } from '../StateProvider'
const Login = () => {
    const [, dispatch] = useStateValue()
    const signIn = () => {
        signInWithPopup(auth, provider).then(result => {
            dispatch({
                type: "SET_USER",
                user: result.user
            })
        }).catch(err => console.log(err));
    }
    return (
        <div className="login__wrapper">
            <div className="login">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png" alt="whatsapp logo" />
                <h2>Sign in to Whatsapp </h2>
                <button onClick={signIn}>Login with Google</button>
            </div>
        </div>
    )
}

export default Login
