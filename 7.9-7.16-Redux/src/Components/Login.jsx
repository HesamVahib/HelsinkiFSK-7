import { useField } from "../hooks/useField";
import { useState } from "react";


const Login = () => {
    const { reset: resetUsername, ...username } = useField('text');
    const { reset: resetPassword, ...password } = useField('password');

    const [isLoggedIn, setIsLoggedIn] = useState(true);



    return isLoggedIn ? (
        <>
            <div>
                Hesam Vahib logged in
            </div>
            <br />
            <div>
                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            </div>
        </>
    ) : (
        <>
            <button onClick={() => setIsLoggedIn(true)}>Login</button>
        </>
    );

}

export default Login;