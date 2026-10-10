import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        role: "",
        email: "",
        password: ""
    });

    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    async function register() {
        try {

            console.log("Sending registration data:", user);

            const response = await axios.post(
                "http://localhost:9090/employee/add",
                user
            );

            console.log("Registration response:", response.data);

            alert("Registration successful!");

            navigate("/");

        } catch (err) {

            console.log("FULL ERROR:", err);
            console.log("ERROR RESPONSE:", err.response);
            console.log("ERROR DATA:", err.response?.data);

            let errorMessage = "Registration Failed";

            if (err.response?.data) {

                if (typeof err.response.data === "string") {
                    errorMessage = err.response.data;
                } 
                else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                } 
                else {
                    errorMessage = JSON.stringify(err.response.data);
                }

            } else if (err.message) {
                errorMessage = err.message;
            }

            alert("Registration Failed: " + errorMessage);
        }
    }

    return (
        <>
            <h2>Register Here</h2>

            <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="role"
                placeholder="Enter your role"
                value={user.role}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleChange}
            />

            <br /><br />

            <button onClick={register}>
                Register
            </button>

            <p>
                <Link to="/">
                    Already have account??
                </Link>
            </p>
        </>
    );
}

export default Register;