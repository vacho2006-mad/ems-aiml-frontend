import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value
        });
    }

    async function submit() {

        try {

            console.log("Sending:", loginUser);

            const response = await axios.post(
                "http://localhost:9090/employee/login",
                loginUser
            );

            console.log("Response:", response.data);

            alert("Login successful!");

            // Navigate to Dashboard
            navigate("/Dashboard");

        } catch (err) {

            console.log("Error:", err);
            console.log("Response:", err.response);

            if (err.response) {

                alert(
                    "Login Failed: " +
                    (err.response.data?.message || err.response.data)
                );

            } else {

                alert("Cannot connect to backend!");
            }
        }
    }

    return (
        <>
            <h1>Login Here</h1>

            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={loginUser.email}
                onChange={handleChange}
            />

            <br />
            <br />

            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginUser.password}
                onChange={handleChange}
            />

            <br />
            <br />

            <button onClick={submit}>
                Login
            </button>

            <p>
                <Link to="/register">
                    New User?
                </Link>
            </p>
        </>
    );
}

export default Login;

